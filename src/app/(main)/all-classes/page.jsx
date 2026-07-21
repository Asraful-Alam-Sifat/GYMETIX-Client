import AllClassesPage from "@/components/All-Classes/AllClassesPage";

export default function allClasses() {
  return (
    <div className="bg-[#222222] text-white min-h-screen font-body selection:bg-[#F2FD84] selection:text-[#222222] pt-20">
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <span className="font-heading text-xs uppercase tracking-[0.2em] text-[#F2FD84] font-bold mb-3 block">
          — BROWSE —
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight mb-3 text-white">
          All Fitness <span className="text-[#F2FD84]">Classes</span>
        </h1>
        <p className="font-body text-gray-400 text-sm sm:text-base leading-relaxed">
          Find your perfect workout from our curated library of expert-led
          sessions.
        </p>
      </div>

      <AllClassesPage />
    </div>
  );
}
