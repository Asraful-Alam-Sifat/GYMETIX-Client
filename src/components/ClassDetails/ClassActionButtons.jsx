"use client";

import { useState } from "react";
import Image from "next/image";

export default function ClassActionButtons({ classData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBookNow = () => {
    setIsBooked(true);
  };

  const isFull = classData.booked >= classData.totalSlots;

  return (
    <div className="space-y-6">
      {/* Trainer Info */}
      <div className="bg-[#222222]/50 p-5 rounded-2xl border border-gray-700/80 flex items-center gap-4">
        <Image
          src={classData.trainer.avatar}
          alt={classData.trainer.name}
          width={55}
          height={55}
          className="rounded-full object-cover border border-[#F2FD84]"
        />
        <div>
          <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Trainer</p>
          <h4 className="font-heading text-xl  text-white">{classData.trainer.name}</h4>
        </div>
      </div>

      {/* Schedule & Timing */}
      <div className="bg-[#222222]/50 p-5 rounded-2xl border border-gray-700/80 space-y-3">
        <h3 className="font-heading text-lg font-bold text-white border-b border-gray-800 pb-2">
          Schedule & Time
        </h3>
        <div>
          <span className="font-body text-gray-400 text-xs block mb-1">Days:</span>
          <div className="flex flex-wrap gap-1.5">
            {classData.schedule.map((day, index) => (
              <span
                key={index}
                className=" px-2.5 py-1 bg-gray-900/80 text-[#F2FD84] text-sm rounded-md border border-gray-800"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-1">
          <span className="font-body text-gray-400 text-xs block">Time Slot:</span>
          <span className="font-body text-[15px] text-white/90">{classData.time}</span>
        </div>
      </div>

      {/* Action Buttons with Enhanced Primary CTA Focus */}
      <div className=" bg-[#222222]/50 p-5 rounded-2xl border border-gray-700/80 space-y-3">
        <button
          onClick={handleBookNow}
          disabled={isBooked || isFull}
          className={`font-heading w-full py-2.5 rounded-xl font-extrabold text-[#222222] transition-all text-lg tracking-wide shadow-[0_0_20px_rgba(242,253,132,0.25)] ${
            isBooked || isFull
              ? "bg-gray-600 cursor-not-allowed text-white shadow-none"
              : "bg-[#F2FD84] hover:bg-[#e4ef73] hover:shadow-[0_0_25px_rgba(242,253,132,0.4)] hover:scale-99 transition-all duration-200"
          }`}
        >
          {isBooked
            ? "Booked Successfully ✓"
            : isFull
            ? "Class Full"
            : "Book Now"}
        </button>

        <button
          onClick={handleFavoriteToggle}
          className={`font-heading w-full py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 text-base ${
            isFavorite
              ? "bg-red-500/10 border-red-500 text-red-400 hover:scale-99 transition-all duration-200"
              : "bg-transparent border-gray-800 text-white hover:border-gray-600 hover:scale-99 transition-all duration-200"
          }`}
        >
          <span>{isFavorite ? "❤️" : "🤍"}</span>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}