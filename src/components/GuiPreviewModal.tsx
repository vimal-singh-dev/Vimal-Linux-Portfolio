import React, { useState } from 'react';
import { X, GraduationCap, Award, Code, FolderGit2, Mail, ExternalLink, Sparkles, CheckCircle, Download, Trophy, ShieldCheck, Phone, MapPin } from 'lucide-react';
import {
  USER_PROFILE,
  EDUCATION_DATA,
  SKILL_CATEGORIES,
  PROJECTS_DATA,
  CERTIFICATES_DATA,
  CONTACT_DATA
} from '../data/portfolioData';

interface GuiPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
  onExecuteCommand: (cmd: string) => void;
}

export const GuiPreviewModal: React.FC<GuiPreviewModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'projects',
  onExecuteCommand
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E1018] border border-[#1e2337] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-[#F8F8F2]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2337] bg-[#0A0B10]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#50FA7B]/10 text-[#50FA7B] border border-[#50FA7B]/25 shadow-[0_0_12px_rgba(80,250,123,0.15)]">
              <Sparkles className="w-5 h-5 text-[#BD93F9]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#F8F8F2] flex items-center gap-2">
                {USER_PROFILE.name} — Interactive GUI Viewer
              </h2>
              <p className="text-xs text-slate-400">
                B.Tech Information Technology — CSJMU Kanpur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintResume}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-[#141724] hover:bg-[#1a1f30] text-slate-200 border border-[#1e2337] hover:border-[#8BE9FD]/50 transition cursor-pointer"
              title="Print or Save as PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#8BE9FD]" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-[#F8F8F2] rounded-lg hover:bg-[#141724] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-[#0A0B10]/60 border-b border-[#1e2337] overflow-x-auto">
          {[
            { id: 'projects', label: 'Projects', icon: FolderGit2, file: 'projects.txt' },
            { id: 'skills', label: 'Skills', icon: Code, file: 'skills.txt' },
            { id: 'education', label: 'Education', icon: GraduationCap, file: 'education.txt' },
            { id: 'certificates', label: 'Certificates', icon: Award, file: 'certificates.txt' },
            { id: 'achievements', label: 'Achievements & Strengths', icon: Trophy, file: 'achievements.txt' },
            { id: 'contact', label: 'Contact & Objective', icon: Mail, file: 'contact.txt' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#50FA7B]/15 text-[#50FA7B] border border-[#50FA7B]/40 font-semibold shadow-[0_0_10px_rgba(80,250,123,0.1)]'
                    : 'text-slate-400 hover:text-[#F8F8F2] hover:bg-[#141724] border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Projects View */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1e2337]">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  Software & Systems Projects ({PROJECTS_DATA.length})
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    onExecuteCommand('cat projects.txt');
                  }}
                  className="text-xs text-[#50FA7B] hover:underline font-mono cursor-pointer"
                >
                  $ cat projects.txt
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS_DATA.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#141724]/90 border border-[#1e2337] hover:border-[#8BE9FD]/60 hover:bg-[#181c2e] hover:shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(139,233,253,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-lg group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 className="font-bold text-[#F8F8F2] group-hover:text-[#8BE9FD] text-base transition-colors duration-200">{proj.title}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#50FA7B]/10 text-[#50FA7B] border border-[#50FA7B]/25 group-hover:bg-[#50FA7B]/20 group-hover:border-[#50FA7B]/40 transition-colors">
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#8BE9FD] font-mono mb-2">{proj.tagline}</p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">{proj.description}</p>

                      <div className="mb-3">
                        <p className="text-[11px] font-semibold text-slate-400 mb-1">Key Highlights:</p>
                        <ul className="text-xs text-slate-300 space-y-1">
                          {proj.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5">
                              <span className="text-[#50FA7B] mt-0.5">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {proj.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0B10] text-slate-300 border border-[#1e2337] hover:border-[#8BE9FD]/40 hover:text-white transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-2 border-t border-[#1e2337] text-xs font-mono">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#8BE9FD] hover:text-[#50FA7B] hover:underline flex items-center gap-1 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> GitHub Repo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills View */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#1e2337]">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  Technical Expertise & Skills
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    onExecuteCommand('cat skills.txt');
                  }}
                  className="text-xs text-[#50FA7B] hover:underline font-mono cursor-pointer"
                >
                  $ cat skills.txt
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="p-4.5 rounded-xl bg-[#141724]/90 border border-[#1e2337] shadow-lg">
                    <h4 className="font-bold text-[#F8F8F2] text-sm mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#50FA7B] shadow-[0_0_6px_#50FA7B]"></span>
                      {cat.category}
                    </h4>
                    <div className="space-y-2.5">
                      {cat.skills.map((s, sIdx) => (
                        <div key={sIdx}>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-slate-200">{s.name}</span>
                            <span className="text-[#50FA7B] font-semibold">{s.tag}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#0A0B10] overflow-hidden border border-[#1e2337]">
                            <div
                              className="h-full bg-gradient-to-r from-[#50FA7B] via-[#8BE9FD] to-[#BD93F9] rounded-full shadow-[0_0_8px_rgba(80,250,123,0.4)]"
                              style={{ width: `${s.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education View */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1e2337]">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  Academic Background
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    onExecuteCommand('cat education.txt');
                  }}
                  className="text-xs text-[#50FA7B] hover:underline font-mono cursor-pointer"
                >
                  $ cat education.txt
                </button>
              </div>

              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#141724]/90 border border-[#1e2337] hover:border-[#8BE9FD]/60 hover:bg-[#181c2e] hover:shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(139,233,253,0.12)] hover:-translate-y-0.5 transition-all duration-300 space-y-4 shadow-lg group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-[#F8F8F2] group-hover:text-[#8BE9FD] transition-colors">{edu.degree}</h4>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#50FA7B]/10 text-[#50FA7B] border border-[#50FA7B]/25 group-hover:bg-[#50FA7B]/20 transition-colors">
                        {edu.grade}
                      </span>
                    </div>
                    <p className="text-sm text-[#8BE9FD] mt-1 font-medium">{edu.institution} • {edu.period}</p>
                    <p className="text-xs text-slate-400">{edu.location}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                      Key Highlights:
                    </p>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#50FA7B] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                      Relevant Coursework:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((c, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0A0B10] text-slate-300 border border-[#1e2337] hover:border-[#8BE9FD]/40 hover:text-white transition-colors"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certificates View */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1e2337]">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  Certifications & Accreditations
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    onExecuteCommand('cat certificates.txt');
                  }}
                  className="text-xs text-[#50FA7B] hover:underline font-mono cursor-pointer"
                >
                  $ cat certificates.txt
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CERTIFICATES_DATA.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-xl bg-[#141724]/90 border border-[#1e2337] hover:border-[#F1FA8C]/60 hover:bg-[#181c2e] hover:shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(241,250,140,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-lg group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-bold text-[#F8F8F2] group-hover:text-[#F1FA8C] text-sm transition-colors">{cert.title}</h4>
                        {cert.featured && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1FA8C]/10 text-[#F1FA8C] border border-[#F1FA8C]/30 shrink-0">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8BE9FD] font-medium">{cert.issuer} • {cert.date}</p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {cert.skills.map((sk, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0B10] text-slate-300 border border-[#1e2337] hover:border-[#8BE9FD]/40 hover:text-white transition-colors"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#1e2337]">
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#50FA7B] hover:text-[#50FA7B]/80 hover:underline flex items-center gap-1 font-mono transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> View Credential
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements & Strengths View */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Achievements Card */}
                <div className="p-5 rounded-xl bg-[#141724]/90 border border-[#1e2337] shadow-lg space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F1FA8C] font-mono flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#F1FA8C]" /> Achievements & Competitions
                  </h3>
                  <ul className="space-y-2.5">
                    {USER_PROFILE.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0A0B10]/80 border border-[#1e2337] text-xs text-slate-200">
                        <span className="text-[#50FA7B] font-bold">🏆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strengths Card */}
                <div className="p-5 rounded-xl bg-[#141724]/90 border border-[#1e2337] shadow-lg space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#50FA7B] font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#50FA7B]" /> Strengths & Soft Skills
                  </h3>
                  <ul className="space-y-2.5">
                    {USER_PROFILE.strengths.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0A0B10]/80 border border-[#1e2337] text-xs text-slate-200">
                        <CheckCircle className="w-3.5 h-3.5 text-[#50FA7B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Contact & Bio View */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#141724]/90 border border-[#1e2337] shadow-lg space-y-3">
                <div>
                  <h3 className="text-xs font-semibold text-[#8BE9FD] uppercase tracking-wider font-mono mb-1">
                    Profile Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {USER_PROFILE.about}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#1e2337]">
                  <h3 className="text-xs font-semibold text-[#50FA7B] uppercase tracking-wider font-mono mb-1">
                    Career Objective
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {USER_PROFILE.careerObjective}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4.5 rounded-xl bg-[#141724]/90 border border-[#1e2337] space-y-3 shadow-lg">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    Contact Channels
                  </h4>
                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#50FA7B] shrink-0" />
                      <span className="text-slate-400">Email: </span>
                      <a href={`mailto:${CONTACT_DATA.email}`} className="text-[#50FA7B] hover:underline font-semibold">
                        {CONTACT_DATA.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#8BE9FD] shrink-0" />
                      <span className="text-slate-400">Phone: </span>
                      <a href={`tel:${CONTACT_DATA.phone}`} className="text-slate-200 hover:text-[#8BE9FD]">
                        {CONTACT_DATA.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#BD93F9] shrink-0" />
                      <span className="text-slate-400">Location: </span>
                      <span className="text-slate-200">{CONTACT_DATA.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">GitHub: </span>
                      <a href={CONTACT_DATA.github} target="_blank" rel="noreferrer" className="text-[#8BE9FD] hover:underline">
                        {CONTACT_DATA.github}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">LinkedIn: </span>
                      <a href={CONTACT_DATA.linkedin} target="_blank" rel="noreferrer" className="text-[#8BE9FD] hover:underline">
                        {CONTACT_DATA.linkedin}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4.5 rounded-xl bg-[#141724]/90 border border-[#1e2337] space-y-3 shadow-lg">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    Status & Preferred Roles
                  </h4>
                  <p className="text-xs text-[#50FA7B] font-medium">{CONTACT_DATA.status}</p>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {CONTACT_DATA.preferredRoles.map((r, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8BE9FD]"></span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

