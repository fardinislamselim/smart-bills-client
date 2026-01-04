import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { FaArrowRight, FaCalendarAlt, FaCheckCircle, FaInfoCircle, FaMapMarkerAlt, FaMoneyBillWave, FaShieldAlt, FaStar, FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";
import BillCard from "../components/BillCard";
import Loading from "../components/Loading";
import instance from "../hook/useAxios";
import notFoundAnimation from "../lotties/Loading.json";
import { AuthContext } from "../provider/AuthProvider";

const BillDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [bill, setBill] = useState(null);
  const [relatedBills, setRelatedBills] = useState([]);
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch bill and related items
  useEffect(() => {
    const fetchBillData = async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(`/bills/${id}`);
        setBill(data);
        
        const billMonth = new Date(data.date).getMonth();
        const currentMonth = new Date().getMonth();
        setIsCurrentMonth(billMonth === currentMonth);

        // Fetch related bills from same category
        const relatedRes = await instance.get(`/bills?category=${data.category}`);
        setRelatedBills(relatedRes.data.filter(b => b._id !== id).slice(0, 4));
        
      } catch (err) {
        console.error("Failed to fetch details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBillData();
  }, [id]);

  useEffect(() => {
    if (bill) {
      document.title = `${bill.title} | SmartBills Service`;
    }
  }, [bill]);

  const handlePayBill = async (e) => {
    e.preventDefault();
    if (!user) {
        Swal.fire({
            icon: "warning",
            title: "Authentication Required",
            text: "Please login to complete this payment.",
            confirmButtonColor: "#6366f1",
        });
        return;
    }

    const form = e.target;
    const payForm = {
      email: user.email,
      billId: id,
      username: user.displayName || "User",
      amount: bill.amount,
      address: form.address.value,
      phone: form.phone.value,
      date: new Date().toISOString().split("T")[0],
      additionalInfo: form.additionalInfo.value,
    };

    try {
      await instance.post("/paid-bills", payForm);
      Swal.fire({
        icon: "success",
        title: "Payment Confirmed! 🚀",
        text: "Your utility bill has been successfully processed.",
        confirmButtonColor: "#10b981",
      });
      document.getElementById('pay_bill_modal').close();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: err?.response?.data?.message || "Internal server error.",
      });
    }
  };

  if (loading) return <Loading />;

  if (!bill) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-64 h-64 mb-6">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
        <h2 className="text-3xl font-black text-error mb-2 tracking-tighter">SERVICE UNAVAILABLE</h2>
        <p className="text-base-content/60 max-w-md mb-8 font-medium">This service might have been decommissioned or moved.</p>
        <Link to="/bills" className="btn btn-primary rounded-2xl px-12 shadow-xl">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* 1. Header / Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-base-content/40 uppercase tracking-widest mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/bills" className="hover:text-primary transition-colors">Marketplace</Link>
        <span>/</span>
        <span className="text-base-content/80">{bill.category}</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: Media & Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Main Image Gallery Container */}
          <div className="group relative rounded-[2.5rem] overflow-hidden border border-base-content/5 shadow-2xl">
            <img src={bill.image} alt={bill.title} className="w-full aspect-video object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-10 left-10">
               <span className="badge badge-primary rounded-lg font-black px-4 py-3 mb-4">{bill.category}</span>
               <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">{bill.title}</h1>
            </div>
          </div>


          {/* Section: Overview */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-base-content flex items-center gap-3">
                <FaInfoCircle className="text-primary/40" /> Overview
            </h2>
            <div className="p-8 bg-base-100 rounded-[2rem] border border-base-content/5 shadow-sm">
                <p className="text-lg text-base-content/70 leading-relaxed font-medium">
                    {bill.description || "Our platform offers a seamless way to manage your utility dues. This service is fully integrated with national grids and verified providers to ensure your payments are real-time and secure."}
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {[
                        { title: "Real-time Verification", desc: "Instant confirmation from providers." },
                        { title: "Zero Late Fees", desc: "Pay before deadline to stay secure." },
                        { title: "Cloud Documentation", desc: "Receipts stored for lifetime access." },
                        { title: "Secured Gateway", desc: "Bank-grade 256-bit encryption." }
                    ].map((f, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <FaCheckCircle className="text-emerald-500 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-black text-base-content">{f.title}</h4>
                                <p className="text-sm text-base-content/50 font-medium">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          {/* Section: Specs / Rules */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-base-content">Key Information</h2>
            <div className="grid sm:grid-cols-3 gap-6">
                {[
                    { icon: <FaCalendarAlt />, label: "Billing Cycle", val: "Monthly" },
                    { icon: <FaShieldAlt />, label: "Status", val: isCurrentMonth ? "Payable" : "Locked" },
                    { icon: <FaStar />, label: "Avg Rating", val: "4.9 / 5.0" }
                ].map((s, i) => (
                    <div key={i} className="p-6 bg-base-200/50 rounded-3xl border border-base-content/5 text-center transition-all hover:bg-base-200">
                        <div className="text-2xl text-primary mx-auto mb-3">{s.icon}</div>
                        <p className="text-xs font-black text-base-content/40 uppercase tracking-widest">{s.label}</p>
                        <p className="text-xl font-black text-base-content">{s.val}</p>
                    </div>
                ))}
            </div>
          </section>


        </div>

        {/* RIGHT COLUMN: checkout Card */}
        <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
                <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-content/5 shadow-2xl space-y-8 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-secondary"></div>
                    
                    <div className="space-y-2">
                        <p className="text-xs font-black text-base-content/30 uppercase tracking-[0.2em]">Service Provider Fee</p>
                        <h2 className="text-5xl font-black text-base-content">
                            {bill.amount} <small className="text-lg font-bold opacity-30">BDT</small>
                        </h2>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-center pb-4 border-b border-base-content/5">
                            <span className="text-sm font-bold text-base-content/60 flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> Region</span>
                            <span className="font-black text-base-content">{bill.location}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-base-content/5">
                            <span className="text-sm font-bold text-base-content/60 flex items-center gap-2"><FaCalendarAlt className="text-primary" /> Due Date</span>
                            <span className="font-black text-base-content leading-none text-right">{bill.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-base-content/60 flex items-center gap-2"><FaMoneyBillWave className="text-primary" /> Status</span>
                            <span className={`badge font-black ${isCurrentMonth ? 'badge-success text-white' : 'badge-neutral opacity-50'}`}>
                                {isCurrentMonth ? 'Active' : 'Expired'}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => document.getElementById('pay_bill_modal').showModal()}
                        disabled={!isCurrentMonth}
                        className={`btn btn-lg w-full rounded-2xl shadow-xl shadow-primary/25 font-black text-lg h-20 group transition-all ${
                        isCurrentMonth
                            ? "btn-primary hover:scale-[1.02]"
                            : "btn-disabled bg-base-300"
                        }`}
                    >
                        {isCurrentMonth ? 'Secure Payment' : 'Locked Service'}
                        <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </button>

                    {!isCurrentMonth && (
                        <div className="p-4 bg-error/10 rounded-2xl flex gap-3">
                            <FaInfoCircle className="text-error mt-1 shrink-0" />
                            <p className="text-xs font-bold text-error leading-relaxed italic">
                                This service is currently locked as the billing cycle has expired. Registration is only available for active monthly cycles.
                            </p>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-3 opacity-30">
                        <FaShieldAlt />
                        <span className="text-[10px] uppercase font-black tracking-widest">SSL Secured Gateway</span>
                    </div>
                </div>

                {/* mini trust badge */}
                <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl">
                        <FaShieldAlt />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-base-content leading-none mb-1">Guaranteed Service</h4>
                        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">100% Refundable Coverage</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Section: Related Items */}
      <section className="mt-24 space-y-12">
        <div className="flex justify-between items-end">
            <div className="space-y-2">
                <h2 className="text-4xl font-black text-base-content tracking-tighter">You Might Also <span className="text-primary italic">Need</span></h2>
                <p className="text-base-content/60 font-medium">Explore related utility services in {bill.category}.</p>
            </div>
            <Link to="/bills" className="btn btn-ghost hover:bg-primary/5 rounded-xl font-black uppercase text-xs tracking-widest">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedBills.length > 0 ? (
                relatedBills.map(b => <BillCard key={b._id} bill={b} />)
            ) : (
                <div className="col-span-full py-20 text-center opacity-30 font-black uppercase tracking-widest bg-base-200 rounded-[2.5rem]">
                    Scanning Grid for related nodes...
                </div>
            )}
        </div>
      </section>

      {/* Modal - Refined */}
      <dialog id="pay_bill_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box p-10 rounded-[2.5rem] bg-base-100 border border-base-content/5 shadow-2xl max-w-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary via-secondary to-primary animate-gradient-x"></div>
          
          <div className="flex justify-between items-center mb-10">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-base-content tracking-tighter">Confirm Payment</h3>
                <p className="text-sm font-medium text-base-content/50">Service ID: <span className="font-black text-primary">{id.slice(0,8)}...</span></p>
              </div>
              <div className="text-right">
                  <p className="text-xs font-black text-base-content/30 uppercase tracking-widest mb-1">Final Amount</p>
                  <p className="text-2xl font-black text-primary">{bill.amount} BDT</p>
              </div>
          </div>

          <form onSubmit={handlePayBill} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label px-1"><span className="label-text font-black text-[10px] uppercase tracking-widest opacity-50">Full Name</span></label>
                    <div className="p-4 bg-base-200 rounded-2xl text-base-content/50 font-black text-sm flex gap-3 items-center">
                        <FaUserCircle size={18} /> {user?.displayName || "Member"}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label px-1"><span className="label-text font-black text-[10px] uppercase tracking-widest opacity-50">Billing Email</span></label>
                    <div className="p-4 bg-base-200 rounded-2xl text-base-content/50 font-black text-sm truncate">
                        {user?.email || "Guest"}
                    </div>
                </div>
            </div>

            <div className="form-control">
              <label className="label px-1"><span className="label-text font-black text-[10px] uppercase tracking-widest opacity-50">Installation Address</span></label>
              <textarea
                name="address"
                placeholder="Ex: Apt 4B, Sector 12, Uttara, Dhaka"
                className="textarea textarea-bordered bg-base-200 border-none rounded-2xl h-24 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                required
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label px-1"><span className="label-text font-black text-[10px] uppercase tracking-widest opacity-50">Contact Number</span></label>
              <input
                type="text"
                name="phone"
                placeholder="+880 1XXX-XXXXXX"
                className="input input-lg bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm"
                required
              />
            </div>

            <div className="form-control">
              <label className="label px-1"><span className="label-text font-black text-[10px] uppercase tracking-widest opacity-50">Additional Notes (Optional)</span></label>
              <input
                name="additionalInfo"
                placeholder="Any special instructions for the provider..."
                className="input input-lg bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
              />
            </div>

            <div className="p-4 bg-primary/5 rounded-2xl flex gap-3 border border-primary/10">
                <FaShieldAlt className="text-primary shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-base-content/60 leading-relaxed uppercase tracking-widest">
                    By clicking pay, you agree to our terms of utility management and service provider policies. Your data is encrypted.
                </p>
            </div>

            <div className="flex gap-4 pt-6">
                <button type="submit" className="btn btn-primary btn-lg flex-grow rounded-2xl font-black shadow-xl shadow-primary/20">Authorize Payment</button>
                <button type="button" onClick={() => document.getElementById('pay_bill_modal').close()} className="btn btn-ghost btn-lg rounded-2xl font-black text-base-content/40 uppercase text-xs tracking-widest">Discard</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BillDetails;
