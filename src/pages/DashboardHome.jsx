import { useContext, useEffect, useState } from "react";
import { FaChartLine, FaExclamationCircle, FaFileInvoiceDollar, FaUsers, FaWallet } from "react-icons/fa";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from "recharts";
import instance from "../hook/useAxios";
import { AuthContext } from "../provider/AuthProvider";

const AdminDashboard = ({ stats }) => {
    const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Users", value: stats.totalUsers, icon: <FaUsers />, color: "bg-blue-500", trend: "+12% this month" },
                    { label: "Active Bills", value: stats.totalBills, icon: <FaFileInvoiceDollar />, color: "bg-amber-500", trend: "Live Providers" },
                    { label: "Total Revenue", value: `৳${stats.totalRevenue.toLocaleString()}`, icon: <FaWallet />, color: "bg-emerald-500", trend: "+24.5% vs Last Year" },
                    { label: "Transactions", value: stats.totalTransactions, icon: <FaChartLine />, color: "bg-violet-500", trend: "Successfully Processed" },
                ].map((item, i) => (
                    <div key={i} className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-content/5 group hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center text-2xl shadow-lg ring-8 ring-base-200 transition-transform group-hover:scale-110`}>
                                {item.icon}
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">{item.trend}</span>
                        </div>
                        <h3 className="text-sm font-bold text-base-content/40 uppercase tracking-[0.2em]">{item.label}</h3>
                        <p className="text-3xl font-black text-base-content mt-1">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Revenue by Category (Pie Chart) */}
                <div className="lg:col-span-4 bg-base-100 p-8 rounded-[3rem] shadow-xl border border-base-content/5">
                    <h3 className="text-xl font-black text-base-content mb-8 tracking-tighter">Revenue Distribution</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={stats.revenueByCategory}
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={8}
                                    dataKey="total"
                                    nameKey="category"
                                >
                                    {stats.revenueByCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Growth Chart (Area Chart) */}
                <div className="lg:col-span-8 bg-base-100 p-8 rounded-[3rem] shadow-xl border border-base-content/5">
                    <h3 className="text-xl font-black text-base-content mb-8 tracking-tighter">Transaction Velocity</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <AreaChart data={stats.recentTransactions}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                                <Tooltip 
                                     contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserDashboard = ({ user, stats }) => {
    return (
        <div className="space-y-8 animate-fade-in text-base-content">
            {/* User Welcome */}
            <div className="bg-primary p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="w-24 h-24 rounded-[2rem] bg-white p-1 shadow-2xl">
                        <img src={user?.photoURL} className="w-full h-full rounded-[1.8rem] object-cover" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black tracking-tighter">Welcome back, {user?.displayName}!</h2>
                        <p className="opacity-70 font-medium text-lg leading-none">You have {stats?.recentBills?.length || 0} recent transactions this month.</p>
                    </div>
                 </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Stats cards for user */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-content/5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em]">Total Lifetime Spent</p>
                            <p className="text-3xl font-black mt-2">৳{stats?.totalSpent?.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                            <FaWallet />
                        </div>
                    </div>
                    <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-content/5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em]">Validated Receipts</p>
                            <p className="text-3xl font-black mt-2">{stats?.transactionCount}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
                            <FaExclamationCircle rotate={180} />
                        </div>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="lg:col-span-8 bg-base-100 p-8 rounded-[3rem] shadow-xl border border-base-content/5">
                    <h3 className="text-xl font-black mb-8 tracking-tighter">Latest Transactions</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="border-b border-base-content/5 text-base-content/30 uppercase text-[10px] font-black tracking-widest leading-none">
                                    <th className="py-4">Service</th>
                                    <th className="py-4">Category</th>
                                    <th className="py-4">Amount</th>
                                    <th className="py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.recentBills?.map((bill, i) => (
                                    <tr key={i} className="hover:bg-base-200 transition-colors">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold">
                                                    {bill.title?.[0]}
                                                </div>
                                                <span className="font-bold">{bill.title}</span>
                                            </div>
                                        </td>
                                        <td className="font-medium text-base-content/60">{bill.category}</td>
                                        <td className="font-black">৳{bill.amount}</td>
                                        <td>
                                            <span className="badge badge-success bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase py-3">Paid</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const endpoint = user?.role === "admin" ? "/admin-stats" : `/user-stats/${user?.email}`;
                const { data } = await instance.get(endpoint);
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchStats();
    }, [user]);

    if (loading) return (
        <div className="flex flex-col gap-8 p-4">
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => <div key={i} className="h-40 bg-base-300 animate-pulse rounded-[2.5rem]"></div>)}
            </div>
            <div className="h-80 bg-base-300 animate-pulse rounded-[3rem]"></div>
        </div>
    );

    return user?.role === "admin" ? <AdminDashboard stats={stats} /> : <UserDashboard user={user} stats={stats} />;
};

export default DashboardHome;
