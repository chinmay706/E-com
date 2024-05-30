import React from "react";
import { useSelector } from "react-redux";
import {   Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAdmin  ,...rest }) => {
   
  const { loading, isAuthenticated ,user} = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
  }

  if(isAuthenticated === false){
   return  <Navigate to="/login" replace />
  }
  if (isAdmin && user.role === "user") {
    return <Navigate to="/login" replace />;
  }

  return Component ? <Component {...rest} /> : <Outlet />;
  
};

export default ProtectedRoute;
