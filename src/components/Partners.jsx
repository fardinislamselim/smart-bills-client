import { FaBuilding, FaGlobeAmericas, FaHospital, FaStoreAlt, FaUniversity } from 'react-icons/fa';

const Partners = () => {
    const partners = [
        { icon: <FaBuilding />, name: "Urban Grid" },
        { icon: <FaHospital />, name: "Cura Health" },
        { icon: <FaUniversity />, name: "EduVerse" },
        { icon: <FaStoreAlt />, name: "Quick Mart" },
        { icon: <FaGlobeAmericas />, name: "Sky Net" },
    ];

    return (
        <section className="py-20 border-y border-base-content/5 opacity-50 hover:opacity-100 transition-opacity">
            <div className="container mx-auto px-4">
                <p className="text-center text-xs font-black text-base-content/40 uppercase tracking-[0.3em] mb-12">
                    Trusted by industry leaders nationwide
                </p>
                <div className="flex flex-wrap justify-between items-center gap-12 grayscale hover:grayscale-0 transition-all duration-700">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex items-center gap-4 text-3xl font-black text-base-content/30 hover:text-primary transition-colors cursor-default group">
                            <span className="text-4xl group-hover:scale-110 transition-transform">{partner.icon}</span>
                            <span className="hidden md:block text-2xl tracking-tighter">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
