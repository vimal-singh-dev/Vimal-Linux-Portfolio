import React, { useState, useEffect } from 'react';
import { Cloudmark, MenuIcon } from './icons';
import { Terminal, Download } from 'lucide-react';
import { USER_PROFILE, CONTACT_DATA } from '../data/portfolioData';
import './Navbar.css';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onReturnToTerminal?: () => void;
}

export function Navbar({ onReturnToTerminal }: NavbarProps) {
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Update active based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = LINKS.map(l => l.href.substring(1));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i];
        if (secId === 'top') {
          if (scrollY < 300) {
            setActive('Home');
            break;
          }
        } else {
          const el = document.getElementById(secId);
          if (el && el.offsetTop - 120 <= scrollY) {
            setActive(LINKS[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setActive(label);
    setOpen(false);
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="nav">
      <div className="nav__inner shell">
        {/* 1. BRAND */}
        <a className="nav__brand" href="#top" onClick={(e) => { e.preventDefault(); handleNavClick('Home', '#top'); }}>
          <Cloudmark size={20} />
          <span>{USER_PROFILE.name}</span>
        </a>

        {/* 2. RAIL */}
        <nav className="nav__rail" aria-label="Primary">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={active === label ? 'is-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(label, href);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* 3. ACTIONS */}
        <div className="nav__actions">
          <a
            className="btn btn--pearl"
            href={`mailto:${CONTACT_DATA.email}`}
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            Hire Me
          </a>

          {onReturnToTerminal && (
            <button
              type="button"
              onClick={onReturnToTerminal}
              className="btn btn--ink flex items-center gap-1.5"
              style={{
                padding: '8px 16px',
                fontSize: '12.5px',
                color: '#50FA7B',
                borderColor: 'rgba(80, 250, 123, 0.35)',
              }}
              title="Return to Linux Terminal Portfolio"
            >
              <Terminal className="w-3.5 h-3.5 text-[#50FA7B]" />
              <span>Terminal CLI</span>
            </button>
          )}
        </div>

        {/* 4. TOGGLE */}
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* MOBILE SHEET */}
      {open && (
        <div className="nav__sheet">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(label, href);
              }}
              style={{ color: active === label ? '#ffffff' : 'var(--ink-soft)' }}
            >
              {label}
            </a>
          ))}
          <a
            className="btn btn--pearl"
            href={`mailto:${CONTACT_DATA.email}`}
            onClick={() => setOpen(false)}
          >
            Hire Me
          </a>
          {onReturnToTerminal && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onReturnToTerminal();
              }}
              className="btn btn--ink"
              style={{
                marginTop: '10px',
                color: '#50FA7B',
                borderColor: 'rgba(80, 250, 123, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Terminal className="w-4 h-4 text-[#50FA7B]" />
              <span>Return to Terminal CLI</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
