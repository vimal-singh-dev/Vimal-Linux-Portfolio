import React, { useState } from 'react';
import {
  Power,
  RotateCcw,
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  Eye,
  Sparkles,
  MapPin,
  GraduationCap,
  Code,
  FolderGit2,
  Heart
} from 'lucide-react';
import { USER_PROFILE, CONTACT_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { TypewriterText } from './TypewriterText';

interface ExitThanksScreenProps {
  onRestartSession: () => void;
  onOpenGuiModal: (tab?: string) => void;
  isFullscreen: boolean;
}

export const ExitThanksScreen: React.FC<ExitThanksScreenProps> = ({
  onRestartSession,
  onOpenGuiModal,
  isFullscreen
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div
      className={`relative w-full rounded-2xl flex flex-col overflow-y-auto font-mono bg-[#0A0B10] text-[#F8F8F2] border border-[#1e2337] shadow-2xl transition-all select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen p-4 sm:p-8' : 'min-h-[580px] h-[650px] max-h-[82vh] p-4 sm:p-6'
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#50FA7B]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 right-10 w-80 h-80 bg-[#8BE9FD]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Top Header Bar Simulation */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[#1e2337] mb-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.6)]"></span>
          <span className="w-3 h-3 rounded-full bg-slate-700"></span>
          <span className="w-3 h-3 rounded-full bg-slate-700"></span>
          <span className="ml-2 font-semibold text-slate-300 flex items-center gap-1.5">
            <Power className="w-3.5 h-3.5 text-rose-400" />
            <span>SESSION TERMINATED</span>
          </span>
        </div>

        <button
          onClick={onRestartSession}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#50FA7B]/10 hover:bg-[#50FA7B]/20 text-[#50FA7B] border border-[#50FA7B]/30 hover:border-[#50FA7B]/60 transition cursor-pointer text-xs font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Terminal</span>
        </button>
      </div>

      {/* Shutdown Logs Minimal Output */}
      <div className="relative z-10 p-3 rounded-lg bg-[#0E1018]/90 border border-[#1e2337] text-[11px] text-slate-400 space-y-1 mb-6 font-mono">
        <div className="flex items-center justify-between text-slate-500">
          <span>[ OS_KERNEL ] Session shutdown sequence completed:</span>
          <span>Status: 0 (Clean Exit)</span>
        </div>
        <div className="text-slate-300">
          <span className="text-[#50FA7B]">[  OK  ]</span> Terminated terminal process (PID: 1042) for user <span className="text-[#8BE9FD]">vimal@csjmu</span>
        </div>
        <div className="text-slate-300">
          <span className="text-[#50FA7B]">[  OK  ]</span> Unmounted workspace directory <span className="text-[#F1FA8C]">/home/vimal/portfolio</span>
        </div>
        <div className="text-slate-300">
          <span className="text-[#50FA7B]">[  OK  ]</span> All output buffers flushed. Goodbye!
        </div>
      </div>

      {/* Main Thank You Card */}
      <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#50FA7B]/10 text-[#50FA7B] border border-[#50FA7B]/30 shadow-[0_0_25px_rgba(80,250,123,0.2)] mb-1">
            <Heart className="w-7 h-7 fill-[#50FA7B]/20 text-[#50FA7B] animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8F8F2] flex items-center justify-center gap-2">
            Thank You for Visiting!
          </h2>

          <div className="text-xs sm:text-sm font-mono text-[#8BE9FD] flex items-center justify-center gap-1.5 h-6">
            <span>{USER_PROFILE.name} •</span>
            <TypewriterText
              words={[
                'B.Tech IT Student (CSJMU)',
                'DevOps & Cloud Enthusiast',
                'Full-Stack Developer',
                'Ready for New Opportunities'
              ]}
              speed={60}
              deleteSpeed={35}
              pauseTime={1800}
              className="text-[#50FA7B] font-semibold"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-sans">
            I truly appreciate you taking the time to explore my interactive Linux terminal portfolio. 
            I am passionate about software engineering, cloud architecture, and DevOps, and I am actively looking for internship opportunities to contribute and learn.
          </p>
        </div>

        {/* Profile Snapshot & Quick Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          {/* Quick Contact Box */}
          <div className="p-4 rounded-xl bg-[#141724]/90 border border-[#1e2337] shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-[#8BE9FD] uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#8BE9FD]" /> Direct Contact Channels
            </h3>

            <div className="space-y-2.5">
              {/* Email */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0A0B10] border border-[#1e2337]">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#50FA7B] shrink-0" />
                  <span className="text-slate-300 truncate font-semibold">{CONTACT_DATA.email}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => handleCopy(CONTACT_DATA.email, 'email')}
                    title="Copy Email"
                    className="p-1 rounded bg-[#141724] hover:bg-[#1a1f30] text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-[#50FA7B]" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <a
                    href={`mailto:${CONTACT_DATA.email}`}
                    className="px-2 py-1 rounded bg-[#50FA7B]/10 hover:bg-[#50FA7B]/20 text-[#50FA7B] font-semibold text-[11px] transition"
                  >
                    Send Mail
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#0A0B10] border border-[#1e2337]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8BE9FD] shrink-0" />
                  <span className="text-slate-300 font-semibold">{CONTACT_DATA.phone}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleCopy(CONTACT_DATA.phone, 'phone')}
                    title="Copy Phone"
                    className="p-1 rounded bg-[#141724] hover:bg-[#1a1f30] text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-3 h-3 text-[#50FA7B]" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <a
                    href={`tel:${CONTACT_DATA.phone}`}
                    className="px-2 py-1 rounded bg-[#8BE9FD]/10 hover:bg-[#8BE9FD]/20 text-[#8BE9FD] font-semibold text-[11px] transition"
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={CONTACT_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#0A0B10] hover:bg-[#1a1f30] border border-[#1e2337] hover:border-[#8BE9FD]/50 text-slate-200 transition text-xs"
                >
                  <Github className="w-3.5 h-3.5 text-[#8BE9FD]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={CONTACT_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#0A0B10] hover:bg-[#1a1f30] border border-[#1e2337] hover:border-[#8BE9FD]/50 text-slate-200 transition text-xs"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#8BE9FD]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Profile Overview Card */}
          <div className="p-4 rounded-xl bg-[#141724]/90 border border-[#1e2337] shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-[#50FA7B] uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#50FA7B]" /> Candidate Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-[#0A0B10] border border-[#1e2337]">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">Candidate</div>
                <div className="text-slate-200 font-bold">{USER_PROFILE.name}</div>
                <div className="text-slate-400 text-[11px]">B.Tech Information Technology (CSJMU Kanpur, 2023–2027)</div>
              </div>

              <div className="p-2 rounded-lg bg-[#0A0B10] border border-[#1e2337]">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">Key Projects</div>
                <div className="text-[#F1FA8C] font-semibold">
                  Habit Tracker App • UFDR Analyzer • GreenWipe
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#0A0B10] border border-[#1e2337]">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">Core Skills</div>
                <div className="text-slate-300">
                  Python, Java, C++, JS/TS, AWS (EC2/S3/IAM), Linux, Docker, Git
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 pb-1">
          <button
            onClick={onRestartSession}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#50FA7B] hover:bg-[#50FA7B]/90 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(80,250,123,0.3)] transition cursor-pointer"
          >
            <Power className="w-4 h-4" />
            <span>Power On / Restart Terminal</span>
          </button>

          <button
            onClick={() => onOpenGuiModal('projects')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#8BE9FD] hover:text-white border border-[#1e2337] hover:border-[#8BE9FD]/50 text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Open Graphical Resume (GUI)</span>
          </button>

          <a
            href={`mailto:${CONTACT_DATA.email}`}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0E1018] hover:bg-[#141724] text-slate-300 hover:text-white border border-[#1e2337] text-xs sm:text-sm flex items-center justify-center gap-2 transition"
          >
            <Mail className="w-4 h-4 text-[#50FA7B]" />
            <span>Get in Touch Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
};
