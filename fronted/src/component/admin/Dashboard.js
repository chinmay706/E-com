import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import {   
  
    Chart as ChartJS,
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
import {Doughnut,Line} from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../redux/actions/productAction.js";
import { getAllorders } from "../../redux/actions/orderAction.js";
import { getAllUsers } from "../../redux/actions/userAction.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // Needed for Doughnut chart
  );

const Dashboard = () => {
  const { products} = useSelector((state)=>state.products)
  const { orders} = useSelector((state)=>state.allOrder)
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch()

  let outOfStock = 0;
  products && products.forEach((item) => {
    if(item.Stock ===0){
      outOfStock +=1
    }
    
  });
  let totalAmout = 0
  orders && orders.forEach(item=>{
    totalAmout +=item.totalPrice
  })
  
   

  const lineStates = {
    labels: orders && orders.map((data) => {const paidAt = data.paidAt;
    const dateObject = new Date(paidAt);
    const date = dateObject.toISOString().split('T')[0];
    return date }),
    datasets: [
        {
            label: "totalPrice",
            backgroundColor: 'tomato',
            hoverBackgroundColor: "rgb(197,72,49)",
            data:orders && orders.map((data) => data.totalPrice)
        },
         
    ]
};

 
    const DoughnuState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                 
                backgroundColor: ['#00A6B4','#6800B4'],
                hoverBackgroundColor: ["#4B5000",'#35014F'],
                data: [outOfStock, products && products.length - outOfStock]
            }
        ]
    };
    useEffect(()=>{
      
      dispatch(getAdminProduct())
      dispatch(getAllorders())
      dispatch(getAllUsers())
       
  
    },[dispatch ])
    
  return (
    <div className="w-[100vw] h-full  max-w-full grid md:grid-cols-[1fr,5fr]  grid-cols-[1fr] absolute">
      <Sidebar />
      <div className=" md:border-l border-none md:border-solid border-l-[rgba(0,0,0,0.13)] bg-[white] py-[3rem] px-0">
        <h1 className="text-[rgba(0,0,0,0.733)]  w-[50%] p-[1.5rem] font-light  text-center text-[2rem] m-auto font-Roboto">Dashboard</h1>
        <div className="summry my-[2rem] mx-0 ">
          <div className="flex bg-white justify-center ">
            <p className="bg-[rgba(70,117,218,0.932)] text-white  md:my-0 md:mx-[2rem] m-0 text-[1.3rem] text-center w-full md:m-[0.2rem]  ">
              Total Amount <br /> ₹{totalAmout}
            </p>
          </div>
          <div className="box2 flex bg-white justify-center ">
            <Link className="text-[rgb(255,255,255)] rounded-full  w-[10vmax] h-[10vmax] md:m-[2rem]  flex md:p-[1.5rem] no-underline  font-light md:text-[2rem] font-Roboto text-center bg-[#c73434] justify-center items-center flex-col p-[0.5rem] m-[1rem] text-[0.9rem] " to='/admin/products'>
                <p>Product</p>
                <p>{products && products.length}</p>
            </Link>
            <Link className="text-[rgb(0,0,0)] rounded-full w-[10vmax] h-[10vmax] md:m-[2rem]  flex md:p-[1.5rem] no-underline  font-light md:text-[2rem] font-Roboto text-center bg-[rgba(255,233,174)] justify-center items-center flex-col p-[0.5rem] m-[1rem] text-[0.9rem]  "   to='/admin/orders'>
                <p>Orders</p>
                <p>{orders && orders.length}</p>
            </Link>
            <Link className="text-[rgb(255,255,255)] rounded-full w-[10vmax] h-[10vmax] md:m-[2rem]  flex md:p-[1.5rem] no-underline  font-light md:text-[2rem] font-Roboto text-center bg-[#574340] justify-center items-center flex-col  p-[0.5rem] m-[1rem] text-[0.9rem] "   to='/admin/users'>
                <p>Users</p>
                <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="w-[100vw] md:w-[80%] m-auto h-[50vmax] ">
              <Line data={lineStates} />
            
        </div>
        <div className="w-[30vmax] m-auto h-[50vmax] ">
            <Doughnut  data={DoughnuState}   />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
