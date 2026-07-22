"use client";
import Image from "next/image";
import backgroundImage from "@/assets/Image/women-workout.png";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const JoinNow = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <section className="relative w-full py-25 flex items-center justify-center overflow-hidden bg-[#222222]">
      {/* Background Image with Overlay */}
      <Image
        src={backgroundImage}
        alt="Person working out"
        fill
        className="object-cover object-center"
     
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#222223]/10 via-[#222223]/85 to-[#050505] mix-blend-multiply" />
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-grayscale" />

      <div className="absolute -bottom-10 -right-30 w-170 h-170 rounded-full bg-radial from-[#F2FD84]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="w-10/12 flex justify-end">
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="font-heading text-5xl md:text-7xl font-black uppercase text-white mb-6 leading-tight">
            Ready to start your <br />
            journey with <span className="text-[#F2FD84]">gymetix?</span>
          </h1>
          <p className="font-body text-gray-300 text-lg md:text-xl mb-8">
            Reserve Your Spot Today!
          </p>

          <Link
            href={user ? "/dashboard" : "/signup"}
            className="bg-[#F2FD84] hover:bg-white text-[#222222] font-bold rounded-box uppercase py-4 px-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(242,253,132,0.4)]"
          >
            Join Now
          </Link>
        </div>
      </div>

      {/* Decorative Accent matching the theme */}
      <div className="absolute bottom-3 -left-20 sm:bottom-5 sm:-left-5 md:bottom-10 md:left-10 lg:top-27 w-10 h-84 sm:w-11 md:w-14  rotate-85 bg-[#F2FD84]/25 skew-x-[-40deg] pointer-events-none" />
      <div className="absolute -bottom-25 -left-30 w-70 h-50 sm:w-90 sm:h-56 md:w-125 md:h-60 bg-[#F2FD84]/13 rotate-35 group-hover:scale-110 transition-transform duration-500" />
    </section>
  );
};

export default JoinNow;
