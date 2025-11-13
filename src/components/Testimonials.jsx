import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah",
    location: "Dhaka",
    message: "Paying my electricity bill has never been easier!",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
  },
  {
    name: "Amir",
    location: "Chittagong",
    message: "I never miss a due date thanks to this app.",
    avatar: "https://i.pravatar.cc/100?img=2",
    rating: 4,
  },
  {
    name: "Rina",
    location: "Sylhet",
    message: "The interface is clean and super easy to use!",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
  },
  {
    name: "Kamal",
    location: "Barishal",
    message: "Quick and hassle-free bill payments.",
    avatar: "https://i.pravatar.cc/100?img=4",
    rating: 4,
  },
];

const Testimonials = () => {
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
    <section className=" py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg shadow-lg flex flex-col items-center text-center ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-100"
                  : "bg-base-100 text-base-content"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="text-gray-700 mb-2">"{t.message}"</p>
              <h3 className="font-semibold">{t.name}</h3>
              <span className="text-sm text-gray-500">{t.location}</span>
              <div className="mt-2 flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 ${
                      i >= t.rating ? "text-gray-300" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
