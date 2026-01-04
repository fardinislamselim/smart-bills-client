import AppCTA from "../components/AppCTA";
import Banner from "../components/Baner";
import CategoryCards from "../components/CategoryCards";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import LatestBills from "../components/LatestBills";
import Partners from "../components/Partners";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="space-y-10 md:space-y-20">
      <title>SmartBill | Smart Utility Management Platform</title>
      
      {/* 1. Hero Section */}
      <Banner />

      {/* 2. Partners Section (Trust) */}
      <Partners />

      {/* 3. Categories Section */}
      <CategoryCards />

      {/* 4. Feature Highlights */}
      <Features />

      {/* 5. Metrics/Stats Section */}
      <Stats />

      {/* 6. Process Flow Section */}
      <HowItWorks />

      {/* 7. Latest Bills/Services */}
      <LatestBills />

      {/* 8. User Feedback Section */}
      <Testimonials />

      {/* 9. Help & Support Accordion */}
      <FAQ />

      {/* 10. Final Call to Action */}
      <AppCTA />
    </div>
  );
};

export default Home;
