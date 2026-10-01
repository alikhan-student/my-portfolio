import React, { useState } from 'react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Check, 
  Copy, 
  Calendar, 
  MapPin, 
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="about" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Subtle minimalist grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      
      {/* Subtle radial ambient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typographic Core */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Kicker - Zero pill metadata */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-4 tracking-wide">
              <span className="text-zinc-300">University of Peshawar</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span className="text-zinc-300">Core Computing Society</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span className="text-emerald-400">Class of 2027</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 text-balance">
              Building practical AI models with mathematical rigor.
            </h1>

            {/* Bio Prose */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal mb-8 max-w-xl">
              I am an Artificial Intelligence student at the <strong className="text-white font-medium">University of Peshawar</strong> and 
              AI Club Lead at <strong className="text-white font-medium">Core Computing Society</strong>. I specialize in machine learning, deep learning, large language models (LLMs), AI automation, RAG pipelines, and Python programming—turning predictive algorithms into dependable real-world software.
            </p>

            {/* Personal Details Row - Unboxed with separators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 mb-8 border-y border-white/[0.07] text-xs">
              <div className="flex items-center justify-between sm:justify-start gap-3 text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  Email:
                </span>
                <div className="flex items-center gap-1.5 font-mono text-zinc-200">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline truncate max-w-[170px]">
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                    title="Copy Email"
                    className="p-1 hover:text-white transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-3 text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  Mobile:
                </span>
                <div className="flex items-center gap-1.5 font-mono text-zinc-200">
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:underline">
                    {PERSONAL_INFO.phoneFormatted}
                  </a>
                  <button
                    onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                    title="Copy Phone"
                    className="p-1 hover:text-white transition-colors"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>Born:</span>
                <span className="text-zinc-200 font-mono">{PERSONAL_INFO.birthday}</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Location:</span>
                <span className="text-zinc-200">{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Action Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#interactive-ml"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors rounded-lg shadow-md active:scale-95"
              >
                <span>Test-Drive Live Models</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/[0.08] transition-colors rounded-lg active:scale-95"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repos</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/[0.08] transition-colors rounded-lg active:scale-95"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Portrait Media Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] group">
              
              {/* Outer decorative ambient blur */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-sky-500/20 via-zinc-700/10 to-amber-500/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700" />
              
              {/* Main Portrait Card */}
              <div className="relative bg-[#0E1017] rounded-2xl border border-white/[0.12] overflow-hidden shadow-2xl">
                
                {/* Image container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                  <img
                    src={PERSONAL_INFO.portrait}
                    alt="Waqas Ali Khan - Artificial Intelligence Undergraduate and ML Developer"
                    className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.03] group-hover:scale-[1.02] transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-transparent opacity-80" />

                  {/* Expand button */}
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                    title="View Portrait Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Clean unboxed badge overlay on bottom */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="font-display text-sm font-semibold text-white tracking-tight">
                      Waqas Ali Khan
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono mt-0.5">
                      <span>AI Club Lead</span>
                      <span aria-hidden="true">·</span>
                      <span>Core Computing Society</span>
                    </div>
                  </div>
                </div>

                {/* Sub-card quick summary */}
                <div className="p-4 bg-[#0A0C11] border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-zinc-300 font-medium">Ready for AI / ML Internships</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">Peshawar, PK</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Lightbox for High-Res Portrait */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="relative max-w-xl max-h-[90vh] bg-zinc-950 rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={PERSONAL_INFO.portrait}
              alt="Waqas Ali Khan"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="p-4 bg-[#0A0C11] border-t border-white/10 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-white">Waqas Ali Khan</p>
                <p className="text-zinc-400 text-[11px]">AI Undergraduate @ University of Peshawar · Core Computing Society</p>
              </div>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-400 hover:underline"
              >
                LinkedIn Profile →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
