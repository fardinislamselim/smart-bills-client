import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaAlignLeft, FaArrowLeft, FaDollarSign, FaFileInvoice, FaImage, FaMapMarkerAlt, FaPlus, FaTag } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import instance from "../hook/useAxios";

const AddBill = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const billData = {
                ...data,
                amount: parseFloat(data.amount),
                date: new Date().toISOString(),
                rating: 0,
                reviewCount: 0
            };

            await instance.post("/bills", billData);
            toast.success("Service provisioned successfully! 🚀", {
                style: { borderRadius: '1rem', background: '#333', color: '#fff' }
            });
            reset();
            navigate("/dashboard/manage-bills");
        } catch (err) {
            console.error(err);
            toast.error("Failed to list service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-base-content">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link to="/dashboard/manage-bills" className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
                        <FaArrowLeft /> Back to Inventory
                    </Link>
                    <h1 className="text-3xl font-black tracking-tighter">Marketplace Provision</h1>
                    <p className="text-base-content/40 font-medium font-serif italic text-sm">Deploy new utility services to the national grid</p>
                </div>
            </div>

            <div className="bg-base-100 p-10 lg:p-16 rounded-[3.5rem] shadow-2xl border border-base-content/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title */}
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1 flex items-center gap-2">
                                <FaFileInvoice className="text-primary" /> Service Title
                            </label>
                            <input 
                                type="text"
                                {...register("title", { required: true })}
                                placeholder="e.g. Dhaka Electric Supply Co."
                                className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-black text-base"
                            />
                            {errors.title && <span className="text-error text-[10px] mt-1 font-bold">Identity is required</span>}
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1 flex items-center gap-2">
                                <FaTag className="text-primary" /> Service Category
                            </label>
                            <select 
                                {...register("category", { required: true })}
                                className="select bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold"
                            >
                                <option value="">Select Category</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Water">Water</option>
                                <option value="Gas">Gas</option>
                                <option value="Internet">Internet</option>
                                <option value="Telecom">Telecom</option>
                            </select>
                            {errors.category && <span className="text-error text-[10px] mt-1 font-bold">Category is required</span>}
                        </div>

                        {/* Amount */}
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1 flex items-center gap-2">
                                <FaDollarSign className="text-primary" /> Base Rate (৳)
                            </label>
                            <input 
                                type="number"
                                step="0.01"
                                {...register("amount", { required: true })}
                                placeholder="0.00"
                                className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-black text-xl"
                            />
                            {errors.amount && <span className="text-error text-[10px] mt-1 font-bold">Amount is required</span>}
                        </div>

                        {/* Location */}
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-primary" /> Coverage Area
                            </label>
                            <input 
                                type="text"
                                {...register("location", { required: true })}
                                placeholder="e.g. Dhaka, Gulshan"
                                className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                            />
                            {errors.location && <span className="text-error text-[10px] mt-1 font-bold">Location is required</span>}
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2 form-control">
                            <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1 flex items-center gap-2">
                                <FaImage className="text-primary" /> Provider Image URL
                            </label>
                            <input 
                                type="text"
                                {...register("image", { required: true })}
                                placeholder="https://unsplash.com/photos/..."
                                className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-xs italic"
                            />
                            {errors.image && <span className="text-error text-[10px] mt-1 font-bold">Visual token is required</span>}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 form-control">
                            <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1 flex items-center gap-2">
                                <FaAlignLeft className="text-primary" /> Service Specification
                            </label>
                            <textarea 
                                {...register("description", { required: true })}
                                placeholder="Technical details about the utility provision..."
                                className="textarea bg-base-200 border-none rounded-3xl h-32 focus:ring-2 focus:ring-primary/20 font-medium leading-relaxed"
                            ></textarea>
                            {errors.description && <span className="text-error text-[10px] mt-1 font-bold">Specification is required</span>}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn btn-primary btn-lg w-full rounded-2xl shadow-2xl shadow-primary/30 font-black uppercase tracking-widest h-auto py-5 relative overflow-hidden group"
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <>
                                    <span className="relative z-10 flex items-center gap-3">
                                        <FaPlus /> Authorize Marketplace Listing
                                    </span>
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBill;
