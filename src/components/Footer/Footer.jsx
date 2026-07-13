import Image from "next/image";
import Link from "next/link";
import armIcon from "../../assets/Icons/arm-flex-icon.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white pt-16 pb-6 border-t border-zinc-900 ">
      <div className="max-w-11/12 mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-2xl font-black italic tracking-wider text-[#E2F163]">
            <div
              className="font-heading uppercase font-extrabold italic text-3xl flex items-center gap-0 text-[#F2FD84] bg-transparent"
            >
              gym
              <span className="ml-1.5 ">
                <Image src={armIcon} alt="Logo" className="w-10 h-auto" />
              </span>
              <span className="text-white">etix</span>
            </div>
          </div>
          <p className="font-body text-zinc-400 text-sm max-w-sm leading-relaxed ">
            GYMETIX is your all-in-one platform for discovering elite fitness
            classes, connecting with expert trainers, and tracking your
            transformation journey.
          </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="#"
              target="_blank"
              className="text-[#F2FD84] text-xl border border-[#F2FD84]/30 p-2 rounded-lg hover:border-[#F2FD84]/25 hover:bg-[#F2FD84] hover:text-black transition-colors duration-200"
            >
              <FaXTwitter />
            </Link>
            <Link
              href="#"
              target="_blank"
              className="text-[#F2FD84] text-xl border border-[#F2FD84]/30 p-2 rounded-lg hover:border-[#F2FD84]/25 hover:bg-[#F2FD84] hover:text-black transition-colors duration-200"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href="#"
              target="_blank"
              className="text-[#F2FD84] text-xl border border-[#F2FD84]/30 p-2 rounded-lg hover:border-[#F2FD84]/25 hover:bg-[#F2FD84] hover:text-black transition-colors duration-200"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="#"
              target="_blank"
              className="text-[#F2FD84] text-xl border border-[#F2FD84]/30 p-2 rounded-lg hover:border-[#F2FD84]/25 hover:bg-[#F2FD84] hover:text-black transition-colors duration-200"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wide font-heading">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-zinc-400 flex flex-col font-body">
            <Link
              href="/"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/classes"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              All Classes
            </Link>
            <Link
              href="/community-forum"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Community Forum
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Dashboard
            </Link>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-white font-bold text-base mb-4 tracking-wide">
            Company
          </h4>
          <ul className="font-body space-y-3 text-sm text-zinc-400 flex flex-col">
            <Link
              href="#"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Careers
            </Link>
            <Link
              href="#"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Press
            </Link>
            <Link
              href="#"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Partners
            </Link>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-white font-bold text-base mb-4 tracking-wide">
            Support
          </h4>
          <ul className="font-body space-y-3 text-sm text-zinc-400 flex flex-col">
            <Link
              href="#"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-[#F2FD84] transition-colors duration-200"
            >
              Contact Us
            </Link>
          </ul>
        </div>
      </div>

      <div className=" px-6 mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
        <div>
          &copy; {new Date().getFullYear()} GYMETIX. All rights reserved.
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link
            href="mailto:support@gymetix.com"
            className="flex items-center gap-2 hover:text-[#F2FD84] transition-colors"
          >
            <span>
              <CiMail />
            </span>{" "}
            support@gymetix.com
          </Link>
          <Link
            href="tel:+8801538568854"
            className="flex items-center gap-2 hover:text-[#F2FD84] transition-colors"
          >
            <span>
              <FaPhoneAlt />
            </span>{" "}
            +880 15385 68854
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
