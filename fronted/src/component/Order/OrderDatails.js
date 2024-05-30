import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
 
import { getorderDetails, clearErrors } from "../../redux/actions/orderAction";
import Loading from "../layout/Loader/Loading";
import { useAlert } from "react-alert";

const OrderDatails = () => {
  const params = useParams();
  const { id } = params;
  const { order, error, loading } = useSelector((state) => state.orderDetails);
    console.log(order)

  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    dispatch(getorderDetails(id));
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, error, alert]); // Added 'id' to dependencies
  


  return (
    <Fragment>
    {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage h-[100vh]  bg-white ">
            <div className="orderDetailsContainer h-full bg-white  p-[5vmax] pb-0  ">
              <h1 className="font-Roboto text-[tomato] font-normal md:text-[3vmax] text-[6vw]">
                Order #{order && order._id}
              </h1>

              <h2 className="font-Roboto   font-normal md:text-[1.8vmax] text-[6vw]">Shipping Info</h2>
              <div className="orderDetailsContainerBox m-[2vmax]">
                <div className="flex my-[1vmax] mx-0">
                  <p className="font-normal font-Roboto text-[1vmax] text-black">Name:</p>
                  <span className="m-[0.1vmax] font-thin font-Roboto text-[1vmax] text-[#575757] ">{order?.user?.name}</span> {/* Added optional chaining */}
                </div>
                <div className="flex my-[1vmax] mx-0">
                  <p className="font-normal font-Roboto text-[1vmax] text-black">Phone:</p>
                  <span className="m-[0.1vmax] font-thin font-Roboto text-[1vmax] text-[#575757] ">{order?.shippingInfo?.phoneNo}</span> {/* Added optional chaining */}
                </div>
                <div className="flex my-[1vmax] mx-0">
                  <p className="font-normal font-Roboto text-[1vmax] text-black">Address:</p>
                  <span className="m-[0.1vmax] font-thin font-Roboto text-[1vmax] text-[#575757] ">
                    {order?.shippingInfo && 
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h1 className="font-Roboto   font-normal md:text-[1.8vmax] text-[6vw]" >Payment</h1>
              <div className="orderDetailsContainerBox m-[2vmax]">
                <div  className="flex my-[1vmax] mx-0">
                  <p
                    className={` font-normal font-Roboto text-[1vmax] 
                     ${ order?.paymentInfo?.status === "succeeded"
                        ? "text-[green]"
                        : "text-[red]"} `
                    }
                  >
                    {order?.paymentInfo?.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div className="flex my-[1vmax] mx-0">
                  <p className="font-normal font-Roboto text-[1vmax] text-black">Amount:</p>
                  <span  className="m-[0.1vmax] font-thin font-Roboto text-[1vmax] text-[#575757] ">{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              <h1 className="font-Roboto   font-normal md:text-[1.8vmax] text-[6vw]">Order status</h1>
              <div className="orderDetailsContainerBox m-[2vmax]">
                <div className="flex my-[1vmax] mx-0">
                  <p
                    className={ 
                     `font-normal font-Roboto text-[1vmax] text-black  ${ order?.orderStatus === "Delivered"
                        ? "text-[green]"
                        : "text-[red]"}`
                    }
                  >
                    {order?.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems py-[2vmax] px-[5vmax]  border-t border-solid border-[rgba(0,0,0,0.164)]">
              <h1 className="font-Roboto   font-normal md:text-[1.8vmax] text-[6vw]">Order Items:</h1>
              <div className="orderDetailsCartContainer m-[2vmax]">
                {order?.orderItems?.map((item) => (
                  <div className="flex my-[2vmax] font-normal font-Roboto text-[1vmax] items-center mx-0" key={item.product}> 
                    <img className="w-[3vmax] " src={item.image} alt="Product" />
                    <Link className="text-[#575757] my-0 mx-[2vmax] no-underline w-[60%]" to={`/product/${item.product}`}>{item.name}</Link>
                    <span  className="  font-thin font-Roboto text-[1vmax] text-[#5e5e5e] ">
                      {item.quantity} X {item.price} ={" "}
                      <b>{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDatails;
