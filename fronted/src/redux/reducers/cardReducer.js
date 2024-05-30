import { ADD_TO_CART,REMOVE_TO_CART, SAVE_SHIPPING_INFO } from "../constants/cartContant";


export const cartReducer = (state = {cartItems:[ ],shippingInfo:{}},action)=>{
 

    switch (action.type) {
        case ADD_TO_CART:
          const item = action.payload;
          const  isItemExist = state.cartItems.find(
            (i)=> i.product === item.product
          );
          // console.log(isItemExist)
          if(isItemExist){
            return {
                ...state,
                cartItems:state.cartItems.map((i)=>
                i.product === isItemExist.product ? item : i
                ),
            }

          }else{
             
            return{
                ...state,
                cartItems: [...state.cartItems,item],
            }

          }
          case REMOVE_TO_CART:
            return {
              ...state,
              cartItems : state.cartItems.filter((item)=>( item.product !== action.payload )),
              
            }
          case SAVE_SHIPPING_INFO:
            return {
              ...state,
              shippingInfo:action.payload
            }
        default:
           return state;
    }
}