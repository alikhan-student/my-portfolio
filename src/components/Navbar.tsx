import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Live Models', href: '#interactive-ml' },
    { label: 'Skills', href: '#skills' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080B]/90 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-xl shadow-black/40'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Zone 1: Clean wordmark brand title */}
        <a
          href="#about"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-sm"
        >
          <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono tracking-tight bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI / ML
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-zinc-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors py-1.5 px-2"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          
          <button
            onClick={onContactClick}
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors rounded-md shadow-sm whitespace-nowrap active:scale-95"
          >
            Get in Touch
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0A0C11]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors py-1.5 border-b border-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs text-zinc-400 py-1.5"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs text-zinc-400 py-1.5"
            >
              <span>GitHub Repositories</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
