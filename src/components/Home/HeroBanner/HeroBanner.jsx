import Image from "next/image";
import bannerImg from "@/assets/Image/workout-banner.png";
import Link from "next/link";
import Counter from "@/components/Home/HeroBanner/StatsCounter";
import { FaArrowRightLong } from "react-icons/fa6";

const HeroBanner = () => {
  return (
    <section className="relative w-full bg-[#111111] text-white min-h-[80vh] flex flex-col justify-between overflow-hidden">
      {/* 1. Background Image & Gradient */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src={bannerImg}
          alt="Hero Banner"
          fill
          
          className="object-cover object-right md:object-center"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#222223] via-[#222223]/80 to-[#222223]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-neutral-900/40 backdrop-grayscale" />
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 sm:max-w-11/12 xl:max-w-10/12  w-full mx-auto px-6 md:px-12 grow flex flex-col justify-center pt-24 pb-12">
        <div className="max-w-2xl space-y-6">
          <h1 className="font-heading text-4xl md:text-7xl font-black tracking-wide uppercase leading-tight select-none">
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              Achieve
            </span>{" "}
            <span className="text-[#F2FD84]">More</span> <br />
            Than Just Fitness
          </h1>

          <p className="font-body text-gray-400 text-sm md:text-base max-w-lg leading-relaxed">
            Combine strength, flexibility, and endurance in a community that
            values well-rounded health and supportive growth.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/all-classes"
              className="font-heading bg-[#F2FD84] text-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded hover:bg-white transition-colors duration-300 flex items-center gap-1"
            >
              Explore Classes <FaArrowRightLong />
            </Link>
            <Link
              href="/signup"
              className="font-heading border border-white text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded hover:bg-white hover:text-black transition-all duration-300"
            >
              Join for Free
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Stats Bar */}
      <div className="relative z-10 bg-zinc-900/10 backdrop-blur-sm border border-[#737373]/70 min-w-9/12 max-w-11/12 sm:max-w-10/12 mx-auto  -mb-2 pb-3">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold">
              <Counter to={500} />
              <span className="text-[#F2FD84]">+</span>
            </h3>
            <p className="font-body text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1">
              Happy Members
            </p>
            <p className="font-body text-[11px] sm:text-xs text-gray-400 tracking-wider mt-1">
              Our community is growing fast!
            </p>
          </div>
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold">
              <Counter to={30} />
              <span className="text-[#F2FD84]">+</span>
            </h3>
            <p className="font-body text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1">
              Weekly Classes
            </p>
            <p className="font-body text-[11px] sm:text-xs text-gray-400 tracking-wider mt-1">
              Pick from various workouts
            </p>
          </div>
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold">
              <Counter to={10} />
            </h3>
            <p className="font-body text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1">
              Certified Trainers
            </p>
            <p className="font-body text-[11px] sm:text-xs text-gray-400 tracking-wider mt-1">
              Guidance at every step.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold">
              <Counter to={99} />
              <span className="text-[#F2FD84]">%</span>
            </h3>
            <p className="font-body text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1">
              Customer Satisfaction
            </p>
            <p className="font-body text-[11px] sm:text-xs text-gray-400 e tracking-wider mt-1">
              We ensure your progress satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
