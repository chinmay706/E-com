import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
    return (
        <div className="bg-gray-100  h-screen">
          <div className="bg-white h-full p-6 md:mx-auto">
            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.625.038L5.384,13.6a1,1,0,0,1,1.562-1.244l3.261,4.076,5.227-7.108A1,1,0,1,1,18.927,8.2Z"
              />
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p>Have a great day!</p>
              <div className="py-[10vmax] m-auto items-center h-[10vmax] justify-center flex flex-col md:flex-row  text-center">
                <Link
                  to="/products"
                  className="px-12 m-2 bg-[tomato] transition-all duration-500 hover:bg-[#722c20] text-white font-semibold py-3"
                >
                  Go Back To Home
                </Link>
                <Link
                  to="/orders"
                  className="px-[9.5vmax] md:px-12 m-2 bg-[tomato] transition-all duration-500 hover:bg-[#722c20] text-white font-semibold py-3"
                >
                  view orders 
                </Link>
              </div>
               
            </div>
          </div>
        </div>
      );
      
};

export default CheckoutSuccess;
