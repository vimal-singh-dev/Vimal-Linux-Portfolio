import React, { useState, useEffect, useRef } from 'react';
import { Eye, Copy, Check, Sparkles, FastForward, CheckCircle2, FileText } from 'lucide-react';
import { FileNode } from '../types';
import { playKeyClickSound, playSuccessSound } from '../utils/audio';

interface AnimatedCatOutputProps {
  file: FileNode;
  onOpenGuiModal: (tab: string) => void;
  enableAnimation?: boolean;
  onScrollToBottom?: () => void;
}

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export const AnimatedCatOutput: React.FC<AnimatedCatOutputProps> = ({
  file,
  onOpenGuiModal,
  enableAnimation = true,
  onScrollToBottom
}) => {
  const [phase, setPhase] = useState<'loading' | 'streaming' | 'completed'>(
    enableAnimation ? 'loading' : 'completed'
  );
  const [spinnerIdx, setSpinnerIdx] = useState(0);
  const [loadPercent, setLoadPercent] = useState(0);
  const [displayedText, setDisplayedText] = useState(enableAnimation ? '' : file.content || '');
  const [copied, setCopied] = useState(false);

  const fullContent = file.content || '';
  const tokensRef = useRef<string[]>([]);
  const tokenIndexRef = useRef(0);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isSkills = file.name.includes('skills');
  const isProjects = file.name.includes('projects');
  const isCertificates = file.name.includes('certificates');
  const isEducation = file.name.includes('education');
  const isContact = file.name.includes('contact');

  // Tokenize content by whitespace/words while preserving layout
  useEffect(() => {
    tokensRef.current = fullContent.split(/(?<=\s+)/);
  }, [fullContent]);

  // Loading Phase Animation
  useEffect(() => {
    if (!enableAnimation || phase !== 'loading') return;

    let currentLoad = 0;
    const loadInterval = setInterval(() => {
      currentLoad += 25;
      setLoadPercent(Math.min(100, currentLoad));
      setSpinnerIdx((prev) => (prev + 1) % SPINNER_FRAMES.length);

      if (currentLoad >= 100) {
        clearInterval(loadInterval);
        setPhase('streaming');
      }
    }, 45);

    return () => clearInterval(loadInterval);
  }, [enableAnimation, phase]);

  // Word-by-Word Streaming Animation
  useEffect(() => {
    if (phase !== 'streaming') return;

    tokenIndexRef.current = 0;
    setDisplayedText('');

    const tokens = tokensRef.current;
    if (tokens.length === 0) {
      setPhase('completed');
      return;
    }

    let soundThrottle = 0;

    const streamNextToken = () => {
      const idx = tokenIndexRef.current;
      if (idx < tokens.length) {
        // Stream 1-2 tokens per step for brisk, responsive output
        const chunk = tokens.slice(idx, idx + 2).join('');
        tokenIndexRef.current += 2;
        setDisplayedText((prev) => prev + chunk);

        soundThrottle++;
        if (soundThrottle % 3 === 0) {
          playKeyClickSound();
        }

        if (onScrollToBottom && idx % 10 === 0) {
          onScrollToBottom();
        }

        // Fast typing speed: 14ms
        streamTimerRef.current = setTimeout(streamNextToken, 14);
      } else {
        setDisplayedText(fullContent);
        setPhase('completed');
        playSuccessSound();
        if (onScrollToBottom) {
          onScrollToBottom();
        }
      }
    };

    streamTimerRef.current = setTimeout(streamNextToken, 20);

    return () => {
      if (streamTimerRef.current) {
        clearTimeout(streamTimerRef.current);
      }
    };
  }, [phase, fullContent, onScrollToBottom]);

  // Skip animation to instantly finish
  const handleSkipAnimation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (streamTimerRef.current) {
      clearTimeout(streamTimerRef.current);
    }
    setDisplayedText(fullContent);
    setPhase('completed');
    if (onScrollToBottom) {
      onScrollToBottom();
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenGui = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProjects) onOpenGuiModal('projects');
    else if (isSkills) onOpenGuiModal('skills');
    else if (isEducation) onOpenGuiModal('education');
    else if (isCertificates) onOpenGuiModal('certificates');
    else onOpenGuiModal('contact');
  };

  return (
    <div className="space-y-2.5 font-mono py-1">
      {/* File Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>{file.name}</span>
          <span className="text-[10px] font-normal text-slate-400">({file.size || '1.2KB'})</span>
          {phase === 'loading' && (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-mono ml-2">
              <span className="font-bold">{SPINNER_FRAMES[spinnerIdx]}</span>
              <span>Loading buffer {loadPercent}%</span>
            </span>
          )}
          {phase === 'streaming' && (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono ml-2 animate-pulse">
              <span>●</span>
              <span>Streaming output...</span>
            </span>
          )}
          {phase === 'completed' && (
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono ml-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Read (100%)</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {phase === 'streaming' && (
            <button
              type="button"
              onClick={handleSkipAnimation}
              title="Skip typing animation"
              className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 px-2 py-0.5 rounded border border-amber-500/30 cursor-pointer font-medium transition"
            >
              <FastForward className="w-3 h-3" />
              <span>Instant</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            title="Copy file content"
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 cursor-pointer transition"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenGui}
            className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-emerald-200 bg-emerald-500/15 hover:bg-emerald-500/25 px-2.5 py-0.5 rounded border border-emerald-500/30 hover:border-emerald-500/60 cursor-pointer font-semibold transition shadow-[0_0_8px_rgba(80,250,123,0.15)]"
          >
            <Eye className="w-3 h-3 text-emerald-400" />
            <span>Visual Cards</span>
          </button>
        </div>
      </div>

      {/* Loading Progress Bar State */}
      {phase === 'loading' && (
        <div className="p-3.5 rounded-lg bg-black/40 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span className="flex items-center gap-2">
              <span className="text-[#50FA7B] font-bold">{SPINNER_FRAMES[spinnerIdx]}</span>
              <span>Reading {file.name} from disk buffer...</span>
            </span>
            <span className="text-[#50FA7B] font-bold">{loadPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 via-[#50FA7B] to-emerald-400 h-1.5 transition-all duration-75"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Output Content with Word-by-Word Typing Stream */}
      {phase !== 'loading' && (
        <div className="relative">
          <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed p-3.5 rounded-lg bg-black/40 border border-slate-800 text-slate-100 overflow-x-auto selection:bg-cyan-500 selection:text-black">
            {displayedText}
            {phase === 'streaming' && (
              <span className="inline-block w-2 h-4 ml-0.5 bg-[#50FA7B] animate-pulse align-middle" />
            )}
          </pre>
        </div>
      )}
    </div>
  );
};
