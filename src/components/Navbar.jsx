import { useContext, useEffect, useState } from "react";
import { FaChartLine, FaMoon, FaSignOutAlt, FaSun, FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { loading, user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.querySelector("html").setAttribute("data-theme", saved);
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logOut().catch(console.error);
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center">
  //       <span className="loading loading-dots loading-xl"></span>
  //     </div>
  //   );
  // }

  // Common nav links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bills"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary" : ""}`
          }
        >
          Bills
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary" : ""}`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary" : ""}`
          }
        >
          Help
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to={user?.role === 'admin' ? '/dashboard/admin-home' : '/dashboard/user-home'}
              className={({ isActive }) =>
                `font-medium ${isActive ? "text-primary" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-base-100/80 backdrop-blur-lg border-b border-base-content/5"></div>
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="navbar h-20 px-0">
          {/* Left: Logo */}
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <img src={logo} alt="SmartBill" className="h-8 w-8 object-contain" />
              </div>
              <h2 className="text-2xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                SmartBill
              </h2>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex-none flex items-center gap-2">
            {/* Desktop Menu */}
            <ul className="menu menu-horizontal gap-2 hidden md:flex items-center px-1">
              {navLinks}
            </ul>

            <div className="divider divider-horizontal mx-2 hidden md:flex"></div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle btn-sm hover:bg-base-300 transition-all"
              >
                {theme === "light" ? <FaMoon className="text-primary" /> : <FaSun className="text-warning" />}
              </button>

              {/* Desktop Auth */}
              <div className="hidden md:flex items-center gap-3">
                {!user ? (
                  <>
                    <Link to="/login" className="btn btn-sm btn-ghost hover:bg-primary/10 hover:text-primary rounded-xl">
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-sm btn-primary rounded-xl px-6 shadow-lg shadow-primary/20">
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="avatar cursor-pointer">
                        <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-110 transition-transform">
                          <img src={user.photoURL || "https://i.ibb.co/6YhYh5S/user.png"} alt="User Avatar" />
                        </div>
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[100] menu p-4 shadow-2xl bg-base-100/95 backdrop-blur-xl rounded-2xl w-60 mt-4 border border-base-content/5 space-y-1">
                        <div className="px-3 py-2 border-b border-base-content/5 mb-2">
                          <p className="font-black text-sm text-base-content">{user?.displayName}</p>
                          <p className="text-[10px] text-base-content/40 truncate">{user?.email}</p>
                        </div>
                        <li><Link to={user?.role === 'admin' ? '/dashboard/admin-home' : '/dashboard/user-home'} className="rounded-xl py-2 font-bold hover:bg-primary/10 hover:text-primary transition-all text-xs uppercase tracking-widest"><FaChartLine className="mr-2" /> Portal</Link></li>
                        <li><Link to="/dashboard/profile" className="rounded-xl py-2 font-bold hover:bg-primary/10 hover:text-primary transition-all text-xs uppercase tracking-widest"><FaUserCircle className="mr-2" /> Dossier</Link></li>
                        <div className="divider opacity-5 my-1"></div>
                        <li><button onClick={handleLogout} className="rounded-xl py-2 font-black text-error hover:bg-error/10 text-xs uppercase tracking-widest"><FaSignOutAlt className="mr-2" /> Terminate</button></li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Trigger */}
              <div className="md:hidden dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 p-3 shadow-2xl bg-base-100/95 backdrop-blur-xl rounded-2xl w-56 border border-base-content/5 space-y-2">
                  <div className="px-3 py-2 text-xs font-bold text-base-content/50 uppercase tracking-widest">Navigation</div>
                  {navLinks}
                  <div className="divider opacity-50 my-1"></div>
                  {!user ? (
                    <div className="grid grid-cols-2 gap-2 p-1">
                      <Link to="/login" className="btn btn-sm btn-ghost rounded-xl">Login</Link>
                      <Link to="/register" className="btn btn-sm btn-primary rounded-xl">Join</Link>
                    </div>
                  ) : (
                    <div className="p-1 space-y-2">
                      <div className="flex items-center gap-3 px-3 py-2 bg-base-200 rounded-xl">
                        {user?.photoURL ? (
                          <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="" />
                        ) : (
                          <FaUserCircle className="text-2xl opacity-50" />
                        )}
                        <span className="text-sm font-medium truncate">{user?.displayName || 'User'}</span>
                      </div>
                      <button onClick={handleLogout} className="btn btn-sm btn-error btn-outline w-full rounded-xl">Logout</button>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
