import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DynamicProjectCard } from '../services/githubService';
import { SandboxTabType } from './InteractivePredictorSandbox';
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Sparkles, 
  Sliders, 
  Calendar 
} from 'lucide-react';

interface InteractiveProjectCardProps {
  project: DynamicProjectCard;
  onOpenSandbox: (type: SandboxTabType) => void;
  index: number;
}

export const InteractiveProjectCard: React.FC<InteractiveProjectCardProps> = ({
  project,
  onOpenSandbox,
  index,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python':
        return 'bg-blue-400';
      case 'jupyter notebook':
        return 'bg-amber-400';
      case 'typescript':
        return 'bg-sky-400';
      case 'javascript':
        return 'bg-yellow-300';
      default:
        return 'bg-zinc-400';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-2xl bg-card/70 hover:bg-card border border-border/80 hover:border-accent/40 p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-black/30 overflow-hidden"
    >
      {/* Interactive Glare Spotlight inside Card */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 119, 6, 0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Top Content */}
      <div className="relative z-10 space-y-3.5">
        {/* Top Meta Row */}
        <div className="flex items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            {project.language && (
              <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
                <span className={`size-2 rounded-full ${getLanguageColor(project.language)} ring-2 ring-background`} />
                <span className="font-medium">{project.language}</span>
              </div>
            )}
            
            {project.isNewFromGithub && (
              <span className="inline-flex items-center gap-1 text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 font-semibold tracking-wider animate-pulse">
                <Sparkles className="size-2.5" />
                Live Sync
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            {project.stars > 0 && (
              <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <span>{project.stars}</span>
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-1 hover:text-foreground transition-colors">
                <GitFork className="size-3" />
                <span>{project.forks}</span>
              </span>
            )}
          </div>
        </div>

        {/* Title & Category */}
        <div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-lg font-medium text-foreground group-hover:text-accent transition-colors"
          >
            <span>{project.title}</span>
            <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] font-mono uppercase tracking-tight text-muted-foreground">
              {project.category}
            </span>
            {project.metrics && (
              <span className="text-[11px] font-mono text-emerald-400 font-medium">
                · {project.metrics}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-foreground/80 leading-relaxed font-normal line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-border/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
          <Calendar className="size-3" />
          <span>{project.updatedAtFormatted}</span>
        </div>

        <div className="flex items-center gap-2">
          {project.interactiveType && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenSandbox(project.interactiveType!)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-foreground hover:text-accent bg-muted/60 hover:bg-muted border border-border hover:border-accent/40 rounded-xl transition-all shadow-sm"
              title="Open live interactive simulator"
            >
              <Sliders className="size-3 text-accent" />
              <span>Test Model</span>
            </motion.button>
          )}

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/70 border border-border rounded-xl transition-all"
            title="View source code on GitHub"
          >
            <Github className="size-3.5" />
            <span className="hidden sm:inline">Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};
