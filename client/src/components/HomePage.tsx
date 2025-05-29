import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import DemoSection from "./DemoSection";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import Navbar from "./Navbar";

const HomePage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-start pt-16">
      <Navbar scrollToSection={scrollToSection} />

      <main className="flex flex-col items-center w-full">
        <HeroSection scrollToDemo={() => scrollToSection("demo")} />
        <HowItWorks />
        <Features />
        {/* <DemoSection /> */}
        <Testimonials />
        <CallToAction scrollToDemo={() => scrollToSection("demo")} />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
