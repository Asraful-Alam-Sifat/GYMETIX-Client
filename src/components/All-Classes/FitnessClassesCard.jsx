import Image from "next/image";
import Link from "next/link";
import { MdStar } from "react-icons/md";

export default function FitnessClassesCard({ classItem }) {
  return (
    <div className="w-full shrink-0 group rounded-xl p-px bg-linear-to-t from-gray-500 via-gray-900/40 to-transparent hover:from-[#F2FD84]/40 hover:via-[#F2FD84]/50 hover:to-transparent shadow-lg hover:shadow-[#F2FD84]/10 transition-all duration-300 select-none">
      {/* Card Container  */}
      <div className="w-full h-full bg-[#2B2B2B] backdrop-blur-md rounded-[11px] overflow-hidden flex flex-col justify-between">
        {/* Class Image Container */}
        <div className="relative h-52 w-full bg-gray-950 overflow-hidden">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={
              classItem.image ||
              "https://images.unsplash.com/photo-1517838277536-f5f99be501cd"
            }
            alt={classItem.title}
            priority={true}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />

          {/*  Angled Corner */}
          <div className="absolute -bottom-44 -right-20 w-42 h-90 rotate-45 z-10 border-35 border-[#F2FD84]/20 transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute -bottom-44 -right-35 w-42 h-90 rotate-45 z-10 border-15 border-[#F2FD84]/10 transition-transform duration-500 group-hover:scale-110" />

          {/* View Details Button */}
          <div className="absolute inset-0 bg-black/60 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
            <Link
              href={`/classes/${classItem._id}`}
              className="font-heading text-white border border-white text-xs font-black px-5 py-2.5 rounded-lg uppercase tracking-wider translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:bg-[#F2FD84] hover:text-black hover:border-transparent active:scale-95"
            >
              View Details
            </Link>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent z-0" />

          {/* Category Badge */}
          <span className="font-heading absolute top-3 left-3 bg-[#ff1e1e] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider z-30 opacity-100 lg:opacity-100 lg:group-hover:opacity-0 transition-opacity duration-300">
            {classItem.category}
          </span>

          {/* Level Badge */}
          <span className="font-heading absolute top-3 right-3 bg-black/70 border border-gray-800 text-gray-300 text-[10px] font-medium px-2 py-1 rounded-sm uppercase tracking-wider z-30 opacity-100 lg:opacity-100 lg:group-hover:opacity-0 transition-opacity duration-300">
            {classItem.level}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-5 grow flex flex-col justify-between bg-black/20 relative z-20">
          <div>
            {/* Main Title */}
            <Link
              href={`/classes/${classItem._id}`}
              className="font-heading text-lg font-extrabold text-white tracking-wide mb-2 uppercase group-hover:text-[#F2FD84] transition-colors truncate"
            >
              <span className="relative inline-block pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-current after:transition-all after:duration-500 after:ease-in-out hover:after:w-full hover:after:left-0 group-hover/link:after:left-full">
                {classItem.title}
              </span>
            </Link>

            <p className="font-body text-gray-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2 mt-1.5 mb-5">
              {classItem.description}
            </p>

            {/* Trainer Info */}
            <div className="flex items-center gap-2.5 mb-5 font-body text-xs tracking-wide">
              <Image
                width={28}
                height={28}
                src={classItem.trainer?.avatar || "https://i.pravatar.cc/100"}
                alt={classItem.trainer?.name || "Trainer"}
                className="w-7 h-7 rounded-full border border-gray-800 object-cover"
              />
              <span className="text-gray-400 truncate">
                Trainer:{" "}
                <span className="text-white font-medium">
                  {classItem.trainer?.name}
                </span>
              </span>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="border-t border-gray-700/80 pt-3.5 flex justify-between items-center text-xs tracking-wider font-mono">
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-[#F2FD84] text-xs sm:text-sm lg:text-xs xl:text-sm">
                <MdStar />
              </span>
              <span className="font-bold text-white text-xs sm:text-sm lg:text-xs xl:text-sm">
                {classItem.rating}
              </span>
            </div>

            <div className="font-body text-gray-400 text-[10px] sm:text-xs lg:text-[10px] xl:text-xs tracking-wider">
              Available:{" "}
              <span
                className={`font-bold ${classItem.totalSlots - classItem.booked <= 3 ? "text-red-400" : "text-white/95"}`}
              >
                {classItem.totalSlots - classItem.booked} Slots
              </span>
            </div>

            <div className="font-heading text-[#F2FD84] font-black text-sm sm:text-base lg:text-sm xl:text-base">
              ${classItem.price}
              <span className="text-sm sm:text-base lg:text-sm xl:text-base text-gray-300 font-normal">
                /session
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
