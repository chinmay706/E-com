import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllreviews,
  deleteReviews,
} from "../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Star from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";

import { DELETE_REVIEW_RESET } from "../../redux/constants/ProductContants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const deleteReviewHandler = (reviewid) => {
    dispatch(deleteReviews(reviewid,productId));
  };
  const productReviewsSumbitHandler = (e) => {
    e.preventDefault();
     
    dispatch(getAllreviews(productId));
  };

  useEffect(() => {
     
 
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.6 },
    { field: "user", headerName: "User", minWidth: 150, flex: 0.3 },
    { field: "comment", headerName: "Commment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "rating",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "!text-[green]"
          : "!text-[red]";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
              className="text-[rgba(0,0,0,0.527)] transition-all duration-500 hover:text-[rgba(236,30,30)]"
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - ADMIN`} />
      <div className="w-[100vw] h-full max-w-full grid md:grid-cols-[1fr,5fr] grid-cols-[1fr] absolute">
        <Sidebar />
        <div className="w-full box-border bg-[white]   border-l border-solid border-[rgba(0,0,0,0.158)]    h-[100vh]">
          <form
            className="  md:w-[30rem] flex  w-full  md:pb-[0] p-[5vmax]    flex-col items-center m-auto md:p-[3vmax]   md:h-[60%]  bg-white    shadow-slate-800    "
            onSubmit={productReviewsSumbitHandler}
            encType="multipart/form-data"
          >
            <h1 className="font-normal font-Roboto text-[2rem] p-[0.5rem] box-border text-[rgba(0,0,0,0.637)] transition-all duration-500 m-[2rem] text-center">
              ALL REVIEWS
            </h1>
            <div className="flex w-full items-center m-[2rem]">
              <Star className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <input
                className="md:py-[1vmax] md:myu-1 my-2 py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                type="text"
                placeholder=" product id "
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              className="border-none md:my-1 my-2  hover:bg[rgb(179,66,46)] bg-[tomato] text-white font-light font-Roboto text-[1.9vmax] p-[1.8vmax] md:text-[1vmax] w-full md:p-[0.8vmax] transition-all duration-500 no-underline  shadow-sm "
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Update
            </button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
               
              disableSelectionOnClick
              className="  w-[100%]  bg-white !border-none h-full  pr-5     "
              autoHeight
            />
          ) : (
            <h1 className="font-normal font-Roboto text-[2rem] p-[0.5rem] box-border text-[rgba(0,0,0,0.637)] transition-all duration-500 m-[2rem] text-center">
           NO REVIEWS FOUND
          </h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
