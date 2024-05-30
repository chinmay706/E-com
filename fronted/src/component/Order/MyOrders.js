import React, { Fragment,useEffect } from 'react'
import {DataGrid} from "@material-ui/data-grid"
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,Myorders } from '../../redux/actions/orderAction'
import Loading from "../layout/Loader/Loading";
import { Link } from 'react-router-dom';
import {useAlert} from "react-alert" 
import MetaData from "../layout/MetaData"
import LaunchIcon from "@material-ui/icons/Launch"
import "./MyOrder.css"

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert()
    const {loading,error,orders} = useSelector((state)=>state.myOrder)
    const {user}= useSelector((state)=>state.user)
    const columns= [
        {field:"id",headerName:"Order ID",minWidth:200,flex:0.4},
        {field:"status",headerName:"Status",minWidth:200,flex:0.3,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status") === "Delivered"?"text-[green]":"text-[red]"
            }
        },
        {field:"itemsQty",headerName:"items Qty",type:"number",minWidth:200,flex:0.3},
        {field:"amount",headerName:"Amount",type:"number",minWidth:200,flex:0.3},
        {field:"actions",headerName:"Actions",flex:0.3,type:"number",minWidth:150,sortable:false , 
            renderCell: (params)=>{
                return (
                    <Link to={`/order/${params.getValue(params.id,"id")}`}>
                        <LaunchIcon/>
                    </Link>
                )
            }
        },
    ]
    const rows = []
    
    orders && orders.forEach((item,index) => {
        rows.push({
            itemsQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice,
        })
        
    });
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch( clearErrors())
        }
        dispatch(Myorders())

    },[alert,dispatch,error])
  return (
    <Fragment>
        <MetaData title={`${user.name} odres`} />
        {loading ? (
            <Loading/>
        ):(
            <div className='w-[100vw]   md:py-[0]   box-border bg-[rgb(145,99,99)] h-[93vh] p-0   md:h-[100vh] flex flex-col'>
               <h2 className='md:w-full text-center font-normal font-Roboto md:text-[1.2vmax] text-[2.2vmax] md:p-[0.5vmax] p-[4vw] box-border text-[rgb(255,255,255)] transition-all duration-500 bg-[rgb(44,44,44)]'>{user.name}'s Orders</h2>
               
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='bg-white myorderTable '
                autoHeight
                
                />
                
            </div>

        )}

        

    </Fragment>
  )
}

export default MyOrders