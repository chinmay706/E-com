import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import Loading from "../layout/Loader/Loading";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Paginaiton from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import "./Product.css";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const params = useParams();
  const keyword = params.keyword;
  const dispatch = useDispatch();
  const alret = useAlert();
  const { products, loading, resultPerpage, error, productCount } = useSelector(
    (state) => state.products
  );
  

  const [currentPage, setCurrentpage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCotegory] = useState("");
  const [ratings, setRatings] = useState(0);
  const setCurrentPageNo = (e) => {
    setCurrentpage(e);
  };

  const priceHandler = (e, newPrice) => {
    setTimeout(() => {
      setPrice(newPrice);
    }, 200);
  };
  useEffect(() => {
    if (error) {
      alret.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, error, alret, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS --ECOMMERCE " /> 
          <div className=" my-[3vmax] flex items-center justify-center   ">
            <h2 className="absolute block   mx-auto mt-[4vmax]  text-[rgba(65,65,65,0.7)]   border-b-2    text-center font-[600] md:text-[1.4vmax] text-[2vmax] border-black  py-2  px-5  mb-[2rem]">
              PRODUCTS
            </h2>
          </div>
          <div className="flex md:my-[2vmax] my-0 mx-auto w-[80vw]   flex-wrap max-w-[100%]">
            {products && products.length === 0 ? (
              <div className=" w-[100%] mt-5 flex items-center justify-center  ">
                <h2 className="   mx-auto  text-[rgba(65,65,65,0.7)]   border-b-2    text-center font-[600] md:text-[1.4vmax] text-[2vmax] ">
                  Product is not avaible
                </h2>
              </div>
            ) : (
              products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          <div className="md:w-[8vmax]  md:absolute static  md:top-[10vmax] md:left-[2vmax] w-[20vmax] m-auto md:border-black md:border-solid border-none  md:border p-3 rounded-sm">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />

            <Typography>Categories</Typography>
            <ul className="p-0 ">
              {categories.map((category) => (
                <li
                  className=" list-none  text-[rgba(0,0,0,0.61)] md:text-[0.8vmax] text-[2vmax]  hover:text-[tomato] cursor-pointer font-normal font-Roboto m-[0.4vmax]"
                  key={category}
                  onClick={() => setCotegory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset className="border border-[#0000009f] border-solid px-3">
              <Typography component="legend">Rating Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              ></Slider>
            </fieldset>
          </div>

          {resultPerpage < productCount && (
            <div className="flex justify-center m-[6vmax]">
              <Paginaiton
                activePage={currentPage}
                itemsCountPerPage={resultPerpage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
