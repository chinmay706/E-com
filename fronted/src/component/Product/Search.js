import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';


const Search = () => {
    
    const navigate = useNavigate()
    // console.log(navigate)
  const handleClickUser = (event) => {
    event.stopPropagation();
     navigate("/products");
  };
    const [keyword,setKeyword] = useState("");
    const searchSumbithandler = (e)=>{ 
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
          } else {
            navigate("/products");
          }
    }
  return (
    <Fragment>
       <MetaData title="Search a product  --ECOMMERCE " />
       <div
       className='w-[100vw] md:h-[32vh] h-[55vmax] backdrop-blur-sm '
       >


       </div>
       
      
        <form action=""   className='w-[100vw] backdrop-blur-sm h-[100vh] max-h-full flex justify-center  z-50  items-center     fixed top-0 left-0 ' onClick={searchSumbithandler}  onSubmit={searchSumbithandler}>
        <button

       className='absolute text-black font-bold  text-[3vamx] border-2 m-2 rounded-lg border-black px-2 md:right-[15vmax] top-[40vmax] right-[2vmax]  md:top-[10vmax]' onClick={handleClickUser}
       
       >X</button>
       <input type="text" className='shadow-lg shadow-[rgba(0,0,0,0.274)]  bg-white border-none text-[rgba(0,0,0,0.637)]  py-[1vmax] px-[2vmax] w-[70%] md:w-[50%] outline-none rounded-none font-light md:text-[1.1vmax] text-[2vmax]  box-border h-[8%] font-cursive '
       placeholder='Search a Product'
       onChange={(e)=>setKeyword(e.target.value)}
       />
  <input type='submit' className='h-[8%] rounded-none shadow-lg shadow-[rgba(0,0,0,0.274)] bg-[tomato] px-4 border-none p-[1vmax] w-[20%] font-extralight  md:w-[10%] text-[2vmax] md:text-[1.1vmax] font-Roboto text-white cursor-pointer transition-all duration-500 hover:bg-[rgb(55,97,214)] ' value="search" />
        </form>

    </Fragment>
  )
}

export default Search