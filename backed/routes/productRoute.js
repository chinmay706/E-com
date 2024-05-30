import express from "express";
import {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAdminProducts,
} from "../controlleres/productController.js";
import { isAuthenicatedUser, authorizeRoles } from "../middleware/auth.js";
import { createProductReview, deleteReview, getProductReviews } from "../controlleres/productController.js";
 

const router = express.Router();

router.get(
  "/products",
  getAllProduct
);
router.get(
  "/admin/products",
  isAuthenicatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);
router.post(
  "/admin/product/new",
  isAuthenicatedUser,
  authorizeRoles("admin"),
  createProduct
);
 
router.put("/admin/product/:id", updateProduct);
router.delete("/admin/product/:id", deleteProduct);
router.get("/product/:id", getProductDetails);
router.put("/review",isAuthenicatedUser,createProductReview)
router.get("/reviews",getProductReviews)
router.delete("/reviews",isAuthenicatedUser,deleteReview)



export default router;
