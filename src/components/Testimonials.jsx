import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Ahmed",
    location: "Dhaka, Bangladesh",
    message: "SmartBills has completely changed how I manage my utilities. No more jumping between different apps for gas and internet!",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
  },
  {
    name: "Rahat Kabir",
    location: "Chittagong",
    message: "The bill tracking feature is a lifesaver. I get clear insights on my monthly spending trends.",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    name: "Rina Begum",
    location: "Sylhet",
    message: "Fast, secure, and incredibly easy to use. I paid my internet bill in less than 30 seconds!",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 4,
  },
  {
    name: "Kamal Hossain",
    location: "Barishal",
    message: "As a small business owner, keeping track of electricity bills was tough. SmartBills makes it effortless.",
    avatar: "https://i.pravatar.cc/100?img=8",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
          Loved by <span className="text-primary italic">Thousands</span>
        </h2>
        <p className="text-base-content/60 font-medium text-lg max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our community members have to say about their experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="group relative p-10 bg-base-100 rounded-[2.5rem] border border-base-content/5 hover:border-primary/20 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute top-6 left-6 text-6xl text-primary/10 group-hover:text-primary/20 transition-colors">
              <FaQuoteLeft />
            </div>

            <div className="relative z-10 space-y-6">
              <p className="text-base-content/70 font-medium italic leading-relaxed pt-4">
                "{t.message}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-base-content/5 pt-6">
                <div className="avatar">
                  <div className="w-12 rounded-2xl ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                    <img src={t.avatar} alt={t.name} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-base-content">{t.name}</h3>
                  <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">{t.location}</p>
                </div>
              </div>

              <div className="flex gap-1 text-sm">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className={i < t.rating ? "text-warning" : "text-base-300"} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
