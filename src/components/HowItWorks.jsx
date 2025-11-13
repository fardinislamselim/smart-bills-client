import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserCheck,
  FaFileInvoiceDollar,
  FaRegCreditCard,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserCheck className="w-10 h-10 text-primary mb-4" />,
    title: "Register / Login",
    description:
      "Create an account or login to manage your utility bills securely.",
  },
  {
    icon: <FaFileInvoiceDollar className="w-10 h-10 text-primary mb-4" />,
    title: "View Bills",
    description:
      "Check all available bills: electricity, gas, water, internet, etc.",
  },
  {
    icon: <FaRegCreditCard className="w-10 h-10 text-primary mb-4" />,
    title: "Pay Bills",
    description:
      "Pay only the current month’s bills quickly and safely online.",
  },
  {
    icon: <FaChartLine className="w-10 h-10 text-primary mb-4" />,
    title: "Track Payments",
    description:
      "Monitor your paid bills, download reports, and keep track of expenses.",
  },
];



const HowItWorks = () => {
    const [theme, setTheme] = useState(
      document.documentElement.getAttribute("data-theme") || "light"
    );
    useEffect(() => {
      const observer = new MutationObserver(() => {
        setTheme(document.documentElement.getAttribute("data-theme"));
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    }, []);
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow hover:shadow-lg text-center transition-transform duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-100"
                  : "bg-base-100 text-base-content"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {step.icon}
              <h3 className="text-xl text-primary font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
