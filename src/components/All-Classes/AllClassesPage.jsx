"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import FitnessClassesCard from "@/components/All-Classes/FitnessClassesCard";

const AllClassesPage = ({ searchParams }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  const router = useRouter();
  const pathname = usePathname();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchTerm = searchParams?.search || "";
  const selectedCategory = searchParams?.category || "all";

  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchFilteredClasses = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchTerm) queryParams.append("search", searchTerm);
        if (selectedCategory && selectedCategory !== "all")
          queryParams.append("category", selectedCategory);

        const response = await fetch(
          `${baseUrl}/classes?${queryParams.toString()}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
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

    fetchFilteredClasses();
  }, [baseUrl, searchTerm, selectedCategory]);

  // Calculate pagination slices on the server-filtered results
  const totalPages = Math.ceil(classes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClasses = classes.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      const params = new URLSearchParams();
      Object.entries(searchParams || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
      });
      params.set("page", String(pageNumber));
      router.push(`${pathname}?${params.toString()}`);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#222222] text-white min-h-screen font-body selection:bg-[#F2FD84] selection:text-[#222222] pt-10">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            Loading classes...
          </div>
        )}
        {error && (
          <div className="text-center py-20 text-red-500">Error: {error}</div>
        )}

        {/* Classes Grid */}
        {!loading && !error && currentClasses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentClasses.map((item) => (
              <FitnessClassesCard key={item._id} classItem={item} />
            ))}
          </div>
        ) : !loading && !error ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No classes found matching your search.</p>
          </div>
        ) : null}

        {/* Dynamic Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isActive = currentPage === pageNumber;
              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                    isActive
                      ? "bg-[#F2FD84] font-bold text-[#222222] shadow-lg shadow-[#F2FD84]/20"
                      : "bg-[#1a1a1a] border border-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllClassesPage;
