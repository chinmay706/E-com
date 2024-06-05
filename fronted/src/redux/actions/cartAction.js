import { ADD_TO_CART,REMOVE_TO_CART, SAVE_SHIPPING_INFO } from "../constants/cartContant";
import axios from "axios";
// ADD TO CART
 
const backedurl = "https://mern-stack-ecommerce-bh7z.onrender.com"
export const addItemsToCart = (id,quantity) => async (dispatch,getState)=>{
    
     
 
        const {data} = await axios.get(`${backedurl}/api/v1/product/${id}`,  {withCredentials: true})
        
        dispatch({
            type:ADD_TO_CART,
            payload:{
                product:data.Product._id,
                name:data.Product.name,
                price:data.Product.price,
                image:data.Product.images[0].url,
                stock:data.Product.Stock,
                description:data.Product.description,
                quantity
             
            },
        });
       
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
        
    
}

// REMOVE FROM CART ==>
 
  export   const removeitemsfromcart = (id) => async(dispatch,getState)=>{


    dispatch({
        type:REMOVE_TO_CART,
        payload:id
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

  } 


  // SAVE SHIPPING INFO ==>

export const  saveShippingInfo = (data) => async(dispatch)=>{
  dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data,
  });
  localStorage.setItem("shippingInfo",JSON.stringify(data))
}