import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import {
  ProductDetailsReducer,
  
  ProductReviewsReducer,
  
  ProductsReducer,
  newProductReducer,
  newReviewReducer,
  productReducer,
  reviewsReducer,
} from "../reducers/ProductReducer.js";
import { allUsersReducer, forgotPasswordreducer, profileReducer, userReducer, userdetailsReducer } from "../reducers/userReducer.js";
import { cartReducer } from "../reducers/cardReducer.js";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsreducer, ordersReducer } from "../reducers/orederreducer.js";

const reducer = combineReducers({
  products: ProductsReducer,
  productDetails: ProductDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword:forgotPasswordreducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrder:myOrdersReducer,
  orderDetails: orderDetailsreducer,
  newReview:newReviewReducer,
  newProduct: newProductReducer,
  product:productReducer,
  allOrder:allOrdersReducer,
  order:ordersReducer,
  allUsers:allUsersReducer,
  userDetails:userdetailsReducer,
  productReviews:ProductReviewsReducer,
  deleteReview:reviewsReducer

});

let initailState = {
  cart:{
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem("cartItems"))
    :[],
    shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem("shippingInfo")):{}
  }
};
 

const middleware = [thunk];

const store = createStore(
  reducer,
  initailState,
  applyMiddleware(...middleware)
);


export default store;
