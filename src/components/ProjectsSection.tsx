import React, { useState } from 'react';
import { 
  ArrowRight, 
  Github, 
  ExternalLink, 
  LayoutGrid, 
  Clock, 
  GitCommit, 
  Cpu, 
  TrendingUp, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { PROJECTS, TIMELINE_MILESTONES } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  onSelectProjectForSandbox: (type: 'interview' | 'exam' | 'adspend' | 'instagram' | 'breast-cancer' | 'early-grade') => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProjectForSandbox }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectById = (id?: string) => {
    if (!id) return null;
    return PROJECTS.find((p) => p.id === id) || null;
  };

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/[0.08] pb-6 gap-6">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
              02. Machine Learning Engineering & Progression
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              AI Projects & Development Journey
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* View Mode Toggle Controls */}
            <div className="flex items-center gap-1 p-1 bg-[#10121A] border border-white/[0.08] rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/10'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Chronological Timeline</span>
              </button>
              
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-white shadow-sm border border-white/10'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================== VIEW 1: CHRONOLOGICAL TIMELINE ===================== */}
        {viewMode === 'timeline' && (
          <div className="relative">
            {/* Narrative Context Banner */}
            <div className="mb-12 p-5 bg-[#0C0E15] border border-white/[0.08] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-white">
                  Trajectory: Univariate OLS → Multivariate Normal Spaces → Diminishing Econometrics → RAG & LLMs
                </span>
                <p className="text-zinc-400 font-normal">
                  Chronological progression of Waqas Ali Khan's research, mathematical milestones, and deployed algorithms at UOP and CCS.
                </p>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                2023 — 2026 Active Pipeline
              </span>
            </div>

            {/* Timeline Spine */}
            <div className="relative pl-6 sm:pl-10 border-l border-white/[0.12] space-y-12 my-6">
              {TIMELINE_MILESTONES.map((milestone, idx) => {
                const linkedProject = getProjectById(milestone.projectId);

                return (
                  <div key={milestone.id} className="relative group">
                    {/* Glowing Milestone Marker */}
                    <div 
                      className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                        milestone.isProject 
                          ? 'bg-zinc-950 border-white group-hover:scale-125' 
                          : 'bg-zinc-950 border-zinc-500'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full m-auto mt-0.5 ${milestone.isProject ? 'bg-white' : 'bg-zinc-500'}`} />
                    </div>

                    {/* Timeline Card */}
                    <div className="bg-[#0B0D14] border border-white/[0.08] rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all">
                      
                      {/* Top Header Row - Unboxed Metadata */}
                      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.06] pb-3 mb-4 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold tracking-tight text-sm">
                            {milestone.year}
                          </span>
                          <span className="text-zinc-600">/</span>
                          <span className="text-zinc-400">{milestone.period}</span>
                          <span className="text-zinc-600">/</span>
                          <span className="text-zinc-300 font-medium">{milestone.phaseTag}</span>
                        </div>

                        {milestone.metricsHighlight && (
                          <div className="text-emerald-400 font-semibold tabular-nums text-xs">
                            {milestone.metricsHighlight}
                          </div>
                        )}
                      </div>

                      {/* Main Title & Subtitle */}
                      <div className="mb-3">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {milestone.title}
                        </h3>
                        <div className="text-xs text-zinc-400 font-medium mt-0.5">
                          {milestone.subtitle}
                        </div>
                      </div>

                      {/* Narrative Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                        {milestone.description}
                      </p>

                      {/* Project Preview Image if it's a project */}
                      {linkedProject && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 bg-black/40 rounded-xl border border-white/[0.05] mb-6">
                          <div className="md:col-span-4 aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-white/10">
                            <img
                              src={linkedProject.image}
                              alt={linkedProject.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="md:col-span-8 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                              <span>Target: {linkedProject.datasetInfo.targetVariable}</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {linkedProject.shortDesc}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                              <button
                                onClick={() => setSelectedProject(linkedProject)}
                                className="text-xs font-semibold text-white hover:text-zinc-200 flex items-center gap-1.5"
                              >
                                <span>Inspect Full Model</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onSelectProjectForSandbox(linkedProject.interactiveType)}
                                className="px-3 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-md"
                              >
                                Launch Sandbox
                              </button>
                              <a
                                href={linkedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Source Code</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Math & Tools Summary Footer */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.04] text-xs font-mono">
                        <div>
                          <span className="text-zinc-500 block text-[11px]">Mathematical / Algorithmic Core:</span>
                          <span className="text-zinc-300">{milestone.mathFocus}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block text-[11px]">Tooling Environment:</span>
                          <div className="flex flex-wrap gap-2 text-zinc-300 mt-0.5">
                            {milestone.toolsUsed.map((tool, tIdx) => (
                              <span key={tIdx}>
                                {tool}
                                {tIdx < milestone.toolsUsed.length - 1 && <span className="text-zinc-600 ml-2">·</span>}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== VIEW 2: BENTO GRID VIEW ===================== */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Project 1: Primary Featured Bento Card */}
            <div className="md:col-span-12 lg:col-span-7 bg-[#0B0D14] border border-white/[0.08] rounded-2xl overflow-hidden group hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div 
                  className="relative aspect-video w-full overflow-hidden bg-zinc-900 cursor-pointer" 
                  onClick={() => setSelectedProject(PROJECTS[1])}
                >
                  <img
                    src={PROJECTS[1].image}
                    alt={PROJECTS[1].title}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-[1.02] transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-4 left-4 text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    <span>{PROJECTS[1].timelineDate}</span>
                    <span className="mx-1.5 text-zinc-500">·</span>
                    <span>{PROJECTS[1].algorithm}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 
                    onClick={() => setSelectedProject(PROJECTS[1])}
                    className="font-display text-xl sm:text-2xl font-bold text-white hover:text-zinc-200 transition-colors cursor-pointer mb-3"
                  >
                    {PROJECTS[1].title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                    {PROJECTS[1].shortDesc}
                  </p>

                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/[0.06] text-xs font-mono mb-6">
                    {PROJECTS[1].datasetInfo.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="text-zinc-400 block text-[11px]">{m.name}</span>
                        <span className="text-white font-bold tabular-nums text-sm">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(PROJECTS[1])}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-zinc-300 transition-colors py-1"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProjectForSandbox('interview')}
                    className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] rounded-md transition-colors"
                  >
                    Live Sandbox
                  </button>
                  <a
                    href={PROJECTS[1].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Cards 0 and 2 Stacked */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-6 sm:gap-8">
              
              {/* Project: Student Exam Score */}
              <div className="bg-[#0B0D14] border border-white/[0.08] rounded-2xl overflow-hidden group hover:border-white/20 transition-all flex flex-col justify-between flex-1">
                <div>
                  <div 
                    className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900 cursor-pointer" 
                    onClick={() => setSelectedProject(PROJECTS[0])}
                  >
                    <img
                      src={PROJECTS[0].image}
                      alt={PROJECTS[0].title}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-[1.02] transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-3 left-3 text-[11px] font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      <span>{PROJECTS[0].timelineDate}</span>
                      <span className="mx-1 text-zinc-500">·</span>
                      <span>Linear Regression</span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 
                      onClick={() => setSelectedProject(PROJECTS[0])}
                      className="font-display text-lg font-bold text-white hover:text-zinc-200 transition-colors cursor-pointer mb-2"
                    >
                      {PROJECTS[0].title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                      {PROJECTS[0].shortDesc}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                      <span>R² = 0.915</span>
                      <span aria-hidden="true">·</span>
                      <span>MAE = 2.84 pts</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-white/[0.04]">
                  <button
                    onClick={() => setSelectedProject(PROJECTS[0])}
                    className="text-xs font-medium text-white hover:text-zinc-300 flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProjectForSandbox('exam')}
                      className="px-2.5 py-1 text-xs text-zinc-300 hover:text-white bg-zinc-900 border border-white/[0.08] rounded transition-colors"
                    >
                      Simulate
                    </button>
                    <a
                      href={PROJECTS[0].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project: ad-spend-sales-predictor */}
              <div className="bg-[#0B0D14] border border-white/[0.08] rounded-2xl overflow-hidden group hover:border-white/20 transition-all flex flex-col justify-between flex-1">
                <div>
                  <div 
                    className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900 cursor-pointer" 
                    onClick={() => setSelectedProject(PROJECTS[2])}
                  >
                    <img
                      src={PROJECTS[2].image}
                      alt={PROJECTS[2].title}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-[1.02] transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-3 left-3 text-[11px] font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      <span>{PROJECTS[2].timelineDate}</span>
                      <span className="mx-1 text-zinc-500">·</span>
                      <span>ROI Optimization</span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 
                      onClick={() => setSelectedProject(PROJECTS[2])}
                      className="font-display text-lg font-bold text-white hover:text-zinc-200 transition-colors cursor-pointer mb-2"
                    >
                      {PROJECTS[2].title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                      {PROJECTS[2].shortDesc}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                      <span>R² = 0.934</span>
                      <span aria-hidden="true">·</span>
                      <span>MAPE = 3.75%</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-white/[0.04]">
                  <button
                    onClick={() => setSelectedProject(PROJECTS[2])}
                    className="text-xs font-medium text-white hover:text-zinc-300 flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProjectForSandbox('adspend')}
                      className="px-2.5 py-1 text-xs text-zinc-300 hover:text-white bg-zinc-900 border border-white/[0.08] rounded transition-colors"
                    >
                      Simulate
                    </button>
                    <a
                      href={PROJECTS[2].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenSandbox={onSelectProjectForSandbox}
      />
    </section>
  );
};
