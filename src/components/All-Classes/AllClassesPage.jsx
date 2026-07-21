"use client"
import { useEffect, useState } from 'react';
import { Zap, Search, ChevronDown } from 'lucide-react';
import FitnessClassesCard from "@/components/All-Classes/FitnessClassesCard"

const AllClassesPage = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // 1. Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchFeaturedClasses = async () => {
          try {
            const response = await fetch(`${baseUrl}/classes`);
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
    
        fetchFeaturedClasses();
    }, [baseUrl]);

    // Filter logic for search bar and category dropdown
    const filteredClasses = classes.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

  

    const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
};

const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
};

    // 2. Calculate Total Pages & Slice Data for Current Page
    const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClasses = filteredClasses.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page changes
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll back to top
        }
    };

    // Dynamically get unique categories from your classes data
    const uniqueCategories = [...new Set(classes.map(item => item.category))].filter(Boolean);

    return (
       <div className="bg-[#222222] text-white min-h-screen font-body selection:bg-[#F2FD84] selection:text-[#222222]">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-10">
                
                {/* Filters Bar (Search & Category Dropdown) */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search classes by name..." 
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full bg-[#1a1a1a] border border-gray-800 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#F2FD84] transition text-gray-200 placeholder-gray-500"
                        />
                    </div>

                    <div className="relative w-full sm:w-48">
                        <select 
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="font-body w-full bg-[#1a1a1a] border border-gray-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2FD84] transition text-gray-200 appearance-none cursor-pointer"
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

                {/* Loading / Error States (Optional Safeguards) */}
                {loading && <div className="text-center py-20 text-gray-400">Loading classes...</div>}
                {error && <div className="text-center py-20 text-red-500">Error: {error}</div>}

                {/* Classes Grid - Using currentClasses instead of filteredClasses */}
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
                        {/* Previous Button */}
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            &lt;
                        </button>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            const isActive = currentPage === pageNumber;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
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

                        {/* Next Button */}
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
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