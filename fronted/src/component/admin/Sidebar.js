import React from 'react'
import logo from "../../images/logo.png";
import { Link } from 'react-router-dom';
import { TreeView,TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
// import PostAddIcon from "@material-ui/icons/PostAdd"
// import AddIcon from "@material-ui/icons/Add"
import ImportExportIcon from "@material-ui/icons/ImportExport"
// import DashboardIcon from "@material-ui/icons/Dashboard"
import ListAltIcon from "@material-ui/icons/ListAlt"
import PeopleICon from "@material-ui/icons/People"
import RateReviewIcon from "@material-ui/icons/RateReview"



const Sidebar = () => {
  return (
    <div className='w-[100vw] md:w-full bg-white flex flex-col py-[2rem] pt-[0] px-0 border-r border-solid border-[rgba(0,0,0,0.247)] '>
        <Link to="/" className=' p-0'>
            <img className='w-full transition-all  duration-500   hover:drop-shadow-2xl   filter   ' src={logo} alt='Ecommerce' />
        </Link>
        <Link className=' no-underline text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem] pt-0  transition-all duration-500 hover:text-[tomato] hover:scale-110'>
        <TreeView
        defaultCollapseIcon={<ExpandMoreIcon/>}
        defaultExpandIcon={<ImportExportIcon/>}
        >
            <TreeItem nodeId='1' label="Products">
                <Link to="/admin/products">
                <TreeItem nodeId='2' label="All" /></Link>
                <Link className=' no-underline text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem]  transition-all duration-500 hover:text-[tomato] hover:scale-110' to="/admin/product">
                <TreeItem nodeId='3' label="Create" /></Link>
            </TreeItem>

        </TreeView>
        </Link>
        <Link to="/admin/orders" className=' no-underline text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem]  transition-all duration-500 hover:text-[tomato] hover:scale-110' >
            <p className=' flex items-center '>
                <ListAltIcon className='mr-[0.5rem]'/>
                Orders
            </p>
        </Link>
        <Link to="/admin/users"  className=' no-underline text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem]  transition-all duration-500 hover:text-[tomato] hover:scale-110' >
            <p  className=' flex items-center '>
                <PeopleICon className='mr-[0.5rem]'/>
                Users
            </p>
        </Link>
        <Link to="/admin/reviews" className=' no-underline text-[rgba(0,0,0,0.493)] font-extralight text-[1rem] p-[2rem]  transition-all duration-500 hover:text-[tomato] hover:scale-110' >
            <p  className=' flex items-center '>
                <RateReviewIcon className='mr-[0.5rem]'/>
                Reviews
            </p>
        </Link>
        
    </div>
  )
}

export default Sidebar