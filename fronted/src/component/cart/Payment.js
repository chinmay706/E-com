import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EventIcon from "@material-ui/icons/Event";
import { useNavigate } from "react-router-dom";
import { createOrder,clearErrors } from "../../redux/actions/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch()
//  const shippingInfo =  JSON.parse(localStorage.getItem("shippingInfo"))
const {shippingInfo,cartItems} = useSelector((state)=>state.cart)
const {user} =  useSelector((state)=>state.user)
const {error} =  useSelector((state)=>state.newOrder)
 
const paymentData = {
  amount: Math.round(orderInfo.totalPrice * 100),
  currency: "inr", // Adjust as needed
  description: "Purchase of products from Ecommerce website",
  name: user.name,
  email: user.email,
  address: {
    line1: shippingInfo.address,
    city: shippingInfo.city,
    state: shippingInfo.state,
    postal_code: shippingInfo.pincode,
    country: shippingInfo.country,
  },
};
const order = {
  shippingInfo,
  orderItems:cartItems,
  itemsPrice:orderInfo.subtotal,
  taxPrice:orderInfo.tax,
  shippingPrice:orderInfo.shippingCharges,
  totalPrice:orderInfo.totalPrice,

}
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const { data } = await axios.post("https://mern-stack-ecommerce-bh7z.onrender.com/api/v1/payment/process", paymentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const clientSecret = data.client_secret;

      if (!clientSecret) {
        alert.error("Failed to initialize payment. Please try again.");
        payBtn.current.disabled = false;
        return;
      }
      if (!stripe || !elements) {
        return;
      }
  

      // const cardElement = elements.getElement(CardNumberElement);
      const result = await stripe.confirmCardPayment(clientSecret,{
         payment_method:{
          card:elements.getElement(CardNumberElement),
          billing_details:{
            name:user.name,
            email:user.email,
            phone:shippingInfo.phoneNo,
            address:{
              line1:shippingInfo.address,
              city:shippingInfo.city,
              state:shippingInfo.state,
              postal_code:shippingInfo.pincode,
              country:shippingInfo.country,
            }

          }
         }
      })

      

     if(result.error){
      payBtn.current.disabled = false;
      alert.error(result.error.message);

     }
     else {
            if (result.paymentIntent.status === "succeeded") {
              alert.success("Payment successful!");
              order.paymentInfo={
                id:result.paymentIntent.id,
                status:result.paymentIntent.status
              }
              
              dispatch(createOrder(order))
              navigate("/success");
            } else {
              alert.error("There was an issue processing your payment.");
              payBtn.current.disabled = false;
            }
          }
    } catch (error) { 
    
      alert.error(error.message);
      payBtn.current.disabled = false;
    }
  };

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
  },[error,dispatch,alert])

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer grid place-items-center bg-[rgb(255,255,255)] h-[65vh] m-[2vmax]">
        <form className="md:w-[22%] h-full w-[90%]" onSubmit={submitHandler}>
          <Typography>
            <p className="font-normal w-[60%] font-Roboto text-[8vw] py-[4vw] md:text-[2vmax] border-b border-solid border-[rgba(0,0,0,0.13)] text-[rgba(0,0,0,0.753)] md:w-[50%] m-auto text-center md:py-[1vmax] px-0">
              Card Info
            </p>
          </Typography>
          <div className="flex items-center my-[10vw] md:my-[2vmax] mx-0">
            <CreditCardIcon className="absolute translate-x-[1vmax] text-[6vw] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
            <CardNumberElement className="py-[4vw] px-[10vw] md:py-[1vmax] md:px-[4vmax] pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm outline-none" />
          </div>
          <div className="flex items-center my-[10vw] md:my-[2vmax] mx-0">
            <EventIcon className="absolute translate-x-[1vmax] text-[6vw] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
            <CardExpiryElement className="py-[4vw] px-[10vw] md:py-[1vmax] md:px-[4vmax] pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm outline-none" />
          </div>
          <div className="flex items-center my-[10vw] md:my-[2vmax] mx-0">
            <VpnKeyIcon className="absolute translate-x-[1vmax] text-[6vw] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
            <CardCvcElement className="py-[4vw] px-[10vw] md:py-[1vmax] md:px-[4vmax] pr-[1vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm outline-none" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="border-none bg-[tomato] text-white font-light text-[4vw] p-[4vw] md:text-[0.9vmax] font-Roboto w-full md:p-[0.8vmax] cursor-pointer transition-all duration-500 outline-none hover:bg-[rgb(179,66,46)]"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;








// const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
// const payBtn = useRef(null);
// const stripe = useStripe();
// const elements = useElements();
// const alert = useAlert();
// const navigate = useNavigate();
// const shippingInfo =  JSON.parse(localStorage.getItem("shippingInfo"))
// console.log(shippingInfo)
// const { user } = useSelector((state) => state.user);

// const paymentData = {
//   amount: Math.round(orderInfo.totalPrice * 100),
//   description: "Purchase of products from Ecommerce",
//   name: user.name,
//   currency: "inr",
//   address: {
//     line1: shippingInfo.address,
//     line2: shippingInfo.address || "",
//     city: shippingInfo.city,
//     state: shippingInfo.state,
//     postal_code: shippingInfo.pinCode,
//     country: shippingInfo.country,
//   },
// };

