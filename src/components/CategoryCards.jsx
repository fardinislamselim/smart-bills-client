import { FaArrowRight, FaBolt, FaFire, FaTint, FaWifi } from "react-icons/fa";

const CategoryCards = () => {
  const categories = [
    {
      name: "Electricity",
      icon: <FaBolt />,
      color: "from-amber-400 to-orange-600",
      count: "12 Services",
    },
    {
      name: "Gas",
      icon: <FaFire />,
      color: "from-rose-400 to-red-600",
      count: "8 Services",
    },
    {
      name: "Water",
      icon: <FaTint />,
      color: "from-blue-400 to-indigo-600",
      count: "5 Services",
    },
    {
      name: "Internet",
      icon: <FaWifi />,
      color: "from-emerald-400 to-teal-600",
      count: "15 Services",
    },
  ];

  return (
    <div className="py-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
          Browse by <span className="text-primary italic">Category</span>
        </h2>
        <p className="text-base-content/60 font-medium text-lg max-w-2xl mx-auto">
          Simplifying the way you manage and pay for your essential utility services. Choose a category to find your provider.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <div
            key={cat.name}
            className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-linear-to-br ${cat.color} opacity-90 group-hover:opacity-100 transition-all duration-500`}></div>
            
            {/* Animated Decorative Circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10 h-full p-10 flex flex-col items-center justify-between text-white">
              <div className="text-6xl drop-shadow-2xl animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-500">
                {cat.icon}
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-black tracking-tight mb-1">{cat.name}</h3>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest">{cat.count}</p>
              </div>

              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <FaArrowRight />
              </div>
            </div>

            {/* Bottom Glow */}
            <div className={`absolute -bottom-1 -inset-1 bg-linear-to-t ${cat.color} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
