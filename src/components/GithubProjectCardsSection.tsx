import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  fetchUserRepositories, 
  DynamicProjectCard, 
  GITHUB_USERNAME 
} from '../services/githubService';
import { SandboxTabType } from './InteractivePredictorSandbox';
import { InteractiveProjectCard } from './InteractiveProjectCard';
import { 
  RefreshCw, 
  Search, 
  Code2,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface GithubProjectCardsSectionProps {
  onOpenSandbox: (type: SandboxTabType) => void;
}

export const GithubProjectCardsSection: React.FC<GithubProjectCardsSectionProps> = ({ onOpenSandbox }) => {
  const [projects, setProjects] = useState<DynamicProjectCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const loadProjects = async (forceRefresh = false) => {
    if (forceRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUserRepositories(GITHUB_USERNAME, forceRefresh);
      setProjects(data.projects);
      if (forceRefresh) {
        setSyncFeedback(`Synced ${data.projects.length} repositories from GitHub!`);
        setTimeout(() => setSyncFeedback(null), 3000);
      }
    } catch (err: any) {
      console.error('Failed to load GitHub repositories:', err);
      setError('Could not connect to GitHub. Showing cached projects.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadProjects(false);
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => {
      if (p.language) tags.add(p.language);
    });
    return ['all', ...Array.from(tags)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === 'all' || p.language === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  return (
    <section id="works" className="reveal space-y-8">
      {/* Section Header */}
      <div className="flex items-baseline gap-8 border-t border-border pt-8">
        <span className="font-display text-sm italic text-muted-foreground">03</span>
        <div className="flex-1">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Projects & Repositories
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live GitHub Sync
                </span>
              </div>
              <p className="text-sm text-foreground/80 font-normal">
                Dynamically pulled from{' '}
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-accent hover:underline font-medium"
                >
                  @{GITHUB_USERNAME}
                </a>
              </p>
            </div>

            {/* Sync Button with Motion */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => loadProjects(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-full bg-card border border-border hover:border-accent/40 text-foreground transition-all hover:bg-card/80 disabled:opacity-60 shadow-sm"
              title="Pull freshly pushed repositories from GitHub"
            >
              <RefreshCw className={`size-3.5 text-accent ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync from GitHub'}</span>
            </motion.button>
          </div>

          {/* Sync Success Feedback */}
          <AnimatePresence>
            {syncFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2 overflow-hidden"
              >
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{syncFeedback}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            {/* Tag Pills with Motion Layout */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {availableTags.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedTag(tag)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all capitalize shrink-0 ${
                      isSelected
                        ? 'bg-foreground text-background font-medium shadow-sm'
                        : 'bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/60'
                    }`}
                  >
                    {tag === 'all' ? `All Repositories (${projects.length})` : tag}
                  </motion.button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-card/60 border border-border rounded-full focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground font-mono transition-colors"
              />
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-52 rounded-2xl bg-muted/20 animate-pulse border border-border/60 p-6 space-y-4">
                  <div className="h-4 w-1/3 bg-muted/40 rounded" />
                  <div className="h-6 w-3/4 bg-muted/40 rounded" />
                  <div className="h-16 w-full bg-muted/40 rounded" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl p-8 space-y-3">
              <Code2 className="size-8 text-muted-foreground mx-auto" />
              <h3 className="text-sm font-medium text-foreground">No repositories found</h3>
              <p className="text-xs text-muted-foreground font-mono">
                No projects matched "{searchQuery}".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
                className="text-xs text-accent hover:underline font-mono pt-2"
              >
                Clear search
              </button>
            </div>
          ) : (
            /* Animated Dynamic Project Cards Grid */
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <InteractiveProjectCard
                    key={project.id}
                    project={project}
                    onOpenSandbox={onOpenSandbox}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
