
import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
 

const Corformorder = () => {
  const navigate = useNavigate()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subtotal = cartItems.reduce((acc,item)=>acc + item.quantity * item.price,0)
  const shippingCharges = subtotal> 1000 ? 0 : 200 ;
  const tax = subtotal * 0.18 ;
  const totalPrice = subtotal + tax + shippingCharges ;
const adress = `${shippingInfo.adress } , ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}, `
const proceedToPayment = (e)=>{
  const data = {
    subtotal,
    shippingCharges,
    tax,
    totalPrice,

  };
  sessionStorage.setItem("orderInfo",JSON.stringify(data))
  navigate("/process/payment")
  
}
 
 

  return (
    <Fragment >
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="h-[100vh]">
      <div className="  h-full   bg-white grid md:grid-cols-[6fr,3fr] grid-flow-row  "  >
        <div >
          <div className=" checkbox  p-[5vmax] pb-0   ">
            <Typography    >
              <h1 className ="font-Roboto  font-normal md:text-[1.8vmax] text-[6vw]">

              Shipping Info 
              </h1>
            </Typography>
            <div className="box m-[2vmax] ">
              <div className="flex">
                <p className=" font-Roboto  font-normal md:text-[1vmax] text-[4vw] text-black" >Name:</p>
                <span className="text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ">{user.name}</span>
              </div>
              <div className="flex">
                <p className=" font-Roboto  font-normal md:text-[1vmax] text-[4vw] text-black"  >Phone:</p>
                <span className="text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ">{shippingInfo.phoneNo}</span>
              </div>
              {/* <div className="flex">
                <p className=" font-Roboto  font-normal md:text-[1vmax] text-[4vw] text-black" >Name:</p>
                <span className="text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ">{}</span>
              </div> */}
              <div className="flex">
                <p className=" font-Roboto  font-normal md:text-[1vmax] text-[4vw] text-black" >Adress:</p>
                <span className="text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ">{adress}</span>
              </div>
            </div>
          </div>
          <div className="checkbox p-[5vmax] pt-[2vmax]">
            <Typography  > 
              <h1 className=" font-normal md:text-[1.8vmax] text-[6vw]  font-Roboto ">Your Cart Items:</h1>
              </Typography>
            <div className=" m-[2vmax] md:max-h-[20vmax] max-h-[50vw] overflow-y-auto ">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="flex font-normal font-Roboto md:text-[1vmax] text-[4vw] my-[4vw]  justify-between items-center md:my-[2vmax] mx-0" >
                     
                    <img src={item.image} alt="Product" className="md:w-[3vmax] w-[10vmax]" />
                    <Link className="md:w-[60%] w-[30%] m-0  md:my-0 md:mx-[2vmax] text-[#575757]  no-underline" to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span className="font-Roboto font-thin md:text-[1vmax] text-[4vw] text-[#5e5e5e]">
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className=" md:border-l border-t   md:border-t-0  border-solid border-[rgba(0,0,0,0.247)]">
          <div className="checkbox md:p-[7vmax] p-[12vw]">
            <Typography
                ><h1 className=" text-center font-normal font-Roboto md:text-[1.8vmax] text-[6vw] border-b border-solid border-[rgba(0,0,0,0.267)] p-[4vw] md:p-[1vmax] w-full m-auto box-border ">Order Summery </h1>
            </Typography>

            <div > 
              <div  className=" flex my-[2vmax] mx-0  justify-between font-light font-Roboto md:text-[1vmax] text-[4vw]">
                <p>Subtotal:</p>
                <span className="text-[rgba(0,0,0,0.692)]">₹{subtotal}</span>
              </div>
              <div className=" flex my-[2vmax] mx-0  justify-between font-light font-Roboto md:text-[1vmax] text-[4vw]">
                <p>Shipping Charges:</p>
                <span className="text-[rgba(0,0,0,0.692)]">₹{shippingCharges}</span>
              </div>
              <div className=" flex my-[2vmax] mx-0  justify-between font-light font-Roboto md:text-[1vmax] text-[4vw]">
                <p>GST:</p>
                <span className="text-[rgba(0,0,0,0.692)]">₹{tax}</span>
              </div>
            </div>

            <div className="flex font-light font-Roboto md:text-[1vmax] py-[5vw] px-0 justify-between border-t border-solid border-[rgba(0,0,0,0.363)] md:py-[2vmax]   ">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button className="bg-[tomato] text-white w-full md:p-[1vmax] p-[4vw] my-[4vw] mx-auto text-[4vw]  border-none m-auto cursor-pointer transition-all duration-500 font-normal font-Roboto md:text-[1vmax] hover:bg-[rgb(192,71,50)]" onClick={proceedToPayment}>Process To Payment</button>
          </div>
        </div>
      </div>
      </div>
     
    </Fragment>
  );
};

export default Corformorder;























