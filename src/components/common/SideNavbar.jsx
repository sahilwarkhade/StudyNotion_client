// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authAPI';

export const SideNavbar = ({isOpen,subLinks}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const handleLinkClick = (e) => {
    e.stopPropagation();
    isOpen(false);
  };
  return (
      <div className={"md:hidden absolute right-0 "+ (isOpen ? "top-[58px]" : "-top-96") +" min-h-48 w-screen bg-richblack-800 text-white z-50 transition-transform duration-300 text-xl ease-in-out"}>
        {/* <div className="p-4 text-2xl font-bold cursor-pointer" onClick={()=>{isOpen(false)}}>
            <ImCross fontSize={24} fill="#AFB2BF" className="pointer-events-none z-60" />
        </div> */}
        <ul>
          <li className="p-4 hover:bg-gray-700 hover:opacity-75">
            <Link to={"/"} onClick={handleLinkClick}>Home</Link>
          </li>
          {
            token &&
            <li className="p-4 hover:bg-gray-700 hover:opacity-75">
              <Link to={"/dashboard/my-profile"} onClick={handleLinkClick}>Dashboard</Link>
            </li>
          }
          
          <li className="p-4 hover:bg-gray-700 hover:opacity-75">
            <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="w-full text-left">
              Category {isCategoryOpen ? '▲' : '▼'}
            </button>
            {isCategoryOpen && (
              <>
                              {subLinks
                                ?.filter(
                                  (subLink) => subLink?.courses?.length > 0
                                )
                                ?.map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-lg bg-transparent py-4 pl-4"
                                    key={i}
                                  >
                                    <p onClick={handleLinkClick} className='pl-8 rounded-full min-h-[50 px] w-[60%] hover:opacity-75'>{subLink.name}</p>
                                  </Link>
                                ))}
                            </>
            )}
          </li>

          { 
            token && 
            <li className="p-4 hover:bg-gray-700 hover:opacity-75">
              <Link onClick={handleLinkClick} to="/dashboard/cart">Your Cart</Link>
            </li>
          }

          <li className="p-4 hover:bg-gray-700 hover:opacity-75">
            <Link onClick={handleLinkClick} to={"/contact"}>Contact Us</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 hover:opacity-75">
            <Link onClick={handleLinkClick} to={"/about"}>About Us</Link>
          </li>
          {
            token ?
            <li className="p-4 hover:bg-gray-700">
              <button onClick={() => {
                dispatch(logout(navigate))
                isOpen(false)
              }} className='w-full h-14 rounded-full text-center border border-white hover:bg-black hover:text-white duration-500 mb-4' >Log Out</button>
            </li> :
            <div className='flex flex-col gap-y-6 px-8 mt-7'>
                <Link to={"/login"} onClick={handleLinkClick} className='hover:bg-white hover:text-black'>
                    <button className='w-full h-14 rounded-full text-center border border-white duration-500' >Sign in</button>
                </Link>
                <Link to={"/signup"} onClick={handleLinkClick} className='hover:bg-white hover:text-black'>
                <button className='w-full h-14 rounded-full text-center border border-white duration-500 mb-4' >Sign Up</button>
                </Link>
    
            </div>
          }
        </ul>
    </div>
  );
};


