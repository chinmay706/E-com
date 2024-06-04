import { errorHandler } from "../utils/ErrorHandler.js";
import catcherrors from "../middleware/catchAsyncError.js";
import User from "../moduls/userModel.js";
import jwt from "jsonwebtoken";
import sendToken from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudniry from "cloudinary"

//  Register a User ==>

const registerUser = catcherrors(async (req, res, next) => {
  const {avatar}= req.body
  
  const myCloud = await cloudniry.v2.uploader.upload( avatar,{
    folder:"avatars",
    quality:"auto",
    width:150,
    height:150,
    
    crop:"fill",

  })
  const { name, email, password } = req.body;
  const olduser = await User.findOne({ email }) 
  if(olduser){
    return next(new errorHandler("User is already exist ", 400));

  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
     
  });

  sendToken(user, 201, res);
});

// Login User ==>
const loginUser = catcherrors(async (req, res, next) => {
  const { email, password } = req.body;
   

  if (!email || !password) {
    return next(new errorHandler("Please Enter Email & Password ", 400));
  }

  const user = await User.findOne({ email })
    .select("+password")
    .catch((error) => {
     return next(new errorHandler("Invalid email and password", 401));
    });
  

  if (!user) {
    return next(new errorHandler("Invalid email and password", 401));
  }

  const isPasseordMatched = await user.comparePassword(password);

  if (!isPasseordMatched) {
    return next(new errorHandler("Invalid email and password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User ==>

const logout = catcherrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,

    secure: process.env.NODE_ENV === 'production'?true:false,  
   sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' 
  });

  res.status(200).json({
    success: true,
    message: "Logout succesfully",
  });
});

// Forgot password ==>

const forgotPassowrd = catcherrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new errorHandler("User not found ", 404));
  }

  // Get  resetPassword token
  const resettoken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `https://kaleidoscopic-alfajores-22ce37.netlify.app/password/reset/${resettoken}`;

  const message = ` Your password token is   :- \n\n ${resetPasswordURL} \n\n if you have requested this email then , please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new errorHandler(error.message, 500));
  }
});

const resetPassword = catcherrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new errorHandler(
        "Reset Password Token is invalid or has been expired ",
        404
      )
    );
  }

  const { password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    return next(new errorHandler("Password does not match ", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);

  // res.status(200).json({
  //   success: true,
  //   user,
  // });
});

// GET USER DETAILES ==>

const getuserDetails = catcherrors(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user password==>
const updatePassword = catcherrors(async (req, res, next) => {
  const { oldpassword, newpassword, confirmpassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  const isPasseordMatched = await user.comparePassword(oldpassword);

  if (!isPasseordMatched) {
    return next(new errorHandler("Old password is incorrect ", 400));
  }

  if (newpassword !== confirmpassword) {
    return next(new errorHandler("password does not match", 400));
  }
  user.password = newpassword;
  await user.save();
  sendToken(user, 200, res);

  // res.status(200).json({
  //   success: true,
    

  // })
});

// Update User Profile ==>

const updateProfile = catcherrors(async (req, res) => {
  const { name, email, avatar} =await req.body;
  const newUserDate = { name, email };
  
 
  if( avatar!=="" &&  avatar!==null &&  avatar!==undefined  ){
    const user = await User.findById(req.user.id);
    const image =  user.avatar.public_id;
    await cloudniry.v2.uploader.destroy(image)
    const myCloud = await cloudniry.v2.uploader.upload( avatar,{
      folder:"avatars",
      quality:"auto",
      width:150,
      height:150,
      
      crop:"fill",
  
    })
    newUserDate.avatar ={
      public_id:myCloud.public_id,
      url: myCloud.secure_url,

    }
  } 

   await User.findByIdAndUpdate(req.user.id, newUserDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
 
  res.status(200).json({
    success: true,
    
  });
});

// Update User Role ==>

const updateUserRole = catcherrors(async (req, res) => {
  const { name, email, role } = req.body;
  const newUserDate = { name, email, role };
    await User.findByIdAndUpdate(req.params.id, newUserDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

const deleteUSer = catcherrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return next(
      new errorHandler(`User does not exist with Id : ${req.params.id}`)
    );
  }
  const iamgeID = user.avatar.public_id;
  await cloudniry.uploader.destroy(iamgeID)
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User deleted successfully ",
  });
});

// Get All users (admin)

const getAllusers = catcherrors(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new errorHandler(`Users does not exists `));
  }

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (Admin)

const getsingleuser = catcherrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new errorHandler(`User does not exist with Id : ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});



export {
  registerUser,
  loginUser,
  logout,
  forgotPassowrd,
  resetPassword,
  getuserDetails,
  updatePassword,
  updateProfile,
  getAllusers,
  getsingleuser,
  updateUserRole,
  deleteUSer,

};
