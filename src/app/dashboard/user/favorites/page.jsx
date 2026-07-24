"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, User, Eye, Trash2, Heart } from "lucide-react";

const initialFavoritesData = [
  {
    id: "1",
    className: "Advanced Strength & Conditioning",
    trainerName: "Alex Vance",
    schedule: "Monday, 8:00 AM - 10:00 AM",
    category: "Strength",
  },
  {
    id: "2",
    className: "High-Intensity Interval Training",
    trainerName: "Sarah Connor",
    schedule: "Wednesday, 5:00 PM - 6:30 PM",
    category: "Cardio",
  },
  {
    id: "3",
    className: "Core & Mobility Shred",
    trainerName: "Marcus Reed",
    schedule: "Friday, 7:00 AM - 8:30 AM",
    category: "Mobility",
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavoritesData);

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold uppercase tracking-wide text-white flex items-center gap-3">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#F2FD84] fill-[#F2FD84]/20" />
            Favorite Classes
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Quick access to classes you have bookmarked or saved for later.
          </p>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#222222] border border-white/8 px-4 py-2 rounded-xl text-xs font-medium text-gray-300 self-start sm:self-auto">
            Saved Favorites:{" "}
            <span className="text-[#F2FD84] font-bold">{favorites.length}</span>
          </div>
        </div>
      </div>

      {favorites.length > 0 ? (
        <>
          {/* DESKTOP & TABLET VIEW */}
          <div className="hidden md:block bg-[#1e1e1e] border border-white/8 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#262626] border-b border-white/8 text-gray-400 font-heading uppercase text-[10px] tracking-wider">
                    <th className="py-4 px-6 font-bold">Class Name</th>
                    <th className="py-4 px-6 font-bold">Trainer Name</th>
                    <th className="py-4 px-6 font-bold">Schedule</th>
                    <th className="py-4 px-6 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/4 text-sm">
                  {favorites.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-white/2 transition-colors group"
                    >
                      <td className="py-4 px-6 font-medium text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F2FD84]/10 border border-[#F2FD84]/20 flex items-center justify-center text-[#F2FD84] font-bold text-xs shrink-0">
                          {item.className.charAt(0)}
                        </div>
                        <div>
                          <span className="group-hover:text-[#F2FD84] transition-colors">
                            {item.className}
                          </span>
                          <span className="block text-[10px] text-gray-500 uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-gray-500" />
                          <span>{item.trainerName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#F2FD84]" />
                          <span className="text-xs bg-white/4 px-2.5 py-1 rounded-md border border-white/6">
                            {item.schedule}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Link
                          href={`/classes/${item.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F2FD84]/10 hover:bg-[#F2FD84] text-[#F2FD84] hover:text-black font-medium text-xs border border-[#F2FD84]/20 hover:border-transparent transition-all duration-200"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Link>
                        <button
                          onClick={() => handleRemoveFavorite(item.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white font-medium text-xs border border-red-500/20 hover:border-transparent transition-all duration-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-[#1e1e1e] border border-white/8 rounded-2xl p-4 space-y-4 shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F2FD84]/10 border border-[#F2FD84]/20 flex items-center justify-center text-[#F2FD84] font-bold text-sm shrink-0">
                      {item.className.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">
                        {item.className}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-[#F2FD84] bg-[#F2FD84]/10 px-2 py-0.5 rounded-md mt-1 inline-block">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/4 text-xs text-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Trainer:
                    </span>
                    <span className="font-medium text-white">
                      {item.trainerName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Schedule:
                    </span>
                    <span className="font-medium text-white text-right">
                      {item.schedule}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Link
                    href={`/classes/${item.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#F2FD84]/10 hover:bg-[#F2FD84] text-[#F2FD84] hover:text-black font-medium text-xs border border-[#F2FD84]/20 hover:border-transparent transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white font-medium text-xs border border-red-500/20 hover:border-transparent transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-[#1e1e1e] border border-white/8 rounded-2xl py-12 text-center text-gray-500 text-xs space-y-3">
          <Heart className="w-8 h-8 mx-auto text-gray-600 stroke-1" />
          <p>You haven't added any favorite classes yet.</p>
        </div>
      )}
    </div>
  );
}
