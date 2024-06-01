import React, { useState } from "react";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/userAction";
import image from "../../../images/Profile.png";
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
  const [show, setShow] = useState(false);
  const [uses, setUsers] = useState(false);
  const dispatch = useDispatch();
  // const [login,SetLogin] = useState(true)
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const Logout = () => {
    dispatch(logout());
  };
  const handleClick = () => {
    //
    setShow((prevValue) => !prevValue);
  };

  const handleClickUser = (event) => {
    event.stopPropagation();
    setUsers((prevValue) => !prevValue);
  };
  const cartlength = cartItems.length;

  return (
    <>
      <nav
        className={`bg-gray-800 z-50    w-[100vw] top-0 left-0   `}
        onClick={() => {
          setUsers(false);
        }}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={handleClick}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link to="/" className="flex flex-shrink-0 items-center">
                <img
                  className="h-auto w-[100px] hidden xl:block mr-6 cursor-pointer "
                  src={logo}
                  alt="Your Company"
                />
              </Link>
              <div className="hidden sm:ml-6 mt-2 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="active:bg-gray-900 text-center focus:outline-none focus:ring focus:ring-violet-300  text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700  hover:scale-125 transition-all  duration-500  "
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    to="/Products"
                    className="text-gray-300 focus:outline-none focus:ring focus:ring-g-300 active:bg-gray-900 hover:bg-gray-700 hover:text-white hover:scale-125 transition-all  duration-500  rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Products
                  </Link>
                  <Link
                    to="/contect"
                    className="text-gray-300 focus:outline-none focus:ring focus:ring-g-300 active:bg-gray-900 hover:bg-gray-700 hover:text-white rounded-md hover:scale-125 transition-all  duration-500  px-3 py-2 text-sm font-medium"
                  >
                    Contect
                  </Link>
                  <Link
                    to="/about"
                    className="text-gray-300 focus:outline-none focus:ring focus:ring-g-300 active:bg-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:scale-125 transition-all  duration-500 "
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="mx-4 hover:scale-125 transition-all  duration-500  px-2 relative hidden md:block rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 font-[500] font-serif"
                >
                  Login
                </Link>
              )}
             {isAuthenticated && user && user.role==="admin" && (
               <Link
               to="/admin/dashboard"
               className=" relative rounded-full md:text-[1.6vmax]   hover:scale-125 transition-all  duration-500 font-extralight text-[2vmax] mx-2 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
             >
               <AiOutlineHome  className=""/>

             </Link>
             )}
              <Link
                to="/cart"
                className={`  relative font-medium rounded-full md:text-[1.5vmax] hover:scale-125 transition-all duration-500    text-[2.3vmax] mx-2 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 `}
              >
                <MdOutlineShoppingCart />
                {cartlength > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
                    {cartlength}
                  </span>
                )}
              </Link>

              
              <Link
                className="   relative rounded-full md:text-[1.3vmax] hover:scale-125 transition-all duration-500 font-extralight text-[2vmax] mx-2 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                to="/search"
              >
                <FaSearch />
              </Link>

              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex hover:scale-125 transition-all duration-500 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={handleClickUser}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    {isAuthenticated &&
                    user &&
                    user.avatar &&
                    user.avatar.url ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar.url}
                        alt="profile"
                      />
                    ) : (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={image}
                        alt="profile"
                      />
                    )}
                  </button>
                </div>

                <div
                  className={`absolute ${
                    uses ? "block " : " hidden"
                  } right-0 z-10 mt-2 w-48 origin-top-right rounded-md overflow-hidden bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                
                
                  <Link
                    to="/profile"
                    className="block hover:scale-110 hover:bg-[#f5dcdc]  transition-all  duration-500 px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                 {user && user.role==="admin"&& ( <Link
                    to="/admin/dashboard"
                    className="block md:hidden hover:scale-110 transition-all hover:bg-[#f5dcdc]   duration-500  px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Dashboard
                  </Link>)

                 }
                  {isAuthenticated ? (
                    <Link
                      to="/"
                      onClick={Logout}
                      className="block px-4 py-2 hover:scale-110 transition-all hover:bg-[#f5dcdc]   duration-500 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Log-out
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="block hover:scale-110 transition-all  hover:bg-[#f5dcdc]  duration-500 px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Login/Sign-up
                    </Link>
                  )}

                 
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`sm:hidden  transition-all ${
            show ? " block  " : "hidden  "
          }   duration-500`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            
            <Link
              to="/"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/Products"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </Link>
            <Link
              to="/contect"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Contect
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
