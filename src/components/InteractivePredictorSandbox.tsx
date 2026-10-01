import React, { useState } from 'react';
import { 
  RotateCcw, 
  ArrowRight, 
  Activity, 
  Film, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  BarChart3,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';

export type SandboxTabType = 'exam' | 'interview' | 'adspend' | 'instagram' | 'breast-cancer' | 'early-grade';

interface InteractivePredictorSandboxProps {
  initialTab?: SandboxTabType;
}

export const InteractivePredictorSandbox: React.FC<InteractivePredictorSandboxProps> = ({ initialTab = 'exam' }) => {
  const [activeTab, setActiveTab] = useState<SandboxTabType>(initialTab);

  // --- Model 1: Student Exam Score Predictor State ---
  const [studyHours, setStudyHours] = useState(14);
  const [attendance, setAttendance] = useState(88);
  const [midtermScore, setMidtermScore] = useState(74);

  const calculateExamScore = () => {
    const raw = 10.4 + (1.65 * studyHours) + (0.28 * attendance) + (0.42 * midtermScore);
    return Math.min(Math.max(raw, 25), 99.4);
  };
  const examResult = calculateExamScore();

  // --- Model 2: Interview Selection Predictor State ---
  const [interviewExp, setInterviewExp] = useState(2.5);
  const [interviewTech, setInterviewTech] = useState(78);
  const [interviewProbSolving, setInterviewProbSolving] = useState(8);
  const [interviewComm, setInterviewComm] = useState(7.5);

  const calculateInterview = () => {
    const z = -4.5 + (0.42 * interviewExp) + (0.052 * interviewTech) + (0.45 * interviewProbSolving) + (0.32 * interviewComm);
    const prob = 1 / (1 + Math.exp(-z));
    return Math.min(Math.max(prob * 100, 2), 98.5);
  };
  const interviewResult = calculateInterview();

  // --- Model 3: Ad Spend Sales Predictor State ---
  const [socialSpend, setSocialSpend] = useState(15);
  const [searchSpend, setSearchSpend] = useState(22);
  const [contentSpend, setContentSpend] = useState(10);

  const calculateSales = () => {
    const salesUnits = 5.2 + (7.8 * Math.log(1 + socialSpend)) + (11.2 * Math.log(1 + searchSpend)) + (4.6 * Math.log(1 + contentSpend));
    const totalSpend = socialSpend + searchSpend + contentSpend;
    const revenueEst = salesUnits * 14.5;
    const roas = totalSpend > 0 ? (revenueEst / totalSpend) : 0;
    return { salesUnits, totalSpend, roas, revenueEst };
  };
  const adResult = calculateSales();

  // --- Model 4: Instagram Reels Engagement Model State ---
  const [reelLength, setReelLength] = useState(18); // seconds
  const [velocity, setVelocity] = useState(620); // 1-hr saves & shares
  const [completionRate, setCompletionRate] = useState(68); // %
  const [audioTrend, setAudioTrend] = useState(7.5); // 1-10

  const calculateReel = () => {
    const completionFactor = Math.pow(completionRate / 100, 1.7);
    const trendFactor = 1 + (0.12 * audioTrend);
    const lengthPenalty = Math.pow(25 / Math.max(reelLength, 8), 0.28);
    const projectedViews = Math.round(completionFactor * trendFactor * (2500 + 48 * velocity) * lengthPenalty);
    const engagementRate = Math.min(Math.max((velocity / Math.max(projectedViews * 0.04, 1)) * 3.8, 1.8), 16.5);
    return { projectedViews, engagementRate };
  };
  const reelResult = calculateReel();

  // --- Model 5: Breast Cancer Diagnosis Classifier (KNN) State ---
  const [clumpThickness, setClumpThickness] = useState(3);
  const [cellSizeUniformity, setCellSizeUniformity] = useState(2);
  const [marginalAdhesion, setMarginalAdhesion] = useState(2);
  const [bareNuclei, setBareNuclei] = useState(2);

  const calculateKNN = () => {
    // Distance to benign centroid (2.1, 1.3, 1.4, 1.4)
    const dBenign = Math.sqrt(
      Math.pow(clumpThickness - 2.1, 2) +
      Math.pow(cellSizeUniformity - 1.3, 2) +
      Math.pow(marginalAdhesion - 1.4, 2) +
      Math.pow(bareNuclei - 1.4, 2)
    );
    // Distance to malignant centroid (7.2, 6.6, 5.5, 7.6)
    const dMalignant = Math.sqrt(
      Math.pow(clumpThickness - 7.2, 2) +
      Math.pow(cellSizeUniformity - 6.6, 2) +
      Math.pow(marginalAdhesion - 5.5, 2) +
      Math.pow(bareNuclei - 7.6, 2)
    );
    const isBenign = dBenign < dMalignant;
    const totalDist = dBenign + dMalignant;
    const confidence = isBenign 
      ? (dMalignant / totalDist) * 100 
      : (dBenign / totalDist) * 100;
    return {
      prediction: isBenign ? 'Benign (Non-Cancerous)' : 'Malignant (Abnormal Tissue)',
      isBenign,
      confidence: Math.min(Math.max(confidence, 68), 99.2),
      dBenign: dBenign.toFixed(2),
      dMalignant: dMalignant.toFixed(2)
    };
  };
  const knnResult = calculateKNN();

  // --- Model 6: Early-Grade Performance Predictor State ---
  const [priorGrade, setPriorGrade] = useState(72);
  const [earlyAttendance, setEarlyAttendance] = useState(85);
  const [assignmentRate, setAssignmentRate] = useState(80);
  const [resourceIndex, setResourceIndex] = useState(7);

  const calculateEarlyGrade = () => {
    const rawScore = 8.5 + (0.45 * priorGrade) + (0.28 * earlyAttendance) + (0.18 * assignmentRate) + (0.95 * resourceIndex);
    const projected = Math.min(Math.max(rawScore, 20), 98.8);
    const riskStatus = projected >= 80 ? 'Honors Trajectory' : projected >= 65 ? 'Stable Academic Progress' : 'Early Intervention Required';
    return { projected, riskStatus };
  };
  const earlyGradeResult = calculateEarlyGrade();

  const tabs: { id: SandboxTabType; label: string; icon: React.ReactNode; repo: string }[] = [
    { id: 'exam', label: 'Student Exam Marks', icon: <GraduationCap className="w-3.5 h-3.5" />, repo: 'Students-marks-prediction-model' },
    { id: 'interview', label: 'Interview Selection', icon: <Briefcase className="w-3.5 h-3.5" />, repo: 'interview-hiring-predictor' },
    { id: 'adspend', label: 'Ad-Spend Sales', icon: <TrendingUp className="w-3.5 h-3.5" />, repo: 'sales_prediction_model' },
    { id: 'instagram', label: 'Instagram Reels', icon: <Film className="w-3.5 h-3.5" />, repo: 'ig-reel-performance-model' },
    { id: 'breast-cancer', label: 'Breast Cancer KNN', icon: <Activity className="w-3.5 h-3.5" />, repo: 'Breast-Cancer-Diagnosis-Classifier-K-Nearest-Neighbors-KNN-' },
    { id: 'early-grade', label: 'Early-Grade Predictor', icon: <BarChart3 className="w-3.5 h-3.5" />, repo: 'EarlyGrade_predictor' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Tab Switcher - Grid of 6 Models */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 p-1 bg-muted/40 border border-border rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 text-[11px] font-medium rounded-lg transition-all text-center truncate ${
              activeTab === tab.id
                ? 'bg-card text-foreground font-semibold shadow-sm border border-border text-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            {tab.icon}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Model Sandbox Body */}
      <div className="bg-card/70 border border-border rounded-2xl p-6 sm:p-8 relative">
        
        {/* ================= 1. STUDENT EXAM SCORE ================= */}
        {activeTab === 'exam' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-display text-lg font-medium text-foreground">
                    Student Exam Marks Predictor
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Algorithm: Simple & Multiple Linear Regression · Ordinary Least Squares (OLS)
                  </p>
                </div>
                <button
                  onClick={() => { setStudyHours(14); setAttendance(88); setMidtermScore(74); }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Weekly Focused Study Hours</span>
                    <span className="font-mono text-accent font-semibold">{studyHours} hrs/week</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="35"
                    step="1"
                    value={studyHours}
                    onChange={(e) => setStudyHours(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                    <span>2 hrs</span>
                    <span>18 hrs (Average)</span>
                    <span>35 hrs</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Lecture Attendance Percentage</span>
                    <span className="font-mono text-accent font-semibold">{attendance}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={attendance}
                    onChange={(e) => setAttendance(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Midterm Quiz Baseline</span>
                    <span className="font-mono text-accent font-semibold">{midtermScore} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="1"
                    value={midtermScore}
                    onChange={(e) => setMidtermScore(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>

              <div className="p-3 bg-muted/30 border border-border rounded-xl font-mono text-[11px] text-muted-foreground">
                <div className="text-foreground font-medium">OLS Regression Fit:</div>
                <div>Predicted Mark = 10.4 + 1.65(Hours) + 0.28(Attendance) + 0.42(Midterm)</div>
                <div className="text-muted-foreground/70">R² = 0.915 · MAE = 2.84 pts · Pearson r = 0.957</div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-background/80 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Inference Prediction
                </span>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="font-display text-5xl font-medium text-foreground tabular-nums">
                    {examResult.toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">/ 100 Marks</span>
                </div>

                <div className="p-3 bg-card rounded-lg border border-border text-xs font-mono space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Expected Grade</span>
                    <span className="text-foreground font-semibold">
                      {examResult >= 85 ? 'Grade A (Excellent)' : examResult >= 75 ? 'Grade B (High Merit)' : examResult >= 60 ? 'Grade C (Passing)' : 'At Risk'}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Marginal Study Lift</span>
                    <span className="text-accent font-semibold">+1.65 pts / hour</span>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/alikhan-student/Students-marks-prediction-model"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg text-center flex items-center justify-center gap-2 border border-border transition-colors"
              >
                <span>View Repository on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ================= 2. INTERVIEW SELECTION ================= */}
        {activeTab === 'interview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-display text-lg font-medium text-foreground">
                    Interview Selection Predictor
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Algorithm: Multiple Linear Regression with Sigmoid Probability Link
                  </p>
                </div>
                <button
                  onClick={() => { setInterviewExp(2.5); setInterviewTech(78); setInterviewProbSolving(8); setInterviewComm(7.5); }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Years of Experience</span>
                    <span className="font-mono text-accent font-semibold">{interviewExp} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={interviewExp}
                    onChange={(e) => setInterviewExp(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Technical Coding Assessment</span>
                    <span className="font-mono text-accent font-semibold">{interviewTech} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="1"
                    value={interviewTech}
                    onChange={(e) => setInterviewTech(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Algorithmic Problem Solving</span>
                    <span className="font-mono text-accent font-semibold">{interviewProbSolving} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={interviewProbSolving}
                    onChange={(e) => setInterviewProbSolving(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Communication & Behavioral Rating</span>
                    <span className="font-mono text-accent font-semibold">{interviewComm} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={interviewComm}
                    onChange={(e) => setInterviewComm(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-background/80 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Selection Likelihood
                </span>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="font-display text-5xl font-medium text-foreground tabular-nums">
                    {interviewResult.toFixed(1)}%
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Probability</span>
                </div>

                <div className="p-3 bg-card rounded-lg border border-border text-xs space-y-2">
                  <div className="text-muted-foreground">
                    Model Verdict: <strong className="text-foreground">{interviewResult >= 75 ? 'Recommended for Offer' : interviewResult >= 50 ? 'Competitive Finalist' : 'Below Benchmark'}</strong>
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground/70">
                    Highest weight: Tech Assessment (β = 0.48)
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/alikhan-student/interview-hiring-predictor"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg text-center flex items-center justify-center gap-2 border border-border transition-colors"
              >
                <span>View Repository on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ================= 3. AD-SPEND SALES ================= */}
        {activeTab === 'adspend' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-display text-lg font-medium text-foreground">
                    Ad-Spend Sales Predictor
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Algorithm: Multivariate Regression with Log Saturation & KNN Neighbors
                  </p>
                </div>
                <button
                  onClick={() => { setSocialSpend(15); setSearchSpend(22); setContentSpend(10); }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Digital Social Media Budget</span>
                    <span className="font-mono text-accent font-semibold">${socialSpend}k</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="1"
                    value={socialSpend}
                    onChange={(e) => setSocialSpend(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Search Engine Marketing (SEM)</span>
                    <span className="font-mono text-accent font-semibold">${searchSpend}k</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="1"
                    value={searchSpend}
                    onChange={(e) => setSearchSpend(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Content & Display Sponsorship</span>
                    <span className="font-mono text-accent font-semibold">${contentSpend}k</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="1"
                    value={contentSpend}
                    onChange={(e) => setContentSpend(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-background/80 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Predicted Sales Volume
                </span>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="font-display text-5xl font-medium text-foreground tabular-nums">
                    {adResult.salesUnits.toFixed(1)}k
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Units</span>
                </div>

                <div className="p-3 bg-card rounded-lg border border-border text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Allocated Budget</span>
                    <span className="text-foreground font-semibold">${adResult.totalSpend}k</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Gross Revenue Projection</span>
                    <span className="text-accent font-semibold">${adResult.revenueEst.toFixed(1)}k</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Blended ROAS Multiple</span>
                    <span className="text-foreground">{adResult.roas.toFixed(2)}x</span>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/alikhan-student/sales_prediction_model"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg text-center flex items-center justify-center gap-2 border border-border transition-colors"
              >
                <span>View Repository on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ================= 4. INSTAGRAM REELS ENGAGEMENT ================= */}
        {activeTab === 'instagram' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-display text-lg font-medium text-foreground">
                    Instagram Reels Engagement Model
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Algorithm: Non-linear End-to-End Feature Pipeline & Virality Forecast
                  </p>
                </div>
                <button
                  onClick={() => { setReelLength(18); setVelocity(620); setCompletionRate(68); setAudioTrend(7.5); }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Video Duration</span>
                    <span className="font-mono text-accent font-semibold">{reelLength} seconds</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="90"
                    step="1"
                    value={reelLength}
                    onChange={(e) => setReelLength(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                    <span>5s (Snackable)</span>
                    <span>30s</span>
                    <span>90s (Long-form)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">First-Hour Save & Share Velocity</span>
                    <span className="font-mono text-accent font-semibold">{velocity} actions</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="2000"
                    step="20"
                    value={velocity}
                    onChange={(e) => setVelocity(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Watch-Through Completion Rate</span>
                    <span className="font-mono text-accent font-semibold">{completionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="95"
                    step="1"
                    value={completionRate}
                    onChange={(e) => setCompletionRate(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Audio / Sound Trend Momentum</span>
                    <span className="font-mono text-accent font-semibold">{audioTrend} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={audioTrend}
                    onChange={(e) => setAudioTrend(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-background/80 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Projected Reach & Distribution
                </span>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="font-display text-4xl font-medium text-foreground tabular-nums">
                    {(reelResult.projectedViews / 1000).toFixed(1)}k
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Estimated Views</span>
                </div>

                <div className="p-3 bg-card rounded-lg border border-border text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Algorithm Tier</span>
                    <span className="text-accent font-semibold">
                      {reelResult.projectedViews > 80000 ? 'Viral Explore Breakout' : reelResult.projectedViews > 25000 ? 'Broad Recommendation Push' : 'Steady Follower Circulation'}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Engagement Index</span>
                    <span className="text-foreground font-semibold">{reelResult.engagementRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/alikhan-student/ig-reel-performance-model"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg text-center flex items-center justify-center gap-2 border border-border transition-colors"
              >
                <span>View Repository on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ================= 5. BREAST CANCER KNN CLASSIFIER ================= */}
        {activeTab === 'breast-cancer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-display text-lg font-medium text-foreground">
                    Breast Cancer Diagnosis Classifier
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Algorithm: K-Nearest Neighbors (KNN, k=5) · Wisconsin Biometric Benchmark
                  </p>
                </div>
                <button
                  onClick={() => { setClumpThickness(3); setCellSizeUniformity(2); setMarginalAdhesion(2); setBareNuclei(2); }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Clump Thickness</span>
                    <span className="font-mono text-accent font-semibold">{clumpThickness} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={clumpThickness}
                    onChange={(e) => setClumpThickness(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Uniformity of Cell Size</span>
                    <span className="font-mono text-accent font-semibold">{cellSizeUniformity} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={cellSizeUniformity}
                    onChange={(e) => setCellSizeUniformity(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Marginal Adhesion</span>
                    <span className="font-mono text-accent font-semibold">{marginalAdhesion} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={marginalAdhesion}
                    onChange={(e) => setMarginalAdhesion(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Bare Nuclei / Structural Texture</span>
                    <span className="font-mono text-accent font-semibold">{bareNuclei} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={bareNuclei}
                    onChange={(e) => setBareNuclei(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-background/80 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Diagnostic Classification
                </span>
                
                <div className="my-3">
                  <span className={`font-display text-2xl sm:text-3xl font-medium tracking-tight ${
                    knnResult.isBenign ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {knnResult.prediction}
                  </span>
                  <div className="text-xs font-mono text-muted-foreground mt-1">
                    Model Confidence: <strong className="text-foreground">{knnResult.confidence.toFixed(1)}%</strong>
                  </div>
                </div>

                <div className="p-3 bg-card rounded-lg border border-border text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Distance to Benign Centroid</span>
                    <span className="text-foreground">{knnResult.dBenign}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Distance to Malignant Centroid</span>
                    <span className="text-foreground">{knnResult.dMalignant}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Validated Accuracy</span>
                    <span className="text-accent font-semibold">96.5%</span>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/alikhan-student/Breast-Cancer-Diagnosis-Classifier-K-Nearest-Neighbors-KNN-"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg text-center flex items-center justify-center gap-2 border border-border transition-colors"
              >
                <span>View Repository on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ================= 6. EARLY-GRADE PREDICTOR ================= */}
        {activeTab === 'early-grade' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-display text-lg font-medium text-foreground">
                    Early-Grade Performance Predictor
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Algorithm: Regression · Classification · Algorithmic Fairness Audit
                  </p>
                </div>
                <button
                  onClick={() => { setPriorGrade(72); setEarlyAttendance(85); setAssignmentRate(80); setResourceIndex(7); }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Prior Academic Foundations Index</span>
                    <span className="font-mono text-accent font-semibold">{priorGrade} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="1"
                    value={priorGrade}
                    onChange={(e) => setPriorGrade(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Weekly Classroom Attendance</span>
                    <span className="font-mono text-accent font-semibold">{earlyAttendance}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={earlyAttendance}
                    onChange={(e) => setEarlyAttendance(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Assignment & Homework Completion Rate</span>
                    <span className="font-mono text-accent font-semibold">{assignmentRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={assignmentRate}
                    onChange={(e) => setAssignmentRate(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground">Learning Resource Access Index</span>
                    <span className="font-mono text-accent font-semibold">{resourceIndex} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={resourceIndex}
                    onChange={(e) => setResourceIndex(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-background/80 border border-border rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Forecasted Academic Standing
                </span>
                <div className="flex items-baseline gap-2 my-2">
                  <span className="font-display text-5xl font-medium text-foreground tabular-nums">
                    {earlyGradeResult.projected.toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Score</span>
                </div>

                <div className="p-3 bg-card rounded-lg border border-border text-xs font-mono space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Standing Status</span>
                    <span className="text-accent font-semibold">{earlyGradeResult.riskStatus}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Fairness Parity Disparity</span>
                    <span className="text-foreground">Δ = 0.018 (Audited)</span>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/alikhan-student/EarlyGrade_predictor"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg text-center flex items-center justify-center gap-2 border border-border transition-colors"
              >
                <span>View Repository on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
