import Image from "next/image";
import Link from "next/link";
import ClassActionButtons from "@/components/ClassDetails/ClassActionButtons";
import { IoStar } from "react-icons/io5";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  let classData = null;
  let error = null;

  try {
    const res = await fetch(`${baseUrl}/classes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch class details");
    }

    classData = await res.json();
  } catch (err) {
    console.error("Error fetching class details:", err);
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#222222] text-white pt-20 text-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-[#222222] text-white pt-20 text-center">
        <p className="text-gray-400 text-xl">Class not found.</p>
      </div>
    );
  }

  const availableSlots = classData.totalSlots - classData.booked;

  return (
    <div className="relative bg-[#222222] text-white min-h-screen font-body  pb-20">
      {/* Hero Banner Header with Improved Breadcrumb Contrast */}
      <div className="relative w-full h-[280px] sm:h-[320px] bg-neutral-900 border-b border-gray-800 flex items-center overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-40">
          <Image
            src={classData.image}
            alt={classData.title}
            fill
            className="object-cover"
            priority
          />
          {/* Stronger gradient overlay to keep text distinct */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-neutral-900/80 to-black/90" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <span className="font-body px-3 py-1 bg-[#F2FD84] text-[#222222] font-bold text-xs uppercase rounded-full tracking-wider">
            {classData.category}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mt-3 text-white tracking-wide drop-shadow-md">
            {classData.title}
          </h1>

          {/* Breadcrumbs with backdrop highlight for absolute clarity */}
          <div className="font-body inline-flex text-start gap-2 text-sm text-gray-300 mt-5   rounded-lg bg-transparent ">
            <Link href="/" className="hover:text-[#F2FD84] transition-colors">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link
              href="/all-classes"
              className="font-body hover:text-[#F2FD84] transition-colors"
            >
              Classes
            </Link>
            <span className="font-body text-gray-500">/</span>
            <span className="text-[#F2FD84] font-medium">
              {classData.title}
            </span>
          </div>
        </div>

         <div className="absolute -bottom-20 right-10 sm:-right-15 sm:-bottom-50 md:right-30 w-14 h-44 sm:h-110 rotate-50 bg-[#F2FD84]/10 skew-x-[-40deg] pointer-events-none" />

         <div className="absolute -bottom-29 right-20 sm:right-15 sm:-bottom-55 md:right-57 w-18 h-54 sm:h-110 rotate-130 scale-x-[-1] bg-[#F2FD84]/5 skew-x-[-40deg] pointer-events-none" />
      </div>

<div className="px-2">
      {/* Main Content Layout */}
      <main className="max-w-6xl bg-neutral-900/40 backdrop-blur-xl mx-auto  p-6 sm:p-10 rounded-2xl border border-gray-500/20 z-50 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Main Information Column */}
          <div className="lg:sticky lg:top-8">
            <ClassActionButtons classData={classData} />
          </div>

          {/* Right Sticky Sidebar Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price & Summary Header Card */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#222222]/50 p-6 rounded-2xl border border-gray-700/80">
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Class Overview
                </h3>
                <p className="text-xs text-gray-400 mt-2.5">
                  Level:{" "}
                  <span className="font-body text-gray-300 font-semibold">
                    {classData.level}
                  </span>
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-heading text-3xl font-extrabold text-[#F2FD84]">
                  ${classData.price}
                </p>
                <p className="text-xs text-gray-400 mt-1.5">
                  Duration: <span>{classData.duration}</span> mins
                </p>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-[#222222]/50 p-6 rounded-2xl border border-gray-700/80">
              <h3 className="font-heading text-xl font-bold mb-3 text-white">
                Description
              </h3>
              <p className="font-body text-gray-300/75 capitalize leading-relaxed text-sm sm:text-base">
                {classData.description}
              </p>
            </div>

            {/* Key Statistics Grid (Clean 3-Column Layout without Redundancy) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {/* Rating */}
              <div className="bg-[#222222]/50 p-4 rounded-xl border border-gray-700/80 flex flex-col justify-center items-center">
                <span className="font-body text-gray-400 text-xs block mb-1">
                  Rating
                </span>
                <span className="font-heading font-bold text-white text-base flex items-center gap-1">
                  <IoStar className="text-yellow-400" /> {classData.rating}
                </span>
              </div>

              {/* Booking */}
              <div className="bg-[#222222]/50 p-4 rounded-xl border border-gray-700/80 flex flex-col justify-center items-center">
                <span className="font-body text-gray-400 text-xs block mb-1">
                  Booked Capacity
                </span>
                <span className="font-heading font-bold text-white text-base">
                  {classData.booked} / {classData.totalSlots}
                </span>
              </div>

              {/* Open Slots */}
              <div className="font-body bg-[#222222]/50 p-4 rounded-xl border border-gray-700/80 flex flex-col justify-center items-center">
                <span className="text-gray-400 text-xs block mb-1">
                  Open Slots
                </span>
                <span
                  className={`font-bold text-base ${classData.totalSlots - classData.booked <= 3 ? "text-red-400" : "text-[#F2FD84]"}`}
                >
                  {availableSlots} Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    {/* rounded glow blob */}
      <div className="absolute top-60 left-30  sm:w-96 h-96 rounded-full bg-radial from-[#F2FD84]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 right-40 sm:w-70 h-70 rounded-full bg-radial from-[#F2FD84]/15 via-transparent to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};

export default ClassDetailsPage;
