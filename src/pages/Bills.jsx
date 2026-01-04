import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFilter, FaSearch, FaSortAmountDown } from "react-icons/fa";
import BillCard from "../components/BillCard";
import instance from "../hook/useAxios";

const BillCardSkeleton = () => (
    <div className="card bg-base-100 rounded-[2rem] border border-base-content/5 shadow-sm overflow-hidden h-[500px] animate-pulse">
        <div className="h-56 bg-base-300"></div>
        <div className="card-body p-6 space-y-4">
            <div className="h-6 bg-base-300 rounded-lg w-3/4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-base-200 rounded w-full"></div>
                <div className="h-4 bg-base-200 rounded w-5/6"></div>
            </div>
            <div className="pt-4 space-y-3">
                <div className="h-4 bg-base-200 rounded w-1/2"></div>
                <div className="h-4 bg-base-200 rounded w-1/3"></div>
            </div>
            <div className="mt-auto pt-6 border-t border-base-content/5 flex justify-between items-center">
                <div className="h-8 bg-base-200 rounded w-20"></div>
                <div className="h-10 bg-base-300 rounded-xl w-24"></div>
            </div>
        </div>
    </div>
);

const BillsPage = () => {
    const [bills, setBills] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filtering, Search, Sort & Pagination State
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchValue, setSearchValue] = useState(""); // Immediate UI state
    const [sortOption, setSortOption] = useState("dateNew");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const limit = 8;

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await instance.get("/bills/categories");
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    // Main fetch function
    const fetchBills = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage,
                limit: limit,
                sort: sortOption
            });
            
            if (selectedCategory) params.append("category", selectedCategory);
            if (searchTerm) params.append("search", searchTerm);
            
            const { data } = await instance.get(`/bills?${params.toString()}`);
            setBills(data.bills);
            setTotalPages(data.totalPages);
            setTotalResults(data.total);
            
            // Scroll to top on page change
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error("Fetch failed:", err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, selectedCategory, searchTerm, sortOption]);

    useEffect(() => {
        fetchBills();
    }, [fetchBills]);

    // Handle Search Submit
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchValue);
        setCurrentPage(1);
    };

    // Handle Category change
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    // Handle Sort change
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="pb-24">
            <title>Discover Services | Smart Bills Marketplace</title>
            
            {/* Page Header */}
            <div className="relative overflow-hidden bg-primary/5 py-24 mb-12 rounded-[3.5rem] border border-primary/10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="container mx-auto px-4 text-center space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Utility Marketplace</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-base-content tracking-tighter">
                        Find the <span className="text-primary italic">Perfect</span> Provider
                    </h1>
                    <p className="text-base-content/60 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Search through hundreds of verified utility services across the nation. Fast, secure, and reliable.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Search & Filter Bar */}
                <div className="bg-base-100 p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-base-content/5 -mt-24 relative z-20 mb-16 space-y-6">
                    <div className="grid lg:grid-cols-12 gap-6 items-center">
                        {/* Search Input */}
                        <form onSubmit={handleSearch} className="lg:col-span-5 relative group">
                            <input 
                                type="text" 
                                placeholder="Search by provider, category or location..." 
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="input input-lg w-full bg-base-200 border-none rounded-2xl pl-12 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                            />
                            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-primary btn-sm rounded-xl px-6 font-black shadow-lg shadow-primary/20">Search</button>
                        </form>

                        {/* Category Fast Filter */}
                        <div className="lg:col-span-4 flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                             <div className="flex items-center gap-2">
                                <FaFilter className="text-primary/40 mr-2 shrink-0" />
                                <button 
                                    onClick={() => handleCategoryChange("")}
                                    className={`btn btn-sm rounded-xl px-6 whitespace-nowrap transition-all ${selectedCategory === "" ? "btn-primary shadow-lg shadow-primary/20" : "btn-ghost bg-base-200 text-base-content/60"}`}
                                >
                                    All
                                </button>
                                {categories.map((cat) => (
                                    <button 
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`btn btn-sm rounded-xl px-6 whitespace-nowrap transition-all ${selectedCategory === cat ? "btn-primary shadow-lg shadow-primary/20" : "btn-ghost bg-base-200 text-base-content/60"}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                             </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="lg:col-span-3">
                            <div className="relative">
                                <select 
                                    value={sortOption}
                                    onChange={handleSortChange}
                                    className="select select-lg w-full bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-black text-xs uppercase tracking-widest pl-12"
                                >
                                    <option value="dateNew">Newest Listed</option>
                                    <option value="dateOld">Oldest Listed</option>
                                    <option value="priceLow">Price: Low to High</option>
                                    <option value="priceHigh">Price: High to Low</option>
                                    <option value="titleAZ">Title: A-Z</option>
                                    <option value="titleZA">Title: Z-A</option>
                                </select>
                                <FaSortAmountDown className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Active Filters Summary */}
                    {(searchTerm || selectedCategory) && (
                        <div className="flex items-center gap-3 pt-4 border-t border-base-content/5">
                            <span className="text-[10px] font-black text-base-content/30 uppercase tracking-widest">Active Filters:</span>
                            {searchTerm && (
                                <span className="badge badge-outline border-primary/20 text-primary font-bold px-3 py-3 rounded-lg gap-2">
                                    Search: "{searchTerm}"
                                    <button onClick={() => {setSearchTerm(""); setSearchValue("")}} className="hover:text-error">×</button>
                                </span>
                            )}
                            {selectedCategory && (
                                <span className="badge badge-outline border-secondary/20 text-secondary font-bold px-3 py-3 rounded-lg gap-2">
                                    Category: {selectedCategory}
                                    <button onClick={() => setSelectedCategory("")} className="hover:text-error">×</button>
                                </span>
                            )}
                            <button 
                                onClick={() => {setSearchTerm(""); setSearchValue(""); setSelectedCategory(""); setCurrentPage(1)}}
                                className="text-[10px] font-black text-error/60 uppercase tracking-widest hover:underline ml-auto"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center mb-8">
                     <div className="text-sm font-black text-base-content/40 uppercase tracking-widest">
                        Available Services: <span className="text-base-content">{totalResults}</span>
                    </div>
                </div>

                {/* Loading Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <BillCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        {bills.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {bills.map((bill) => (
                                    <BillCard key={bill._id} bill={bill} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-40 bg-base-200/30 rounded-[4rem] border-4 border-dashed border-base-content/5 text-center px-6">
                                <div className="w-32 h-32 mb-8 text-primary/10">
                                    <FaSearch className="w-full h-full" />
                                </div>
                                <h3 className="text-3xl font-black text-base-content/40 uppercase tracking-tighter mb-4">No services match your request</h3>
                                <p className="text-base-content/30 font-medium max-w-sm mx-auto">Try broadening your search or adjusting the filters to discover more providers.</p>
                                <button 
                                    onClick={() => {setSearchTerm(""); setSearchValue(""); setSelectedCategory("")}}
                                    className="btn btn-outline btn-primary rounded-2xl px-10 mt-10"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                        
                        {/* Pagination UI */}
                        {totalPages > 1 && (
                            <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="btn btn-circle bg-base-100 shadow-xl border-base-content/5 disabled:opacity-30"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        {[...Array(totalPages)].map((_, i) => {
                                            const pageNum = i + 1;
                                            // Simple logic to show only few pages if total is high
                                            if (totalPages > 5) {
                                                if (pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - currentPage) > 1) {
                                                    if (pageNum === 2 || pageNum === totalPages - 1) return <span key={pageNum} className="px-2 opacity-30">...</span>;
                                                    return null;
                                                }
                                            }
                                            return (
                                                <button 
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`w-12 h-12 rounded-2xl font-black transition-all ${currentPage === pageNum ? "bg-primary text-white shadow-xl shadow-primary/30 scale-110" : "bg-base-100 shadow-lg border border-base-content/5 hover:border-primary/20"}`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button 
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="btn btn-circle bg-base-100 shadow-xl border-base-content/5 disabled:opacity-30"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                                
                                <span className="text-xs font-black text-base-content/30 uppercase tracking-widest">
                                    Page {currentPage} of {totalPages}
                                </span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BillsPage;
