import React from "react";
import HeroSection from "./hero-section";
import FeaturesSection from "./features-sections";
import HowItWorksSection from "./how-it-works-section";
import PricingSection from "./pricing-section";
import Footer from "./footer";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./navbar";

const LandingPage = () => {
  return <div>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <main className="min-h-screen bg-black text-white overflow-hidden">
          <Navbar />
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <PricingSection />
          <Footer />
        </main>
      </ThemeProvider>
    </div>;
};

export default LandingPage;
