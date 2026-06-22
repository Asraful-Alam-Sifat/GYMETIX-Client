"use client";
import Image from "next/image";
import Link from "next/link";
import armIcon from "../../assets/Icons/arm-flex-icon.png";
import { useEffect } from "react";

const NavBar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("main-navbar");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add(
            "bg-black/30",
            "backdrop-blur-md",
            "shadow-sm",
            "border-zinc-900",
          );
          navbar.classList.remove("bg-transparent", "border-transparent");
        } else {
          navbar.classList.add("bg-transparent", "border-transparent");
          navbar.classList.remove(
            "bg-black/30",
            "backdrop-blur-md",
            "shadow-sm",
            "border-zinc-900",
          );
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      id="main-navbar"
      className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300 ease-in-out"
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
              <hr className="text-white/15" />
              <li className=" flex flex-col sm:hidden gap-2.5 mt-1">
                <Link
                  href="/login"
                  className="text-zinc-400 px-6 py-1.5 text-base font-medium font-heading uppercase rounded-lg transition-colors duration-300 hover:text-[#F2FD84]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="bg-[#F2FD84] border-2 border-[#E2F163] text-black px-6 py-1.5 text-base font-medium font-heading uppercase rounded-lg transition-all duration-300 hover:bg-[#222222] hover:text-white hover:border-zinc-800"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
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
        {/* Navbar center */}
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

        {/* Navbar end */}
        <div className="navbar-end hidden sm:flex">
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
