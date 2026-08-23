import React, { useState } from 'react';
import { CONTACT_DATA } from '../data/portfolioData';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Copy, Check, Sparkles } from 'lucide-react';
import { ThreeDCard } from './ThreeDCard';

export function PortfolioContact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setIsSent(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setIsSent(false);
    }, 4000);
  };

  return (
    <section className="portfolio-section relative overflow-hidden" id="contact">
      {/* Ambient Gradient Glow Orbs */}
      <div
        className="ambient-glow-orb w-[480px] h-[480px] bg-emerald-500/15 top-10 -right-20"
        aria-hidden="true"
      />
      <div
        className="ambient-glow-orb w-[450px] h-[450px] bg-pink-500/15 bottom-10 -left-20"
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        <div className="section-header">
          <span className="section-lead">Get in Touch</span>
          <h2 className="section-title">Let's Build Something Exceptional</h2>
          <p className="section-desc">
            Seeking software engineering, cloud, or DevOps internship opportunities. Feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Social Links */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <ThreeDCard depth={10} glareColor="rgba(240, 180, 196, 0.25)">
              <div className="glass-panel hover:border-[rgba(240,180,196,0.35)]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgba(240,180,196,0.2)] to-[rgba(10,16,12,0.8)] border border-[rgba(240,180,196,0.35)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#f0b4c4]" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-light block">Email</span>
                      <a
                        href={`mailto:${CONTACT_DATA.email}`}
                        className="text-sm font-medium text-white hover:text-[#f0b4c4] transition-colors"
                      >
                        {CONTACT_DATA.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_DATA.email, 'email')}
                    className="p-2.5 rounded-xl bg-[rgba(22,32,26,0.6)] border border-[rgba(255,255,255,0.1)] text-slate-300 hover:text-white hover:border-[rgba(80,250,123,0.4)] hover:bg-[rgba(26,42,32,0.8)] transition-all"
                    title="Copy email to clipboard"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-[#50FA7B]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </ThreeDCard>

            {/* Phone Card */}
            <ThreeDCard depth={10} glareColor="rgba(80, 250, 123, 0.25)">
              <div className="glass-panel hover:border-[rgba(80,250,123,0.35)]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgba(80,250,123,0.2)] to-[rgba(10,16,12,0.8)] border border-[rgba(80,250,123,0.35)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#50FA7B]" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-light block">Phone / Mobile</span>
                      <a
                        href={`tel:${CONTACT_DATA.phone}`}
                        className="text-sm font-medium text-white hover:text-[#50FA7B] transition-colors"
                      >
                        +91 {CONTACT_DATA.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_DATA.phone, 'phone')}
                    className="p-2.5 rounded-xl bg-[rgba(22,32,26,0.6)] border border-[rgba(255,255,255,0.1)] text-slate-300 hover:text-white hover:border-[rgba(80,250,123,0.4)] hover:bg-[rgba(26,42,32,0.8)] transition-all"
                    title="Copy phone number to clipboard"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-[#50FA7B]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </ThreeDCard>

            {/* Location & Institution */}
            <ThreeDCard depth={8} glareColor="rgba(240, 180, 196, 0.18)">
              <div className="glass-panel">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-[rgba(10,16,12,0.8)] border border-[rgba(255,255,255,0.12)] flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#f0b4c4]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-light block">Location & Campus</span>
                    <p className="text-sm font-medium text-white">
                      {CONTACT_DATA.location} · {CONTACT_DATA.college}
                    </p>
                  </div>
                </div>
              </div>
            </ThreeDCard>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <ThreeDCard depth={12} glareColor="rgba(0, 119, 181, 0.35)">
                <a
                  href={CONTACT_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel flex items-center justify-center gap-2 p-3 text-sm font-medium text-slate-200 hover:text-white hover:border-[#0077b5]/50 group transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[#0077b5] group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
              </ThreeDCard>

              <ThreeDCard depth={12} glareColor="rgba(255, 255, 255, 0.3)">
                <a
                  href={CONTACT_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel flex items-center justify-center gap-2 p-3 text-sm font-medium text-slate-200 hover:text-white hover:border-white/40 group transition-all"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                </a>
              </ThreeDCard>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <ThreeDCard depth={10} glareColor="rgba(80, 250, 123, 0.2)">
              <div className="glass-panel hover:border-[rgba(80,250,123,0.3)]">
                <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#50FA7B]" />
                  <span>Send a Direct Note</span>
                </h3>
                <p className="text-xs font-light text-slate-400 mb-6">
                  Inquiring about potential internship openings or collaborative engineering opportunities? Leave a message below.
                </p>

                {isSent ? (
                  <div className="p-6 rounded-xl bg-[rgba(14,22,17,0.9)] border border-[rgba(80,250,123,0.4)] text-center space-y-3 shadow-[0_0_30px_rgba(80,250,123,0.2)]">
                    <div className="w-12 h-12 rounded-full bg-[rgba(80,250,123,0.15)] border border-[#50FA7B] flex items-center justify-center mx-auto text-[#50FA7B]">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-medium text-white">Thank You for Connecting!</h4>
                    <p className="text-xs font-light text-slate-300">
                      Your message has been formatted. You can also write directly to{' '}
                      <span className="text-[#50FA7B] font-mono">{CONTACT_DATA.email}</span>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-light text-slate-300 mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Connor"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[rgba(10,16,12,0.85)] to-[rgba(16,24,18,0.7)] border border-[rgba(255,255,255,0.14)] text-white text-sm focus:border-[#50FA7B] focus:shadow-[0_0_15px_rgba(80,250,123,0.25)] focus:outline-none transition-all placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-light text-slate-300 mb-1.5">
                          Your Email / Organization
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[rgba(10,16,12,0.85)] to-[rgba(16,24,18,0.7)] border border-[rgba(255,255,255,0.14)] text-white text-sm focus:border-[#50FA7B] focus:shadow-[0_0_15px_rgba(80,250,123,0.25)] focus:outline-none transition-all placeholder:text-slate-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-light text-slate-300 mb-1.5">
                        Message / Inquiry
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Describe your internship role, requirements, or opportunities..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[rgba(10,16,12,0.85)] to-[rgba(16,24,18,0.7)] border border-[rgba(255,255,255,0.14)] text-white text-sm focus:border-[#50FA7B] focus:shadow-[0_0_15px_rgba(80,250,123,0.25)] focus:outline-none transition-all resize-none placeholder:text-slate-500"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] font-light text-slate-400">
                        Typical response within 24 hours
                      </span>
                      <button
                        type="submit"
                        className="btn btn--pearl flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ThreeDCard>
          </div>
        </div>
      </div>
    </section>
  );
}
