import { FaBook, FaComments, FaHeadset, FaSearch } from "react-icons/fa";
import FAQ from "../components/FAQ";

const Help = () => {
    const channels = [
        {
            icon: <FaHeadset />,
            title: "Live Support",
            contact: "support@smartbill.com",
            desc: "Response within 2 hours"
        },
        {
            icon: <FaComments />,
            title: "Join Community",
            contact: "discord.gg/smartbill",
            desc: "Get help from fellow users"
        },
        {
            icon: <FaBook />,
            title: "Documentation",
            contact: "docs.smartbill.com",
            desc: "Technical implementation help"
        }
    ];

    return (
        <div className="space-y-24 py-12 md:py-24 animate-fade-in text-base-content">
            <title>Help Center | SmartBill</title>

            <section className="text-center space-y-8 max-w-4xl mx-auto">
                <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-xl text-sm font-black uppercase tracking-widest">
                    Support Hub
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                    How can we <span className="text-primary italic underline decoration-primary/20">assist you</span> today?
                </h1>
                
                <div className="relative max-w-2xl mx-auto mt-12">
                     <input 
                        type="text" 
                        placeholder="Search for articles, guides..." 
                        className="input input-lg w-full bg-base-100 border-none rounded-[2rem] shadow-2xl pl-16 h-20 text-lg focus:ring-4 focus:ring-primary/10"
                     />
                     <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-primary text-2xl" />
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {channels.map((c, i) => (
                    <div key={i} className="bg-base-100 p-12 rounded-[3rem] border border-base-content/5 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
                        <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 text-primary flex items-center justify-center text-3xl mb-8 group-hover:rotate-12 transition-transform">
                            {c.icon}
                        </div>
                        <h3 className="text-2xl font-black mb-2">{c.title}</h3>
                        <p className="text-base-content/60 font-medium mb-6 leading-relaxed">{c.desc}</p>
                        <p className="text-primary font-black tracking-tight">{c.contact}</p>
                    </div>
                ))}
            </section>

            <FAQ />
            
            <section className="bg-primary p-12 md:p-24 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl shadow-primary/30">
                <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary mix-blend-multiply opacity-50"></div>
                <div className="relative z-10 space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Still Stuck?</h2>
                    <p className="text-xl opacity-80 font-medium max-w-xl mx-auto leading-relaxed">
                        Our engineering team is ready to assist with complex integration or billing issues.
                    </p>
                    <button className="btn btn-lg bg-white text-primary border-none rounded-2xl px-12 font-black shadow-xl hover:bg-neutral-100 uppercase tracking-widest text-sm">
                        Open a Ticket
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Help;
