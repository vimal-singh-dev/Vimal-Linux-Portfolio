import React from 'react';
import { USER_PROFILE, EDUCATION_DATA } from '../data/portfolioData';
import { Sparkles, Trophy, Compass, CheckCircle2, Award, Terminal } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';

export function PortfolioAbout() {
  return (
    <section className="portfolio-section relative overflow-hidden" id="about">
      {/* Ambient Gradient Glow Orbs */}
      <div
        className="ambient-glow-orb w-96 h-96 bg-emerald-500/20 top-10 -left-20"
        aria-hidden="true"
      />
      <div
        className="ambient-glow-orb w-96 h-96 bg-pink-500/15 bottom-10 -right-20"
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="section-header">
          <span className="section-lead">About & Philosophy</span>
          <h2 className="section-title">Driven by Curiosity, Engineered with Precision</h2>
          <p className="section-desc">
            Passionate about building resilient cloud infrastructures, clean web software, and efficient systems pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Bio Card */}
          <div className="lg:col-span-7 h-full">
            <ThreeDCard depth={10} glareColor="rgba(80, 250, 123, 0.18)" className="h-full">
              <div className="glass-panel h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="pill-badge pill-badge--active">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B] shadow-[0_0_8px_#50FA7B] animate-pulse"></span>
                      CSJMU Kanpur · 2023–2027
                    </span>
                    <span className="pill-badge">B.Tech IT</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-white mb-3">
                    {USER_PROFILE.title}
                  </h3>

                  <p className="text-sm sm:text-base font-light text-slate-300/85 leading-relaxed mb-4">
                    {USER_PROFILE.about}
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-[rgba(10,16,12,0.8)] to-[rgba(18,28,22,0.6)] border border-[rgba(255,255,255,0.09)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] mb-4 hover:border-[rgba(240,180,196,0.3)] transition-colors">
                    <h4 className="text-xs uppercase tracking-wider text-[#f0b4c4] font-medium mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#f0b4c4]" />
                      Career Objective
                    </h4>
                    <p className="text-xs sm:text-sm font-light text-slate-200 leading-relaxed">
                      "{USER_PROFILE.careerObjective}"
                    </p>
                  </div>
                </div>

                {/* Core Strengths */}
                <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-2.5">
                    Core Strengths & Mindset
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {USER_PROFILE.strengths.map((str, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-[rgba(22,32,26,0.5)] border border-[rgba(255,255,255,0.08)] flex items-start gap-2 hover:border-[rgba(80,250,123,0.4)] hover:bg-[rgba(26,42,32,0.6)] transition-all hover:-translate-y-0.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#50FA7B] shrink-0 mt-0.5" />
                        <span className="text-xs font-light text-slate-200">{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* Highlights & Achievements Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Hackathon Achievement Box */}
            <ThreeDCard depth={12} glareColor="rgba(240, 180, 196, 0.25)" className="h-full">
              <div className="glass-panel h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#f0b4c4]" />
                      <span className="text-xs uppercase tracking-wider text-[#f0b4c4] font-medium">
                        Honors & Awards
                      </span>
                    </div>
                    <span className="pill-badge pill-badge--blush">Verified</span>
                  </div>

                  <div className="space-y-3">
                    {USER_PROFILE.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-gradient-to-r from-[rgba(10,16,12,0.7)] to-[rgba(18,24,19,0.5)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(240,180,196,0.45)] hover:shadow-[0_4px_20px_rgba(240,180,196,0.15)] transition-all hover:translate-x-1"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[rgba(80,250,123,0.12)] border border-[rgba(80,250,123,0.3)] flex items-center justify-center shrink-0">
                            <Award className="w-4 h-4 text-[#50FA7B]" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-normal text-white">
                              {ach}
                            </p>
                            <span className="text-[11px] font-light text-slate-400 mt-0.5 block">
                              Competitive programming & rapid prototype deployment
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs text-slate-400 font-light">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f0b4c4]" />
                    Kanpur, India
                  </span>
                  <span className="text-[#50FA7B] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B] animate-ping" />
                    Actively Coding
                  </span>
                </div>
              </div>
            </ThreeDCard>
          </div>
        </div>
      </div>
    </section>
  );
}
