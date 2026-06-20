"use client";
import Image from "next/image";
import Link from "next/link";
import armIcon from "../../assets/Icons/arm-flex-icon.png";
import { useEffect } from "react";

const NavBar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('main-navbar');
      if (window.scrollY > 20) {
        // Scrolled state: blurred glass effect with dark tint
        navbar.classList.add('bg-[#222222]/70', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-white/5');
        navbar.classList.remove('bg-transparent');
      } else {
        // Initial state: fully transparent
        navbar.classList.remove('bg-[#222222]/70', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-white/5');
        navbar.classList.add('bg-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav 
      id="main-navbar" 
      className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300 ease-in-out"
    >
      <div className="max-w-11/12 mx-auto px-4 py-3 flex items-center justify-between">
       
      
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-[#F2FD84] hover:text-[#061A19] lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-[#222222] rounded-box z-1 mt-3 w-52 p-2 text-xl font-body font-medium uppercase"
            >
              <li className="hover:bg-[#F2FD84] hover:text-[#061A19] ">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:bg-[#F2FD84] hover:text-[#061A19]">
                <Link href="/all-classes">All Classes</Link>
              </li>
              <li className="hover:bg-[#F2FD84] hover:text-[#061A19]">
                <Link href="/community-forum">Community Forum</Link>
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="font-heading uppercase font-extrabold italic text-4xl flex items-center gap-0 text-[#F2FD84] bg-transparent"
          >
            gym
            <span className="ml-1.5 ">
              <Image src={armIcon} alt="Logo"  className="w-11 h-auto" />
            </span>
            <span className="text-white">etix</span>
          </Link>
        </div>
        {/* Navbar center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium font-body capitalize">
           <li>
      <Link href="/" className="bg-transparent text-white/45 transition-colors duration-200 hover:text-[#F2FD84]/90">
        Home
      </Link>
    </li>
    
    <li>
      <Link href="/all-classes" className="bg-transparent text-white/45 transition-colors duration-200 hover:text-[#F2FD84]/90">
        All Classes
      </Link>
    </li>
    
    <li>
      <Link href="/community-forum" className="bg-transparent text-white/45 transition-colors duration-200 hover:text-[#F2FD84]/90">
        Community Forum
      </Link>
    </li>
          </ul>
        </div>

        {/* Navbar end */}
        <div className="navbar-end">
          <Link href="/login" className="font-heading border border-[#F2FD84]/70 px-6 py-1.5 text-[#F2FD84] bg-transparent hover:bg-[#F2FD84] hover:text-[#061A19] uppercase  rounded-lg transition-colors duration-200">
            Login
          </Link>
          <Link href="/signup" className="font-heading border border-[#F2FD84]/70 px-6 py-1.5 hover:text-[#F2FD84] ml-2 bg-[#F2FD84] hover:bg-transparent text-[#061A19] uppercase rounded-lg transition-colors duration-200">
            get started
          </Link>
        </div>
      </div>
     
    </nav>
  );
};

export default NavBar;
