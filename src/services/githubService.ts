export interface GitHubRepoRaw {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics?: string[];
  license?: { name: string; spdx_id: string } | null;
}

export interface DynamicProjectCard {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  githubUrl: string;
  homepage?: string | null;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAtFormatted: string;
  pushedAt: string;
  interactiveType?: 'exam' | 'interview' | 'adspend' | 'instagram' | 'breast-cancer' | 'early-grade' | null;
  metrics?: string;
  isMLProject: boolean;
  isNewFromGithub: boolean;
}

export const GITHUB_USERNAME = 'alikhan-student';

// Known ML repository overrides for high-fidelity presentation
const KNOWN_PROJECT_META: Record<string, {
  title: string;
  category: string;
  interactiveType?: 'interview' | 'exam' | 'adspend' | 'instagram' | 'breast-cancer' | 'early-grade' | null;
  metrics?: string;
  description?: string;
}> = {
  'students-marks-prediction-model': {
    title: 'Student Exam Marks Predictor',
    category: 'Simple Linear Regression',
    interactiveType: 'exam',
    metrics: 'R² = 0.915 · MAE = 2.84 pts',
    description: 'Predicts final examination scores from weekly study hour inputs and attendance using Ordinary Least Squares regression.'
  },
  'interview-hiring-predictor': {
    title: 'Interview Selection Predictor',
    category: 'Multiple Linear Regression',
    interactiveType: 'interview',
    metrics: 'R² = 0.892 · MAE = 4.12%',
    description: 'Multivariate hiring probability model with Sigmoid logit mapping based on experience, coding tests, and communication.'
  },
  'sales_prediction_model': {
    title: 'Ad-Spend Sales Predictor',
    category: 'Linear Regression · KNN',
    interactiveType: 'adspend',
    metrics: 'R² = 0.934 · F = 182.4',
    description: 'Econometric sales response model with logarithmic saturation curve capturing diminishing returns across marketing channels.'
  },
  'ig-reel-performance-model': {
    title: 'Instagram Reels Engagement Model',
    category: 'End-to-End ML Pipeline',
    interactiveType: 'instagram',
    metrics: 'Production Feature Pipeline',
    description: 'End-to-end Python ML pipeline predicting Instagram Reels engagement rates and watch-through probability.'
  },
  'breast-cancer-diagnosis-classifier-k-nearest-neighbors-knn-': {
    title: 'Breast Cancer Diagnosis Classifier',
    category: 'K-Nearest Neighbors (KNN)',
    interactiveType: 'breast-cancer',
    metrics: 'Accuracy = 96.5% · Wisconsin DB',
    description: 'Clinical diagnostic classification model using K-Nearest Neighbors with normalized biometrics for Malignant vs. Benign tumors.'
  },
  'earlygrade_predictor': {
    title: 'Early-Grade Performance Predictor',
    category: 'Regression · Classification · Fairness',
    interactiveType: 'early-grade',
    metrics: 'Fairness Audited · Dual Model',
    description: 'Dual regression and classification pipeline with demographic parity checks for early detection of at-risk academic trajectories.'
  },
  'my-portfolio': {
    title: 'Personal AI Portfolio & ML Showcase',
    category: 'TypeScript · React · Vite',
    interactiveType: null,
    metrics: 'Full-Stack Portfolio',
    description: 'Minimalist high-contrast portfolio showcasing machine learning architectures, interactive simulators, and live GitHub integration.'
  }
};

