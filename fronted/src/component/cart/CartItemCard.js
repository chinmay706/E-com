import React from 'react'
import { Link } from 'react-router-dom'

const CartItemCard = ({item,removecartItem}) => {
  return (
    <div className='  flex md:p-[1vmax]  md:h-[8vmax] p-[2vmax] pl-2 h-[25vmax] items-start justify-start box-border '>
        <img src={item.image} className='md:w-[5vmax] mr-[1vmax] w-[10vmax]' alt="product" />
        <div className='  flex flex-col my-[.5vmax] md:my-[1vmax]       mx-[2vmax] md:m-0 '>
            <Link className='font-light text-[1.5vmax] md:text-[0.9vmax] font-cursive text-[rgba(24,24,24,0.815)] no-underline ' to={`/product/${item.product}`}>{item.name}</Link>
            <span className='font-light text-[1.4vmax] md:text-[0.9vmax]    font-Roboto text-[rgba(24,24,24,0.815)]'>{`Price: ₹${item.price}`}</span>
            <p onClick={()=>removecartItem(item.product)} className=' font-thin  text-[1.8vmax] md:text-[0.8vmax] font-Roboto cursor-pointer text-[tomato]'>Remove</p>
        </div>
        
    </div>
  )
}

export default CartItemCard;