// const submitHandler = async (e) => {
//   e.preventDefault();

//   if (!stripe || !elements) {
//     return;
//   }

//   payBtn.current.disabled = true;


//   try {
//     const { data } = await axios.post("/api/v1/payment/process", paymentData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const clientSecret = data.client_secret;

//     if (!clientSecret) {
//       alert.error("Failed to initialize payment. Please try again.");
//       payBtn.current.disabled = false;
//       return;
//     }

//     const cardElement = elements.getElement(CardNumberElement);

//     const { error } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//       billing_details: {
//         name: user.name,
//         email: user.email,
//         address: {
//           line1: shippingInfo.address,
//           line2: shippingInfo.address2 || "",
//           city: shippingInfo.city,
//           state: shippingInfo.state,
//           postal_code: shippingInfo.pinCode,
//           country: shippingInfo.country,
//         },
//       },
//     });

//     if (error) {
//       alert.error(error.message);
//       payBtn.current.disabled = false;
//       return;
//     }

//     const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: user.name,
//           email: user.email,
//           address: {
//             line1: shippingInfo.address,
//             line2: shippingInfo.address2 || "",
//             city: shippingInfo.city,
//             state: shippingInfo.state,
//             postal_code: shippingInfo.pinCode,
//             country: shippingInfo.country,
//           },
//         },
//       },
//     });

//     if (confirmError) {
//       alert.error(confirmError.message);
//       payBtn.current.disabled = false;
//     } else {
//       if (paymentIntent.status === "succeeded") {
//         alert.success("Payment successful!");
//         navigate("/success");
//       } else {
//         alert.error("There was an issue processing your payment.");
//         payBtn.current.disabled = false;
//       }
//     }
//   } catch (error) {
    
//     alert.error(error.response.data.error);
//     payBtn.current.disabled = false;
//   }
// };




// import React, { Fragment, useRef } from "react";
// import CheckoutSteps from "./CheckoutSteps";
// import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
// import { Typography } from "@material-ui/core";
// import { useAlert } from "react-alert";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import CreditCardIcon from "@material-ui/icons/CreditCard";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import EventIcon from "@material-ui/icons/Event";
// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
//   const payBtn = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const alert = useAlert();
//   const elements = useElements();

//   const { cartItems } = useSelector((state) => state.cart);
//   const totalQuantity = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
//   const { user } = useSelector((state) => state.user);

//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//     image: cartItems[0].image,
//     name: cartItems[0].name,
//     description: cartItems[0].description || "not available",
//     quantity: totalQuantity
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     payBtn.current.disabled = true;

//     try {
//       const { data } = await axios.post("/api/v1/payment/process", paymentData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (data.session.url) {
//         window.location.href = data.session.url;
//       }

//       if (!stripe || !elements) return;

//       // Handle payment confirmation
//     } catch (error) {
//       payBtn.current.disabled = false;
//       alert.error(error.response.data.error);
//     }
//   };

//   return (
//     <Fragment>
//       <MetaData title="Payment" />
//       <CheckoutSteps activeStep={2} />
//       <div className="payment-container grid place-items-center bg-white h-65vh m-2vmax">
//         <form className="md:w-22% h-full w-90%" onSubmit={submitHandler}>
//           <Typography>
//             <p className="font-normal w-60% font-Roboto text-8vw py-4vw md:text-2vmax border-b border-solid border-[rgba(0,0,0,0.13)] md:w-50% m-auto text-center md:py-1vmax px-0">
//               Cart Info
//             </p>
//           </Typography>
//           {/* Card Number Element */}
//           <div className="flex items-center my-10vw md:my-2vmax mx-0">
//             <CreditCardIcon className="absolute translate-x-1vmax text-6vw md:text-1.6vmax text-[rgba(0,0,0,0.623)]" />
//             <CardNumberElement className="py-4vw px-10vw md:py-1vmax md:px-4vmax pr-1vmax w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm outline-none" />
//           </div>
//           {/* Card Expiry Element */}
//           <div className="flex items-center my-10vw md:my-2vmax mx-0">
//             <EventIcon className="absolute translate-x-1vmax text-6vw md:text-1.6vmax text-[rgba(0,0,0,0.623)]" />
//             <CardExpiryElement className="py-4vw px-10vw md:py-1vmax md:px-4vmax pr-1vmax w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm outline-none" />
//           </div>
//           {/* Card CVC Element */}
//           <div className="flex items-center my-10vw md:my-2vmax mx-0">
//             <VpnKeyIcon className="absolute translate-x-1vmax text-6vw md:text-1.6vmax text-[rgba(0,0,0,0.623)]" />
//             <CardCvcElement className="py-4vw px-10vw md:py-1vmax md:px-4vmax pr-1vmax w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm outline-none" />
//           </div>
//           {/* Pay Button */}
//           <input
//             type="submit"
//             value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
//             ref={payBtn}
//             className="border-none bg-tomato text-white font-light text-4vw p-4vw md:text-0.9vmax font-Roboto w-full md:p-0.8vmax cursor-pointer transition-all duration-500 outline-none hover:bg-[rgb(179,66,46)]"
//           />
//         </form>
//       </div>
//     </Fragment>
//   );
// };

// export default Payment;
