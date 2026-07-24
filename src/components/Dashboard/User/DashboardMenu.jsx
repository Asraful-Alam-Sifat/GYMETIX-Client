"use client";

import { useState } from "react";
import {
  BookOpen,
  Heart,
  UserCheck,
  LayoutDashboard,
  LogOut,
  Home,
  Compass,
  MessageSquare,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import armIcon from "@/assets/Icons/arm-flex-icon.png";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  const closeSidebar = () => setIsOpen(false);

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Sign Out successfully..!");
            localStorage.removeItem("gymetix_welcomed");
            window.location.reload();
          },
        },
      });
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const getNavClass = (path) =>
    `flex group items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
      isActive(path)
        ? "text-[#F2FD84] bg-white/5 font-semibold"
        : "text-gray-400 hover:text-[#F2FD84] hover:bg-white/4"
    }`;

  const getDashboardNavClass = (path) =>
    isActive(path)
      ? "flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#F2FD84]/15 to-transparent border-l-4 border-[#F2FD84] text-[#F2FD84] font-medium text-sm transition-all shadow-[0_0_20px_-10px_rgba(242,253,132,0.2)]"
      : "flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] font-medium text-sm transition-all group";

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 bg-[#222222] border-b border-white/10 px-4 py-3 flex items-center justify-between w-full">
        <Link
          href="/"
          className="font-heading uppercase font-extrabold italic text-xl flex items-center text-[#F2FD84]"
        >
          gym
          <span className="ml-1">
            <Image src={armIcon} alt="Logo" className="w-5 h-auto" />
          </span>
          <span className="text-white">etix</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#F2FD84] hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 2. Backdrop Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* 3. Responsive Sidebar Drawer */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 md:z-40 h-screen w-72 bg-[#222222] border-r border-white/10 
          flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div>
          {/* Logo Area */}
          <div className="p-6 border-b border-white/8 flex items-center justify-between">
            <Link
              href="/"
              className="font-heading uppercase font-extrabold italic text-2xl flex items-center gap-0 text-[#F2FD84] bg-transparent"
            >
              gym
              <span className="ml-1.5">
                <Image src={armIcon} alt="Logo" className="w-6 h-auto" />
              </span>
              <span className="text-white">etix</span>
            </Link>
            <span className="text-[10px] tracking-widest uppercase font-bold bg-[#F2FD84]/10 text-[#F2FD84] px-2 py-0.5 rounded border border-[#F2FD84]/20">
              dashboard
            </span>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-6">
            {/* Quick Navigation */}
            <div>
              <p className="px-4 text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#F2FD84]/90 mb-3">
                Quick Navigation
              </p>
              <nav className="space-y-1.5">
                <Link
                  href="/"
                  className={getNavClass("/")}
                  onClick={closeSidebar}
                >
                  <Home
                    className={`w-3.5 h-3.5 ${isActive("/") ? "text-[#F2FD84]" : "text-gray-500 group-hover:text-[#F2FD84]"}`}
                  />
                  <span>Home Page</span>
                </Link>

                <Link
                  href="/all-classes"
                  className={getNavClass("/all-classes")}
                  onClick={closeSidebar}
                >
                  <Compass
                    className={`w-3.5 h-3.5 ${isActive("/all-classes") ? "text-[#F2FD84]" : "text-gray-500 group-hover:text-[#F2FD84]"}`}
                  />
                  <span>All Classes</span>
                </Link>

                <Link
                  href="/community-forum"
                  className={getNavClass("/community-forum")}
                  onClick={closeSidebar}
                >
                  <MessageSquare
                    className={`w-3.5 h-3.5 ${isActive("/community-forum") ? "text-[#F2FD84]" : "text-gray-500 group-hover:text-[#F2FD84]"}`}
                  />
                  <span>Community Forum</span>
                </Link>
              </nav>
            </div>

            {/* Dashboard Menu */}
            <div>
              <p className="px-4 text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#F2FD84]/90 mb-3">
                Dashboard Menu
              </p>
              <nav className="space-y-1.5">
                <Link
                  href="/dashboard/user"
                  className={getDashboardNavClass("/dashboard/user")}
                  onClick={closeSidebar}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard
                      className={`w-4 h-4 ${isActive("/dashboard/user") ? "text-[#F2FD84]" : "text-gray-400 group-hover:text-[#F2FD84] transition-colors"}`}
                    />
                    <span>Overview</span>
                  </div>
                  {isActive("/dashboard/user") && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  )}
                </Link>

                <Link
                  href="/dashboard/user/booked-classes"
                  className={getDashboardNavClass(
                    "/dashboard/user/booked-classes",
                  )}
                  onClick={closeSidebar}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen
                      className={`w-4 h-4 ${isActive("/dashboard/user/booked-classes") ? "text-[#F2FD84]" : "text-gray-400 group-hover:text-[#F2FD84] transition-colors"}`}
                    />
                    <span>Booked Classes</span>
                  </div>
                  {isActive("/dashboard/user/booked-classes") && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  )}
                </Link>

                <Link
                  href="/dashboard/user/favorites"
                  className={getDashboardNavClass("/dashboard/user/favorites")}
                  onClick={closeSidebar}
                >
                  <div className="flex items-center gap-3">
                    <Heart
                      className={`w-4 h-4 ${isActive("/dashboard/user/favorites") ? "text-[#F2FD84]" : "text-gray-400 group-hover:text-[#F2FD84] transition-colors"}`}
                    />
                    <span>Favorites</span>
                  </div>
                  {isActive("/dashboard/user/favorites") && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  )}
                </Link>

                <Link
                  href="/dashboard/user/apply-trainer"
                  className={getDashboardNavClass(
                    "/dashboard/user/apply-trainer",
                  )}
                  onClick={closeSidebar}
                >
                  <div className="flex items-center gap-3">
                    <UserCheck
                      className={`w-4 h-4 ${isActive("/dashboard/user/apply-trainer") ? "text-[#F2FD84]" : "text-gray-400 group-hover:text-[#F2FD84] transition-colors"}`}
                    />
                    <span>Apply as Trainer</span>
                  </div>
                  {isActive("/dashboard/user/apply-trainer") && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  )}
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* User Profile Card & Sign Out */}
        <div className="p-4 border-t border-white/8 bg-[#141414]/50 space-y-3">
          <Link
            href="/profile"
            onClick={closeSidebar}
            className="flex items-center gap-3 p-2 rounded-xl bg-white/3 border border-white/5 backdrop-blur-sm transition-all duration-200 hover:border-[#F2FD84]/30 hover:shadow-[0_0_30px_-10px_rgba(242,253,132,0.15)] overflow-hidden hover:scale-99"
          >
            <div className="relative w-9 h-9 flex-shrink-0">
              {user?.image ? (
                <Image
                  fill
                  sizes="76px"
                  src={user.image}
                  alt={user?.name || "User Profile"}
                  className="w-9 h-9 rounded-lg object-cover border border-[#F2FD84]/30"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-[#F2FD84]/15 border border-[#F2FD84]/40 flex items-center justify-center text-[#F2FD84] font-bold text-sm">
                  {firstInitial}
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-heading text-xs font-bold text-white truncate">
                {session?.user?.name}
              </h4>
              <p className="text-[10px] text-[#F2FD84] font-medium">Profile</p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 font-medium text-xs transition-all border border-red-500/10 cursor-pointer hover:scale-99"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
