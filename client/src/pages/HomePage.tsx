import React from "react";
import HeroSection from "../components/Homepage/HeroSection";
import HowItWorks from "../components/Homepage/HowItWorks";
import Features from "../components/Homepage/Features";
import Testimonials from "../components/Homepage/Testimonials";
import CallToAction from "../components/Homepage/CallToAction";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-start pt-16">
      <main className="flex flex-col items-center w-full">
        <HeroSection />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
    </div>
  );
};

export default HomePage;
