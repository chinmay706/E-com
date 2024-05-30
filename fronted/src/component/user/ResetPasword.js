import React, { Fragment, useEffect, useState } from "react";
import {   useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  resetPassword
  
} from "../../redux/actions/userAction.js";
import { useAlert } from "react-alert";
import Loading from "../layout/Loader/Loading.js";
import MetaData from "../layout/MetaData.js";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const ResetPassword = () => {
    const params = useParams()

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { success, loading, error } = useSelector((state) => state.forgotPassword);
  const token = params.token;
  console.log(token)

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const resetpasswordSumbit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmpassword", confirmPassword);
    dispatch(resetPassword(token,formData));
  };

   
   
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Reset successfully");
      navigate("/login")
      

       
    }
  }, [dispatch, alert, navigate, success, error]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Reset Password " />
          <div className="w-[100vw] md:h-[80%] h-[100vh] max-w-full   flex justify-center items-center backdrop-blur-lg   md:m-[5vmax] m-0  fixed top-0 left-0 md:static ">
            <div className=" backdrop-blur-lg xl:w-[25vw] w-[100vw] xl:h-[70vh] bg-[#f8f8f893]   h-[100vh]  border-solid border-2 border-[#0000003d]    box-border overflow-hidden">
              <h2 className=" flex-nowrap text-center text-[rgba(0,0,0,0.664)] font-normal text-[1.3vmax] font-Roboto p-[1.3vmax] border-b border-solid border-[rgba(0,0,0,0.205)] w-[70%] m-auto ">
                Reset Password
              </h2>
              <form
                className={`flex flex-col items-center m-auto   p-[2vmax] justify-evenly h-[70%]  transition-all duration-500   `}
                onSubmit={resetpasswordSumbit}
              >
                <div className="flex w-full  items-center  ">
                  <VpnKeyIcon className="absolute  translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="xl:py-[1vmax] py-[2.5vmax] px-[5vmax] xl:px-[4vmax] pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light xl:text-[0.9vmax] text-[1.7vmax]  font-cursive  outline-none"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                 
                <div className="flex w-full  items-center  ">
                  <LockIcon className="absolute  translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="xl:py-[1vmax] py-[2.5vmax] px-[5vmax] xl:px-[4vmax] pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light xl:text-[0.9vmax] text-[1.7vmax]  font-cursive  outline-none"
                    type="text"
                    placeholder="Confirm-Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  className=" border-none text-center hover:bg-[rgb(179,66,46)] cursor-pointer transition-all duration-500  bg-[tomato] text-white font-[300] font-Roboto xl:text-[0.9vmax] text-[2.5vmax] w-full p-[0.8vmax] rounded-sm outline-none shadow-[rgba(0,0,0,0.219)] shadow-md"
                  type="submit"
                  value="update"
                  disabled={loading ? true : false}
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
