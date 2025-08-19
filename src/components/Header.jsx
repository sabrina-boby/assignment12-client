import React, { useEffect, useState, useContext } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import { FaTint } from 'react-icons/fa';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Congratulation!",
          text: "LogOut Successful!",
          icon: "success"
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Home</NavLink></li>

      <li><NavLink to="/blog" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Blogs</NavLink></li>

      <li><NavLink to="/donation_Requests" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Donation Requests</NavLink></li>

      {
        user && (
          <>
          <li><NavLink to="/donor_Search" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Donor Search</NavLink></li>

            <li><NavLink to="/give_funding" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>FundingPage</NavLink></li>

            <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Dashboard</NavLink></li>

          </>
        )
      }





      {/* Small device এ dropdown এর মধ্যে SignUp দেখাবে যদি user না থাকে */}
      {!user && (
        <li className="block lg:hidden">
          <Link to="/registration" className="text-green-600 font-semibold">SignUp</Link>
        </li>
      )}

      {/* Small device এ dropdown এর মধ্যে user avatar + logout দেখাবে */}
      {user && (
        <li className="block lg:hidden">
          <div className="flex items-center gap-3 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
            <img
              src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              alt="user"
              className="w-8 h-8 rounded-full"
              title={user?.displayName}
            />
            <button onClick={handleLogOut} className="text-red-600 font-semibold flex items-center gap-1">
              <IoIosLogOut size={18} /> Logout
            </button>
          </div>
        </li>
      )}
    </>
  );

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      setShowNavbar(st < lastScrollTop);
      setLastScrollTop(st <= 0 ? 0 : st);

      if (scrollTimeout) clearTimeout(scrollTimeout);
      const timeout = setTimeout(() => setShowNavbar(true), 400);
      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollTop, scrollTimeout]);

  return (
    <div className={`navbar bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="navbar-start">
        <div className="dropdown">
          {/* Hamburger button: small ও medium ডিভাইসে দেখাবে, lg তে লুকাবে */}
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Dropdown menu: small ও medium ডিভাইসে দেখাবে, lg তে লুকাবে */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[999] lg:hidden">
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2 ml-3">
          <div className="flex items-center pt-2 gap-2 mb-4 text-red-600 font-bold text-2xl">
            <FaTint className="text-3xl" />
            <span className="font-bold text-[#E53935]">Blood<span className="text-[#39ab56]">Connect</span></span>
          </div>
        </Link>
      </div>

      {/* Center menu: শুধুমাত্র large ডিভাইসে দেখাবে */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  px-1 gap-4 text-[#1E88E5] font-medium">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Home</NavLink></li>
          <li><NavLink to="/blog" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Blogs</NavLink></li>
          <li><NavLink to="/donation_Requests" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Donation Requests</NavLink></li>
          {
            user && (
              <>
                <li><NavLink to="/give_funding" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>FundingPage</NavLink></li>
                <li><NavLink to="/donor_Search" className={({ isActive }) => isActive ? "text-green-600 underline" : ""}>Donor Search</NavLink></li>

              </>
            )
          }

        </ul>
      </div>

      {/* Navbar-end: medium ও large ডিভাইসে দেখাবে */}
      <div className="navbar-end hidden md:flex">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  title={user?.displayName}
                  alt="user"
                  src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu dropdown-content rounded-box font-bold bg-[#edd7d7] text-[14px]">
              <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-gray-700 underline" : ""}>Dashboard</NavLink></li>
              <li><a onClick={handleLogOut}><IoIosLogOut size={20} /> Logout</a></li>
            </ul>
          </div>
        ) : (
          <Link
            to={'/registration'}
            className="btn md:text-[16px] font-bold px-5 py-2 md:h-[40px] h-[40px] text-[18px] rounded-2xl bg-[#16a249] hover:bg-[#158f42] text-white"
          >
            SignUp
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
