import { FaCheckCircle, FaFileInvoice, FaGlobe, FaUsers } from 'react-icons/fa';

const Stats = () => {
    const stats = [
        { icon: <FaUsers />, value: "50K+", label: "Active Users" },
        { icon: <FaFileInvoice />, value: "1.2M", label: "Bills Processed" },
        { icon: <FaCheckCircle />, value: "99.9%", label: "Success Rate" },
        { icon: <FaGlobe />, value: "24/7", label: "Global Access" },
    ];

    return (
        <section className="py-20 bg-primary/5 rounded-[3rem] my-10 border border-primary/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center space-y-3 group">
                            <div className="text-4xl text-primary flex justify-center group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-black text-base-content tracking-tighter">
                                {stat.value}
                            </h3>
                            <p className="text-base-content/60 font-bold uppercase text-xs tracking-widest leading-none">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
