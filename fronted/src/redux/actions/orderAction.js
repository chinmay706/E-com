import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_FAIL, 
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_SUCCESS,
  MY_ORDERS_SUCCESS,
} from "../constants/orderConstant";


import axios from "axios";
 
const backedurl = "https://mern-stack-ecommerce-bh7z.onrender.com"
export const createOrder = (order) => async (dispatch ) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      }, withCredentials: true,
    };
    const { data } = await axios.post(`${backedurl}/api/v1/order/new`, order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  } 
};

// MY ORDERS ==>
export const Myorders = ( ) => async (dispatch ) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
     
    const { data } = await axios.get(`${backedurl}/api/v1/orders/me`);
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.error,
    });
  } 
};
// get All  ORDERS (admin)==>
export const getAllorders = ( ) => async (dispatch ) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
     
    const { data } = await axios.get(`${backedurl}/api/v1/admin/orders`);
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.error,
    });
  } 
};
// ORDER DETAILS ==>
export const getorderDetails = ( id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
     
    const { data } = await axios.get(`${backedurl}/api/v1/order/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
     
    
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  } 
};
// update order
export const updateOrder = (id,order) => async (dispatch ) => {
  try {
    dispatch({ type: UPDATE_ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      }, withCredentials: true,
    };
    const { data } = await axios.put(`${backedurl}/api/v1/admin/order/${id}`, order, config);
    
    dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDERS_FAIL,
      payload: error.response.data.error,
    });
  } 
};
// delete order
export const deleteOrder = (id) => async (dispatch ) => {
  try {
    dispatch({ type: DELETE_ORDERS_REQUEST });
    
    const { data } = await axios.delete(`${backedurl}/api/v1/admin/order/${id}`  );
    dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDERS_FAIL,
      payload: error.response.data.error,
    });
  } 
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  
