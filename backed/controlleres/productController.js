import product from "../moduls/productModel.js";
import { isValidObjectId } from "mongoose";
import { errorHandler } from "../utils/ErrorHandler.js";
import catcherrors from "../middleware/catchAsyncError.js";
import ApiFeaturs from "../utils/apifeaturs.js";
import { v2 as cloudinary } from "cloudinary";

// Create product -- Admin
const createProduct = catcherrors(async (req, res, next) => {
   
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else if (Array.isArray(req.body.images)) {
    images = req.body.images;
  }
   
  let imageslink = [];
  Object.keys(req.body).forEach(key => {
    if (key.startsWith('images[') && key.endsWith('[public_id]')) {
      const index = key.match(/\[(.*?)\]/)[1];
      if (!imageslink[index]) {
        imageslink[index] = {};
      }
      imageslink[index].public_id = req.body[key];
    }
    if (key.startsWith('images[') && key.endsWith('[url]')) {
      const index = key.match(/\[(.*?)\]/)[1];
      if (!imageslink[index]) {
        imageslink[index] = {};
      }
      imageslink[index].url = req.body[key];
    }
  });
  req.body.images = imageslink;
  req.body.user = req.user.id;
  const Product = await product.create(req.body);

  res.status(201).json({
    success: true,
    Product,
  });
});

const getAllProduct = catcherrors(async (req, res, next) => {
  const resultPerpage = 10;
  const productCount = await product.countDocuments();

  const apifeaturs = new ApiFeaturs(product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
  const products = await apifeaturs.query;

  if (!products) {
    res.status(500).json({
      success: false,
      messsage: "products not found",
    });
  }
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerpage,
  });
});
// get admin products
const getAdminProducts = catcherrors(async (req, res, next) => {
  const products = await product.find();
  

  if (!products) {
    res.status(500).json({
      success: false,
      messsage: "products not found",
    });
  }
  res.status(200).json({
    success: true,
    products,
  });
});

const updateProduct = catcherrors(async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
   
 
  let images = [];
  Object.keys(req.body).forEach(key => {
    if (key.startsWith('images[') && key.endsWith('[public_id]')) {
      const index = key.match(/\[(.*?)\]/)[1];
      if (!images[index]) {
        images[index] = {};
      }
      images[index].public_id = req.body[key];
    }
    if (key.startsWith('images[') && key.endsWith('[url]')) {
      const index = key.match(/\[(.*?)\]/)[1];
      if (!images[index]) {
        images[index] = {};
      }
      images[index].url = req.body[key];
    }
  });

  

  let Product = await product.findById(req.params.id);

  if (!Product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  req.body.images = images

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  // Delete old images from Cloudinary if new images are provided
  if (Product.images.length > 0) {
    for (const img of Product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }
  }

   

  // Update the product
  Product = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
 
 

const deleteProduct = catcherrors(async (req, res, next) => {
  const Product = await product.findById(req.params.id);
  if (!isValidObjectId(req.params.id)) {
    return next(new errorHandler(" Invalid product ID", 400));
    
  }
  if (!Product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  // Deleteing images from Cloudinary
  for (let i = 0; i < Product.images.length; i++) {
    await v2.uploader.destroy(Product.images[i].public_id);
  }

  await Product.deleteOne(); // Or Product.deleteMany() if necessary

  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});

const getProductDetails = catcherrors(async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(new errorHandler(" Invalid product ID", 400));
  }

  const Product = await product.findById(req.params.id);

  if (!Product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    Product,
  });
});
// Create New review or update the review

const createProductReview = catcherrors(async (req, res, next) => {
  const { comment, rating, productId } = req.body;
  if (!comment || !rating || !productId ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const Product = await product.findById(productId).catch((err) => {
    console.log(err);
  });
  if (!Product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  // console.log(Product)
  const isReviewed = Product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    Product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
        rev.name = review.name;
      }
    });
  } else {
    Product.reviews.push(review);
    Product.numOfReviews = Product.reviews.length;
  }
  let avg = 0;
  Product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  Product.ratings = avg / Product.reviews.length;

  await Product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

const getProductReviews = catcherrors(async (req, res, next) => {

  if (req.query.id.length>24 || req.query.id.length<24 ) {
    
    return next(new errorHandler("product not founded", 404));
  }
  
 
 
  let Product = await product.findById(req.query.id);
  
  if (!Product) {
    return next(new errorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: Product.reviews,
  });
});

const deleteReview = catcherrors(async (req, res, next) => { 

  const Product = await product.findById(req.query.productId);

  if (!Product) {
    return next(new errorHandler("product not found", 404));
  }

  const reviews = Product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if(reviews.length===0){
    ratings=0;
  }else{
    ratings = avg / reviews.length;
  }
   
  const numOfReviews = reviews.length;

 
  await product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews,
  },{
    new : true,
    runValidators: true ,
    useFindAndModify : false 
  });

  res.status(200).json({
    success: true,
  });
});

export {
  getAllProduct,
  createProduct,
  updateProduct,
  getProductDetails,
  deleteProduct,
  getAdminProducts,
  createProductReview,
  deleteReview,
  getProductReviews
};

 