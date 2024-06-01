import React, { Fragment } from "react";
import CartItemCard from "./CartItemCard.js";
import { useSelector,  useDispatch } from "react-redux";
import { addItemsToCart , removeitemsfromcart} from "../../redux/actions/cartAction.js";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Cart =  () => {
  const { cartItems } =  useSelector((state) => state.cart);

  const alert = useAlert()
  const dispatch = useDispatch()

   

  const increaseQuantity = (id,quantity,stock)=>{
    const newQty = quantity + 1;
    if(stock <= quantity){
      return ;
    }
    dispatch(addItemsToCart(id,newQty))

  }
  const decreaseQuantity = (id,quantity)=>{
    const newQty = quantity - 1;
    if(1>=quantity){
      return ;
    }
    dispatch(addItemsToCart(id,newQty))

  }
  const deleteCartItems = (id)=>{
    dispatch(removeitemsfromcart(id))
  }
  const navigate = useNavigate()

  const checkOutHandler = () => {
   for(let i = 0;i<cartItems.length;i++){
     
    if(cartItems[i].stock<cartItems[i].quantity){
     
      alert.error(`${cartItems[i].name}product stock in not avaible `)
      navigate("/cart");
      return;
     }
   }
    navigate("/login?redirect=shipping");
    localStorage.setItem("itemdata",JSON.stringify(cartItems))
  };
  
  
   
  return (
   <Fragment>
    {cartItems.length===0? (
     <div className="w-[100vw] h-[50vmax] justify-center   flex-col  text-center flex items-center  ">
       <div className=" font-normal text-[2vmax]"><MdRemoveShoppingCart /></div>
       <div className='   block w-[20vmax]     text-[rgba(21,21,21,0.7)]   border-b-2    text-center font-[600] text-[1.4vmax] border-black  px-2   '>No Product in your Cart</div>
       <Link to="/Products" className="font-thin  text-[1.8vmax] md:text-[1vmax] font-Roboto cursor-pointer text-[tomato] hover:text-[#8f473b]">view Products</Link>
     </div>
    ):(
      <Fragment>
      <div className="md:p-[5vmax] cartpage min-h-[60vh]  p-0 ">
        <div className="bg-[tomato] md:w-[90%] box-border text-white grid grid-cols-4    w-full    m-auto  font-light md:text-[0.7vmax] text-[1.7vmax] font-Roboto">
          <p className="m-[10px]">Product</p>
          <div className="m-[10px] grid   text-end col-span-2  ">
            <p className="   ">Quantity</p>
          </div>
          <p className="m-[10px] text-end">Subtotal</p>
        </div>

        {cartItems &&
  cartItems.map((item) => (
    <div
      key={item.product}
      className="cartpage w-[90%] box-border text-black grid grid-cols-4 m-auto font-light font-Roboto"
    >
      <CartItemCard removecartItem={deleteCartItems} item={item} />
      <div className="col-start-3 md:justify-end flex justify-between items-center md:mt-auto m-auto gap-2 mt-[5vmax] md:mr-[-1vmax]">
        <button className="border-none md:text-[1vmax] text-[2vmax] py-[0] px-[.5vmax] md:px-[.5vmax] bg-[rgba(0,0,0,0.616)] hover:bg-[rgba(0,0,0,0.72)] rounded-sm cursor-pointer text-white transition-all duration-500" onClick={()=>(decreaseQuantity(item.product,item.quantity))}>
          -
        </button>
        <input
          type="number"
          className="border-none p-[0] text-[2vmax] w-[1vmax] text-center outline-none font-normal md:text-[0.8vmax] font-Roboto text-[rgba(0,0,0,0.74)]"
          value={item.quantity}
          // value={3}
          // Remove readOnly if you want users to edit quantity
          readOnly
        />
        <button className="border-none md:text-[1vmax] text-[2vmax] py-[0] md:px-[.5vmax] px-[.8vmax] bg-[rgba(0,0,0,0.616)] hover:bg-[rgba(0,0,0,0.72)] rounded-sm cursor-pointer text-white transition-all duration-500" onClick={()=>(increaseQuantity(item.product,item.quantity,item.stock))}>
          +
        </button>
      </div>
      <p className="mt-[6vmax] md:mr-0 md:mt-[3vmax] text-[1.7vmax] col-start-4 md:text-end flex p-[0.5vmax] justify-center text-[rgba(0,0,0,0.753)] font-light md:text-[1vmax] font-cursive box-border m-auto mr-0">{`  ₹${item.price * item.quantity}`}</p>
    </div>
  ))}

        <div className="grid md:grid-cols-2 grid-cols-1   cartGrossProfite">
          <div></div>
          <div className=" border-t-[3px] border-solid cGPb p-[2vmax]  md:py-[2vmax] md:px-0  font-light text-[2vmax]  md:text-[1vmax]   border-[tomato] box-border my-[1vmax] mx-[4vmax] flex  justify-between">
            <p>Gross Total </p>
            <p> {`₹${cartItems.reduce((acc,item)=>(acc +( item.quantity*item.price))
           ,0 )}`}</p>
          </div>
          <div></div>
          <div className="flex  md:justify-end justify-center ">
            <button className="border-none bg-[tomato] hover:bg-[rgba(0,0,0,0.72)] w-full  rounded-3xl cursor-pointer py-[0.8vmax] px-[4vmax] md:w-[50%] my-[1vmax] mx-[4vmax] text-white transition-all duration-500" onClick={checkOutHandler}>
              Check Out
            </button>
          </div>
        </div>
      </div>
    </Fragment>
    )}
   </Fragment>
  );
};

export default Cart;
