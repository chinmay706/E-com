import express from "express";
const router = express.Router();
import { isAuthenicatedUser, authorizeRoles } from "../middleware/auth.js";
 
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controlleres/orderController.js";


router.post("/order/new",isAuthenicatedUser,newOrder)
router.get("/order/:id",isAuthenicatedUser, getSingleOrder)
router.get("/orders/me",isAuthenicatedUser,myOrders)
router.get("/admin/orders",isAuthenicatedUser,authorizeRoles("admin"),getAllOrders)
router.put("/admin/order/:id",isAuthenicatedUser,authorizeRoles("admin"),updateOrder)
router.delete("/admin/order/:id",isAuthenicatedUser,authorizeRoles("admin"),deleteOrder)


export default router
