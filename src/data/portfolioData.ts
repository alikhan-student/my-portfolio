import waqasPortraitExact from '../assets/images/waqas-portrait-exact.jpg';
import examScoreImg from '../assets/images/exam_score_predictor_1790882563139.jpg';
import interviewPredictorImg from '../assets/images/interview_predictor_1790882551264.jpg';
import adSpendImg from '../assets/images/ad_spend_sales_predictor_1790882577872.jpg';
import { Project, SkillCategory, LeadershipRole } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Waqas Ali Khan",
  tagline: "AI Undergraduate · Machine Learning · AI Automation",
  aboutText: "I study Artificial Intelligence at the University of Peshawar and lead the AI Club at Core Computing Society. My work sits where models meet real problems — machine learning, deep learning, large language models and retrieval-augmented generation — and I care most about building things that actually run, and reasoning clearly about the data behind them.",
  phone: "03299037442",
  phoneFormatted: "+92 329 9037442",
  email: "alikhan520451waqas@gmail.com",
  birthday: "13 March 2007",
  location: "Peshawar, Pakistan",
  university: "University of Peshawar",
  society: "Core Computing Society",
  role: "AI Club Lead",
  linkedin: "https://linkedin.com/in/waqas-ali-khan-b43894409",
  github: "https://github.com/alikhan-student",
  portrait: waqasPortraitExact,
  stats: [
    { label: "Active ML Models", value: "6", detail: "Supervised & classification pipelines" },
    { label: "Core Stacks", value: "Python / ML", detail: "NumPy, Pandas, Scikit-learn" },
    { label: "Community Leadership", value: "AI Club Lead", detail: "Core Computing Society @ UOP" },
    { label: "Domain Focus", value: "ML & AI Automation", detail: "Predictive Analytics & RAG" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "student-exam-marks-predictor",
    title: "Student Exam Marks Predictor",
    category: "Predictive Data Science",
    algorithm: "Simple Linear Regression",
    timelineDate: "Late 2023",
    chronologicalPhase: "Phase 1: Supervised Regression Foundations",
    milestoneOrder: 1,
    shortDesc: "Forecasts final examination performance based on continuous study hour inputs, class engagement metrics, and historical quiz trends.",
    fullDesc: "A linear regression modeling project designed to quantify the correlation between focused study volume, attendance records, and end-of-term academic outcomes. Employs ordinary least squares (OLS) regression with statistical hypothesis testing to validate predictor significance.",
    problemStatement: "Educators and students lack quantitative early-warning mechanisms to predict at-risk performance thresholds prior to high-stakes examinations.",
    solution: "Modeled study habits and attendance data with univariate and multivariate linear regressions, deriving intercept and slope coefficients with clear statistical significance (p < 0.001).",
    image: examScoreImg,
    githubUrl: "https://github.com/alikhan-student/Students-marks-prediction-model",
    datasetInfo: {
      features: [
        "Weekly Dedicated Study Hours",
        "Lecture Attendance Percentage (%)",
        "Midterm / Continuous Assessment Score (0-100)"
      ],
      targetVariable: "Final Examination Score (0-100)",
      sampleSize: "Student academic progress benchmark records",
      metrics: [
        { name: "R² Score", value: "0.915" },
        { name: "Mean Absolute Error", value: "2.84 pts" },
        { name: "Pearson r", value: "0.957" }
      ]
    },
    keyTakeaways: [
      "Each additional focused hour per week yielded a +2.7 point average lift in final score.",
      "Identified attendance threshold inflection at 75% below which variance doubles.",
      "Created intuitive prediction curves that visually communicate realistic grade boundaries."
    ],
    interactiveType: 'exam'
  },
  {
    id: "interview-selection-predictor",
    title: "Interview Selection Predictor",
    category: "Machine Learning",
    algorithm: "Multiple Linear Regression",
    timelineDate: "Mid 2024",
    chronologicalPhase: "Phase 2: Multivariate Candidate Modeling",
    milestoneOrder: 2,
    shortDesc: "Predicts applicant interview hiring probabilities by modeling multivariate candidate evaluation matrices and historical hiring criteria.",
    fullDesc: "An end-to-end predictive regression model that estimates a candidate's likelihood of securing an offer. The pipeline ingests standardized features including technical test percentiles, communication ratings, relevant work experience, and algorithmic problem-solving scores to isolate feature weights and produce reliable selection likelihoods.",
    problemStatement: "Technical talent recruitment processes often suffer from high variance and subjective evaluator biases across non-standardized multi-stage interview rounds.",
    solution: "Trained a Multiple Linear Regression pipeline with feature normalization, collinearity checks using Variance Inflation Factor (VIF), and residual diagnosis to establish an objective baseline scoring model.",
    image: interviewPredictorImg,
    githubUrl: "https://github.com/alikhan-student/interview-hiring-predictor",
    datasetInfo: {
      features: [
        "Years of Experience",
        "Technical Coding Assessment (0-100)",
        "System Design / Problem Solving (1-10)",
        "Behavioral & Communication Score (1-10)"
      ],
      targetVariable: "Selection Probability (% / Likelihood Index)",
      sampleSize: "Curated tech assessment evaluation benchmark",
      metrics: [
        { name: "R² Score", value: "0.892" },
        { name: "MAE", value: "4.12%" },
        { name: "RMSE", value: "5.38%" }
      ]
    },
    keyTakeaways: [
      "Technical assessment percentile exhibited the highest standardized beta coefficient (0.48).",
      "Regularization minimized overfitting across small cohorts with correlated interview attributes.",
      "Engineered an interactive predictive interface for real-time evaluator scenario testing."
    ],
    interactiveType: 'interview'
  },
  {
    id: "ad-spend-sales-predictor",
    title: "Ad-Spend Sales Predictor",
    category: "Econometric ML & Forecasting",
    algorithm: "Linear Regression · KNN",
    timelineDate: "Late 2024",
    chronologicalPhase: "Phase 3: Econometric Optimization & Saturation Curves",
    milestoneOrder: 3,
    shortDesc: "Quantifies marginal sales revenue returns across digital, search, and social marketing expenditures to optimize allocation budgets.",
    fullDesc: "A data-driven machine learning system modeling non-linear returns on advertising budgets. Evaluates cross-channel elasticity to predict gross sales units based on capital allocated to digital search, social channels, and broadcast media, providing optimal spend distribution recommendations.",
    problemStatement: "Marketing budgets are frequently allocated using guesswork, resulting in diminishing marginal returns across saturated ad platforms.",
    solution: "Constructed multivariate regression models with logarithmic transformation to capture saturation effects and diminishing returns across multi-channel ad spend data.",
    image: adSpendImg,
    githubUrl: "https://github.com/alikhan-student/sales_prediction_model",
    datasetInfo: {
      features: [
        "Digital Social Ad Spend ($k)",
        "Search Engine Marketing Spend ($k)",
        "Content & Display Sponsorship ($k)"
      ],
      targetVariable: "Projected Sales Volume (Units in Thousands)",
      sampleSize: "Multi-market commercial sales and spend dataset",
      metrics: [
        { name: "R² Score", value: "0.934" },
        { name: "F-Statistic", value: "182.4" },
        { name: "MAPE", value: "3.75%" }
      ]
    },
    keyTakeaways: [
      "Search ads demonstrated highest immediate conversion elasticity per capital unit.",
      "Captured the point of diminishing marginal returns past specific channel budget caps.",
      "Equipped stakeholders with an interactive allocation slider predicting output yield."
    ],
    interactiveType: 'adspend'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Programming & Foundations",
    description: "Algorithmic thinking, robust architecture, and numerical computing foundation.",
    skills: [
      { name: "Python", proficiency: "Primary Language", detail: "Advanced syntax, OOP, NumPy, Pandas, Scipy, Scripting" },
      { name: "Problem Solving", proficiency: "Analytical", detail: "Algorithmic thinking, data structures, mathematical modeling" },
      { name: "Mathematical Foundations", proficiency: "Academic", detail: "Linear algebra, multivariate calculus, probability & statistics" }
    ]
  },
  {
    title: "Machine Learning & Model Training",
    description: "Statistical modeling, supervised regression, and predictive algorithms.",
    skills: [
      { name: "Supervised Learning", proficiency: "Practical", detail: "Multiple Linear Regression, Ridge, Lasso, Logistic Regression" },
      { name: "AI Model Training", proficiency: "Hands-on", detail: "Hyperparameter tuning, cross-validation, loss convergence" },
      { name: "Scikit-Learn & ML Tooling", proficiency: "Proficient", detail: "Pipelines, preprocessing, metrics evaluation, feature selection" },
      { name: "Deep Learning Foundations", proficiency: "Core Focus", detail: "Neural network architectures, forward/backprop, activation functions" }
    ]
  },
  {
    title: "Emerging AI, RAG & Automation",
    description: "Modern generative architectures, retrieval pipelines, and task automation.",
    skills: [
      { name: "Large Language Models (LLMs)", proficiency: "Active Exploration", detail: "Prompt engineering, tokenization, model integration" },
      { name: "RAG (Retrieval-Augmented Generation)", proficiency: "Specialization", detail: "Vector embeddings, contextual retrieval, document indexing" },
      { name: "AI Automation", proficiency: "Applied", detail: "Workflow orchestration, API bridging, intelligent autonomous pipelines" },
      { name: "Data Science & Visual Analytics", proficiency: "Applied", detail: "Exploratory data analysis (EDA), trend identification, Matplotlib, Seaborn" }
    ]
  }
];

