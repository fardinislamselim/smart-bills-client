import { useEffect, useState } from "react";
import { Link } from "react-router";
import instance from "../hook/useAxios";
import BillCard from "./BillCard";

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

const LatestBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Attempting to fetch 8 items for a perfect 4-column grid
        const { data } = await instance.get("/bills/latest?limit=8");
        setBills(data);
      } catch (error) {
        console.error("Error fetching latest bills:", error);
        // Fallback or handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [instance]);

  return (
    <div className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Updated Live</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
            Featured Utility <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic">Services</span>
          </h2>
          <p className="text-base-content/60 font-medium text-lg max-w-2xl leading-relaxed">
            Take control of your household expenses. Explore our featured utility providers and settle your dues in seconds via our secure gateway.
          </p>
        </div>
        <Link 
          to="/bills" 
          className="btn btn-primary rounded-2xl px-10 shadow-xl shadow-primary/20 hover:scale-105 transition-all h-14"
        >
          Explore All
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <BillCardSkeleton key={i} />
          ))}
        </div>
      ) : bills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bills.slice(0, 8).map((bill) => (
            <BillCard key={bill._id} bill={bill} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-base-200/50 rounded-[3.5rem] border-4 border-dashed border-base-content/10 text-center px-6">
            <div className="w-24 h-24 mb-8 text-base-content/10">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
            </div>
            <h3 className="text-2xl font-black text-base-content/40 uppercase tracking-widest mb-2">No active services found</h3>
            <p className="text-base-content/30 font-medium">Please check back later or try refreshing the page.</p>
        </div>
      )}
    </div>
  );
};

export default LatestBills;
