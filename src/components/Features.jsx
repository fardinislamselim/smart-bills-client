import { FaBolt, FaCloudUploadAlt, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';

const Features = () => {
    const features = [
        {
            icon: <FaShieldAlt />,
            title: "Secured Payments",
            description: "Bank-grade encryption ensures your transaction data stays safe and private."
        },
        {
            icon: <FaBolt />,
            title: "Instant Processing",
            description: "No more waiting. Your bills are processed and updated in real-time."
        },
        {
            icon: <FaMobileAlt />,
            title: "Mobile Friendly",
            description: "Manage your household expenses on the go with our fully responsive platform."
        },
        {
            icon: <FaCloudUploadAlt />,
            title: "Cloud Backup",
            description: "Never lose a receipt. All your payment history is safe in the cloud."
        }
    ];

    return (
        <section className="py-24">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
                    Why Choose <span className="text-primary italic">SmartBills</span>
                </h2>
                <p className="text-base-content/60 font-medium text-lg max-w-2xl mx-auto">
                    We provide the tools you need to take full control of your utility management with speed and security.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="group p-10 bg-base-100 rounded-[2.5rem] border border-base-content/5 hover:border-primary/20 hover:shadow-2xl transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl text-primary mb-8 group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-2xl font-black text-base-content mb-4 tracking-tight">{feature.title}</h3>
                        <p className="text-base-content/60 leading-relaxed font-medium">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
