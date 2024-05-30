import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login ,regsiter} from "../../redux/actions/userAction.js";
import { useAlert } from "react-alert";
import Loading from "../layout/Loader/Loading.js";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const location = useLocation();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("login");
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
 
  const alert = useAlert();

  const { name, email, password } = User;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const togglePasswordVisibility = (event) => {
    event.stopPropagation();
    setShowPassword(!showPassword);
  };
  const registerSumbit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    if (avatar) {
      myForm.append("avatar", avatar);
    }

    dispatch(regsiter(myForm))
 
  };
  // console.log(User)

  const registerDataChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the name attribute exists and is not empty
    if (name && name !== "") {
      if (name === "avatar") {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value
        }));
      }
    }
  };
  

  const SwitchTabs = (e, Tab) => {
    setTab(Tab);
  };
  const loginSumbit = (e) => {
    e.preventDefault();
     
    dispatch(login(loginEmail, loginPassword));
  };



  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
   
 const redirect=location.search? location.search.split("=")[1] : "/profile"
 
  
   
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors()); 
    }
    if(isAuthenticated ){
      navigate(redirect)
    }
  }, [dispatch, alert ,redirect,isAuthenticated,navigate,error]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment >
          <div   className="w-[100vw] md:h-[80%] h-[100vh] max-w-full bg-[#f8f8f893]   flex justify-center items-center backdrop-blur-lg   md:m-[5vmax] m-0  fixed top-0 left-0 md:static ">
            <div className=" backdrop-blur-lg xl:w-[25vw] w-[100vw] xl:h-[70vh]  h-[100vh]  border-solid border-2 border-[#00000073] rounded-md  box-border overflow-hidden">
              <div>
                <div className="flex xl:h-[3vmax] h-[5vmax]">
                  <p
                    className="text-[rgba(0,0,0,0.678)]  w-[100%] xl:text-[1vmax] text-[2vmax] font-light cursor-pointer grid  place-items-center hover:text-[tomato]"
                    onClick={(e) => SwitchTabs(e, "login")}
                  >
                    LOGIN
                  </p>
                  <p
                    className={`text-[rgba(0,0,0,0.678)]  w-[100%] xl:text-[1vmax] text-[2vmax] font-light cursor-pointer grid  place-items-center hover:text-[tomato] `}
                    onClick={(e) => SwitchTabs(e, "register")}
                  >
                    REGISTER
                  </p>
                </div>
                <button
                  className={`bg-[tomato] h-[3px] w-[50%]   border-none transition-all duration-500 ${
                    tab === "register" && "translate-x-[100%]"
                  } `}
                  ref={switcherTab}
                ></button>
              </div>
              <form
                className={`flex flex-col  py-[7vmax] xl:py-0 items-center xl:m-auto xl:p-[2vmax] p-[5vmax] justify-evenly h-[70%]   px-[5vmax] transition-all duration-500  ${
                  tab === "register" && "translate-x-[100%] scale-0"
                } `}
                action=""
                ref={loginTab}
                onSubmit={loginSumbit}
              >
                <div className="flex w-full  items-center  ">
                  <MailOutlineIcon className="absolute text-[2.8vmax] translate-x-[1vmax] xl:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="xl:py-[1vmax] py-[2.5vmax] px-[5vmax] xl:px-[4vmax] pr-[1vamx] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light xl:text-[0.9vmax] text-[1.7vmax]  font-cursive  outline-none"
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="flex w-full  items-center  ">
                  <LockOpenIcon className="absolute text-[2.8vmax] translate-x-[1vmax] xl:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="xl:py-[1vmax] py-[2.5vmax] px-[5vmax] xl:px-[4vmax] pr-[1vamx] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light xl:text-[0.9vmax] text-[1.7vmax]  font-cursive  outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  {!showPassword ? (
                    <LiaEyeSlashSolid
                      onClick={togglePasswordVisibility}
                      className="absolute m-[4px]  cursor-pointer xl:right-[4vmax] right-[7vmax]   translate-x-[1vmax] xl:text-[1.6vmax] text-[3vmax] text-[rgba(0,0,0,0.623)]"
                    />
                  ) : (
                    <LiaEyeSolid
                      onClick={togglePasswordVisibility}
                      className="absolute m-[4px]    translate-x-[1vmax]  cursor-pointer xl:right-[4vmax] right-[7vmax] text-[rgba(0,0,0,0.623)]"
                    />
                  )}
                </div>
                <Link
                  to="/password/forgot"
                  className="text-[rgba(0,0,0,0.651)] no-underline  self-end font-medium font-[Gill] xl:text-[0.8vmax] text-[2.8vmax]  hover:text-black"
                >
                  Forgot Password ?
                </Link>
                <button
                  className=" border-none text-center hover:bg-[rgb(179,66,46)] cursor-pointer transition-all duration-500  bg-[tomato] text-white font-[300] font-Roboto xl:text-[0.9vmax] text-[2.5vmax] w-full p-[0.8vmax] rounded-sm outline-none shadow-[rgba(0,0,0,0.219)] shadow-md"
                  type="sumbit"
                >
                  Login
                </button>
              </form>
              <form
                className={`flex flex-col items-center m-auto   p-[2vmax] justify-evenly h-[70%]  transition-all duration-500  ${
                  tab === "register" && "translate-x-[0%] -translate-y-[100%]  "
                } ${
                  tab === "login" &&
                  "-translate-x-[100%] -translate-y-[100%] scale-0 "
                }`}
                action=""
                encType="multipart/form-data"
                ref={registerTab}
                onSubmit={registerSumbit}
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
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
                  />
                </div>
                <div className="flex w-full  items-center  ">
                  <LockOpenIcon className="absolute  translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                  <input
                    className="xl:py-[1vmax] py-[2.5vmax] px-[5vmax] xl:px-[4vmax] pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light xl:text-[0.9vmax] text-[1.7vmax]  font-cursive  outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="flex flex-row  items-center  w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm  font-light text-[0.9vmax] font-cursive  justify-between   pl-2   ">
                  <img
                    className="xl:w-[3vmax] xl:h-[3vmax] w-[6vmax] h-[6vmax] rounded-full mr-1  "
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
                    accept="image/"
                    onChange={registerDataChange}
                  />
                </div>

                <button
                  className=" border-none text-center hover:bg-[rgb(179,66,46)] cursor-pointer transition-all duration-500  bg-[tomato] text-white font-[300] font-Roboto xl:text-[0.9vmax] text-[2.5vmax] w-full p-[0.8vmax] rounded-sm outline-none shadow-[rgba(0,0,0,0.219)] shadow-md"
                  type="sumbit"
                  disabled={loading ? true : false}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
