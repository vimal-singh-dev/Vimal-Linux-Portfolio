import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ExternalLink, Github, Layers, ArrowUpRight, CheckCircle2, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';
import { motion, AnimatePresence } from 'motion/react';

export function PortfolioProjects() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Productivity', 'Automation', 'Security'];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Productivity') return p.category.includes('Productivity');
    if (filter === 'Automation') return p.category.includes('Automation');
    if (filter === 'Security') return p.category.includes('Security');
    return true;
  });

  return (
    <section className="portfolio-section relative overflow-hidden" id="projects">
      {/* Ambient Glow Gradients */}
      <div
        className="ambient-glow-orb w-[450px] h-[450px] bg-emerald-500/15 top-1/4 -right-24"
        aria-hidden="true"
      />
      <div
        className="ambient-glow-orb w-[400px] h-[400px] bg-cyan-500/15 bottom-10 -left-20"
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="section-header">
          <span className="section-lead">Featured Works</span>
          <h2 className="section-title">Engineered Solutions & Projects</h2>
          <p className="section-desc">
            Production-focused software, forensic automation pipelines, and anti-recovery security utilities.
          </p>

          {/* Filter Pills with Glass Sheen */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`btn ${
                  filter === cat ? 'btn--pearl shadow-[0_0_20px_rgba(240,180,196,0.35)]' : 'btn--ink'
                }`}
                style={{ padding: '7px 20px', fontSize: '13px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="h-full"
              >
                <ThreeDCard
                  depth={14}
                  glareColor="rgba(80, 250, 123, 0.22)"
                  className="h-full"
                >
                  <div className="glass-panel h-full flex flex-col justify-between group hover:border-[rgba(80,250,123,0.35)]">
                    <div>
                      {/* Header Tag & Status */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="pill-badge pill-badge--active">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B] shadow-[0_0_6px_#50FA7B] animate-pulse"></span>
                          {project.status}
                        </span>
                        <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400/90">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Title with Hover Glow */}
                      <h3 className="text-xl font-medium text-white group-hover:text-[#50FA7B] transition-colors mb-1.5 flex items-center justify-between">
                        <span>{project.title}</span>
                        <span className="text-xs font-mono text-emerald-400/70 opacity-60 group-hover:opacity-100 group-hover:text-[#f0b4c4] transition-all">
                          0{idx + 1}
                        </span>
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs font-light text-slate-300/80 mb-3 italic">
                        {project.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-sm font-light text-slate-300/90 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Key Architectural Features */}
                      <div className="space-y-2 mb-4 p-3 rounded-xl bg-[rgba(10,16,12,0.5)] border border-[rgba(255,255,255,0.06)]">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2">
                            <span className="text-[#50FA7B] text-xs font-bold leading-tight">›</span>
                            <p className="text-xs font-light text-slate-300 leading-tight">
                              {feat}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                        {project.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-full text-[11px] font-light bg-gradient-to-r from-[rgba(10,16,12,0.8)] to-[rgba(18,28,20,0.6)] text-slate-300 border border-[rgba(255,255,255,0.09)] group-hover:border-[rgba(80,250,123,0.35)] group-hover:text-white transition-all"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links with Hover Effects */}
                      <div className="flex items-center justify-between pt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#50FA7B] font-medium transition-colors group/link"
                        >
                          <Github className="w-3.5 h-3.5 group-hover/link:rotate-12 transition-transform" />
                          <span>Source Code</span>
                        </a>

                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn--ink group-hover:border-[rgba(80,250,123,0.4)]"
                          style={{ padding: '7px 16px', fontSize: '12px' }}
                        >
                          <span>View Project</span>
                          <ArrowUpRight className="w-3 h-3 text-[#f0b4c4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
