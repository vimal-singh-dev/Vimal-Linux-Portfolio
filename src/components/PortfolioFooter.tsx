import React from 'react';
import { USER_PROFILE, CONTACT_DATA } from '../data/portfolioData';
import { Cloudmark } from './icons';
import { Terminal, Heart, ArrowUp } from 'lucide-react';

interface PortfolioFooterProps {
  onReturnToTerminal?: () => void;
}

export function PortfolioFooter({ onReturnToTerminal }: PortfolioFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[rgba(5,10,7,0.92)] py-12">
      <div className="shell">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <Cloudmark size={22} />
            <div>
              <h4 className="text-base font-medium text-white">{USER_PROFILE.name}</h4>
              <p className="text-xs font-light text-slate-400">
                B.Tech IT @ CSJMU Kanpur · Cloud & DevOps Portfolio
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6 text-xs text-slate-300 font-light">
            <a href="#top" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {onReturnToTerminal && (
              <button
                type="button"
                onClick={onReturnToTerminal}
                className="btn btn--ink flex items-center gap-1.5"
                style={{ padding: '6px 14px', fontSize: '12px', color: '#50FA7B' }}
                title="Return to Linux Terminal Portfolio"
              >
                <Terminal className="w-3.5 h-3.5 text-[#50FA7B]" />
                <span>Terminal View</span>
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[rgba(22,32,26,0.6)] border border-[rgba(255,255,255,0.1)] text-slate-300 hover:text-white transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light text-slate-500">
          <p>© {new Date().getFullYear()} {USER_PROFILE.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with modern elegance · React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
