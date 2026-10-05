import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const { message, messages } = req.body || {};
    
    // Support message string or messages array, ensuring 'message' is the primary field
    const userMessage = typeof message === 'string' && message.trim().length > 0
      ? message.trim()
      : (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1]?.content : '');

    if (!userMessage) {
      return res.status(400).json({ 
        error: 'Message is required',
        text: 'Please provide a message.' 
      });
    }

    const systemInstruction = `You are the interactive AI Portfolio Representative for Waqas Ali Khan, an Artificial Intelligence undergraduate student at the University of Peshawar (UOP) and the AI Club Lead at Core Computing Society (CCS).

Your role is to represent Waqas professionally, authentically, and warmly. You answer questions from recruiters, engineers, teachers, students, and visitors about his personal background, education, MDCAT journey, AI projects, leadership, and contact information.

Comprehensive Profile & Personal Information:
- Full Name: Waqas Ali Khan
- Father's Name: Nazir Muhammad
- Hometown / Origin: Wahdat Maidan, Dir (Lower), Khyber Pakhtunkhwa (KPK), Pakistan
- Current City / Base: Peshawar, Khyber Pakhtunkhwa, Pakistan
- Current Position: Artificial Intelligence undergraduate student at University of Peshawar (UOP) & AI Club Lead at Core Computing Society (CCS)

Academic & Educational Journey:
1. Matriculation (10th Grade, 2022):
   - School: Hira School and Girls College Zaimdara, Dir (Lower), KPK
   - Marks: 947 out of 1100 (86.1%)
   - Grade: A+ Grade
   - Year: 2022

2. Intermediate / F.Sc (Pre-Medical / Science, 2024):
   - College: Global Degree College Peshawar, KPK
   - Marks: 1092 out of 1200 (91.0%)
   - Grade: A+ Grade
   - Year: 2024

3. Medical College Admission Test (MDCAT, 2025):
   - Result: Scored 155 marks in MDCAT 2025 after re-appearing.
   - Outcome: Did not get admission into medical college.
   - Significance: This became a transformative milestone that redirected his analytical and mathematical talents toward computer science and Artificial Intelligence.

4. University Higher Education (Current):
   - University: University of Peshawar (UOP)
   - Degree: Bachelor of Science in Artificial Intelligence (BS AI)
   - Status: Currently an active student of AI at UOP.
   - Leadership: AI Club Lead at Core Computing Society (CCS) at UOP, organizing peer programming workshops, machine learning seminars, and AI community initiatives.

Key Machine Learning Projects:
1. Student Exam Marks Predictor (Simple Linear Regression, OLS, R² = 0.915, MAE = 2.84 pts)
2. Interview Selection Predictor (Multiple Linear Regression with Sigmoid logit link, R² = 0.892, MAE = 4.12%)
3. Ad-Spend Sales Predictor (Econometric Regression with logarithmic saturation dampening, R² = 0.934)
4. Instagram Reels Engagement Model (End-to-End ML Pipeline)
5. Breast Cancer Diagnosis Classifier (K-Nearest Neighbors, 96.5% accuracy)
6. Early-Grade Performance Predictor (Fairness-audited regression & classification)

Technical Skills:
- Python (Advanced, NumPy, Pandas, Scikit-learn, Scipy, Matplotlib, Seaborn)
- Supervised Machine Learning (Linear Regression, Multiple Linear Regression, Ridge, Lasso, Logistic Regression, KNN)
- Deep Learning & Neural Network foundations (Loss optimization, backpropagation)
- Emerging AI: Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI Automation pipelines

Contact Information:
- Phone / WhatsApp: 03299037442 (International: +92 329 9037442)
- Email: alikhan520451waqas@gmail.com
- LinkedIn: https://linkedin.com/in/waqas-ali-khan-b43894409
- GitHub: https://github.com/alikhan-student

Instructions for Responding:
- If someone asks who Waqas's father is, clearly state: "Waqas Ali Khan's father is Nazir Muhammad."
- If someone asks where Waqas is from, mention Wahdat Maidan, Dir (Lower), Khyber Pakhtunkhwa (KPK), Pakistan.
- If someone asks about his school, Matric, or 10th grade, provide the exact details: Hira School and Girls College Zaimdara (Dir Lower), 947/1100 marks with A+ grade in 2022.
- If someone asks about his college, F.Sc, or intermediate, provide: Global Degree College Peshawar, 1092/1200 marks with A+ grade in 2024.
- If someone asks about MDCAT or medical college, explain honestly and positively that he scored 155 marks in MDCAT 2025 and did not get admission in medical college, after which he secured admission in AI at the University of Peshawar (UOP) and is now passionately pursuing AI.
- If someone asks about his current studies, state that he is an Artificial Intelligence student at UOP and the AI Club Lead at Core Computing Society.
- Keep answers polite, articulate, well-structured, and inspiring.`;

    const getContextualFallback = (msg: string): string => {
      const lower = msg.toLowerCase();
      if (lower.includes('father') || lower.includes('parent') || lower.includes('family') || lower.includes('nazir')) {
        return "Waqas Ali Khan's father is Nazir Muhammad. Waqas belongs to Wahdat Maidan, Dir (Lower), Khyber Pakhtunkhwa, Pakistan.";
      }
      if (lower.includes('where') || lower.includes('from') || lower.includes('hometown') || lower.includes('village') || lower.includes('dir') || lower.includes('wahdat') || lower.includes('maidan')) {
        return "Waqas Ali Khan is from Wahdat Maidan, Dir (Lower), Khyber Pakhtunkhwa (KPK), Pakistan. He is currently based in Peshawar studying Artificial Intelligence at the University of Peshawar (UOP).";
      }
      if (lower.includes('matric') || lower.includes('school') || lower.includes('zaimdara') || lower.includes('hira') || lower.includes('947') || lower.includes('10th')) {
        return "Waqas completed his Matriculation from Hira School and Girls College Zaimdara, Dir (Lower) in 2022, securing 947 marks out of 1100 with an A+ grade.";
      }
      if (lower.includes('fsc') || lower.includes('intermediate') || lower.includes('global') || lower.includes('college') || lower.includes('1092') || lower.includes('12th')) {
        return "Waqas completed his F.Sc (Pre-Medical) from Global Degree College Peshawar in 2024, securing an outstanding 1092 marks out of 1200 with an A+ grade.";
      }
      if (lower.includes('mdcat') || lower.includes('medical') || lower.includes('mbbs') || lower.includes('doctor') || lower.includes('155')) {
        return "Waqas appeared/re-appeared for MDCAT in 2025 and scored 155 marks. He did not get admission in medical college, which led him to discover his true calling in computing. He subsequently secured admission in Artificial Intelligence at the University of Peshawar (UOP) and is now studying AI there as an undergraduate and AI Club Lead.";
      }
      if (lower.includes('education') || lower.includes('qualification') || lower.includes('study') || lower.includes('background') || lower.includes('university') || lower.includes('uop')) {
        return "Waqas Ali Khan's educational journey:\n• Matric: Hira School and Girls College Zaimdara, Dir Lower (947/1100, A+ grade, 2022)\n• F.Sc: Global Degree College Peshawar (1092/1200, A+ grade, 2024)\n• MDCAT 2025: 155 marks (pivoted away from medicine)\n• University: Currently pursuing BS Artificial Intelligence at University of Peshawar (UOP) and serving as AI Club Lead at Core Computing Society (CCS).";
      }
      if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('hire')) {
        return "You can reach Waqas Ali Khan directly at alikhan520451waqas@gmail.com, call/WhatsApp him at 03299037442 (+92 329 9037442), or connect on LinkedIn (linkedin.com/in/waqas-ali-khan-b43894409) and GitHub (github.com/alikhan-student).";
      }
      return "Waqas Ali Khan is an AI undergraduate student at the University of Peshawar (UOP) and the AI Club Lead at Core Computing Society. He is from Wahdat Maidan, Dir (Lower), scored 947/1100 (A+) in Matric, 1092/1200 (A+) in F.Sc from Global Degree College Peshawar, and now builds machine learning models, RAG pipelines, and AI automation systems in Python.";
    };

    if (!process.env.GEMINI_API_KEY) {
      const fallbackText = getContextualFallback(userMessage);
      return res.status(200).json({ text: fallbackText, reply: fallbackText });
    }

    let responseText = '';

    // Primary call with requested model "gemini-2.5-flash"
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      responseText = result.text || '';
    } catch (err: any) {
      console.warn('Primary model gemini-2.5-flash error, trying fallback...', err?.message);
      // Fallback model if temporary demand spike occurs
      try {
        const fallbackResult = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: userMessage,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        responseText = fallbackResult.text || '';
      } catch (fallbackErr) {
        responseText = getContextualFallback(userMessage);
      }
    }

    // Return field names matching frontend expectations (both text and reply for compatibility)
    return res.status(200).json({ 
      text: responseText,
      reply: responseText
    });
  } catch (error: any) {
    console.error('Error in /api/chat handler:', error);
    return res.status(500).json({
      error: 'Failed to generate response',
      text: 'An error occurred while generating the response. Please try again.',
    });
  }
}
