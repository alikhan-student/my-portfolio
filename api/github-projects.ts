import type { Request, Response } from 'express';

// Known metadata mappings for recognized ML repositories
const KNOWN_PROJECT_META: Record<string, {
  title?: string;
  category?: string;
  interactiveType?: 'interview' | 'exam' | 'adspend' | 'instagram' | 'breast-cancer' | 'early-grade';
  metrics?: string;
}> = {
  'students-marks-prediction-model': {
    title: 'Student Exam Marks Predictor',
    category: 'Simple Linear Regression',
    interactiveType: 'exam',
    metrics: 'R² = 0.915 · MAE = 2.84 pts',
  },
  'interview-hiring-predictor': {
    title: 'Interview Selection Predictor',
    category: 'Multiple Linear Regression',
    interactiveType: 'interview',
    metrics: 'R² = 0.892 · MAE = 4.12%',
  },
  'sales_prediction_model': {
    title: 'Ad-Spend Sales Predictor',
    category: 'Linear Regression · KNN',
    interactiveType: 'adspend',
    metrics: 'R² = 0.934 · F = 182.4',
  },
  'ig-reel-performance-model': {
    title: 'Instagram Reels Engagement Model',
    category: 'End-to-End ML Pipeline',
    interactiveType: 'instagram',
    metrics: 'Engagement & Reach Pipeline',
  },
  'breast-cancer-diagnosis-classifier-k-nearest-neighbors-knn-': {
    title: 'Breast Cancer Diagnosis Classifier',
    category: 'K-Nearest Neighbors (KNN)',
    interactiveType: 'breast-cancer',
    metrics: 'Accuracy = 96.5% · Wisconsin DB',
  },
  'earlygrade_predictor': {
    title: 'Early-Grade Performance Predictor',
    category: 'Regression · Classification · Fairness',
    interactiveType: 'early-grade',
    metrics: 'Fairness Audited · Dual Model',
  },
};

// In-memory cache to respect GitHub API rate limits
let cachedProjects: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes cache

// Helper to format repository names nicely
function formatRepoTitle(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper to classify project by language, name, and description
function inferCategory(repo: any): string {
  const text = `${repo.name} ${repo.description || ''} ${repo.language || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
  
  if (text.includes('llm') || text.includes('rag') || text.includes('gemini') || text.includes('transformer')) {
    return 'LLM & Generative AI';
  }
  if (text.includes('neural') || text.includes('deep learning') || text.includes('cnn') || text.includes('rnn')) {
    return 'Deep Learning';
  }
  if (text.includes('knn') || text.includes('classifier') || text.includes('classification')) {
    return 'Classification & Supervised ML';
  }
  if (text.includes('regression') || text.includes('linear')) {
    return 'Regression & Predictive Modeling';
  }
  if (text.includes('vision') || text.includes('opencv') || text.includes('image')) {
    return 'Computer Vision';
  }
  if (text.includes('automation') || text.includes('agent') || text.includes('bot')) {
    return 'AI Automation';
  }
  if (repo.language === 'Python' || repo.language === 'Jupyter Notebook') {
    return 'Machine Learning';
  }
  return repo.language || 'Software Engineering';
}

export default async function handler(req: Request | any, res: Response | any) {
  const username = (req.query?.username as string) || 'alikhan-student';
  const forceRefresh = req.query?.refresh === 'true';
  const now = Date.now();

  if (!forceRefresh && cachedProjects && (now - lastFetchTime < CACHE_TTL_MS)) {
    return res.status(200).json({
      source: 'cache',
      username,
      totalCount: cachedProjects.length,
      syncedAt: new Date(lastFetchTime).toISOString(),
      projects: cachedProjects,
    });
  }

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'waqas-portfolio-github-sync',
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
      headers,
    });

    if (!response.ok) {
      // If rate limited or user not found, fall back to cached data if exists
      if (cachedProjects) {
        return res.status(200).json({
          source: 'cache-fallback',
          username,
          totalCount: cachedProjects.length,
          syncedAt: new Date(lastFetchTime).toISOString(),
          projects: cachedProjects,
          warning: `GitHub API returned ${response.status}. Served cached version.`,
        });
      }
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const repos: any[] = await response.json();

    // Map each repo to our standardized portfolio project format
    const projects = repos
      .filter((repo) => !repo.fork) // Exclude third-party forks by default
      .map((repo) => {
        const lowerName = repo.name.toLowerCase();
        const known = KNOWN_PROJECT_META[lowerName] || {};
        const title = known.title || formatRepoTitle(repo.name);
        const category = known.category || inferCategory(repo);
        const interactiveType = known.interactiveType || null;
        const metrics = known.metrics || (repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : (repo.language || 'ML Model'));
        const isNewFromGithub = !KNOWN_PROJECT_META[lowerName];

        return {
          id: repo.name,
          title,
          category,
          githubUrl: repo.html_url,
          interactiveType,
          metrics,
          description: repo.description || `Open-source project ${repo.name} by Waqas Ali Khan.`,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.pushed_at || repo.updated_at,
          createdAt: repo.created_at,
          homepage: repo.homepage,
          isNewFromGithub,
        };
      });

    cachedProjects = projects;
    lastFetchTime = now;

    return res.status(200).json({
      source: 'live-github-api',
      username,
      totalCount: projects.length,
      syncedAt: new Date().toISOString(),
      projects,
    });
  } catch (error: any) {
    console.error('Error fetching GitHub repos:', error);
    
    if (cachedProjects) {
      return res.status(200).json({
        source: 'cached-fallback',
        username,
        totalCount: cachedProjects.length,
        syncedAt: new Date(lastFetchTime).toISOString(),
        projects: cachedProjects,
        warning: error.message,
      });
    }

    return res.status(500).json({
      error: 'Failed to fetch GitHub projects',
      message: error?.message || 'Unknown error occurred while contacting GitHub.',
    });
  }
}
