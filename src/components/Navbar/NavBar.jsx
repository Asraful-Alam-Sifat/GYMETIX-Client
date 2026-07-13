"use client";
import Image from "next/image";
import Link from "next/link";
import armIcon from "../../assets/Icons/arm-flex-icon.png";
import { useEffect, useState, useRef } from "react";
// Import your Better Auth client instance (adjust path if your client is elsewhere)
import { authClient } from "@/lib/auth-client"; 
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";

const NavBar = () => {
  // 1. Get session state from Better Auth client hook
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 2. Handle Logout action using Better Auth client actions
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setDropdownOpen(false);
            window.location.reload(); // Optional: Refresh to clear context states cleanly
          },
        },
      });
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sticky Navbar Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("main-navbar");
      if (!navbar) return;
      
      if (window.scrollY > 50) {
        navbar.classList.add(
          "bg-black/30",
          "backdrop-blur-md",
          "shadow-sm",
          "border-zinc-900"
        );
        navbar.classList.remove("bg-transparent", "border-transparent");
      } else {
        navbar.classList.add("bg-transparent", "border-transparent");
        navbar.classList.remove(
          "bg-black/30",
          "backdrop-blur-md",
          "shadow-sm",
          "border-zinc-900"
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-navbar"
      className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300 ease-in-out border-b border-transparent"
    >
      <div className="max-w-11/12 mx-auto px-4 py-3 flex items-center justify-between">
        {/* Navbar Start */}
        <div className="navbar-start mx-auto w-8/12 justify-between sm:justify-start ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-[#F2FD84] hover:text-[#061A19] lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            
            {/* MOBILE DROPDOWN LINKS */}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-[#222222] rounded-box z-1 mt-3 w-52 px-2 text-xl font-body font-medium uppercase"
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
              <hr className="text-white/15" />
              
              {/* Conditional Mobile Auth Section */}
              <li className="flex flex-col sm:hidden gap-2.5 mt-1">
                {isPending ? (
                  <span className="text-zinc-500 text-sm animate-pulse px-6 py-1.5">Loading...</span>
                ) : user ? (
                  <>
                    <div className="space-y-0 flex flex-col">
                      <div className="font-heading w-full flex flex-start text-white/95 text-base font-semibold ">
                      {user.name || "User"}
                    </div>
                    <p className="font-body text-zinc-500 text-xs truncate lowercase">
                      {user.email}
                    </p>
                    </div>
                 <ul className="space-y-0 mb-0 border-none">
                    <li>
                      <Link 
                        href="/dashboard" 
                        onClick={() => setDropdownOpen(false)}
                        className="font-body flex items-center gap-2 px-3 py-2 rounded-sm text-[12px] text-[#bebeca] hover:text-[#F2FD84]/85 hover:bg-white/5 transition-colors duration-150 font-medium"
                      >
                        <RxDashboard />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                         <Link
                  href="/profile"
                   className="font-body flex items-center gap-2 px-3 py-2 rounded-sm text-[12px] text-[#bebeca] hover:text-[#F2FD84]/85 hover:bg-white/5 transition-colors duration-150 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  Profile
                </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="font-body w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#bebeca] hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors duration-150 text-left font-medium"
                      >
                        <FaArrowRightFromBracket />
                        Log out
                      </button>
                    </li>
                   
                 </ul>
                 
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-zinc-400 px-6 py-1.5 text-base font-medium font-heading uppercase rounded-lg transition-colors duration-300 hover:text-[#F2FD84]"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-[#F2FD84] border-2 border-[#E2F163] text-black px-6 py-1.5 text-base font-medium font-heading uppercase rounded-lg transition-all duration-300 hover:bg-[#222222] hover:text-white hover:border-[#E2F163]/75"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
          
          {/* Brand Logo */}
          <Link
            href="/"
            className="font-heading uppercase font-extrabold italic text-3xl sm:text-4xl flex items-center gap-0 text-[#F2FD84] bg-transparent"
          >
            gym
            <span className="ml-1.5 ">
              <Image src={armIcon} alt="Logo" className="w-9 sm:w-11 h-auto" />
            </span>
            <span className="text-white">etix</span>
          </Link>
        </div>

        {/* Navbar Center (Desktop Links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium font-body capitalize">
            <li>
              <Link
                href="/"
                className="bg-transparent text-zinc-400 transition-colors duration-200 hover:text-[#F2FD84]/90"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/all-classes"
                className="bg-transparent text-zinc-400 transition-colors duration-200 hover:text-[#F2FD84]/90"
              >
                All Classes
              </Link>
            </li>
            <li>
              <Link
                href="/community-forum"
                className="bg-transparent text-zinc-400 transition-colors duration-200 hover:text-[#F2FD84]/90"
              >
                Community Forum
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar End (Desktop Authentication) */}
        <div className="navbar-end hidden sm:flex">
          {isPending ? (
            /* Prevent UI shifting during session handshake check */
            <div className="w-24 h-8 bg-zinc-800/50 animate-pulse rounded-lg" />
          ) : user ? (
            /* IF LOGGED IN: Show Better Auth User Profile Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 border border-zinc-800 hover:border-[#F2FD84]/40 bg-zinc-900/50 hover:bg-zinc-900/90 px-1.5 py-1.5 rounded-full transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full bg-[#F2FD84]/20 overflow-hidden border border-[#F2FD84]/40 flex items-center justify-between text-[#F2FD84] font-bold text-xs">
                  {user.image ? (
                    <Image
                    width={40}
                      height={40}
                      src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=0DBF82&fontFamily=Arial&fontSize=40&fontWeight=600`} 
                      alt={user.name || "User"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-heading w-full text-center">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                </div>
                <span className="font-heading text-[#F2FD84] text-lg font-medium tracking-wide">
                  {user.name || "My Account"}
                </span>
                <svg 
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Pop-out Box Dropdown Layout */}
              {dropdownOpen && (
                <div className="absolute right-0 my-2.5 w-60 bg-[#161616] border border-zinc-800 rounded-xl shadow-2xl p-2.5 z-50 hover:border-[#E2F163]/25 hover:shadow-xl hover:shadow-[#E2F163]/5 transition-all duration-300">
                  <div className="px-3 py-2 border-b border-zinc-900 mb-2">
                    <p className="font-heading text-white/95 text-base font-semibold truncate">
                      {user.name || "User"}
                    </p>
                    <p className="font-body text-zinc-500 text-xs truncate lowercase">
                      {user.email}
                    </p>
                  </div>
              <hr className="border-[#E2F163]/25" />
                  <ul className="space-y-1">
                    <li>
                      <Link 
                        href="/dashboard" 
                        onClick={() => setDropdownOpen(false)}
                        className="font-body flex items-center gap-2 px-3 py-2 rounded-sm text-sm text-[#bebeca] hover:text-[#F2FD84]/85 hover:bg-white/5 transition-colors duration-150 font-medium"
                      >
                        <RxDashboard />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                         <Link
                  href="/profile"
                   className="font-body flex items-center gap-2 px-3 py-2 rounded-sm text-sm text-[#bebeca] hover:text-[#F2FD84]/85 hover:bg-white/5 transition-colors duration-150 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  Profile
                </Link>
                    </li>
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="font-body w-full flex items-center gap-2 px-3 py-2 text-sm  text-[#bebeca] hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors duration-150 text-left font-medium"
                      >
                        <FaArrowRightFromBracket />
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* IF GUEST: Show standard access buttons */
            <>
              <Link
                href="/login"
                className="text-zinc-400 px-6 py-1.5 text-base font-medium font-heading uppercase rounded-lg transition-colors duration-300 hover:text-[#F2FD84]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#F2FD84] border-2 border-[#E2F163] text-black px-6 py-1.5 text-base font-medium font-heading uppercase rounded-lg transition-all duration-300 hover:bg-[#222222] hover:text-white hover:border-[#E2F163]/75"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;