function formatTitle(rawName: string): string {
  return rawName
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function inferCategory(repo: Partial<GitHubRepoRaw>): string {
  const text = `${repo.name || ''} ${repo.description || ''} ${repo.language || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
  
  if (text.includes('llm') || text.includes('rag') || text.includes('gemini') || text.includes('transformer')) {
    return 'LLM & Generative AI';
  }
  if (text.includes('neural') || text.includes('deep learning') || text.includes('cnn') || text.includes('rnn')) {
    return 'Deep Learning';
  }
  if (text.includes('knn') || text.includes('classifier') || text.includes('classification')) {
    return 'Classification & KNN';
  }
  if (text.includes('regression') || text.includes('linear')) {
    return 'Regression & ML';
  }
  if (text.includes('vision') || text.includes('opencv') || text.includes('image')) {
    return 'Computer Vision';
  }
  if (text.includes('automation') || text.includes('agent') || text.includes('pipeline')) {
    return 'AI Automation';
  }
  if (repo.language === 'Python' || repo.language === 'Jupyter Notebook') {
    return 'Machine Learning';
  }
  return repo.language || 'Software Development';
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Recently';
  }
}

/**
 * GitHub API Service:
 * Fetches user repositories from /api/github-projects with automatic fallback
 * directly to the GitHub Public REST API if running in client-only mode.
 */
export async function fetchUserRepositories(
  username: string = GITHUB_USERNAME,
  forceRefresh: boolean = false
): Promise<{ projects: DynamicProjectCard[]; source: string; totalCount: number }> {
  // Strategy 1: Attempt local server proxy endpoint
  try {
    const res = await fetch(`/api/github-projects?username=${encodeURIComponent(username)}${forceRefresh ? '&refresh=true' : ''}`, {
      headers: { 'Accept': 'application/json' },
    });
    
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.projects) && data.projects.length > 0) {
        return {
          projects: data.projects.map((p: any) => ({
            id: p.id || p.name,
            name: p.id || p.name,
            title: p.title,
            description: p.description || '',
            category: p.category,
            githubUrl: p.githubUrl,
            homepage: p.homepage,
            stars: p.stars || 0,
            forks: p.forks || 0,
            language: p.language || 'Python',
            topics: p.topics || [],
            updatedAtFormatted: formatDate(p.updatedAt || p.pushedAt || new Date().toISOString()),
            pushedAt: p.updatedAt || p.pushedAt || new Date().toISOString(),
            interactiveType: p.interactiveType,
            metrics: p.metrics,
            isMLProject: p.category.toLowerCase().includes('learn') || p.category.toLowerCase().includes('regression') || p.category.toLowerCase().includes('model'),
            isNewFromGithub: !!p.isNewFromGithub,
          })),
          source: data.source || 'server-proxy',
          totalCount: data.totalCount || data.projects.length,
        };
      }
    }
  } catch (serverErr) {
    console.warn('Backend proxy /api/github-projects unavailable, falling back to direct GitHub API:', serverErr);
  }

  // Strategy 2: Direct Client-Side Fallback to GitHub REST API
  try {
    const directUrl = `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`;
    const directRes = await fetch(directUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!directRes.ok) {
      throw new Error(`GitHub API returned status ${directRes.status}`);
    }

    const repos: GitHubRepoRaw[] = await directRes.json();
    const mapped: DynamicProjectCard[] = repos
      .filter((r) => !r.fork)
      .map((repo) => {
        const lowerName = repo.name.toLowerCase();
        const meta = KNOWN_PROJECT_META[lowerName];
        const isNewFromGithub = !meta;

        return {
          id: repo.name,
          name: repo.name,
          title: meta?.title || formatTitle(repo.name),
          description: meta?.description || repo.description || `Open-source project ${repo.name} by Waqas Ali Khan.`,
          category: meta?.category || inferCategory(repo),
          githubUrl: repo.html_url,
          homepage: repo.homepage,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || 'Python',
          topics: repo.topics || [],
          updatedAtFormatted: formatDate(repo.pushed_at || repo.updated_at),
          pushedAt: repo.pushed_at || repo.updated_at,
          interactiveType: meta?.interactiveType || null,
          metrics: meta?.metrics || (repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : repo.language || 'Project'),
          isMLProject: true,
          isNewFromGithub,
        };
      });

    return {
      projects: mapped,
      source: 'direct-github-api',
      totalCount: mapped.length,
    };
  } catch (error: any) {
    console.error('Failed to fetch from GitHub API:', error);
    throw error;
  }
}
