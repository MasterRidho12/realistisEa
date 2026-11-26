import React from 'react';
import { Navbar } from '../components/public/Navbar';
import { HeroSection } from '../components/public/HeroSection';
import { KatalogSection } from '../components/public/KatalogSection';
import { BuktiBacktestSection } from '../components/public/BuktiBacktestSection';
import { LayananVpsSection } from '../components/public/LayananVpsSection';
import { CaraSewaSection } from '../components/public/CaraSewaSection';
import { FaqSection } from '../components/public/FaqSection';
import { Footer } from '../components/public/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#06100C] text-white flex flex-col font-sans selection:bg-[#10B981] selection:text-[#06100C]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <KatalogSection />
        <BuktiBacktestSection />
        <LayananVpsSection />
        <CaraSewaSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};