export const LEADERSHIP: LeadershipRole[] = [
  {
    title: "AI Club Lead",
    organization: "Core Computing Society (CCS)",
    period: "2024 — Present",
    location: "University of Peshawar",
    responsibilities: [
      "Leading technical initiatives, workshops, and peer learning circles focused on Artificial Intelligence, Machine Learning, and Python.",
      "Guiding students through hands-on model training, code walkthroughs, and practical data science challenges.",
      "Organizing university-wide seminars on cutting-edge developments in LLMs, RAG, and AI automation."
    ],
    achievements: [
      "Mentored cohorts of peers in implementing their first regression and neural network pipelines in Python.",
      "Established practical AI coding workshops bridging academic curriculum with modern industry tooling."
    ]
  },
  {
    title: "Artificial Intelligence Undergraduate",
    organization: "University of Peshawar (UOP)",
    period: "2023 — Present",
    location: "Peshawar, Pakistan",
    responsibilities: [
      "Pursuing Bachelor of Science in Artificial Intelligence with emphasis on computational intelligence, machine learning, and data modeling.",
      "Conducting empirical research and developing real-world regression and predictive algorithms."
    ],
    achievements: [
      "Authored multiple predictive modeling projects analyzing interview dynamics, academic scoring, and econometric advertising trends.",
      "Active participant in national hackathons and departmental technological exhibitions."
    ]
  }
];

