import Stripe from "stripe";
import catchErrors from "../middleware/catchAsyncError.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY );

export const   paymentController = catchErrors(async (req, res, next) => {
  const { amount, currency, description, name, address } = req.body;

  // Validate that non-INR transactions have addresses outside India
  if (currency !== 'inr' && address.country === 'IN') {
    return res.status(401).json({
      success: false,
      message: "Non-INR transactions require a shipping/billing address outside of India. For more information, please refer to https://stripe.com/docs/india-exports.",
    });
  }

  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    description: description,
    shipping: {
      name: name,
      address: address,
    },
    metadata: {
      company: "Ecommerce",
    }, 
  }); 

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});



export const sendStripeKey = catchErrors(async (req, res, next) => {
  res.status(200).json({
    stripteApikey: process.env.STRIPE_API_KEY,
  });
});





// export const paymentController = catchErrors(async (req, res, next) => {
//   const { amount, currency, description, name, address } = req.body;
   
  
//   if (currency !== 'inr' && address.country === 'IN') {
//     console.log("jakfd")
//     return res.status(401).json({
//       success: false,
//       message: "Non-INR transactions require a shipping/billing address outside of India. For more information, please refer to https://stripe.com/docs/india-exports.",
//     });
//   }

//   const myPayment = await stripe.paymentIntents.create({
//     amount: amount,
//     currency,
//     description,
//     shipping: {
//       name,
//       address,
//     },
//     metadata: {
//       company: "Ecommerce",
//     },
//   });

//   res.status(200).json({
//     success: true,
//     client_secret: myPayment.client_secret,
//   });
// });

// export const paymentController = catchErrors(async (req, res, next) => {
//    const {email,_id} = req.user
//  const {name,image,description,amount,quantity} = req.body
//  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//  const session = await stripe.checkout.sessions.create({
//    payment_method_types:['card'],
//    mode:'payment',
//    success_url:`${process.env.FRONTED_URL}/order/success`,
//    cancel_url:`${req.protocol}://${req.get('host')}/canceled`,
//    customer_email:email,
//    client_reference_id:_id,
//    line_items:[
//      {
//        price_data:{
//          currency:"inr",
//          unit_amount:amount,
//          product_data:{
//            name:name,
//            description: description,
//            images:image
//          }

//        },
//        quantity:quantity
//      }
//    ]

//  })

//  res.status( 200).json({
//   success:true,
//   message:"Successfully paid",
//   session
//  })
// });

// export const sendStripeKey = catchErrors(async (req, res, next) => {
//   res.status(200).json({
//     stripteApikey: process.env.STRIPE_API_KEY,

//   });
// });
