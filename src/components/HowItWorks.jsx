import { motion } from "framer-motion";
import {
    FaChartLine,
    FaFileInvoiceDollar,
    FaRegCreditCard,
    FaUserCheck,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserCheck />,
    title: "1. Secure Onboard",
    description: "Create your encrypted account and set up your utility profile in seconds.",
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: "2. Connect Bills",
    description: "Link your service providers to see all current dues in one dashboard.",
  },
  {
    icon: <FaRegCreditCard />,
    title: "3. One-Click Pay",
    description: "Choose your payment method and settle your dues instantly and safely.",
  },
  {
    icon: <FaChartLine />,
    title: "4. Smart Insights",
    description: "Track your monthly trends and download receipts for your records.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Connector Line (Desktop) */}
      <div className="hidden lg:block absolute top-[60%] left-[10%] right-[10%] h-[2px] bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="text-center mb-20 space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter">
          Master the <span className="text-primary italic">Process</span>
        </h2>
        <p className="text-base-content/60 font-medium text-lg max-w-2xl mx-auto">
          We've simplified the complex world of utility management into four easy steps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="group flex flex-col items-center text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className="w-24 h-24 rounded-[2rem] bg-base-200 flex items-center justify-center text-4xl text-primary shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-100 group-hover:scale-110 rotate-0 group-hover:rotate-6">
              {step.icon}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-base-content tracking-tight">
                {step.title}
              </h3>
              <p className="text-base-content/60 font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
            
            {/* Step indicator for mobile */}
            <div className="lg:hidden text-xs font-black text-primary/30 uppercase tracking-[0.2em]">Step 0{index + 1}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
