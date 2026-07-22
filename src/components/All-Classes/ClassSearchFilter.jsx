"use client";
import { ChevronDown, Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

const ClassSearchFilter = ({ uniqueCategories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="absolute z-10 w-full max-w-4xl ">
      <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
        {/* search bar */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-30" />
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search classes by name..."
            className="w-full bg-[#1a1a1a]/90 backdrop-blur-md border border-gray-500 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#F2FD84] transition text-gray-200 placeholder-gray-500 shadow-xl"
          />
        </div>
        {/* category filter */}
        <div className="relative w-full sm:w-48">
          <select
            defaultValue={selectedCategory}
            onChange={handleCategoryChange}
            className="font-body w-full bg-[#1a1a1a]/90 backdrop-blur-md border border-gray-500 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2FD84] transition text-gray-200 appearance-none cursor-pointer shadow-xl"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ClassSearchFilter;
