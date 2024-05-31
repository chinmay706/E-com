// create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  // options for cookie

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None' // क्रॉस-साइट कूकीज़ के लिए आवश्यक
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({success: true,
      user,

    })
    
};

export default sendToken;
