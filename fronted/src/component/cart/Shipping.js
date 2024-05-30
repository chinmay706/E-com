import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps.js";
import {  useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);


  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);
  const shippingSubmit =(e)=>{
    e.preventDefault()
    if(phoneNo.length < 10 || phoneNo.length > 10 ){
      alert.error("Phone number should be 10 digits Long ");
      return; 
    }
    dispatch(saveShippingInfo({address,city,state,pincode,phoneNo,country}));
    navigate("/order/confirm")
  }
  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0}  />
      <div className="shpcon w-[100vw]  max-w-full flex justify-center items-center flex-col ">
        <div className="shpBox bg-white md:w-[25vw] w-full md:h-[90vh] h-[95vh] overflow-hidden box-border ">
          <h2 className=" text-center text-[rgba(0,0,0,0.664)] border-b-2 border-black w-[70%] m-auto   font-normal md:p-[1.3vmax] pb-0 md:text-[1.3vmax] text-[3vmax]  font-Roboto  p-[5vw]  ">Shipping Details</h2>
          <form
          className="flex p-[11vw] flex-col items-center m-auto md:p-[2vmax] justify-evenly h-[80%] transition-all duration-500  "
            action=""
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="flex w-full items-center ">
              <HomeIcon className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <input
              className="md:py-[1vmax] py-[5vw] px-[10vw] text-[4vw] md:px-[4vmax] md:pr-[1vmax]  outline-none rounded-sm w-full border border-solid border-[rgba(0,0,0,0.267)] font-light md:text-[0.9vmax] font-cursive "
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center " >
              <LocationCityIcon  className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <input
               className="md:py-[1vmax] py-[5vw] px-[10vw] text-[4vw] md:px-[4vmax] md:pr-[1vmax]  outline-none rounded-sm w-full border border-solid border-[rgba(0,0,0,0.267)] font-light md:text-[0.9vmax] font-cursive "
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center ">
              <PinDropIcon className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <input
              className="md:py-[1vmax] py-[5vw] px-[10vw] text-[4vw] md:px-[4vmax] md:pr-[1vmax]  outline-none rounded-sm w-full border border-solid border-[rgba(0,0,0,0.267)] font-light md:text-[0.9vmax] font-cursive "
                type="number"
                placeholder="Pincode"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center ">
              <PhoneIcon className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <input
              className="md:py-[1vmax] py-[5vw] px-[10vw] text-[4vw] md:px-[4vmax] md:pr-[1vmax]  outline-none rounded-sm w-full border border-solid border-[rgba(0,0,0,0.267)] font-light md:text-[0.9vmax] font-cursive "
                type="text"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <div className="flex w-full items-center ">
              <PublicIcon className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <select
               className="md:py-[1vmax] py-[5vw] px-[10vw] text-[4vw] md:px-[4vmax] md:pr-[1vmax]  outline-none rounded-sm w-full border border-solid border-[rgba(0,0,0,0.267)] font-light md:text-[0.9vmax] font-cursive "
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option  value="">Country</option>
                {Country && Country.getAllCountries().map((item)=>(
                    <option    key={item.isoCode} value={item.isoCode} >{item.name}</option>
                ))}
              </select>
            </div>
            {
                country && (
                    <div className="flex w-full items-center " >
                        
                        <TransferWithinAStationIcon className="absolute translate-x-[1vmax] text-[1.6vmax] text-[rgba(0,0,0,0.623)]"/>
                        <select className="md:py-[1vmax] py-[5vw] px-[10vw] text-[4vw] md:px-[4vmax] md:pr-[1vmax]  outline-none rounded-sm w-full border border-solid border-[rgba(0,0,0,0.267)] font-light md:text-[0.9vmax] font-cursive " required value={state} onChange={(e)=>setState(e.target.value)}>
                          <option value="">
                            State
                          </option>
                          {State && State.getStatesOfCountry(country).map((item)=>(
                            <option
                            key={item.isoCode}
                            value={item.isoCode}                           
                            >
                              {item.name}
                            </option>

                          ))}

                        </select>
                    </div>
                )
            }
           <button type="submit" 
           disabled={state?false:true}
           className="border-none rounded-sm bg-[tomato] text-white font-light text-[2vmax] md:text-[1vmax] w-full p-[1vmax] cursor-pointer transition-all  duration-500  outline-none m-[2vmax] hover:bg-[#80392d] "
           >
            Countinue
           </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
