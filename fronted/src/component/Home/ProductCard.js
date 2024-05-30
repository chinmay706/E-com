import React from "react";
import { Link } from "react-router-dom";
import {Rating} from "@material-ui/lab"
 

const ProductCard = ({ product }) => {
   
  // const dispatch = useDispatch();
  const ratingOptions = {
    
      
    value: product.ratings,
   readOnly:true,
   precision:0.5

  };
  console.log(product)
  
  
  const id = product._id

  
  return (
    <Link
      className="flex  w-[16vmax] md:w-[14vmax] border flex-col no-underline text-[rgb(48,48,48)] m-[1vmax] transition    delay-[150] hover:duration-500  ease-in-out   hover:shadow-2xl hover:translate-y-[-0.5vmax] hover:transition-all hover:shadow-[#9378c2]  rounded-lg "
      to={`/product/${id}`}
      // onClick={handleProductClick} 
    >
      <img
        className="md:w-[14vmax] w-[20vmax]  h-[20vmax] "
        src={product.images[0] &&  product.images[0].url}
        alt={product.name}
      />

      <p className=" font-Roboto text-[2.5vmax] my-[1vmax] mx-[0.5vmax]   md:text-[1.7vmax] ">
        {product.name}
      </p>
      <div className=" m-[0vmax] md:m-[0.5vmax] flex-col md:flex-row   flex justify-start md:items-center ">
        <Rating size={`${window.innerWidth>1096?" " : "small"}`}    {...ratingOptions} /> 
        <span className="m-[0.5vmax] md:text-[0.7vmax]  text-[1vmax]">
          {" "}
          ({product.numOfReviews} Reviews){" "}
        </span>
      </div>
      <span className="mb-2 ml-2 text-[#c9523d] md:text-[1.5vmax]   ">{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
