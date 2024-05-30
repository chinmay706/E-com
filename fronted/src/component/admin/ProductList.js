 
import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAdminProduct, deleteproduct } from '../../redux/actions/productAction';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from './Sidebar';
// import "./productlist.css";
import { DELETE_PRODUCT_RESET } from '../../redux/constants/ProductContants';

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteproduct(id));
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
      alert.success("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.4 },
    { field: "price", headerName: "Price", minWidth: 250, flex: 0.6 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              className='text-[rgba(0,0,0,0.527)] transition-all duration-500 hover:text-[tomato]'
              to={`/admin/product/${params.getValue(params.id, "id")}`}
            >
              <EditIcon />
            </Link>
            <Button
              onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}
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

  products && products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.Stock,
      price: item.price,
      name: item.name,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - ADMIN`} />
      <div className='w-[100vw] h-full max-w-full grid md:grid-cols-[1fr,5fr] grid-cols-[1fr] absolute'>
        <Sidebar />
        <div className='w-full box-border bg-[white] flex border-l border-solid border-[rgba(0,0,0,0.158)] flex-col h-[100vh]'>
          <h1 className='font-normal font-Roboto text-[2rem] p-[0.5rem] box-border text-[rgba(0,0,0,0.637)] transition-all duration-500 m-[2rem] text-center'>
            ALL PRODUCTS
          </h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='  bg-white !border-none  '
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