// import React, { Fragment } from "react";
// import CheckoutSteps from "./CheckoutSteps";
// import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
// import { Link } from "react-router-dom";
// import { Typography } from "@material-ui/core";
// import axios from "axios";
// import { useAlert } from "react-alert";
// import { useElements, useStripe } from "@stripe/react-stripe-js";

// const ConfirmOrder = () => {
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const stripe = useStripe();
//   const elements = useElements();
//   const alert = useAlert();

//   const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
//   const shippingCharges = subtotal > 1000 ? 0 : 200;
//   const tax = subtotal * 0.18;
//   const totalPrice = subtotal + tax + shippingCharges;

//   const adress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

//   const totalQuantity = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const data = {
//       subtotal,
//       shippingCharges,
//       tax,
//       totalPrice,
//     };
//     sessionStorage.setItem("orderInfo", JSON.stringify(data));
//     const paymentData = {
//       amount: Math.round(data.totalPrice * 100),
//       image: cartItems[0].image,
//       name: cartItems[0].name,
//       description: cartItems[0].description || "not available",
//       quantity: totalQuantity,
//     };
//     try {
//       const { data } = await axios.post("/api/v1/payment/process", paymentData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (data.session.url) {
//         window.location.href = data.session.url;
//       }
      
//     } catch (error) {
//       console.log(error);
//       alert.error(error.response.data.error);
//     }
//   };

//   return (
//     <Fragment>
//       <MetaData title="Confirm Order" />
//       <CheckoutSteps activeStep={1} />
//       <div className="h-full bg-white grid md:grid-cols-2 grid-flow-row">
//         <div>
//           <div className="checkbox p-5">
//             <Typography>
//               <h1 className="font-normal text-6vw">Shipping Info</h1>
//             </Typography>
//             <div className="box m-2">
//               <div className="flex">
//                 <p className="font-normal text-4vw">Name:</p>
//                 <span className="text-[#575757] mx-1 my-0 font-thin text-4vw">{user.name}</span>
//               </div>
//               <div className="flex">
//                 <p className="font-normal text-4vw">Phone:</p>
//                 <span className="text-[#575757] mx-1 my-0 font-thin text-4vw">{shippingInfo.phoneNo}</span>
//               </div>
//               <div className="flex">
//                 <p className="font-normal text-4vw">Address:</p>
//                 <span className="text-[#575757] mx-1 my-0 font-thin text-4vw">{adress}</span>
//               </div>
//             </div>
//           </div>
//           <div className="checkbox p-5 pt-2">
//             <Typography>
//               <h1 className="font-normal text-6vw">Your Cart Items:</h1>
//             </Typography>
//             <div className="m-2 max-h-[20vmax] overflow-y-auto">
//               {cartItems &&
//                 cartItems.map((item) => (
//                   <div key={item.product} className="flex font-normal text-4vw my-4vw justify-between items-center mx-0">
//                     <img src={item.image} alt="Product" className="w-[10vmax]" />
//                     <Link className="w-[30%] m-0 mx-[2vmax] text-[#575757] no-underline" to={`/product/${item.product}`}>
//                       {item.name}
//                     </Link>
//                     <span className="font-thin text-4vw text-[#5e5e5e]">{item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b></span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//         <div className="md:border-l border-t md:border-t-0 border-solid border-[rgba(0,0,0,0.247)]">
//           <div className="checkbox md:p-7vmax p-12vw">
//             <Typography>
//               <h1 className="text-center font-normal text-6vw border-b border-solid border-[rgba(0,0,0,0.267)] p-4vw md:p-1vmax w-full m-auto box-border">Order Summary</h1>
//             </Typography>
//             <div>
//               <div className="flex my-2vmax mx-0 justify-between font-light">
//                 <p>Subtotal:</p>
//                 <span>₹{subtotal}</span>
//               </div>
//               <div className="flex my-2vmax mx-0 justify-between font-light">
//                 <p>Shipping Charges:</p>
//                 <span>₹{shippingCharges}</span>
//               </div>
//               <div className="flex my-2vmax mx-0 justify-between font-light">
//                 <p>GST:</p>
//                 <span>₹{tax}</span>
//               </div>
//             </div>
//             <div className="flex font-light py-5vw px-0 justify-between border-t border-solid border-[rgba(0,0,0,0.363)] md:py-2vmax">
//               <p><b>Total:</b></p>
//               <span>₹{totalPrice}</span>
//             </div>
//             <button className="bg-[tomato] text-white w-full md:p-1vmax p-4vw my-4vw mx-auto text-4vw border-none cursor-pointer transition-all duration-500 font-normal hover:bg-[rgb(192,71,50)]" onClick={submitHandler}>Process To Payment</button>
//          </div>
//         </div>
//      </div>
        
     
//     </Fragment>
//   );
// };

 
// export default ConfirmOrder;

