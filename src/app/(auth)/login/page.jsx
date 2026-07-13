import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/Login/LoginForm";
import bannerImg from "../../../assets/Image/bodyflexingmen.png";
import armIcon from "../../../assets/Icons/arm-flex-icon.png";

export default function LoginPage() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen w-full bg-[#1d1c1c] text-white font-sans px-6 md:px-12 py-8">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={bannerImg}
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#222223] via-[#222223]/80 to-[#222223]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-neutral-900/40 backdrop-grayscale" />
      </div>

      {/* GLOW BLOBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-radial from-yellow-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-200 h-200 rounded-full bg-radial from-yellow-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-20 grow grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto items-center gap-12 my-auto py-8">
        {/* LEFT COLUMN */}
        <div className="hidden md:flex flex-col justify-center max-w-lg gap-6">
          <div className="font-heading uppercase font-extrabold italic text-6xl flex items-center gap-0 text-[#F2FD84]">
            gym
            <span className="ml-1.5">
              <Image src={armIcon} alt="Logo" className="w-18 h-auto" />
            </span>
            <span className="text-white">etix</span>
          </div>
          <div className="space-y-3">
            <h1 className="font-heading text-5xl flex flex-col gap-1 font-extrabold uppercase tracking-tight leading-none text-white">
              Welcome <br />
              <span className="text-[#F2FD84]">Back</span>
            </h1>
            <p className="font-body text-zinc-300 text-sm sm:text-base font-medium leading-relaxed">
              Log in to continue your fitness journey, track your workouts, and
              crush your goals.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex justify-center items-center w-full group">
          <div className="absolute hidden md:block w-[102%] h-[110%] bg-[#e2ff3b]/10 rounded-box blur-[30px] pointer-events-none z-0 transition-all duration-500 group-hover:scale-105 group-hover:bg-[#e2ff3b]/15" />

          <Suspense
            fallback={
              <div className="w-full max-w-md bg-zinc-950/75 border border-zinc-800/80 p-8 rounded-2xl text-center text-zinc-400">
                Loading form systems...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>

      {/* BOTTOM LINKS */}
      <div className="relative z-20 flex justify-center gap-6 text-[11px] font-bold tracking-wider uppercase text-zinc-500 pt-4 pb-2">
        <Link
          href="/"
          className="font-body hover:text-zinc-300 transition-colors"
        >
          Home
        </Link>
        <Link
          href="#"
          className="font-body hover:text-zinc-300 transition-colors"
        >
          News
        </Link>
        <Link
          href="#"
          className="font-body hover:text-zinc-300 transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
