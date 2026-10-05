import React, { useState } from 'react';
import { PERSONAL_INFO, EXPERTISE_LIST } from '../data/portfolioData';
import { InteractivePredictorSandbox, SandboxTabType } from './InteractivePredictorSandbox';
import { GithubProjectCardsSection } from './GithubProjectCardsSection';
import { GeminiChatbot } from './GeminiChatbot';
import { Sliders, ArrowRight, ExternalLink, X, Check, Copy } from 'lucide-react';

export const LovablePortfolio: React.FC = () => {
  const [activeSandbox, setActiveSandbox] = useState<SandboxTabType | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20 selection:text-foreground">
      
      {/* Top Floating Controls Bar */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={() => setActiveSandbox('exam')}
          className="px-3.5 py-1.5 text-xs font-medium text-foreground bg-card/80 backdrop-blur-md border border-border hover:border-accent/40 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Sliders className="w-3.5 h-3.5 text-accent" />
          <span>Live ML Sandbox</span>
        </button>
      </div>

      {/* Header */}
      <header className="px-6 pb-24 pt-28 sm:pt-36">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          
          {/* Circular Portrait with Exact Outline & Ring */}
          <div className="reveal mb-12">
            <img
              src={PERSONAL_INFO.portrait}
              alt={PERSONAL_INFO.name}
              width={1254}
              height={1254}
              className="size-44 rounded-full object-cover outline-1 -outline-offset-1 outline-veil ring-8 ring-background sm:size-60 transition-transform duration-500 hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Name */}
          <div className="reveal">
            <h1 className="mb-6 font-display text-4xl font-medium leading-none tracking-tight text-balance text-foreground sm:text-6xl">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          {/* Tagline / Subtitle */}
          <div className="reveal">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-base">
              AI Undergraduate <span className="mx-2 text-accent">·</span> Machine Learning <span className="mx-2 text-accent">·</span> AI Automation
            </p>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-3xl space-y-28 px-6 pb-40 sm:space-y-32">
        
        {/* 01 About Section */}
        <section className="reveal">
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
        </section>

        {/* 02 Expertise Section */}
        <section className="reveal">
          <div className="flex items-baseline gap-8 border-t border-border pt-8">
            <span className="font-display text-sm italic text-muted-foreground">02</span>
            <div className="flex-1">
              <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Expertise
              </h2>
              <div className="grid grid-cols-1 gap-y-4 gap-x-12 sm:grid-cols-2">
                {EXPERTISE_LIST.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="size-1 shrink-0 bg-accent"></span>
                    <span className="text-sm tracking-wide text-foreground/95">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 Selected Works & GitHub Repositories (Project Cards) */}
        <GithubProjectCardsSection onOpenSandbox={(type) => setActiveSandbox(type)} />

        {/* Contact Section (Exact match with lovable.app) */}
        <footer className="reveal">
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
                    <button
                      onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy Email"
                    >
                      {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
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
                    <button
                      onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy Phone"
                    >
                      {copiedItem === 'phone' ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
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
        </footer>

      </main>

      {/* Live Interactive Predictor Modal */}
      {activeSandbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveSandbox(null)}
        >
          <div 
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
              <button
                onClick={() => setActiveSandbox(null)}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <InteractivePredictorSandbox initialTab={activeSandbox} />
          </div>
        </div>
      )}

      {/* Gemini Chatbot ("Ask Waqas AI") */}
      <GeminiChatbot />

    </div>
  );
};
