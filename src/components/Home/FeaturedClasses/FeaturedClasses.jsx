"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Importing Next.js Image component as seen in your code

const FeaturedClasses = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-sm font-mono tracking-wider">LOADING CLASSES...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 font-mono text-sm">
        <p>ERROR: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
          FEATURED <span className="text-[#F2FD84] bg-clip-text">CLASSES</span>
        </h2>
        <p className="text-gray-400 mt-4 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
          Our highly rated and most booked sessions designed to push your limits.
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="group bg-black/30 backdrop-blur-md border border-gray-900 hover:border-gray-700/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            {/* Class Image Container */}
            <div className="relative h-56 w-full bg-gray-950 overflow-hidden">
              <Image
                width={400}
                height={224}
                src={cls.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd"}
                alt={cls.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark overlay to match hero banner image depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Category Badge (Bottom Left, styled cleanly like your reference image) */}
              <span className="absolute bottom-4 left-4 bg-[#ff1e1e] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                {cls.category}
              </span>
              
              {/* Level Badge (Bottom Right) */}
              <span className="absolute bottom-4 right-4 bg-black/70 border border-gray-800 text-gray-300 text-[10px] font-medium px-2.5 py-1 rounded-sm uppercase tracking-wider">
                {cls.level}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-grow flex flex-col justify-between bg-black/20">
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-wide mb-2 uppercase group-hover:text-[#F2FD84] transition-colors">
                  {cls.title}
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-2 mb-6">
                  {cls.description}
                </p>

                {/* Trainer Info */}
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    width={32}
                    height={32}
                    src={cls.trainer?.avatar || "https://i.pravatar.cc/100"}
                    alt={cls.trainer?.name || "Trainer"}
                    className="w-8 h-8 rounded-full border border-gray-800 object-cover"
                  />
                  <span className="text-xs text-gray-400 font-medium tracking-wide">
                    Trainer: <span className="text-white font-semibold">{cls.trainer?.name}</span>
                  </span>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="border-t border-gray-900 pt-4 flex justify-between items-center text-xs tracking-wider font-mono">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="font-bold text-white text-sm">{cls.rating}</span>
                </div>
                <div className="text-gray-400">
                  BOOKED: <span className="font-bold text-white">{cls.booked}</span>
                </div>
                <div className="text-[#F2FD84] font-black text-lg">
                  ${cls.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClasses;