import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../redux/actions/productAction.js";
 
import { useParams } from "react-router-dom";
import Loading from "../layout/Loader/Loading.js";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import { addItemsToCart } from "../../redux/actions/cartAction.js";
import {

  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button

} from "@material-ui/core"
import {Rating} from "@material-ui/lab"
import { NEW_REVIEW_RESET } from "../../redux/constants/ProductContants.js";

const ProductDetails = () => {
  const params = useParams()
  const {id}  = params
  const [quantity, setQuantity] = useState(1)
  const [open,setOpen] = useState(false)
  const [rating,setRating] = useState("")
  const [comment,setComment] = useState("")
  const increseQuantity = ()=>{
    if(Product.Stock <= quantity) return ;
    const qty = quantity +1;
    setQuantity(qty)
  }
  const decreseQuantity = ()=>{
    if(quantity<=1) return ;
    const qty = quantity -1;
    setQuantity(qty)
  }
   
  const dispatch = useDispatch();
  const alret = useAlert();
  const { Product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const { success, error:reviewError } = useSelector(
    (state) => state.newReview
  );
  const submitReviewToggle = ()=>{
    setOpen(!open)
  }

  const addToCartHandler = ()=>{
    dispatch(addItemsToCart(id,quantity));
    alret.success("Item Added to Cart ");

  }
  const reviewSubmitHandler = ()=>{
    const myForm = new FormData()

    myForm.set("rating",rating)
    myForm.set("comment",comment)
    myForm.set("productId",id)
    dispatch(newReview(myForm))

    setOpen(false)

  }
  useEffect(() => {
    if (error) {
      alret.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alret.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alret.success("Review Submit SuccessFully")
      dispatch({type:NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, id, alret,success,reviewError]);
  if (!Product) {
    return <Loading />;
  }
  const {
    name, _id,
    description,
    price,
    ratings,
    images,
    Stock,
    numOfReviews,
    reviews,
  } = Product;
  
 
  const ratingOptions = {
    
    
    value: ratings,
   readOnly:true,
   precision:0.5

  };
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`${name} -- ECOMMERCE `} />
          <div className="w-[100vw] md:h-[90vh] h-[100vh] flex md:flex-row flex-col       ">

            <div className="w-[100%] h-[50vmax]     pt-8 border border-white ">
              <Carousel>
                {images &&
                  images.map((image, i) => (
                    <div className="m-auto p-9" key={image._id}>
                      <img
                        className="w-[20vmax] m-auto min-h-[35vmax]"
                        src={image.url}
                        alt="img"
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="flex w-full h-full flex-col justify-evenly  pt-7  pb-32 md:items-start items-center  px-[2vmax]   m-0  border border-white">
              <div>
                <h2 className=" text-[rgb(54,54,54)]   font-semibold text-[1.6vmax]">
                  {name}
                </h2>
                <p className="text-[rgba(54,54,54,0.56)] font-extralight text-[1vmax] md:text-[0.6vmax] font-cursive">
                  Product #{_id}{" "}
                </p>
              </div>
              <div className="flex md:justify-start justify-center items-center border-t-[1px] border-b-[1px] border-solid border-[rgba(0,0,0,0.205)] w-[70%] py-[1vmax]">
                <Rating {...ratingOptions} />
                <span className="text-[rgba(54,54,54,0.582)]  font-extralight text-[0.8vmax] font-cursive">
                  ({numOfReviews} reviews)
                </span>
              </div>
              <div className="w-[70%] flex flex-col items-center md:items-start   ">
                <h1 className="text-[rgba(19,19,19,0.58)] font-normal text-[1.8vmax] my-[1vmax] ">
                  {" "}
                  {`₹${price}`}{" "}
                </h1>
                <div className=" flex   md:flex-row flex-col  items-center md:m-0 text-center">
                  <div className="flex   items-center  text-center">
                    <button className="rounded-sm border-none h-[4vmax] md:h-[2vmax] bg-[rgba(0,0,0,0.616)] p-[0.5vmax] text-white cursor-pointer transition-all delay-500 hover:bg-[rgba(0,0,0,0.74)] " 
                    onClick={decreseQuantity}>
                      -
                    </button>
                    <input
                      className="border-none rounded-sm p-[0.2vmax] w-[2.8vmax] h-[4vmax] md:h-[2vmax] text-center  outline-none text-[rgba(0,0,0,0.74)]  font-normal text-[1vmax]  "
                      type="number"
                      readOnly
                      value={quantity}
                    />
                    <button className="rounded-sm border-none h-[4vmax] md:h-[2vmax] bg-[rgba(0,0,0,0.616)] p-[0.5vmax] text-white cursor-pointer transition-all delay-500 hover:bg-[rgba(0,0,0,0.74)] "
                    onClick={increseQuantity}>
                      +
                    </button> 
                  </div>{" "}
                  <button className="border-none mt-3 md:mt-0  outline-none cursor-pointer text-white py-[0.5vmax] mx-[1vmax] px-[2vmax] transition-all delay-300  duration-500 bg-[rgb(223,110,102)] hover:bg-[rgb(141,61,61)]  rounded-2xl" disabled={Stock<1?true:false  }   onClick={addToCartHandler}  >
                    Add to Cart
                  </button>
                   
                </div>
              </div>
              <p className="flex md:justify-start justify-center items-center border-t-[1px] border-b-[1px] border-solid border-[rgba(0,0,0,0.205)] w-[70%]   py-[1vmax]">
                Status:  
                <b className={Stock < 1 ? "text-red-900" : " text-green-900"}>
                  {Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>

              <div className="text-[rgba(0,0,0,0.897)] font-medium text-[1.2vmax] ">
                Description : 
                <p className="text-[rgba(0,0,0,0.534)] font-sans ">
                  {description}
                </p>
              </div>
              <button className="border-none outline-none cursor-pointer text-white  px-[2vmax] py-1 mx-[1vmax]   transition-all delay-300  duration-500 bg-[rgb(223,110,102)] hover:bg-[rgb(141,61,61)]  rounded-2xl " onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="text-black text-[1.4vmax] font-medium border-b-2  text-center border-b-[rgba(0,0,0,0.226)] p-[1vmax] w-[20vmax] m-auto mb-[4vmax] ">
            REVIEWS
          </h3>
          <Dialog
          aria-labelledby="simple-dailog-title"
          open={open}
          onClose={submitReviewToggle}
          
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog flex flex-col ">
              <Rating onChange={(e)=>setRating(e.target.value)}
              value={rating}
              size="large"
              
              />
              <textarea className="submitDialoagtextaria border border-solid border-[rgba(0,0,0,0.082)] my-[1vmax] mx-0 no-underline p-[1rem] font-light font-Roboto text-[1rem] "
               color="30"
               rows="5"
               value={comment}
               onChange={(e)=>setComment(e.target.value)}

              >
                

              </textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">cancel</Button>
              <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
            </DialogActions>

          </Dialog>
          {reviews && reviews[0] ? (
            <div className=" flex overflow-auto scroll-m-0 ">
              {reviews &&
                reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className=" font-normal  font-sans text-center text-[rgba(0,0,0,0.548)] text-[2vmax] md:text-[1.3vmax]">
              {" "}
              No Reviews Yet{" "}
            </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
