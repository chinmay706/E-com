import React, { Fragment, useEffect } from 'react';
import ProductCard from "./ProductCard.js"
// import photo from "../../images/phto.jpg"
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from '../../redux/actions/productAction.js';
import { useSelector,useDispatch } from 'react-redux';
import Loading from '../layout/Loader/Loading.js';
import { useAlert } from 'react-alert';
import "./app.css"
 

const Home = () => {
  const dispatch = useDispatch()
  const alret = useAlert()
  const {loading,error,products} = useSelector(state=>state.products)
  

  useEffect(()=>{

    if(error){
       alret.error(error)
       dispatch(clearErrors())
    }

    dispatch(getProduct())
    
  },[dispatch,alret,error])
    
  
  return (
    <Fragment >
      {loading? (<Loading/>) :  (<Fragment><MetaData title="Home page is working " />
        <div   className="image relative after:content-[attr(after)] after:absolute after:top-0 after:left-0 after:bg-white after:h-[108.7vmin] after:w-[100vw] after:overflow-hidden   bg-gradient-to-r from-[#635dc0]  after:pt-2  to-[#3027ae] h-[91.4vmin]  width-[100vw] flex text-center flex-col justify-center text-white   after:clip-polygon overflow-hidden ">
            <p className=" text-[1.5vmax] font-semibold ">Welcome to Ecommmerce</p>
            <h1 className='m-[5vmax] font-Roboto font-semibold text-[2.5vmax] '>FIND AMAZING PRODUCT BELOW</h1>

            <div  >
                <button   className=' hover:bg-transparent transition-all delay-150 duration-300 ease-in-out   border-none text-black    cursor-pointer  px-4 text-[2vmax]  bg-white' 
                onClick={()=>{
                  const element = document.getElementById("container")
                  element?.scrollIntoView({
                    behavior:"smooth"
                  })}
                  
                
              }
                >
                    Scroll  
                </button>
            </div>


        </div>
        <div className='w-[100%] flex h-[10vh] items-center pb-4 mt-3 justify-center relative'>

        <h2 className='absolute block   text-[rgba(21,21,21,0.7)]   border-b-2    text-center font-[600] text-[1.4vmax] border-black  px-4 m-5 ' >Featured Product </h2>
        </div>
        
        <div   id='container' className="flex my-[2vmax] mx-auto w-[80vw] flex-wrap max-w-[100%]">
        {products && products.map((product)=>(
            <ProductCard product={product} key={product._id}  />
        ))}
           
        </div></Fragment>)}
    </Fragment>
  )
}

export default Home