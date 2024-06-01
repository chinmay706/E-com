import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createproduct } from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import Sidebar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../redux/constants/ProductContants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [backedloding,setBackedloging] = useState(loading)
  const cloudinaryConfig = {
    cloudName: "dhvvefbcj",
    apiKey: "615664218991955",
    apiSecret: "KnAEi9BTrSqpQ8Fd31Crm4EEW0A",
  };

  const createproductSubmitHandler = async (e) => {
    e.preventDefault();
    

    try {
      setBackedloging(true)
      // Cloudinary mein images ko upload karna
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "jpctpavk");
  
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          console.log({ public_id: data.public_id, url: data.secure_url })
          
          
         
          return { public_id: data.public_id, url: data.secure_url };
        })
      );
     
// Updated product ka data
      const updatedProductData = {
        name,
        price,
        description,
        category,
        Stock,
        images:uploadedImages
      };
      
       
      dispatch(createproduct( updatedProductData));
    } catch (error) {
      console.error("Cloudinary mein image upload karne me error aaya:", error);
    }
  };
  const createproductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagesPreview(files.map((file) => URL.createObjectURL(file)));

  };
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

   
  useEffect(() => {
    if (error) {
      
      alert.error(error);
      setBackedloging(false)
      dispatch(clearErrors());
    }
    if (success) {
      
      alert.success("Product Created Successfully");
      setBackedloging(false)
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert,navigate, error, success]);

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="da w-[100vw]  max-w-full grid md:grid-cols-[1fr,5fr]  grid-cols-[1fr] absolute">
        <Sidebar />
        <div className="flex box-border items-center justify-center   md:bg-[rgba(221,221,221)] bg-white  border-l border-solid border-[rgba(0,0,0,0.158)] flex-col h-[100vh]  ">
          <form
            className="newProductContainer md:w-[30vw] w-full  md:pb-[9vmax] p-[5vmax]   flex flex-col items-center m-auto md:p-[3vmax]   md:h-[100%]  bg-white  md:drop-shadow-xl shadow-slate-800    "
            onSubmit={createproductSubmitHandler}
            encType="multipart/form-data"
          >
            <h1 className=" text-[rgba(0,0,0,0.733)] font-light font-Roboto text-[2rem]  text-center">
              Create Product
            </h1>
            <div className="flex w-full items-center">
              <SpellcheckIcon className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <input
                className="md:py-[1vmax] md:myu-1 my-2 py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center">
              <AttachMoneyIcon className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <input
                className="md:py-[1vmax]  md:my-1 my-2  py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center">
              <DescriptionIcon className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <textarea
                className="md:py-[1vmax] md:my-1 my-2  py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                type="number"
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div className="flex w-full items-center">
              <AccountTreeIcon className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <select
                 className="md:py-[1vmax] md:my-1 my-2  py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-full items-center">
              <StorageIcon className="absolute text-[2.8vmax] translate-x-[1vmax] md:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
              <input
                 className="md:py-[1vmax] md:my-1 my-2  py-[2.5vmax] px-[5vmax] text-[1.7vmax] md:px-[4vmax]   w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded-sm font-extralight font-cursive md:text-[0.9vmax] outline-none"
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center">
              <input
                className="flex py-[0.5vmax]  md:my-1 my-2   box-border border border-solid border-[rgba(0,0,0,0.267)] w-full p-0 file:cursor-pointer file:w-full file:z-[2]  md:file:h-[5vh] file:border-none file:m-0 file:font-normal file:font-cursive md:file:text-[0.8vmax] file:transition-all file:duration-500 file:py-[0] file:px-[1vmax] file:text-[rgba(0,0,0,0.623)] file:bg-[white] file:hover:bg-[rgb(235,235,235) ] file:h-[7vh] file:text-[1.8vmax]"
                type="file"
                name="avatar"
                accept="image/"
                multiple
                onChange={createproductImagesChange}
              />
            </div>
            <div className=" flex w-full items-center   overflow-auto  overflow-y-hidden   ">
              
                {imagesPreview.map((image, index) => (
                  <img
                    className="md:w-[3vmax]  w-[8vmax]   md:rounded-none  my-0 mx-[0.5vmax]"
                    key={index}
                    src={image}
                    alt="Avatar Preview"
                  />
                ))}
               
            </div>
            <button
              className="border-none md:my-1 my-2  hover:bg[rgb(179,66,46)] bg-[tomato] text-white font-light font-Roboto text-[1.9vmax] p-[1.8vmax] md:text-[1vmax] w-full md:p-[0.8vmax] transition-all duration-500 no-underline  shadow-sm"
              type="submit"
              disabled={loading ? true : false || backedloding?true:false }
               
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
