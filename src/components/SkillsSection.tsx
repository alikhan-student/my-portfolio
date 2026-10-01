import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Terminal, Brain, Sparkles, Database, Cpu, Check } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-6 gap-4">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
              03. Technical Capabilities & Tooling
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Skills & Engineering Competencies
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-normal">
            A focused breakdown of core programming, statistical modeling, generative AI frameworks, and predictive analytical methodologies.
          </p>
        </div>

        {/* 3 Structured Columns - Zero Pill Discipline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#0B0D14] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Column Header */}
                <div className="border-b border-white/[0.06] pb-4 mb-6">
                  <div className="text-xs font-mono text-zinc-400 mb-1">
                    Track 0{idx + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Skill Items - Clean unboxed typography */}
                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {skill.proficiency}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quiet Footer Indicator */}
              <div className="pt-6 mt-6 border-t border-white/[0.04] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Verified in Code</span>
                <span className="text-zinc-400">Production / Applied</span>
              </div>
            </div>
          ))}
        </div>

        {/* Applied Technical Stack Summary Banner */}
        <div className="mt-8 p-6 bg-[#0E1018] rounded-2xl border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-display text-sm font-bold text-white">
              Predictive Analytics & AI Automation Paradigm
            </span>
            <p className="text-zinc-400">
              Focusing on high-leverage data science: analyzing predictive trends, regression pipelines, and integrating RAG retrieval workflows with LLMs.
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-zinc-300 shrink-0">
            <span>Python</span>
            <span aria-hidden="true" className="text-zinc-600">/</span>
            <span>NumPy</span>
            <span aria-hidden="true" className="text-zinc-600">/</span>
            <span>Scikit-Learn</span>
            <span aria-hidden="true" className="text-zinc-600">/</span>
            <span>RAG</span>
          </div>
        </div>

      </div>
    </section>
  );
};
