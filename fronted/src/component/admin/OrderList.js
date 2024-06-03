import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { deleteOrder, getAllorders,clearErrors } from '../../redux/actions/orderAction';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_ORDER_RESET } from '../../redux/constants/orderConstant';

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  
  const { error, orders } = useSelector((state) => state.allOrder );
  
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllorders());
  }, [dispatch,error, alert, deleteError, isDeleted, navigate]);

  const columns= [
    {field:"id",headerName:"Order ID",minWidth:250,flex:0.2},
    {field:"status",headerName:"Status",minWidth:200,flex:0.1,
        cellClassName:(params)=>{
          return params.value === "Delivered"?"text-[green]":"text-[red]"
        }
    },
    {field:"itemsQty",headerName:"items Qty" ,minWidth:200,flex:0.2},
    {field:"amount",headerName:"Amount",minWidth:200,flex:0.3},
    {
        field: "actions",
        headerName: "Actions",
        minWidth: 150,
        flex: 0.2,
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              <Link
                className='text-[rgba(0,0,0,0.527)] transition-all duration-500 hover:text-[tomato]'
                to={`/admin/order/${params.row.id}`}
              >
                <EditIcon />
              </Link>
              <Button
                onClick={() => deleteOrderHandler(params.row.id)}
                className='text-[rgba(0,0,0,0.527)] transition-all duration-500 hover:text-[rgba(236,30,30)]'
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
  ];

  const rows = [];

  orders && orders.forEach((item) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    });
  });

  return (
    <Fragment>
    <MetaData title={`ALL PRODUCTS - ADMIN`} />
    <div className="w-[100vw] max-w-full h-full grid md:grid-cols-[1fr,5fr] grid-cols-[1fr] absolute">
      <Sidebar />
      <div className="w-full box-border bg-[white] flex border-l border-solid border-[rgba(0,0,0,0.158)] flex-col h-screen overflow-auto">
        <h1 className="font-normal font-Roboto text-[2rem] p-[0.5rem] box-border text-[rgba(0,0,0,0.637)] transition-all duration-500 m-[2rem] text-center">
          ALL ORDERS
        </h1>
        <div className="h-full w-full overflow-auto">
          <div className="min-w-[950px]  md:min-w-full"  >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="bg-white !border-none"
             
            />
          </div>
          </div>
      </div>
    </div>
  </Fragment>
  );
};

export default OrderList;
