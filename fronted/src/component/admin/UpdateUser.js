import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import MailOutline from "@material-ui/icons/MailOutline";
import Person from "@material-ui/icons/Person";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../redux/constants/userContant";
import {
  getUserDetails,
  updateuser,
  clearErrors,
} from "../../redux/actions/userAction";
import Loading from "../layout/Loader/Loading";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const {
    loading: udpateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("role", role);
    myForm.set("email", email);

    dispatch(updateuser(id, myForm));
  };

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("user updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, navigate, updateError, error, isUpdated, id, user]);

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="da w-[100vw]  max-w-full grid md:grid-cols-[1fr,5fr]  grid-cols-[1fr] absolute">
        <Sidebar />
        <div className="flex box-border items-center justify-center   md:bg-[rgba(221,221,221)] bg-white  border-l border-solid border-[rgba(0,0,0,0.158)] flex-col h-[100vh]  ">
          {loading ? (
            <Loading />
          ) : (
            <form
              className="newProductContainer md:w-[30vw] w-full  md:pb-[9vmax] p-[5vmax]   flex flex-col items-center m-auto md:p-[3vmax]   md:h-[100%]  bg-white  md:drop-shadow-xl shadow-slate-800    "
              onSubmit={updateUserSubmitHandler}
              encType="multipart/form-data"
            >
              <h1 className=" text-[rgba(0,0,0,0.733)] font-light font-Roboto text-[2rem]  text-center">
                update User
              </h1>
              <div className="flex w-full items-center">
                <Person className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                <input
                  className="md:py-[1vmax] md:myu-1 my-2 py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                  type="text"
                  placeholder="USer Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex w-full items-center">
                <MailOutline className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                <input
                  className="md:py-[1vmax]  md:my-1 my-2  py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex w-full items-center">
                <MdVerifiedUser className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                <select
                  className="md:py-[1vmax] md:my-1 my-2  py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="">Choose Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                className="border-none md:my-1 my-2  hover:bg[rgb(179,66,46)] bg-[tomato] text-white font-light font-Roboto text-[1.9vmax] p-[1.8vmax] md:text-[1vmax] w-full md:p-[0.8vmax] transition-all duration-500 no-underline  shadow-sm"
                type="submit"
                disabled={
                  udpateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
