"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { MdStar, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";

const FeaturedClasses = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carousel State & Dimensions
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDistance, setSlideDistance] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchFeaturedClasses = async () => {
      try {
        const response = await fetch(`${baseUrl}/featured-classes`);
        if (!response.ok) {
          throw new Error("Failed to fetch featured classes");
        }
        const data = await response.json();
        setClasses(data);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedClasses();
  }, [baseUrl]);

  // Calculate exact pixel slide distance based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = window.innerWidth;
        const cardsToShow = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
        setVisibleCards(cardsToShow);

        const containerWidth = containerRef.current.offsetWidth;
        const gap = 24; // 24px (gap-6)
        const totalGapsWidth = (cardsToShow - 1) * gap;
        const cardWidth = (containerWidth - totalGapsWidth) / cardsToShow;

        // Distance to slide for 1 card = card width + gap
        setSlideDistance(cardWidth + gap);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [classes]);

  // Prevent sliding into empty space
  const maxIndex = Math.max(0, classes.length - visibleCards);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400 bg-[#222222]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#F2FD84] mx-auto mb-4"></div>
        <p className="text-sm font-body tracking-wider">LOADING CLASSES...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 font-mono text-sm bg-[#222222]">
        <p>ERROR: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#222222] relative overflow-hidden py-20">
      {/* Radial Gradient Background Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-60 left-1/7 -translate-x-1/2 -translate-y-1/2 w-136 h-136 rounded-full bg-radial from-[#F2FD84]/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-radial from-[#F2FD84]/15 via-transparent to-transparent blur-3xl" />
      </div>

      <section className="sm:max-w-10/12 mx-auto px-6 relative z-20">

        {/* Section Header with Navigation Arrows */}
        <div className="flex mb-12">

          <div className="w-full flex justify-center flex-col">

            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-center text-white">
              FEATURED <span className="text-[#F2FD84] bg-clip-text">CLASSES</span>
            </h2>

            <p className="font-body text-gray-400 mt-3 mx-auto text-sm md:text-base max-w-xl font-light leading-relaxed">
              Our highly rated and most booked sessions designed to push your limits.
            </p>

          </div>

          
        </div>

        {/* Carousel Container */}
        <div ref={containerRef} className="overflow-hidden py-4 -my-4">
          <motion.div
            drag="x"
            dragConstraints={{
              right: 0,
              left: -(maxIndex * slideDistance),
            }}
            animate={{ x: -(currentIndex * slideDistance) }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
          >
            {classes.map((cls) => (
              <motion.div
  key={cls._id}
  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 group rounded-xl p-[1px] bg-gradient-to-t from-gray-500 via-gray-900/40 to-transparent hover:from-[#F2FD84]/40 hover:via-[#F2FD84]/50 hover:to-transparent shadow-lg hover:shadow-[#F2FD84]/10 transition-all duration-300 select-none"
  whileHover={{ y: -6 }}
>
  {/* Inner Card Container - 11px radius mathematically nests inside the 12px (xl) outer radius */}
  <div className="w-full h-full bg-[#2B2B2B] backdrop-blur-md rounded-[11px] overflow-hidden flex flex-col justify-between">
    
    {/* Class Image Container */}
    <div className="relative h-52 w-full bg-gray-950 overflow-hidden">
      <Image
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={
          cls.image ||
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd"
        }
        alt={cls.title}
        priority={true}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
      />

      {/* Geometric Angled Corner */}
      <div className="absolute -bottom-44 -right-20 w-42 h-90 rotate-45 z-10 border-35 border-[#F2FD84]/35 transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute -bottom-44 -right-35 w-42 h-90 rotate-45 z-10 border-15 border-[#F2FD84]/20 transition-transform duration-500 group-hover:scale-110" />

      {/* Hover Overlay with Quick Book Button */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
        <Link
          href={`/classes/${cls.id}`}
          className="font-heading text-white border border-white text-xs font-black px-5 py-2.5 rounded-lg uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-2xl hover:bg-[#F2FD84] hover:text-black hover:border-transparent active:scale-95"
        >
          Quick Book
        </Link>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-0" />

      {/* Category Badge */}
      <span className="font-heading absolute top-3 left-3 bg-[#ff1e1e] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider z-10">
        {cls.category}
      </span>

      {/* Level Badge */}
      <span className="font-heading absolute top-3 right-3 bg-black/70 border border-gray-800 text-gray-300 text-[10px] font-medium px-2 py-1 rounded-sm uppercase tracking-wider z-10">
        {cls.level}
      </span>
    </div>

    {/* Card Content */}
    <div className="p-5 flex-grow flex flex-col justify-between bg-black/20 relative z-20">
      <div>
        {/* Main Title */}
   <Link 
  href={`/classes/${cls.id}`} 
  className="font-heading text-lg font-extrabold text-white tracking-wide mb-2 uppercase group-hover:text-[#F2FD84] transition-colors truncate"
>
  <span className="relative inline-block pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-current after:transition-all after:duration-500 after:ease-in-out hover:after:w-full hover:after:left-0 group-hover/link:after:left-full">
    {cls.title}
  </span>
</Link>

        {/* Description */}
        <p className="font-body text-gray-400 text-xs md:text-sm font-light leading-relaxed line-clamp-2 mt-1.5 mb-5">
          {cls.description}
        </p>

        {/* Trainer Info */}
        <div className="flex items-center gap-2.5 mb-5 font-body text-xs tracking-wide">
          <Image
            width={28}
            height={28}
            src={cls.trainer?.avatar || "https://i.pravatar.cc/100"}
            alt={cls.trainer?.name || "Trainer"}
            className="w-7 h-7 rounded-full border border-gray-800 object-cover"
          />
          <span className="text-gray-400 truncate">
            Trainer:{" "}
            <span className="text-white font-medium">
              {cls.trainer?.name}
            </span>
          </span>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="border-t border-gray-700/80 pt-3.5 flex justify-between items-center text-xs tracking-wider font-mono">
        <div className="flex items-center gap-1 text-gray-400">
          <span className="text-[#F2FD84] text-sm">
            <MdStar />
          </span>
          <span className="font-bold text-white text-sm">
            {cls.rating}
          </span>
        </div>

        <div className="font-body text-gray-400 text-xs tracking-wider">
          Available: <span className={`font-bold ${cls.totalSlots - cls.booked <= 3 ? 'text-red-400' : 'text-white/95'}`}>{cls.totalSlots - cls.booked} Slots</span>
        </div>

        <div className="font-heading text-[#F2FD84] font-black text-base">
          ${cls.price}<span className="text-[16px] text-gray-300 font-normal">/session</span>
        </div>
      </div>
    </div>
  </div>
</motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dashes */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-[#F2FD84]"
                  : "w-4 bg-gray-800 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedClasses;