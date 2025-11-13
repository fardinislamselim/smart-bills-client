import React from "react";
import Baner from "../components/Baner";
import CategoryCards from "../components/CategoryCards";
import LatestBills from "../components/LatestBills";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <title>Home | Smart Bill</title>
      <Baner></Baner>
      <main>
        <CategoryCards></CategoryCards>
        <LatestBills></LatestBills>
        <HowItWorks></HowItWorks>
        <Testimonials></Testimonials>
      </main>
    </div>
  );
};

export default Home;
