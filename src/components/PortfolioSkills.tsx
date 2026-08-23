import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code, Layout, Server, Cpu, Check, Terminal } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';

export function PortfolioSkills() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-4 h-4 text-[#f0b4c4]" />;
      case 'Layout':
        return <Layout className="w-4 h-4 text-[#50FA7B]" />;
      case 'Server':
        return <Server className="w-4 h-4 text-[#f0b4c4]" />;
      case 'Cpu':
      default:
        return <Cpu className="w-4 h-4 text-[#50FA7B]" />;
    }
  };

  return (
    <section className="portfolio-section relative overflow-hidden" id="skills">
      {/* Ambient Glow Orbs */}
      <div
        className="ambient-glow-orb w-[400px] h-[400px] bg-emerald-500/15 top-10 -left-20"
        aria-hidden="true"
      />
      <div
        className="ambient-glow-orb w-[420px] h-[420px] bg-purple-500/12 bottom-10 -right-20"
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="section-header">
          <span className="section-lead">Technical Stack</span>
          <h2 className="section-title">Skills & Engineering Ecosystem</h2>
          <p className="section-desc">
            Core proficiencies spanning cloud architecture, object-oriented systems, and modern web environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <ThreeDCard
              key={idx}
              depth={12}
              glareColor={idx % 2 === 0 ? 'rgba(240, 180, 196, 0.2)' : 'rgba(80, 250, 123, 0.2)'}
              className="h-full"
            >
              <div className="glass-panel h-full flex flex-col justify-between group hover:border-[rgba(80,250,123,0.3)]">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[rgba(255,255,255,0.08)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(10,16,12,0.8)] border border-[rgba(255,255,255,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center group-hover:scale-110 group-hover:border-[rgba(80,250,123,0.4)] transition-all">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <h3 className="text-lg font-medium text-white group-hover:text-[#50FA7B] transition-colors">
                        {cat.category}
                      </h3>
                    </div>
                    <span className="pill-badge text-[11px] group-hover:border-[rgba(80,250,123,0.3)]">
                      {cat.skills.length} competencies
                    </span>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-normal text-slate-200 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[11px] font-light text-slate-400">
                            {skill.tag}
                          </span>
                        </div>

                        {/* Level Track with Glowing Multi-color Gradient */}
                        <div className="w-full h-2 rounded-full bg-[rgba(8,14,10,0.85)] overflow-hidden p-0.5 border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#20402b] via-[#50FA7B] to-[#8BE9FD] group-hover:from-[#50FA7B] group-hover:via-[#8BE9FD] group-hover:to-[#f0b4c4] transition-all duration-700 shadow-[0_0_10px_rgba(80,250,123,0.4)]"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[11px] text-slate-400 font-light">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#50FA7B]" />
                    Verified in production
                  </span>
                  <span className="text-[#50FA7B] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B] animate-pulse" />
                    Actively practicing
                  </span>
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
}
