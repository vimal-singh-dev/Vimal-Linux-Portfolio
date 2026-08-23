import React, { useState } from 'react';
import { InitialHeroGuide } from './components/InitialHeroGuide';
import { LaptopMockup } from './components/LaptopMockup';
import { TerminalScreen } from './components/TerminalScreen';
import { ExitThanksScreen } from './components/ExitThanksScreen';
import { GlowinnPortfolio } from './components/GlowinnPortfolio';
import { USER_PROFILE, CONTACT_DATA } from './data/portfolioData';
import { playShutdownSound, playBootSound } from './utils/audio';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('~');
  const [hasCdPortfolio, setHasCdPortfolio] = useState<boolean>(false);
  const [hasRunLs, setHasRunLs] = useState<boolean>(false);
  const [hasRunCat, setHasRunCat] = useState<boolean>(false);
  const [isGuiModalOpen, setIsGuiModalOpen] = useState<boolean>(() => {
    // Default to the 3D GUI Portfolio so the Hero section is immediately visible on first load
    const saved = localStorage.getItem('portfolio_view_mode');
    return saved !== 'cli';
  });
  const [guiModalTab, setGuiModalTab] = useState<string>('projects');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExited, setIsExited] = useState<boolean>(false);
  const [externalTrigger, setExternalTrigger] = useState<{ cmd: string; timestamp: number } | null>(null);

  const handleTrackStep = (step: 'cd' | 'ls' | 'cat') => {
    if (step === 'cd') {
      setHasCdPortfolio(true);
      setCurrentPath('~/portfolio');
    } else if (step === 'ls') {
      setHasRunLs(true);
    } else if (step === 'cat') {
      setHasRunCat(true);
    }
  };

  const handleQuickRun = (cmd: string) => {
    if (isExited) {
      setIsExited(false);
      playBootSound();
    }
    setExternalTrigger({ cmd, timestamp: Date.now() });
    if (cmd.includes('portfolio')) {
      setHasCdPortfolio(true);
      setCurrentPath('~/portfolio');
    } else if (cmd === 'ls') {
      setHasRunLs(true);
    } else if (cmd.startsWith('cat')) {
      setHasRunCat(true);
    }
  };

  const handleExit = () => {
    playShutdownSound();
    setIsExited(true);
  };

  const handleRestartSession = () => {
    playBootSound();
    setIsExited(false);
  };

  const handleOpenGuiModal = (tab: string = 'projects') => {
    setGuiModalTab(tab);
    setIsGuiModalOpen(true);
    localStorage.setItem('portfolio_view_mode', 'gui');
  };

  const handleCloseGuiModal = () => {
    setIsGuiModalOpen(false);
    localStorage.setItem('portfolio_view_mode', 'cli');
  };

  if (isGuiModalOpen) {
    return <GlowinnPortfolio onClose={handleCloseGuiModal} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#F8F8F2] flex flex-col justify-between selection:bg-[#50FA7B] selection:text-black antialiased">
      {/* Background Ambient Glow with Sophisticated Dark Tones */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-[#8BE9FD]/10 via-[#BD93F9]/5 to-transparent blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#50FA7B]/5 blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-[#BD93F9]/5 blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top Hero Guidance & Intro Section */}
        {!isFullscreen && (
          <InitialHeroGuide
            currentPath={currentPath}
            hasCdPortfolio={hasCdPortfolio}
            hasRunLs={hasRunLs}
            hasRunCat={hasRunCat}
            onQuickRun={handleQuickRun}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            isExited={isExited}
            onExit={handleExit}
            onRestartSession={handleRestartSession}
            onOpenGuiModal={handleOpenGuiModal}
          />
        )}

        {/* Laptop & Terminal Canvas */}
        <main className={`flex-1 flex flex-col justify-center ${isFullscreen ? 'p-0' : 'pb-8'}`}>
          <LaptopMockup isFullscreen={isFullscreen}>
            {isExited ? (
              <ExitThanksScreen
                onRestartSession={handleRestartSession}
                onOpenGuiModal={handleOpenGuiModal}
                isFullscreen={isFullscreen}
              />
            ) : (
              <TerminalScreen
                onOpenGuiModal={handleOpenGuiModal}
                isFullscreen={isFullscreen}
                onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                onTrackStep={handleTrackStep}
                onExit={handleExit}
                externalTrigger={externalTrigger}
              />
            )}
          </LaptopMockup>
        </main>
      </div>

      {/* Footer (hidden in fullscreen) */}
      {!isFullscreen && (
        <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 py-6 border-t border-[#1e2337] text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isExited ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-[#50FA7B] shadow-[0_0_8px_#50FA7B]'}`}></span>
            <span className="text-[#F8F8F2] font-semibold">{USER_PROFILE.name}</span>
            <span className="text-slate-600">•</span>
            <span>{USER_PROFILE.title}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="hover:text-[#50FA7B] transition flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{CONTACT_DATA.email}</span>
            </a>
            <a
              href={CONTACT_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#8BE9FD] transition flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={CONTACT_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#8BE9FD] transition flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </footer>
      )}
    </div>
  );
}

