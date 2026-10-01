export interface Project {
  id: string;
  title: string;
  category: string;
  algorithm: string;
  timelineDate: string;
  chronologicalPhase: string;
  milestoneOrder: number;
  shortDesc: string;
  fullDesc: string;
  problemStatement: string;
  solution: string;
  image: string;
  githubUrl: string;
  datasetInfo: {
    features: string[];
    targetVariable: string;
    sampleSize: string;
    metrics: { name: string; value: string }[];
  };
  keyTakeaways: string[];
  interactiveType: 'interview' | 'exam' | 'adspend' | 'instagram' | 'breast-cancer' | 'early-grade';
}

export interface TimelineMilestone {
  id: string;
  year: string;
  period: string;
  title: string;
  subtitle: string;
  phaseTag: string;
  description: string;
  mathFocus: string;
  toolsUsed: string[];
  projectId?: string;
  metricsHighlight?: string;
  isProject: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    proficiency: string;
    detail: string;
  }[];
}

export interface LeadershipRole {
  title: string;
  organization: string;
  period: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
}
