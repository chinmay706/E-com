import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData.js";
import Loading from "../layout/Loader/Loading.js";
import image from "../../images/Profile.png";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    
  }, [isAuthenticated, navigate,user]);
  
  

  return (
    <Fragment>
      <MetaData title={`${  user.name}'s Profile`} />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-[100vw] h-[60vh] md:h-[100vh]  flex-col md:flex-row   bg-white">
          <div className="flex w-[100vw] md:w-[50%] -my-[10vmax] md:my-0    h-[70vh] md:h-[100vh] max-w-full flex-col justify-center items-center ">
            <h1 className="text-[rgba(0,0,0,0.555)] font-medium text-[2.2vmax] font-Roboto translate-x-[-10vmax] translate-y-[-2vmax]">
              My Profile
            </h1>
            <img
              className="w-[20vmax] rounded-full transition-all h-[20vmax] duration-500 hover:scale-105"
              src={  user.avatar ? user.avatar.url : image}
              alt={  user.name}
            />
            <Link
              className=" border-none bg-[tomato] font-normal md:text-[1vmax] text-[1.7vmax] p-[1vmax] font-Roboto text-white  no-underline md:p-[0.5vmax] w-[30%] m-[4vmax] text-center transition-all duration-500 hover:bg-[#a84e4e] "
              to="/me/update"
            >
              Edit Profile
            </Link>
          </div>
          <div className="flex flex-col justify-center md:justify-evenly   h-[5vmax] md:h-[70vh] text-center  md:text-start  items-center md:items-start  mb-0 md:my-auto    box-border ">
            <div>
              <h4 className="text-black font-normal md:text-[1.2vmax] text-[2.5vmax] font-Roboto ">
                Full Name
              </h4>
              <p className="text-[rgba(0,0,0,0.418)] font-normal md:text-[1vmax] text-[2vmax] font-cursive m-[0.2vmax]">
                {  user.name}
              </p>
            </div>
            <div>
              <h4 className="text-black font-normal md:text-[1.2vmax] text-[2.5vmax] font-Roboto ">
                Email
              </h4>
              <p className="text-[rgba(0,0,0,0.418)] font-normal md:text-[1vmax] text-[2vmax] font-cursive m-[0.2vmax]">
                {  user.email}
              </p>
            </div>
            <div>
              <h4 className="text-black font-normal md:text-[1.2vmax] text-[2.5vmax] font-Roboto ">
                Joined on
              </h4>
              <p className="text-[rgba(0,0,0,0.418)] font-normal md:text-[1vmax] text-[2vmax] font-cursive m-[0.2vmax]">
                {  String(user.createdAt).substr(0, 10)}
              </p>
            </div>
            <div className="flex flex-row items-center md:items-start justify-center my-0  pb-0    text-center  ">
              <Link
                className="text-[2vmax] border-none bg-[rgb(68,68,68)] font-normal md:text-[1vmax] font-Roboto hover:bg-[rgb(31,31,31)] text-white no-underline p-0 md:p-[0.5vmax] text-center transition-all my-[1vmax] mx-0 duration-500 mr-[2vmax] md:px-[.8vmax]  px-[2vmax]   "
                to="/orders"
              >
                My Orders
              </Link>
              <Link
                className="text-[2vmax] border-none bg-[rgb(68,68,68)] font-normal md:text-[1vmax] font-Roboto hover:bg-[rgb(31,31,31)] text-white no-underline p-0 md:p-[0.5vmax] text-center transition-all my-[1vmax] mx-0 duration-500 mr-[2vmax] md:px-[.8vmax]  px-[2vmax]   "
                to="/password/update"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
