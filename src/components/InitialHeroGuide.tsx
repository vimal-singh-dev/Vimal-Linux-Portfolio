import React from 'react';
import {
  Terminal,
  Laptop,
  LogOut,
  RotateCcw,
  Eye
} from 'lucide-react';
import { USER_PROFILE } from '../data/portfolioData';
import { TypewriterText } from './TypewriterText';

interface InitialHeroGuideProps {
  currentPath?: string;
  hasCdPortfolio?: boolean;
  hasRunLs?: boolean;
  hasRunCat?: boolean;
  onQuickRun?: (cmd: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isExited: boolean;
  onExit: () => void;
  onRestartSession: () => void;
  onOpenGuiModal?: (tab: string) => void;
}

export const InitialHeroGuide: React.FC<InitialHeroGuideProps> = ({
  isFullscreen,
  onToggleFullscreen,
  isExited,
  onExit,
  onRestartSession,
  onOpenGuiModal
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto mb-6 px-4 pt-4 text-[#F8F8F2]">
      {/* Top Bar with Name, Typewriter Bio, Status & Global Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1e2337]">
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Avatar / Terminal Badge */}
          <div className="relative shrink-0 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1c2236] to-[#0d101b] text-[#50FA7B] border border-[#50FA7B]/30 flex items-center justify-center shadow-[0_0_20px_rgba(80,250,123,0.2)] group-hover:scale-105 group-hover:border-[#50FA7B]/60 group-hover:shadow-[0_0_25px_rgba(80,250,123,0.4)] transition-all duration-300">
              <Terminal className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#50FA7B] border-2 border-[#0A0B10] shadow-[0_0_8px_#50FA7B] group-hover:animate-ping"></span>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#50FA7B] border-2 border-[#0A0B10]"></span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8F8F2] hover:text-[#50FA7B] transition-colors duration-200 cursor-default">
                {USER_PROFILE.name}
              </h1>
            </div>

            {/* Dynamic Typewriter Role */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[#50FA7B] font-mono font-bold animate-pulse">{'>'}</span>
              <TypewriterText
                words={[
                  'B.Tech IT Student @ CSJMU Kanpur (2023–2027)',
                  'Aspiring Software Engineer & Cloud Developer',
                  'DevOps, Linux & AWS (EC2/S3/IAM) Enthusiast',
                  'Python, Java, C++, TypeScript & Docker',
                  'Open to Software Engineering & Cloud Internships'
                ]}
                className="text-xs sm:text-sm font-mono text-slate-300 font-medium"
                cursorClassName="text-[#50FA7B]"
                typingSpeed={50}
                deletingSpeed={25}
                pauseDuration={2200}
              />
            </div>
          </div>
        </div>

        {/* Global Toolbar Badges & Toggles */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
          {/* Graphical UI Modal Trigger */}
          {onOpenGuiModal && (
            <button
              type="button"
              onClick={() => onOpenGuiModal('projects')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#BD93F9]/15 hover:bg-[#BD93F9]/25 text-[#BD93F9] border border-[#BD93F9]/30 hover:border-[#BD93F9]/70 hover:shadow-[0_0_16px_rgba(189,147,249,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer font-medium"
              title="Open Graphical Card Visualizer"
            >
              <Eye className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
              <span>Visual GUI</span>
            </button>
          )}

          {/* Fullscreen Frame Toggle */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#141724] hover:bg-[#1a1f30] text-slate-200 hover:text-white border border-[#1e2337] hover:border-[#8BE9FD]/60 hover:shadow-[0_0_16px_rgba(139,233,253,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
            title={isFullscreen ? 'Switch to Laptop Mockup View' : 'Expand to Fullscreen Terminal'}
          >
            <Laptop className="w-3.5 h-3.5 text-[#8BE9FD] transition-transform duration-200 group-hover:scale-110" />
            <span>{isFullscreen ? 'Laptop Frame' : 'Full Screen'}</span>
          </button>

          {/* Exit / Reopen Session */}
          {isExited ? (
            <button
              type="button"
              onClick={onRestartSession}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#50FA7B]/15 hover:bg-[#50FA7B]/25 text-[#50FA7B] border border-[#50FA7B]/40 hover:border-[#50FA7B]/80 hover:shadow-[0_0_16px_rgba(80,250,123,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer font-semibold"
              title="Reopen Terminal Portfolio Session"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#50FA7B]" />
              <span>Reopen CLI</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onExit}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-rose-200 border border-rose-500/30 hover:border-rose-500/70 hover:shadow-[0_0_16px_rgba(244,63,94,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer font-semibold"
              title="Close Portfolio and View Thank You Message"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Exit</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

