"use client";
import Image from "next/image";
import { useEffect, useState } from "react";


const FeaturedTrainers = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

    const [trainers, setTrainers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

     useEffect(() => {
        const fetchFeaturedTrainers = async () => {
          try {
            const response = await fetch(`${baseUrl}/trainers`);
            if (!response.ok) {
              throw new Error("Failed to fetch featured trainers");
            }
            const data = await response.json();
            console.log("Fetched trainers:", data); // Log the fetched data
            setTrainers(data);
          } catch (err) {
            console.error("Error fetching trainers:", err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFeaturedTrainers();
        
      }, [baseUrl]);

      

    return (
        <section className="bg-[#222222] py-20 px-6">
  <div className="max-w-7xl mx-auto text-center">
    {/* Subtitle */}
    <p className="font-heading text-[#F2FD84] text-xs font-bold uppercase tracking-[0.2em] mb-4">
      Top Trainers
    </p>
    {/* Title */}
    <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-16">
      Train with the <span className="text-[#F2FD84]">Best</span>
    </h2>

    {/* Trainers Grid */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {trainers.map((trainer) => (
    <div
      key={trainer._id} // Use the unique MongoDB _id instead of index
      className="relative p-8 rounded-2xl bg-transparent border border-white/8 backdrop-blur-sm transition-all duration-500 hover:bg-white/6 hover:border-[#F2FD84]/30 hover:shadow-[0_0_30px_-10px_rgba(242,253,132,0.2)] text-center overflow-hidden group"
    >
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-[#F2FD84]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Trainer Image Container */}
      <div className="relative mb-6 flex justify-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-linear-to-tr from-[#222222] to-[#333333] border-3 border-white/95 group-hover:border-[#F2FD84]/50 transition-colors">
          <Image 
            src={trainer.image || "/default-avatar.png"} // Fallback image if needed
            alt={trainer.name} 
            width={80} 
            height={80} 
            className="w-full h-full rounded-full object-cover" 
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="font-heading text-white text-lg font-bold uppercase mb-1 tracking-wide">
          {trainer.name}
        </h3>
        <p className="font-body text-[#F2FD84] text-xs font-medium uppercase mb-3">
          {trainer.specialty || "Professional Trainer"}
        </p>
        
        {/* Rating Logic: Show rating if it exists, otherwise show 'New' */}
        <div className="flex justify-center items-center gap-1 text-sm text-gray-400">
          {trainer.rating ? (
            <>
              <span className="text-[#F2FD84]">★</span>
              {trainer.rating} 
              <span className="text-gray-600">{trainer.reviews ? `(${trainer.reviews} reviews)` : 'No reviews yet'}</span>
            </>
          ) : (
            <span className="text-gray-500 italic">No ratings yet</span>
          )}
        </div>
      </div>

      {/* Decorative accent line */}
      <div className="absolute bottom-0 right-0 w-16 h-1 bg-[#F2FD84]/20 rounded-tl-full group-hover:w-24 transition-all duration-500" />
    </div>
  ))}
</div>
  </div>
</section>
    );
};

export default FeaturedTrainers;