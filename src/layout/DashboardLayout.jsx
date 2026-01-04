import { useContext, useState } from "react";
import {
    FaBars,
    FaBell,
    FaChartPie,
    FaCog,
    FaCreditCard,
    FaHome,
    FaListAlt, FaPlus, FaSignOutAlt,
    FaUser,
    FaUsers
} from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate("/");
    };

    const adminLinks = [
        { name: "Admin Home", path: "/dashboard/admin-home", icon: <FaChartPie /> },
        { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
        { name: "Manage Bills", path: "/dashboard/manage-bills", icon: <FaListAlt /> },
        { name: "Add Bill", path: "/dashboard/add-bill", icon: <FaPlus /> },
        { name: "All Transactions", path: "/dashboard/all-transactions", icon: <FaCreditCard /> },
    ];

    const userLinks = [
        { name: "User Home", path: "/dashboard/user-home", icon: <FaHome /> },
        { name: "My Payments", path: "/dashboard/my-payments", icon: <FaCreditCard /> },
        { name: "Pay New Bill", path: "/bills", icon: <FaListAlt /> },
    ];

    const commonLinks = [
        { name: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
        { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
    ];

    const links = user?.role === "admin" ? adminLinks : userLinks;

    return (
        <div className="min-h-screen bg-base-200 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-base-100 border-r border-base-content/5 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-8 border-b border-base-content/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/30">
                            SB
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tighter text-base-content leading-none">SmartBills</h1>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{user?.role} Portal</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 no-scrollbar">
                        <div className="px-4 mb-4 text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em]">Principal</div>
                        {links.map((link) => (
                            <NavLink 
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'hover:bg-base-200 text-base-content/60 hover:text-primary'}`}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span>{link.name}</span>
                            </NavLink>
                        ))}

                        <div className="px-4 mb-4 mt-12 text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em]">Preferences</div>
                        {commonLinks.map((link) => (
                            <NavLink 
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' : 'hover:bg-base-200 text-base-content/60 hover:text-primary'}`}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span>{link.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-base-content/5">
                        <button 
                            onClick={handleLogout}
                            className="bg-error/10 text-error hover:bg-error hover:text-white flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold w-full"
                        >
                            <FaSignOutAlt />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Navbar */}
                <header className="h-20 bg-base-100 flex items-center justify-between px-8 border-b border-base-content/5 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden btn btn-ghost btn-circle"
                        >
                            <FaBars />
                        </button>
                        <h2 className="text-xl font-black text-base-content hidden sm:block">
                            Dashboard
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="btn btn-ghost btn-circle text-base-content/50 relative">
                            <FaBell />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full ring-4 ring-base-100"></span>
                        </button>
                        
                        <div className="h-10 w-[1px] bg-base-content/10 mx-2"></div>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-2 rounded-2xl transition-all">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-black text-base-content leading-none">{user?.displayName}</p>
                                    <p className="text-[10px] font-bold text-primary uppercase mt-1">ID: SB-{user?.email?.split('@')[0]}</p>
                                </div>
                                <div className="avatar">
                                    <div className="w-10 rounded-xl ring-2 ring-primary/20">
                                        <img src={user?.photoURL || "https://i.ibb.co/6YhYh5S/user.png"} alt="profile" />
                                    </div>
                                </div>
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[100] menu p-4 shadow-2xl bg-base-100 rounded-3xl w-64 mt-4 border border-base-content/5 space-y-2">
                                <div className="px-4 py-2 border-b border-base-content/5 mb-2">
                                    <p className="font-black text-base-content">{user?.displayName}</p>
                                    <p className="text-xs text-base-content/40 truncate">{user?.email}</p>
                                </div>
                                <li><Link to="/dashboard/profile" className="rounded-xl py-3 font-bold hover:bg-primary/10 hover:text-primary"><FaUser className="mr-2" /> View Profile</Link></li>
                                <li><Link to="/dashboard/settings" className="rounded-xl py-3 font-bold hover:bg-primary/10 hover:text-primary"><FaCog className="mr-2" /> Preferences</Link></li>
                                <div className="divider opacity-5"></div>
                                <li><button onClick={handleLogout} className="rounded-xl py-3 font-bold text-error hover:bg-error/10"><FaSignOutAlt className="mr-2" /> Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
