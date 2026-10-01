import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, BarChart2, Layers, Cpu } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenSandbox: (type: 'interview' | 'exam' | 'adspend' | 'instagram' | 'breast-cancer' | 'early-grade') => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenSandbox }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0C0E15] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-auto text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Image */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-zinc-900 border-b border-white/[0.08]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E15] via-[#0C0E15]/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-200">{project.algorithm}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[65vh] overflow-y-auto">
          {/* Executive Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              Architecture & Overview
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Problem vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-xl border border-white/[0.06] space-y-1.5">
              <span className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider">
                The Problem
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-white/[0.06] space-y-1.5">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                Engineered Solution
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Dataset & Model Metrics */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Dataset Invariants & Evaluated Metrics
            </h3>
            <div className="p-4 bg-[#12141F] rounded-xl border border-white/[0.06] space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-white/[0.06] pb-4">
                {project.datasetInfo.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-[11px] text-zinc-400">{m.name}</div>
                    <div className="text-lg font-bold font-mono text-white tabular-nums">{m.value}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs text-zinc-400 mb-2">Model Features:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                  {project.datasetInfo.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Findings / Empirical Observations */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Key Empirical Findings
            </h3>
            <div className="space-y-2">
              {project.keyTakeaways.map((point, index) => (
                <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <span className="font-mono text-zinc-500 mt-0.5">0{index + 1}.</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => {
                onClose();
                onOpenSandbox(project.interactiveType);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors rounded-lg shadow-sm"
            >
              <span>Launch Interactive Predictor Sandbox</span>
              <Cpu className="w-3.5 h-3.5" />
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-white/[0.08] hover:bg-zinc-800 transition-colors rounded-lg"
            >
              <Github className="w-4 h-4" />
              <span>Inspect on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
