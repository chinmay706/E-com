import React, { Fragment, useEffect, useState } from "react";
import {    useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loaduser, updateProfile } from "../../redux/actions/userAction.js";
import { useAlert } from "react-alert";
import Loading from "../layout/Loader/Loading.js";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userContant.js";
import MetaData from "../layout/MetaData.js";
 

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()

  const { user} = useSelector((state) => state.user);
  const {isUpdated,loading,error } = useSelector((state)=>state.profile)

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(" ");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  
  const updateprofileSumbit = (e) => {
    e.preventDefault();

    const formData  = new FormData();
    formData.set("name", name);
  formData.set("email", email);

  // Check if avatar is selected
  if (avatar) {
    formData.set("avatar", avatar);
  }
    dispatch(updateProfile(formData ))
    

    
  };
 

  const updateProfileDataChange = (e) => {
      
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      
    
  };
  
 

  useEffect(() => {
    if(user){
        setName(user.name)
        setEmail(user.email)
        setAvatarPreview(user.avatar.url)
     
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
     alert.success("Profile update successfully")
      navigate("/profile")
      dispatch(loaduser())
      dispatch({
      type: UPDATE_PROFILE_RESET
      })
    
      
    }
  }, [dispatch, alert, navigate, user,isUpdated, error]);

  return <Fragment>
    {loading? <Loading/> :(
         <Fragment >
         <MetaData title="Update Profile " />
       <div   className="w-[100vw] md:h-[80%] h-[100vh] max-w-full   flex justify-center items-center backdrop-blur-lg   md:m-[5vmax] m-0  fixed top-0 left-0 md:static ">
         <div className=" backdrop-blur-lg xl:w-[25vw] w-[100vw] xl:h-[70vh] bg-[#f8f8f893]   h-[100vh]  border-solid border-2 border-[#0000003d]    box-border overflow-hidden">
             <h2 className="text-center text-[rgba(0,0,0,0.664)] font-normal text-[1.3vmax] font-Roboto p-[1.3vmax] border-b border-solid border-[rgba(0,0,0,0.205)] w-[50%] m-auto ">Update Profile</h2>
         <form
                     className={`flex flex-col items-center m-auto   p-[2vmax] justify-evenly h-[70%]  transition-all duration-500  
                  
                     `}
                     action=""
                     encType="multipart/form-data"
                 
                     onSubmit={updateprofileSumbit}
                   >
                     <div className="flex w-full  items-center  ">
                       <FaceIcon className="absolute  translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                       <input
                         className="xl:py-[1vmax] py-[2.5vmax] px-[5vmax] xl:px-[4vmax] pr-[1vamx] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light xl:text-[0.9vmax] text-[1.7vmax]  font-cursive  outline-none"
                         type="text"
                         placeholder="name"
                         name="name"
                         required
                         value={name}
                         onChange={(e)=>setName(e.target.value)}
                       />
                     </div>
                     <div className="flex w-full  items-center  ">
                       <MailOutlineIcon className="absolute  translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                       <input
                         className="xl:py-[1vmax] py-[2.5vmax] px-[5vmax] xl:px-[4vmax] pr-[1vamx] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light xl:text-[0.9vmax] text-[1.7vmax]  font-cursive  outline-none"
                         type="email"
                         placeholder="Email"
                         name="email"
                         required
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                       />
                     </div>
                     <div className="flex flex-row  items-center  w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light text-[0.9vmax] font-cursive  justify-between   pl-2   ">
                       <img
                         className="xl:w-[3vmax] xl:h-[3vmax]   w-[6vmax] h-[6vmax]  rounded-full mr-1  "
                         src={avatarPreview}
                         alt="Avatar Preview"
                       />
                       <input
                         className="block w-full xl:text-[0.9vmax] text-[2vmax] text-slate-500
                       file:mr-4 file:py-2 file:px-4 file:cursor-pointer
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-violet-50 file:text-violet-700
                       hover:file:bg-violet-100 "
                         type="file"
                         name="avatar"
                         accept={`image/*`}
                        
                  
                         onChange={updateProfileDataChange}
                       />
                     </div>
     
                     <button
                       className=" border-none text-center hover:bg-[rgb(179,66,46)] cursor-pointer transition-all duration-500  bg-[tomato] text-white font-[300] font-Roboto xl:text-[0.9vmax] text-[2.5vmax] w-full p-[0.8vmax] rounded-sm outline-none shadow-[rgba(0,0,0,0.219)] shadow-md"
                       type="submit"
                       disabled={loading ? true : false}
                     >
                       Update 
                     </button>
                   </form>
             </div>
             </div> 
             </Fragment>
    )}
  </Fragment>
};

export default UpdateProfile;
