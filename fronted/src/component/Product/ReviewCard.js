import React from "react";
import profilePng from "../../images/Profile.png"
import {Rating} from "@material-ui/lab"
const ReviewCard = ({ review }) => {
   
  const ratingOptions = {
    
     
    value: review.rating,
   readOnly:true,
   precision:0.5

  };
  
  return (
    <div className="flex-none h-full flex w-[30vmax] flex-col items-center   justify-center  m-[1vmax] p-3vmax  shadow-md shadow-[rgba(0,0,0,0.226)] border border-solid border-[rgba(56,56,56,0.116)]">
      <img
      className="w-[5vmax] "
      src={profilePng} alt="User" />
      <p className="text-[rgba(0,0,0,0.836)] font-semibold text-[1.5vmax] md:text-[0.9vmax]">{review.name}</p>
      <Rating {...ratingOptions} />
      <span className="text-[rgba(0,0,0,0.47)]    font-light text-[2vmax]  md:text-[0.8vmax]"> {review.comment} </span>
    </div>
  );
};

export default ReviewCard;
