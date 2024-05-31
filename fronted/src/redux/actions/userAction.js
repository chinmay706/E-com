import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOAD_REGISTER_FAIL,
  LOAD_REGISTER_SUCCESS,
  LOAD_REGISTER_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_SUCCESS,
} from "../constants/userContant.js";

import axios from "axios";
const backedurl = "https://mern-stack-ecommerce-bh7z.onrender.com"
// const backedurl = "http://localhost:4000"

// LOGIN ACTION ==>
export const login = (email, password) => async (dispatch) => {
   

  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };

    const { data } = await axios.post(
      `${backedurl}/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unknown error occurred",
      });
    }
  }
};

// REGISTER ACTION==>
export const regsiter = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { header: { "Content-Type": "multipart/form-data" }, withCredentials: true, };

    const { data } = await axios.post(`${backedurl}/api/v1/register` , userData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Load User ==>

export const loaduser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REGISTER_REQUEST });

    const { data } = await axios.get(`${backedurl}/api/v1/me`);

    dispatch({ type: LOAD_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: LOAD_REGISTER_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    } else {
      dispatch({
        type: LOAD_REGISTER_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unknown error occurred",
      });
    }
  }
};

// Log out user  ==>

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${backedurl}/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unknown error occurred",
      });
    }
  }
};
// get All users (Admin)  ==>

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const config = {   withCredentials: true, };
    const { data } = await axios.get(`${backedurl}/api/v1/admin/users`,config);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: ALL_USERS_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    }
  }
};
// get   users (Admin)  ==>

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const config = {   withCredentials: true, };
    const { data } = await axios.get(`${backedurl}/api/v1/admin/user/${id}`,config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    }
  }
};

// UPADATE  USER (Admin)  ==>

export const updateuser = (id, userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };
    const { data } = await axios.put(`${backedurl}/api/v1/admin/user/${id}`,userdata,config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    }
  }
};
// delete  USER (Admin)  ==>

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(`${backedurl}/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    }
  }
};

// updateProfile ACTION==>
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { header: { "Content-Type": "multipart/form-data" } , withCredentials: true,};

    const { data } = await axios.put(`${backedurl}/api/v1/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};
// updatepassword ACTION==>

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };

     

    const { data } = await axios.put(
      `${backedurl}/api/v1/password/update`,
      password,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Forgot Password ==>

export const forgotPassword = (email) => async (dispatch) => {
  console.log(email);

  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };

    const { data } = await axios.post(`${backedurl}/api/v1/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    } else {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unknown error occurred",
      });
    }
  }
};
// reset Password ==>

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true, };

    const { data } = await axios.put(
      `${backedurl}/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unauthorized: Invalid email or password",
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response
          ? error.response.data.error
          : "Unknown error occurred",
      });
    }
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
