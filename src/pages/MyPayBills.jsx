import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import instance from "../hook/useAxios";
import { AuthContext } from "../provider/AuthProvider";

import { useLocation } from "react-router";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdminView = location.pathname.includes("all-transactions");

  const [formData, setFormData] = useState({
    amount: "",
    address: "",
    phone: "",
    date: "",
  });

  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Fetch bills
  const fetchBills = async () => {
    try {
      setLoading(true);
      const endpoint = isAdminView ? "/admin/all-transactions" : `/paid-bills/user?email=${user.email}`;
      const { data } = await instance.get(endpoint);
      setBills(data || []);
    } catch (err) {
      console.error("Error fetching bills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchBills();
  }, [user, location.pathname]);

  const totalAmount = bills.reduce(
    (sum, bill) => sum + parseFloat(bill.amount || 0),
    0
  );

  // Open update modal
  const openUpdateModal = (bill) => {
    setSelectedBill(bill);
    setFormData({
      amount: bill.amount,
      address: bill.address,
      phone: bill.phone,
      date: bill.date?.split("T")[0],
    });
    document.getElementById("update_modal").showModal();
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Update bill
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await instance.patch(`/paid-bills/${selectedBill._id}`, formData);
      Swal.fire("Updated!", "Bill updated successfully.", "success");
      document.getElementById("update_modal").close();
      fetchBills();
    } catch {
      Swal.fire("Error", "Failed to update bill.", "error");
    }
  };

  // Delete bill
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This bill will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await instance.delete(`/paid-bills/${id}`);
        Swal.fire("Deleted!", "Bill deleted successfully.", "success");
        fetchBills();
      } catch {
        Swal.fire("Error", "Failed to delete bill.", "error");
      }
    }
  };

  // Download PDF report
  const handleDownloadReport = () => {
    if (!bills || bills.length === 0) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("My Paid Bills Report", 14, 22);

    // Total summary
    doc.setFontSize(12);
    doc.text(`Total Bills Paid: ${bills.length}`, 14, 30);
    doc.text(`Total Amount: ৳${totalAmount.toLocaleString()}`, 14, 36);

    // Table headers
    const tableColumn = [
      "Username",
      "Email",
      "Amount",
      "Address",
      "Phone",
      "Date",
    ];
    const tableRows = bills.map((bill) => [
      bill.username,
      bill.email,
      `৳${bill.amount}`,
      bill.address,
      bill.phone,
      bill.date ? new Date(bill.date).toLocaleDateString() : "",
    ]);

    // Add table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 42,
      theme: "grid",
      headStyles: {
        fillColor: theme === "dark" ? [55, 65, 81] : [220, 220, 220],
      },
    });

    doc.save(`my_pay_bills_${user?.email}.pdf`);
  };

  return (
    <div className="space-y-8 animate-fade-in text-base-content">
      <title>{isAdminView ? "All Transactions" : "My Payments"} | Smart Bills</title>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
              <h1 className="text-3xl font-black tracking-tighter">
                  {isAdminView ? "Ledger Audit" : "Payment History"}
              </h1>
              <p className="text-base-content/40 font-medium">
                  {isAdminView ? "Full platform transaction overview" : "Manage and track your utility expenditures"}
              </p>
          </div>
          <button
              className="btn btn-primary rounded-2xl px-8 font-black shadow-xl h-auto py-4"
              onClick={handleDownloadReport}
              disabled={loading || bills.length === 0}
          >
              Download Report (.PDF)
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-content/5 flex items-center justify-between group hover:border-primary/20 transition-all">
              <div>
                  <p className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em]">Validated Receipts</p>
                  <p className="text-3xl font-black mt-2">{bills.length}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center text-2xl shadow-lg ring-8 ring-base-200">
                  <span className="font-black text-xl">#</span>
              </div>
          </div>
          <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-content/5 flex items-center justify-between group hover:border-primary/20 transition-all">
              <div>
                  <p className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em]">Cumulative Volume</p>
                  <p className="text-3xl font-black mt-2">৳{totalAmount.toLocaleString()}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-lg ring-8 ring-base-200">
                  <span>৳</span>
              </div>
          </div>
      </div>

      <div className="bg-base-100 rounded-[3rem] shadow-xl border border-base-content/5 overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-base-content/5 text-base-content/30 uppercase text-[10px] font-black tracking-widest leading-none">
                  <th className="px-8 py-6">Service Account</th>
                  <th className="py-6">Identity</th>
                  <th className="py-6">Volume</th>
                  <th className="py-6">Phone Token</th>
                  <th className="py-6">Settlement Date</th>
                  {!isAdminView && <th className="py-6 text-center">Control</th>}
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? (
                  bills.map((bill, index) => (
                    <tr key={bill._id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black">
                                  {bill.title?.[0] || 'S'}
                              </div>
                              <div>
                                  <p className="font-black text-base-content">{bill.title || 'Service'}</p>
                                  <p className="text-[10px] text-base-content/40 font-bold truncate max-w-[150px]">{bill.address}</p>
                              </div>
                          </div>
                      </td>
                      <td className="py-6">
                        <div className="text-sm">
                            <p className="font-bold text-base-content/80">{bill.username}</p>
                            <p className="text-[10px] font-medium text-base-content/30">{bill.email}</p>
                        </div>
                      </td>
                      <td className="py-6 font-black text-base-content text-lg">৳{bill.amount}</td>
                      <td className="py-6 font-medium text-base-content/60 italic">{bill.phone}</td>
                      <td className="py-6 font-bold text-sm text-base-content/50">
                          {new Date(bill.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      {!isAdminView && (
                        <td className="py-6">
                          <div className="flex justify-center gap-2">
                            <button
                                className="btn btn-square btn-ghost rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                                onClick={() => openUpdateModal(bill)}
                            >
                                <span className="text-xs font-black">EDIT</span>
                            </button>
                            <button
                                className="btn btn-square btn-ghost rounded-xl hover:bg-error/10 hover:text-error transition-all"
                                onClick={() => handleDelete(bill._id)}
                            >
                                <span className="text-xs font-black">VOID</span>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-20 opacity-30">
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-6xl text-base-content/10">∅</div>
                            <p className="text-xl font-black uppercase tracking-tighter">No Active Records Found</p>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <dialog id="update_modal" className="modal">
        <div className="modal-box bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-content/5 p-10 max-w-lg">
          <h3 className="text-2xl font-black mb-6 tracking-tighter">Modify Transaction</h3>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="form-control">
              <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1">Settlement Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold"
                required
              />
            </div>

            <div className="form-control">
              <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1">Provisioning Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                required
              />
            </div>

            <div className="form-control">
              <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1">Contact Token (Phone)</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                required
              />
            </div>

            <div className="form-control">
              <label className="label uppercase text-[10px] font-black text-base-content/40 tracking-widest px-1">Schedule Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold"
                required
              />
            </div>

            <div className="modal-action gap-3 pt-4">
              <button
                type="button"
                className="btn btn-ghost rounded-2xl font-bold px-6"
                onClick={() => document.getElementById("update_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary rounded-2xl px-8 font-black shadow-xl shadow-primary/20">
                Update Record
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyPayBills;
