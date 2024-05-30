import express from "express"
const router = express.Router();
import {isAuthenicatedUser} from "../middleware/auth.js"
import {paymentController, sendStripeKey} from "../controlleres/paymentcontroller.js";


router.post("/payment/process",isAuthenicatedUser,paymentController)
router.get("/stripekey",isAuthenicatedUser,sendStripeKey)

export default router;