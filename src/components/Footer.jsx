import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200/50 border-t border-base-content/5 text-base-content">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to={"/"} className="inline-block group">
              <h2 className="text-3xl font-black flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">SmartBills</span>
              </h2>
            </Link>
            <p className="text-base-content/70 leading-relaxed max-w-md">
              Empowering households and businesses with an intelligent utility management platform. 
              Track, pay, and analyze your bills with unprecedented ease and security.
            </p>

            <div className="space-y-3 text-sm font-medium text-base-content/60">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                Sector 12, Uttara, Dhaka - 1230, Bangladesh
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary/40"></span>
                support@smartbills.com | +880 1234 567 890
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              {[
                { icon: <FaFacebook size={18} />, href: "https://facebook.com" },
                { icon: <FaLinkedin size={18} />, href: "https://linkedin.com" },
                { icon: <FaGithub size={18} />, href: "https://github.com" },
                { icon: <FaXTwitter size={18} />, href: "https://x.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-base-300/50 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-bold mb-6 text-primary uppercase tracking-wider">Product</h3>
            <ul className="space-y-4">
              {[
                { label: "Home Dashboard", to: "/" },
                { label: "Utility Services", to: "/bills" },
                { label: "Payment History", to: "/dashboard/my-payments" },
                { label: "About Platform", to: "/about" },
                { label: "Knowledge Base", to: "/help" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.to} 
                    className="text-base-content/60 hover:text-primary transition-colors flex items-center group font-medium"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-primary uppercase tracking-wider">Stay Connected</h3>
            <p className="text-sm mb-6 text-base-content/60 leading-relaxed font-medium">
              Join 50k+ users receiving monthly insights on smart utility saving and updates.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-lg w-full bg-base-300/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
              <button className="btn btn-primary btn-lg w-full rounded-2xl font-black shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-base-content/5 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-base-content/50">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-base-content font-bold">SmartBills</span>. 
              Built for the modern web.
            </p>
            <div className="flex items-center gap-1">
              <span>Made with ✨ by</span>
              <a
                href="https://github.com/mdfardinislamselim"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-bold"
              >
                Fardin Islam
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
