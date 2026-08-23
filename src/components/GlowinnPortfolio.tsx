import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { PortfolioAbout } from './PortfolioAbout';
import { PortfolioProjects } from './PortfolioProjects';
import { PortfolioSkills } from './PortfolioSkills';
import { PortfolioEducation } from './PortfolioEducation';
import { PortfolioContact } from './PortfolioContact';
import { PortfolioFooter } from './PortfolioFooter';
import { ThreeDBackground } from './ThreeDBackground';
import { Terminal, ArrowLeft } from 'lucide-react';
import '../styles/globals.css';

interface GlowinnPortfolioProps {
  onClose: () => void;
}

export function GlowinnPortfolio({ onClose }: GlowinnPortfolioProps) {
  return (
    <div className="glowinn-wrapper relative min-h-screen w-full select-text">
      {/* 3D Ambient Particle Motes & Fireflies */}
      <ThreeDBackground />

      {/* Return to Terminal Float Badge */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[rgba(14,22,17,0.92)] hover:bg-[rgba(24,36,28,0.95)] text-[#50FA7B] hover:text-white border border-[rgba(80,250,123,0.4)] hover:border-[#50FA7B] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(80,250,123,0.25)] backdrop-blur-md transition-all duration-200 cursor-pointer font-mono text-xs font-semibold hover:scale-105 active:scale-95"
          title="Exit GUI and Return to Linux Terminal"
        >
          <ArrowLeft className="w-4 h-4 text-[#50FA7B]" />
          <Terminal className="w-4 h-4 text-[#50FA7B]" />
          <span>Exit to Terminal (CLI)</span>
        </button>
      </div>

      {/* Floating Pill Navbar */}
      <Navbar onReturnToTerminal={onClose} />

      {/* Full-viewport Centred Video Hero Section & Portfolio Sections */}
      <main className="relative z-10">
        <Hero />
        <PortfolioAbout />
        <PortfolioProjects />
        <PortfolioSkills />
        <PortfolioEducation />
        <PortfolioContact />
      </main>

      {/* Footer */}
      <PortfolioFooter onReturnToTerminal={onClose} />
    </div>
  );
}

