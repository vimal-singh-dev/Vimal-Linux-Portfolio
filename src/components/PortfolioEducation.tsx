import React from 'react';
import { EDUCATION_DATA, CERTIFICATES_DATA } from '../data/portfolioData';
import { GraduationCap, Award, ExternalLink, BookOpen, CheckCircle } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';

export function PortfolioEducation() {
  return (
    <section className="portfolio-section relative overflow-hidden" id="education">
      {/* Ambient Gradient Glow Orbs */}
      <div
        className="ambient-glow-orb w-[420px] h-[420px] bg-pink-500/15 top-20 -left-20"
        aria-hidden="true"
      />
      <div
        className="ambient-glow-orb w-[400px] h-[400px] bg-emerald-500/15 bottom-10 -right-20"
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="section-header">
          <span className="section-lead">Academic & Credentials</span>
          <h2 className="section-title">Education & Certifications</h2>
          <p className="section-desc">
            Foundational computer science principles, continuous learning, and industry accreditations.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[rgba(240,180,196,0.15)] border border-[rgba(240,180,196,0.3)] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-[#f0b4c4]" />
            </div>
            <span>Academic Background</span>
          </h3>

          <div className="space-y-6">
            {EDUCATION_DATA.map((edu, idx) => (
              <ThreeDCard key={idx} depth={8} glareColor="rgba(80, 250, 123, 0.18)">
                <div className="glass-panel hover:border-[rgba(80,250,123,0.3)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-lg font-medium text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-light text-slate-300">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="pill-badge pill-badge--active">
                        {edu.grade}
                      </span>
                      <span className="pill-badge">
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mb-4 space-y-1.5 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                      {edu.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-light text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-[#50FA7B] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Coursework */}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block mb-2">
                      Relevant Coursework
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2.5 py-1 rounded-full text-xs font-light bg-gradient-to-r from-[rgba(10,16,12,0.8)] to-[rgba(16,26,20,0.6)] text-slate-300 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(80,250,123,0.4)] hover:text-white transition-all hover:scale-105"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div>
          <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[rgba(80,250,123,0.15)] border border-[rgba(80,250,123,0.3)] flex items-center justify-center">
              <Award className="w-4 h-4 text-[#50FA7B]" />
            </div>
            <span>Professional Certifications</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATES_DATA.map((cert, idx) => (
              <ThreeDCard
                key={idx}
                depth={12}
                glareColor={cert.featured ? 'rgba(240, 180, 196, 0.25)' : 'rgba(80, 250, 123, 0.2)'}
                className="h-full"
              >
                <div className="glass-panel h-full flex flex-col justify-between group hover:border-[rgba(80,250,123,0.35)]">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-base font-medium text-white group-hover:text-[#50FA7B] transition-colors">
                        {cert.title}
                      </h4>
                      {cert.featured && (
                        <span className="pill-badge pill-badge--blush text-[10px]">
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-light text-slate-400 mb-3">
                      Issued by <span className="text-slate-200">{cert.issuer}</span> · {cert.date}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-full text-[11px] font-light bg-[rgba(10,16,12,0.7)] text-slate-300 border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(80,250,123,0.3)] transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      ID: {cert.credentialId.split('-')[0]}...
                    </span>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#50FA7B] hover:text-white font-medium transition-colors group/verify"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3 group-hover/verify:translate-x-0.5 group-hover/verify:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
