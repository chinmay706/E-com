import React, { Fragment, useEffect, useState } from "react";
// import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Sidebar from "./Sidebar";
import Loading from "../layout/Loader/Loading";
import {
  clearErrors,
  getorderDetails,
  updateOrder,
} from "../../redux/actions/orderAction";
import AccountTree from "@material-ui/icons/AccountTree";
import { UPDATE_ORDERS_RESET } from "../../redux/constants/orderConstant";
import { useAlert } from "react-alert";

const ProcessOrder = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updatederror } = useSelector(
    (state) => state.order
  );

  console.log(order);
  const [status, setStatus] = useState("");

  //   const subtotal = order.orderItems.reduce(
  //     (acc, item) => acc + item.quantity * item.price,
  //     0
  //   );

  const processorderSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("status", status);
    dispatch(updateOrder(id, myform));
  };
  const button = {
    disabled: loading === true ? true : false || status === "" ? true : false,
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updatederror) {
      alert.error(updatederror);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDERS_RESET });
      navigate("/admin/orders");
    }
    dispatch(getorderDetails(id));
  }, [error, alert, id, updatederror, isUpdated, dispatch,navigate]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="w-[100vw] max-w-full grid md:grid-cols-[1fr,5fr] grid-cols-[1fr] absolute">
        <Sidebar />

        <div className="h-[100vh]">
          {loading ? (
            <Loading />
          ) : (
            <div className="  h-full bg-white grid md:grid-cols-[5fr,1fr] grid-flow-row  ">
              <div>
                <div className="   p-[3vmax] pb-0   ">
                  <Typography>
                    <h1 className="font-Roboto  font-normal md:text-[1.8vmax] text-[6vw]">
                      Shipping Info
                    </h1>
                  </Typography>
                  <div className=" m-[2vmax] mb-0 ">
                    <div className="flex">
                      <p className=" font-Roboto  font-normal md:text-[1vmax] text-[4vw] text-black">
                        Name:
                      </p>
                      <span className="text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ">
                        {order && order.user && order.user.name}
                      </span>
                    </div>
                    <div className="flex">
                      <p className=" font-Roboto  font-normal md:text-[1vmax] text-[4vw] text-black">
                        Phone:
                      </p>
                      <span className="text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ">
                        {order &&
                          order.shippingInfo &&
                          order.shippingInfo.phoneNo}
                      </span>
                    </div>

                    <div className="flex">
                      <p className=" font-Roboto  font-normal md:text-[1vmax] text-[4vw] text-black">
                        Adress:
                      </p>
                      <span className="text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ">
                        {order &&
                          order.shippingInfo &&
                          `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pincode},${order.shippingInfo.country},`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="   p-[3vmax] pb-0   ">
                  <Typography>
                    <h1 className="font-Roboto  font-normal md:text-[1.8vmax] text-[6vw]">
                      Payment
                    </h1>
                  </Typography>
                  <div className="  m-[2vmax] mb-0 ">
                    <div className="flex">
                      <p
                        className={`font-Roboto  font-normal md:text-[1vmax] text-[4vw] ${
                          order &&  order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        PAID
                      </p>
                    </div>
                    <div className="flex">
                      <p className=" font-Roboto  font-normal md:text-[1vmax] text-[4vw] text-black">
                        Amount:
                      </p>
                      <span className="text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ">
                        {order && order.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="   p-[3vmax] pb-0   ">
                  <Typography>
                    <h1 className="font-Roboto  font-normal md:text-[1.8vmax] text-[6vw]">
                      Order Status
                    </h1>
                  </Typography>
                  <div className="box m-[2vmax] mb-0 ">
                    <div className="flex">
                      <span
                        className={`text-[#575757] mx-[1vmax] my-0 font-thin font-Roboto md:text-[1vmax] text-[4vw] ${
                          order && order.orderStatus && order.orderStatus === "Delivered"
                            ? "text-[green]"
                            : "text-[red]"
                        }`}
                      >
                        {order && order.orderStatus}
                      </span>
                    </div>
                  </div>
                  <div className="  p-[2vmax] pt-[2vmax] md:px-0">
                    <Typography>
                      <h1 className=" font-normal md:text-[1.8vmax] text-[6vw]  font-Roboto ">
                        Your Cart Items:
                      </h1>
                    </Typography>
                    <div className="   md:max-h-[20vmax] max-h-[50vw] overflow-y-auto ">
                      {order &&
                        order.orderItems &&
                        order.orderItems.map((item) => (
                          <div
                            key={item.product}
                            className="flex font-normal font-Roboto md:text-[1vmax] text-[4vw] my-[4vw]  justify-between items-center md:my-[2vmax] mx-0"
                          >
                            <img
                              src={item.image}
                              alt="Product"
                              className="md:w-[3vmax] w-[10vmax]"
                            />
                            <Link
                              className="md:w-[60%] w-[30%] m-0  md:my-0 md:mx-[1vmax] text-[#575757]  no-underline"
                              to={`/product/${item.product}`}
                            >
                              {item.name}
                            </Link>{" "}
                            <span className="font-Roboto font-thin md:text-[1vmax] text-[4vw] text-[#5e5e5e]">
                              {item.quantity} X ₹{item.price} ={" "}
                              <b>₹{item.price * item.quantity}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${order && order.orderStatus === "Delivered" ? " hidden":"block"} md:border-l border-t   md:border-t-0  border-solid border-[rgba(0,0,0,0.247)]`}>
                <div className={` md:p-[4vmax] md:py-auto p-[12vw]`}>
                  <form
                    className="newProductContainer md:w-[30vw] w-full   p-[5vmax] flex flex-col items-center justify-between m-auto md:p-[2vmax] md:py-[3vmax]  bg-white md:drop-shadow-xl shadow-slate-800 md:h-[50vh]"
                    onSubmit={processorderSubmitHandler}
                    encType="multipart/form-data"
                  >
                    <h1 className="text-[rgba(0,0,0,0.733)] font-light font-Roboto text-[2rem] text-center">
                      Process Order
                    </h1>

                    <div className="flex  w-full items-center">
                      <AccountTree className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
                      <select
                        className="md:py-[1vmax] md:my-1 my-2 py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax] w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option className="bg-[#3d3939] text-white" value="">
                          Choose status
                        </option>
                        {order && order.orderStatus ===
                          ("Processing" || "Processing") && (
                          <option
                            className="bg-[tomato] text-white"
                            value="Shipped"
                          >
                            shipped
                          </option>
                        )}
                        {order && order.orderStatus === "Shipped"&&

                        (<option
                          className="bg-[tomato] text-white"
                          value="Delivered"
                        >
                          Delivered
                        </option>)
                        }
                      </select>
                    </div>

                    <button
                      className={`border-none md:my-1 my-2 hover:bg[rgb(179,66,46)]  text-white font-light font-Roboto text-[1.9vmax] p-[1.8vmax] md:text-[1vmax] w-full md:p-[0.8vmax] transition-all duration-500 no-underline shadow-sm ${
                        button.disabled === true
                          ? "bg-[#3d3939]"
                          : "bg-[tomato]"
                      }`}
                      type="submit"
                      disabled={button.disabled}
                    >
                      PROCESS
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
