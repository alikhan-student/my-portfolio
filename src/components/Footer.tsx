import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050609] py-12 text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Rights */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-display font-bold text-white text-sm">
            {PERSONAL_INFO.name}
          </span>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span className="text-zinc-500">
            © {new Date().getFullYear()} All Rights Reserved. Built with mathematical precision.
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-white transition-colors"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors ml-2"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