export const EXPERTISE_LIST = [
  "Python Programming",
  "Machine Learning",
  "Deep Learning",
  "AI Model Training",
  "RAG Architectures",
  "Large Language Models",
  "AI Automation",
  "Problem Solving",
];

export interface SelectedWork {
  id: string;
  title: string;
  category: string;
  githubUrl: string;
  interactiveType?: 'exam' | 'interview' | 'adspend' | 'instagram' | 'breast-cancer' | 'early-grade';
  metrics?: string;
  description?: string;
  stars?: number;
  forks?: number;
  language?: string;
  updatedAt?: string;
  isNewFromGithub?: boolean;
}

export const SELECTED_WORKS: SelectedWork[] = [
  {
    id: "student-exam-marks-predictor",
    title: "Student Exam Marks Predictor",
    category: "Simple Linear Regression",
    githubUrl: "https://github.com/alikhan-student/Students-marks-prediction-model",
    interactiveType: 'exam',
    metrics: "R² = 0.915 · MAE = 2.84 pts",
    description: "Predicts final examination performance based on continuous study hour inputs and lecture attendance using Ordinary Least Squares regression."
  },
  {
    id: "interview-selection-predictor",
    title: "Interview Selection Predictor",
    category: "Multiple Linear Regression",
    githubUrl: "https://github.com/alikhan-student/interview-hiring-predictor",
    interactiveType: 'interview',
    metrics: "R² = 0.892 · MAE = 4.12%",
    description: "Multivariate regression model with Sigmoid mapping predicting candidate offer likelihood based on experience, coding tests, and communication."
  },
  {
    id: "ad-spend-sales-predictor",
    title: "Ad-Spend Sales Predictor",
    category: "Linear Regression · KNN",
    githubUrl: "https://github.com/alikhan-student/sales_prediction_model",
    interactiveType: 'adspend',
    metrics: "R² = 0.934 · F = 182.4",
    description: "Econometric regression model capturing saturation dynamics and diminishing returns across multi-channel advertising budgets."
  },
  {
    id: "instagram-reels-engagement-model",
    title: "Instagram Reels Engagement Model",
    category: "End-to-End ML Pipeline",
    githubUrl: "https://github.com/alikhan-student/ig-reel-performance-model",
    interactiveType: 'instagram',
    metrics: "Production Feature Pipeline",
    description: "End-to-end machine learning system modeling social media engagement metrics, watch-through ratios, and algorithmic distribution."
  },
  {
    id: "breast-cancer-diagnosis-classifier",
    title: "Breast Cancer Diagnosis Classifier",
    category: "K-Nearest Neighbors",
    githubUrl: "https://github.com/alikhan-student/Breast-Cancer-Diagnosis-Classifier-K-Nearest-Neighbors-KNN-",
    interactiveType: 'breast-cancer',
    metrics: "Accuracy = 96.5% · High Sensitivity",
    description: "Clinical diagnostic classification model utilizing K-Nearest Neighbors (KNN) with normalized cell nuclei biometric features."
  },
  {
    id: "early-grade-performance-predictor",
    title: "Early-Grade Performance Predictor",
    category: "Regression · Classification · Fairness",
    githubUrl: "https://github.com/alikhan-student/EarlyGrade_predictor",
    interactiveType: 'early-grade',
    metrics: "Fairness Audited · Dual Model",
    description: "Dual regression and classification pipeline with demographic parity checks for early identification of at-risk academic trajectories."
  }
];
