import React, { useState, useEffect, useMemo } from 'react';
import { 
  fetchUserRepositories, 
  DynamicProjectCard, 
  GITHUB_USERNAME 
} from '../services/githubService';
import { SandboxTabType } from './InteractivePredictorSandbox';
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  RefreshCw, 
  Sparkles, 
  Sliders, 
  Search, 
  Calendar,
  Code2,
  CheckCircle2
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
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const loadProjects = async (forceRefresh = false) => {
    if (forceRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUserRepositories(GITHUB_USERNAME, forceRefresh);
      setProjects(data.projects);
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if (forceRefresh) {
        setSyncFeedback(`Successfully synced ${data.projects.length} repositories from GitHub!`);
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

  // Filter tags derived from loaded projects
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => {
      if (p.language) tags.add(p.language);
    });
    return ['all', ...Array.from(tags)];
  }, [projects]);

  // Filtered project list
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
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live GitHub Sync
                </span>
              </div>
              <p className="text-sm text-foreground/80 font-normal">
                Dynamically fetched from{' '}
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

            {/* Sync Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => loadProjects(true)}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-full bg-card border border-border hover:border-accent/40 text-foreground transition-all hover:bg-card/80 disabled:opacity-60 shadow-sm"
                title="Pull freshly pushed repositories from GitHub"
              >
                <RefreshCw className={`size-3.5 text-accent ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Syncing...' : 'Sync from GitHub'}</span>
              </button>
            </div>
          </div>

          {/* Sync Success Feedback */}
          {syncFeedback && (
            <div className="mb-6 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{syncFeedback}</span>
            </div>
          )}

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            {/* Tag Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all capitalize shrink-0 ${
                    selectedTag === tag
                      ? 'bg-foreground text-background font-medium shadow-sm'
                      : 'bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/60'
                  }`}
                >
                  {tag === 'all' ? `All Repositories (${projects.length})` : tag}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-card/60 border border-border rounded-full focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground font-mono"
              />
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-48 rounded-2xl bg-muted/20 animate-pulse border border-border/60 p-6 space-y-4">
                  <div className="h-4 w-1/3 bg-muted/40 rounded" />
                  <div className="h-6 w-3/4 bg-muted/40 rounded" />
                  <div className="h-12 w-full bg-muted/40 rounded" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl p-8 space-y-3">
              <Code2 className="size-8 text-muted-foreground mx-auto" />
              <h3 className="text-sm font-medium text-foreground">No repositories found</h3>
              <p className="text-xs text-muted-foreground font-mono">
                No projects matched your search criteria. Try resetting the filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}
                className="text-xs text-accent hover:underline font-mono pt-2"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            /* Dynamic Project Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-2xl bg-card/60 hover:bg-card border border-border/80 hover:border-accent/40 p-6 transition-all duration-300 hover:shadow-md"
                >
                  <div className="space-y-3">
                    {/* Top Row: Language & Stats */}
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {project.language && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <span className={`size-2 rounded-full ${getLanguageColor(project.language)}`} />
                            <span>{project.language}</span>
                          </div>
                        )}
                        {project.isNewFromGithub && (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/25">
                            <Sparkles className="size-2.5" />
                            Auto-Synced
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground">
                        {project.stars > 0 && (
                          <span className="flex items-center gap-1 hover:text-foreground">
                            <Star className="size-3 fill-current text-amber-400" />
                            <span>{project.stars}</span>
                          </span>
                        )}
                        {project.forks > 0 && (
                          <span className="flex items-center gap-1 hover:text-foreground">
                            <GitFork className="size-3" />
                            <span>{project.forks}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Title */}
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
                      
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-[11px] font-mono uppercase tracking-tight text-muted-foreground">
                          {project.category}
                        </span>
                        {project.metrics && (
                          <span className="text-[11px] font-mono text-emerald-400">
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

                  {/* Card Bottom Row: Interactive Action + GitHub Link */}
                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                      <Calendar className="size-3" />
                      <span>{project.updatedAtFormatted}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.interactiveType && (
                        <button
                          onClick={() => onOpenSandbox(project.interactiveType!)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-foreground hover:text-accent bg-muted/60 hover:bg-muted border border-border rounded-lg transition-colors"
                          title="Open live interactive simulator"
                        >
                          <Sliders className="size-3 text-accent" />
                          <span>Test Model</span>
                        </button>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/80 border border-border rounded-lg transition-colors"
                        title="View source code on GitHub"
                      >
                        <Github className="size-3.5" />
                        <span className="hidden sm:inline">Repo</span>
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
