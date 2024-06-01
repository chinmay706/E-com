import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import webFont from "webfontloader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/user/LoginSignUp.js";
import store from "../src/redux/store/store.js";
import { loaduser } from "./redux/actions/userAction.js";
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/user/ResetPasword.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import Cart from "./component/cart/Cart.js";
import Shipping from "./component/cart/Shipping.js";
import ConfirmOrder from "./component/cart/Corformorder.js";
import Payment from "./component/cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutSuccess from "./component/cart/CheckoutSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDatails from "./component/Order/OrderDatails.js";
import Dashboard from "./component/admin/Dashboard.js"
import ProductList from "./component/admin/ProductList.js"
import NewProduct from "./component/admin/NewProduct.js"
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrderList from "./component/admin/OrderList.js"
import ProcessOrder from "./component/admin/ProcessOrder.js"
import UsersList from "./component/admin/UsersList.js"
import UpdateUser from "./component/admin/UpdateUser.js"
import ProductReviews from "./component/admin/ProductReviews.js"
import Contact from "./component/layout/contect/Contact.js";
import About from "./component/layout/about/About.js"
import NotFound from "./component/layout/notfound/NotFound.js"

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const stripePromise = loadStripe(stripeApiKey)
  

  useEffect(() => { 
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    const fetchStripeApiKey = async () => {
      try {
        const { data } = await axios.get("https://mern-stack-ecommerce-bh7z.onrender.com/api/v1/stripekey");
        setStripeApiKey(data.stripteApikey);
       
       
      } catch (error) {
        console.error("Error fetching Stripe API key:", error);
      }
    };

    fetchStripeApiKey();
    store.dispatch(loaduser());
  }, []);
 
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contect" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact  path="/login" element={<LoginSignUp />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/me/update" element={<ProtectedRoute component={UpdateProfile} />} />
        <Route path="/password/update" element={<ProtectedRoute component={UpdatePassword} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route exact path="/login/shipping" element={<ProtectedRoute component={Shipping} />} />
   

        <Route path="/order/:id" element={<ProtectedRoute component={OrderDatails} />} />
        <Route path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
    
        <Route path="/success" element={<ProtectedRoute component={CheckoutSuccess} />} />
        <Route path="/orders" element={<ProtectedRoute component={MyOrders} />} />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={stripePromise}  >
                <ProtectedRoute component={Payment} />
              </Elements>
            }
          />
        )}

<Route   exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}  component={Dashboard} />} />
<Route    exact path="/admin/products" element={<ProtectedRoute isAdmin={true}  component={ProductList} />} />
<Route    exact path="/admin/product" element={<ProtectedRoute isAdmin={true}  component={NewProduct} />} />
<Route    exact path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}  component={UpdateProduct} />} />
<Route    exact path="/admin/orders" element={<ProtectedRoute isAdmin={true}  component={OrderList} />} />
<Route    exact path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}  component={ProcessOrder} />} />
<Route    exact path="/admin/users" element={<ProtectedRoute isAdmin={true}  component={UsersList} />} />
<Route    exact path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}  component={UpdateUser} />} />
<Route    exact path="/admin/reviews" element={<ProtectedRoute isAdmin={true}  component={ProductReviews} />} />
<Route    path="*"  element={ <NotFound/>}  />
         
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
