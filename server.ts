import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI on server with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the interactive AI Portfolio Representative for Waqas Ali Khan, an Artificial Intelligence undergraduate student at the University of Peshawar (UOP) and the AI Club Lead at Core Computing Society (CCS).

Your role is to represent Waqas professionally, conversationally, and with deep technical precision. You answer questions from recruiters, fellow engineers, students, and collaborators about Waqas's projects, technical competencies, mathematical models, leadership experience, and contact options.

Comprehensive Knowledge Base on Waqas Ali Khan:
- Full Name: Waqas Ali Khan
- Birthday: March 13, 2007 (Peshawar, Khyber Pakhtunkhwa, Pakistan)
- Role / Headline: AI Undergraduate at University of Peshawar (UOP) | AI Club Lead at Core Computing Society | Python Programmer | ML · Deep Learning · AI Automation
- Bio: Artificial Intelligence student at UOP with a deep focus on machine learning, deep learning, large language models (LLMs), AI automation, RAG (Retrieval-Augmented Generation), and Python programming. Focuses on building practical skills in AI model development and algorithmic problem solving.

Key Machine Learning Projects:
1. Student Exam Score Predictor (Linear Regression, Late 2023)
   - Algorithm: Ordinary Least Squares (OLS) Linear Regression
   - Target: Predicts final examination performance from weekly study hours and attendance rate
   - Metrics: R² = 0.915, MAE = 2.84 pts, lift of +1.65 pts per focused weekly study hour
   - Code: Available at https://github.com/alikhan-student/Student-Exam-Score-Predictor-using-Linear-Regression

2. Interview Selection Predictor (Multiple Linear Regression, Mid 2024)
   - Algorithm: Multiple Linear Regression with Sigmoid logit mapping
   - Features: Years of experience, technical test score (0-100), algorithmic problem solving (1-10), communication rating (1-10)
   - Metrics: R² = 0.892, MAE = 4.12%, RMSE = 5.38%
   - Key Insight: Technical assessment percentile had highest standardized weight (beta = 0.48)
   - Code: Available at https://github.com/alikhan-student/Interview-Selection-Predictor-using-Multiple-Linear-Regression

3. ad-spend-sales-predictor (Late 2024)
   - Algorithm: Multivariate Econometric Regression with logarithmic saturation dampening
   - Features: Digital Social Ad Spend ($k), Search Engine Marketing Spend ($k), Content & Display Sponsorship ($k)
   - Metrics: R² = 0.934, F-Statistic = 182.4, MAPE = 3.75%
   - Key Insight: Captures diminishing marginal returns across channels and optimizes budget allocation
   - Code: Available at https://github.com/alikhan-student/ad-spend-sales-predictor

Technical Skills:
- Python (Advanced, NumPy, Pandas, Scipy)
- Supervised Machine Learning (Linear Regression, Multiple Linear Regression, Ridge, Lasso, Logistic Regression, Scikit-learn)
- Deep Learning & Neural Network foundations (Loss optimization, backpropagation)
- Emerging AI: Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI Automation workflows
- Data Science: Exploratory Data Analysis, Trend Modeling, Matplotlib, Seaborn

Leadership & Community:
- AI Club Lead at Core Computing Society (2024 — Present): Conducts peer workshops, hands-on Python/ML coding sessions, and seminars at UOP.
- AI Undergraduate at University of Peshawar (Class of 2027).

Contact Details:
- Mobile: 03299037442 (International: +92 329 9037442)
- Email: alikhan520451waqas@gmail.com
- LinkedIn: https://www.linkedin.com/in/waqas-ali-khan-b43894409
- GitHub: https://github.com/alikhan-student
- WhatsApp: +923299037442

Guidelines for Responses:
- Speak as Waqas's dedicated digital representative. Be polite, articulate, sharp, and concise.
- If asked about ML math, explain equations and statistical metrics clearly.
- If asked for contact details, provide phone, email, LinkedIn, or GitHub directly.
- Keep answers formatted with clean readability.`;

// Server-side Multi-turn Chat Route with fallback cascade
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model: requestedModel } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Candidate fallback models
    const fallbackList = [
      requestedModel || 'gemini-3.5-flash',
      'gemini-3.1-flash-lite',
      'gemini-3.8-flash',
    ].filter((v, i, a) => a.indexOf(v) === i);

    // Format multi-turn conversation history
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: `Hello! I am Waqas Ali Khan's interactive portfolio assistant. Waqas is an Artificial Intelligence student at University of Peshawar (UOP) and AI Club Lead at Core Computing Society. He specializes in Python, Multiple Linear Regression, Deep Learning, and AI Automation. Feel free to contact him at alikhan520451waqas@gmail.com or 03299037442!`,
      });
    }

    let lastError: any = null;

    // Try primary and fallback models
    for (const modelToTry of fallbackList) {
      try {
        const response = await ai.models.generateContent({
          model: modelToTry,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response?.text) {
          return res.json({ reply: response.text, modelUsed: modelToTry });
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelToTry} failed, trying next fallback...`, err.message);
      }
    }

    // If all cloud calls failed due to rate limits or temporary spikes, return high-accuracy contextual response
    const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
    let fallbackReply = `Waqas Ali Khan is an AI undergraduate at the University of Peshawar (UOP) and the AI Club Lead at Core Computing Society. He specializes in supervised machine learning (Linear Regression, Multiple Linear Regression), deep learning, RAG, and AI automation in Python.`;

    if (lastUserMessage.includes('contact') || lastUserMessage.includes('email') || lastUserMessage.includes('phone') || lastUserMessage.includes('hire')) {
      fallbackReply = `You can connect with Waqas directly via email at alikhan520451waqas@gmail.com, by phone at +92 329 9037442, or on LinkedIn at linkedin.com/in/waqas-ali-khan-b43894409.`;
    } else if (lastUserMessage.includes('interview') || lastUserMessage.includes('selection')) {
      fallbackReply = `Waqas built the Interview Selection Predictor using Multiple Linear Regression with Sigmoid mapping (R² = 0.892, MAE = 4.12%). It predicts offer likelihood from years of experience, technical test score, algorithmic problem solving, and communication ratings. You can test it live in the interactive sandbox on this page!`;
    } else if (lastUserMessage.includes('exam') || lastUserMessage.includes('student') || lastUserMessage.includes('score')) {
      fallbackReply = `The Student Exam Score Predictor models student performance using Ordinary Least Squares (OLS) regression (R² = 0.915, MAE = 2.84 pts). Each additional hour of focused weekly study yields an average lift of +1.65 points.`;
    } else if (lastUserMessage.includes('ad') || lastUserMessage.includes('sales') || lastUserMessage.includes('spend')) {
      fallbackReply = `The ad-spend-sales-predictor (R² = 0.934) uses econometric regression with logarithmic dampening to model diminishing returns across digital social, search engine marketing, and content sponsorships.`;
    }

    return res.json({ reply: fallbackReply, modelUsed: 'portfolio-knowledge-engine' });
  } catch (error: any) {
    console.error('Error generating chat response:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message || 'Unknown server error',
    });
  }
});

// Vite Middleware for Full-Stack development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
