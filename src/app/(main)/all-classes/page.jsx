import AllClassesPage from "@/components/All-Classes/AllClassesPage";
import ClassSearchFilter from "@/components/All-Classes/ClassSearchFilter";
import womenworkout from "@/assets/Image/women-workout-with-dumble.png";
import Image from "next/image";
import { Suspense } from "react";

export default async function allClasses({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  
  let uniqueCategories = [];
  try {
    const res = await fetch(`${baseUrl}/classes`);
    if (res.ok) {
      const data = await res.json();
      uniqueCategories = [...new Set(data.map(item => item.category))].filter(Boolean);
    }
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }

  return (
    <div className="bg-[#222222] text-white min-h-screen font-body selection:bg-[#F2FD84] selection:text-[#222222]">
      
      {/* Banner Container with Search & Filter Overlay */}
      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#222222]">
        <Image src={womenworkout} alt="Women Workout" width={1200} height={600} className="w-full object-cover h-[500px]  shadow-lg" />

        <div className="absolute inset-0 bg-linear-to-r from-[#222223]/30 via-[#222223]/65 to-[#050505] mix-blend-multiply" />
        <div className="absolute inset-0 bg-neutral-900/40 backdrop-grayscale" />

       {/* Overlay container for Heading, Description, and Search/Filter */}
<div className="absolute inset-0 flex flex-col sm:items-start justify-center px-6 sm:px-12 lg:px-20 z-10 max-w-9/12 xl:mx-auto w-full">
  {/* Heading & Description */}
  <div className="mb-6 max-w-3xl">
    <h1 className="font-heading  w-full text-4xl md:text-7xl font-black tracking-wide uppercase leading-tight select-none">
       <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              ELEVATE YOUR
            </span>{" "}
            WORKOUT EXPERIENCE
    </h1>
    <p className="font-body text-sm sm:text-base text-gray-300 mt-1">
      Explore expert-led training sessions designed to challenge your limits and match your fitness goals.
    </p>
  </div>

  {/* Search and Filter Component */}
  <div className="w-full max-w-4xl mt-5">
    <Suspense fallback={null}>
      <ClassSearchFilter uniqueCategories={uniqueCategories} />
    </Suspense>
  </div>
</div>
      </div>

      <AllClassesPage searchParams={resolvedSearchParams} />
    </div>
  );
}