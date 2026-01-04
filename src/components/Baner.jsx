import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import instance from "../hook/useAxios";

const Banner = () => {
  const [bills, setBills] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get("/bills/latest3");
        setBills(data);
      } catch (err) {
        console.error("Error fetching latest bills:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-[3rem] mt-4 mb-4">
      {bills.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={bills.length > 1}
          className="banner-swiper h-full"
        >
          {bills.map((bill) => (
            <SwiperSlide key={bill._id}>
              <div className="relative min-h-[400px] md:min-h-[550px] flex items-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img src={bill.image} alt={bill.title} className="w-full h-full object-cover scale-105" />
                  <div className="absolute inset-0 bg-base-100/40 dark:bg-base-100/80 backdrop-blur-[2px]"></div>
                  <div className="absolute inset-0 bg-linear-to-r from-base-100 via-base-100/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-8 md:px-16 relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6 py-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{bill.category}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-base-content leading-tight tracking-tighter">
                      <Typewriter
                        words={[bill.title]}
                        loop={1}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={2000}
                      />
                    </h1>

                    <p className="text-base md:text-lg text-base-content/70 leading-relaxed max-w-xl font-medium">
                      {bill.description?.length > 120
                        ? bill.description.slice(0, 120) + "..."
                        : bill.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                      <Link
                        to={`/bill/${bill._id}`}
                        className="btn btn-primary rounded-2xl px-8 shadow-2xl shadow-primary/30 hover:scale-105 transition-all duration-300"
                      >
                        Get Started
                      </Link>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">Pricing approx.</span>
                        <span className="text-xl font-black text-primary">{bill.amount} <small className="text-xs">BDT</small></span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block relative animate-float">
                    <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-125"></div>
                    <img
                      src={bill.image}
                      alt={bill.title}
                      className="relative z-10 w-full max-w-[400px] aspect-square object-cover rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-base-300 rotate-2 group-hover:rotate-0 transition-transform duration-700 mx-auto"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="min-h-[500px] flex justify-center items-center bg-base-200">
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default Banner;
