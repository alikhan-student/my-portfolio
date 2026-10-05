import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, EXPERTISE_LIST } from '../data/portfolioData';
import { InteractivePredictorSandbox, SandboxTabType } from './InteractivePredictorSandbox';
import { GithubProjectCardsSection } from './GithubProjectCardsSection';
import { InteractiveBackground } from './InteractiveBackground';
import { GeminiChatbot } from './GeminiChatbot';
import { Sliders, ArrowRight, ExternalLink, X, Check, Copy, Sparkles } from 'lucide-react';

export const LovablePortfolio: React.FC = () => {
  const [activeSandbox, setActiveSandbox] = useState<SandboxTabType | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-accent/20 selection:text-foreground overflow-x-hidden">
      
      {/* Interactive Constellation & Mouse-Follow Spotlight */}
      <InteractiveBackground />

      {/* Top Floating Controls Bar */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveSandbox('exam')}
          className="px-4 py-2 text-xs font-mono font-medium text-foreground bg-card/85 backdrop-blur-md border border-border/80 hover:border-accent/50 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-black/20 group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <Sliders className="w-3.5 h-3.5 text-accent group-hover:rotate-12 transition-transform" />
          <span>Live ML Sandbox</span>
        </motion.button>
      </div>

      {/* Header / Hero Section */}
      <header className="relative z-10 px-6 pb-24 pt-28 sm:pt-36">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          
          {/* Circular Portrait with Interactive Aura and Hover Spring */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10 group"
          >
            {/* Subtle Pulsing Ambient Aura */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-accent/25 via-emerald-500/10 to-accent/25 blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-700 animate-pulse" />
            
            <motion.img
              whileHover={{ scale: 1.035, rotate: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              src={PERSONAL_INFO.portrait}
              alt={PERSONAL_INFO.name}
              width={1254}
              height={1254}
              className="relative size-44 rounded-full object-cover outline-1 -outline-offset-1 outline-veil ring-8 ring-background sm:size-56 transition-all duration-300 shadow-2xl cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Name with Staggered Fade Up */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h1 className="mb-4 font-display text-4xl font-medium leading-none tracking-tight text-balance text-foreground sm:text-6xl">
              {PERSONAL_INFO.name}
            </h1>
          </motion.div>

          {/* Tagline / Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <p className="text-xs font-mono font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              AI Undergraduate <span className="mx-2 text-accent">·</span> Machine Learning <span className="mx-2 text-accent">·</span> AI Automation
            </p>
          </motion.div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-3xl space-y-28 px-6 pb-40 sm:space-y-32">
        
        {/* 01 About Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="reveal"
        >
          <div className="flex items-baseline gap-8 border-t border-border pt-8">
            <span className="font-display text-sm italic text-muted-foreground">01</span>
            <div className="flex-1">
              <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                About
              </h2>
              <p className="max-w-[48ch] text-lg leading-relaxed text-pretty text-foreground/90 sm:text-xl font-normal">
                {PERSONAL_INFO.aboutText}
              </p>
            </div>
          </div>
        </motion.section>

        {/* 02 Expertise Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="reveal"
        >
          <div className="flex items-baseline gap-8 border-t border-border pt-8">
            <span className="font-display text-sm italic text-muted-foreground">02</span>
            <div className="flex-1">
              <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Expertise
              </h2>
              <div className="grid grid-cols-1 gap-y-4 gap-x-12 sm:grid-cols-2">
                {EXPERTISE_LIST.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-3 group cursor-default"
                  >
                    <span className="size-1.5 shrink-0 bg-accent rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-sm tracking-wide text-foreground/95 group-hover:text-accent transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 03 Selected Works & Dynamic GitHub Project Cards */}
        <GithubProjectCardsSection onOpenSandbox={(type) => setActiveSandbox(type)} />

        {/* Contact Section */}
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="reveal"
        >
          <div className="flex items-baseline gap-8 border-t border-border pt-8">
            <span className="font-display text-sm italic text-muted-foreground">—</span>
            <div className="flex-1">
              <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Contact
              </h2>
              
              <dl className="grid grid-cols-1 gap-y-6">
                <div>
                  <dt className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Email
                  </dt>
                  <dd className="flex items-center gap-2">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="break-all transition-colors hover:text-accent font-normal text-sm"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.88 }}
                      onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy Email"
                    >
                      {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                    </motion.button>
                  </dd>
                </div>

                <div>
                  <dt className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Phone
                  </dt>
                  <dd className="flex items-center gap-2">
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="transition-colors hover:text-accent font-normal text-sm"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.88 }}
                      onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy Phone"
                    >
                      {copiedItem === 'phone' ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                    </motion.button>
                  </dd>
                </div>

                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  <div>
                    <dt className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      LinkedIn
                    </dt>
                    <dd>
                      <a
                        href={PERSONAL_INFO.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-colors hover:text-accent text-sm"
                      >
                        Waqas Ali Khan
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      GitHub
                    </dt>
                    <dd>
                      <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-colors hover:text-accent text-sm"
                      >
                        @alikhan-student
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <p className="mt-16 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 font-mono">
                {PERSONAL_INFO.location} · b. {PERSONAL_INFO.birthday}
              </p>
            </div>
          </div>
        </motion.footer>

      </main>

      {/* Live Interactive Predictor Modal with Spring Animation */}
      <AnimatePresence>
        {activeSandbox && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActiveSandbox(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="font-display text-xs italic text-accent">Interactive Models</span>
                  <h3 className="font-display text-2xl font-medium text-foreground">
                    Live Machine Learning Predictor Sandbox
                  </h3>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveSandbox(null)}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <InteractivePredictorSandbox initialTab={activeSandbox} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gemini Chatbot ("Ask Waqas AI") */}
      <GeminiChatbot />

    </div>
  );
};
