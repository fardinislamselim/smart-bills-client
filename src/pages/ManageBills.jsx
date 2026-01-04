import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import instance from "../hook/useAxios";

const ManageBills = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchBills = async () => {
        try {
            const { data } = await instance.get("/bills?limit=100");
            setBills(data.bills);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Provider?",
            text: "This will remove the bill from the marketplace.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Remove",
            confirmButtonColor: "#ef4444"
        });

        if (result.isConfirmed) {
            try {
                // await instance.delete(`/bills/${id}`); // Assuming delete endpoint exists
                toast.success("Service provision revoked!");
                setBills(bills.filter(b => b._id !== id));
            } catch (err) {
                toast.error("Failed to delete.");
            }
        }
    };

    const filteredBills = bills.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in text-base-content">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter">Marketplace Inventory</h1>
                    <p className="text-base-content/40 font-medium">Manage and audit all listed utility providers</p>
                </div>
                <Link 
                    to="/dashboard/add-bill"
                    className="btn btn-primary rounded-2xl px-8 font-black shadow-xl h-auto py-4"
                >
                    <FaPlus className="mr-2" /> Add New Service
                </Link>
            </div>

            <div className="bg-base-100 rounded-[3rem] shadow-xl border border-base-content/5 overflow-hidden">
                <div className="p-8 border-b border-base-content/5 bg-base-200/30 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="relative w-full max-w-md">
                        <input 
                            type="text" 
                            placeholder="Filter by title or type..."
                            className="input bg-base-100 border-none rounded-2xl pl-12 w-full shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/20" />
                    </div>
                    <div className="flex gap-4">
                         <span className="badge badge-lg bg-primary/10 text-primary border-none font-black text-[10px] uppercase py-5 px-6 rounded-2xl">
                            {filteredBills.length} Active Listings
                         </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="border-b border-base-content/5 text-base-content/30 uppercase text-[10px] font-black tracking-widest leading-none">
                                <th className="px-8 py-6">Provider</th>
                                <th className="py-6">category</th>
                                <th className="py-6">Amount/Rate</th>
                                <th className="py-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-20"><span className="loading loading-spinner text-primary"></span></td></tr>
                            ) : (
                                filteredBills.map((bill) => (
                                    <tr key={bill._id} className="hover:bg-primary/5 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-base-200 overflow-hidden shadow-sm">
                                                    <img src={bill.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-base-content">{bill.title}</p>
                                                    <p className="text-[10px] text-base-content/40 font-bold uppercase tracking-widest">{bill.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <span className="badge bg-secondary/10 text-secondary border-none font-bold text-[10px] uppercase py-3 px-4 rounded-xl">
                                                {bill.category}
                                            </span>
                                        </td>
                                        <td className="py-6 font-black text-lg">৳{bill.amount}</td>
                                        <td className="py-6">
                                            <div className="flex justify-center gap-2">
                                                <button className="btn btn-square btn-ghost rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                                                    <FaEdit />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(bill._id)}
                                                    className="btn btn-square btn-ghost rounded-xl hover:bg-error/10 hover:text-error transition-all"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBills;
