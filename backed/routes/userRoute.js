import express from "express";
import {registerUser,loginUser, logout,forgotPassowrd, resetPassword, getuserDetails, updatePassword, updateProfile, getAllusers, getsingleuser, updateUserRole, deleteUSer} from "../controlleres/userController.js"
import { authorizeRoles, isAuthenicatedUser } from "../middleware/auth.js";
 
const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/password/forgot",forgotPassowrd)
router.put("/password/reset/:token",resetPassword)
router.get("/logout",logout)
router.get("/me",isAuthenicatedUser,getuserDetails)
router.put("/me/update",isAuthenicatedUser,updateProfile)
router.put("/password/update",isAuthenicatedUser,updatePassword)
router.get("/admin/users",isAuthenicatedUser,authorizeRoles("admin"),getAllusers);
router.get("/admin/user/:id",isAuthenicatedUser,authorizeRoles("admin"),getsingleuser)
router.put("/admin/user/:id",isAuthenicatedUser,authorizeRoles("admin"),updateUserRole)
router.delete("/admin/user/:id",isAuthenicatedUser,authorizeRoles("admin"),deleteUSer)


export default router