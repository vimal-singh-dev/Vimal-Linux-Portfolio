import React, { useRef, useState, useEffect } from 'react';
import { USER_PROFILE, PROJECTS_DATA, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { ArrowDown, Code, Server, Terminal, Sparkles } from 'lucide-react';
import { ThreeDHeroVisual } from './ThreeDHeroVisual';
import { ThreeDCard } from './ThreeDCard';
import './Hero.css';

const HERO_VIDEO_URL = '/hero.mp4';

const STATS = [
  { figure: '3+', label: 'Projects', foot: 'Production Ready' },
  { figure: 'B.Tech IT', label: 'CSJMU Kanpur', foot: 'Information Technology' },
  { figure: '15+', label: 'Tech Stacks', foot: 'AWS · Python · DevOps' },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.pause();
      } else {
        const playPromise = video.play();
        if (playPromise?.catch) {
          playPromise.catch(() => {
            // Autoplay blocked or deferred - keep UI seamlessly interactive
          });
        }
      }
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax transform calculations with safe bounds
  const videoTranslateY = Math.max(-100, Math.min(200, scrollY * 0.25));
  const bodyTranslateY = Math.max(-50, Math.min(100, scrollY * 0.1));
  const bodyOpacity = scrollY > 0 ? Math.max(0.1, 1 - scrollY / 700) : 1;

  return (
    <section className="hero" id="top">
      {/* Dynamic Ambient Background Glow Orbs for Instant Visibility */}
      <div
        className="ambient-glow-orb w-[500px] h-[500px] bg-emerald-500/20 top-10 -left-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="ambient-glow-orb w-[480px] h-[480px] bg-cyan-500/15 top-32 right-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="ambient-glow-orb w-[420px] h-[420px] bg-purple-500/15 bottom-10 left-1/3 pointer-events-none"
        aria-hidden="true"
      />

      {/* 1. MEDIA LAYER (Video background with smooth fallback) */}
      <div
        className="hero__media"
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${videoTranslateY}px, 0)`,
          willChange: 'transform',
        }}
      >
        <video
          ref={videoRef}
          className={`hero__video ${videoLoaded ? 'is-ready' : 'is-ready'}`}
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          onError={() => {
            // Keep background gradient active
          }}
        />
        <div className="hero__scrim" />
      </div>

      {/* 2. CENTRE HERO BODY */}
      <div
        className="hero__body shell relative z-10"
        style={{
          transform: `translate3d(0, ${bodyTranslateY}px, 0)`,
          opacity: bodyOpacity,
          willChange: 'transform, opacity',
        }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full max-w-6xl my-auto">
          {/* Left Column: Heading & CTAs */}
          <div className="text-center lg:text-left flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(14,22,17,0.75)] border border-[rgba(255,255,255,0.14)] backdrop-blur-md mb-4 text-xs font-normal text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <span className="w-2 h-2 rounded-full bg-[#50FA7B] shadow-[0_0_8px_#50FA7B] animate-pulse"></span>
              <span>Open to Software Engineering & DevOps Internships</span>
            </div>

            <h1 className="hero__title !text-center lg:!text-left">
              <span className="hero__title-lead">B.Tech IT · Cloud & DevOps Engineer</span>
              Engineered for Modern Performance.
            </h1>

            <p className="text-sm sm:text-base font-light text-slate-300/85 mt-4 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Hi, I'm <span className="text-white font-medium">{USER_PROFILE.name}</span>. Building scalable cloud systems, forensic parsing automation, and secure system sanitization tools at CSJMU Kanpur.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-7">
              <a
                className="btn btn--pearl hero__cta"
                href="#projects"
                onClick={handleScrollToProjects}
              >
                Explore Featured Projects
              </a>
              <a
                className="btn btn--ink hero__cta"
                href="#contact"
                onClick={handleScrollToContact}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right Column: 3D Interactive Geometry Sphere */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <ThreeDHeroVisual />
          </div>
        </div>
      </div>

      {/* 3. FOOT ROW WITH 3D TILT CARDS */}
      <div className="hero__foot shell z-10">
        <ThreeDCard depth={12} className="w-full sm:w-auto" glareColor="rgba(240, 180, 196, 0.15)">
          <article className="card card--note w-full">
            <h2 className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B]" />
              Cloud, DevOps & Systems
            </h2>
            <p>
              Architecting AWS cloud environments, automated forensic parsing scripts, and secure system sanitization utilities.
            </p>
          </article>
        </ThreeDCard>

        <p className="hero__caption hidden md:block">
          Translating complex systems into seamless digital elegance.
        </p>

        <div className="hero__stats">
          {STATS.map((s) => (
            <ThreeDCard key={s.label} depth={15} glareColor="rgba(80, 250, 123, 0.2)">
              <article className="card card--stat h-full">
                <strong>{s.figure}</strong>
                <span className="card__label">{s.label}</span>
                <span className="card__foot">{s.foot}</span>
              </article>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
}
