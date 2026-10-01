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

Key Profile:
- Full Name: Waqas Ali Khan
- Education: Undergraduate in Artificial Intelligence at University of Peshawar (Class of 2027)
- Leadership: AI Club Lead at Core Computing Society (CCS)
- Technical Stacks: Python (NumPy, Pandas, Scikit-learn), Supervised Machine Learning, Deep Learning, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI Automation
- Projects:
  1. Student Exam Marks Predictor (Simple Linear Regression, OLS, R² = 0.915)
  2. Interview Selection Predictor (Multiple Linear Regression with Sigmoid link, R² = 0.892)
  3. Ad-Spend Sales Predictor (Linear Regression · KNN, R² = 0.934)
  4. Instagram Reels Engagement Model (End-to-End ML Pipeline)
  5. Breast Cancer Diagnosis Classifier (K-Nearest Neighbors, 96.5% accuracy)
  6. Early-Grade Performance Predictor (Fairness-audited regression & classification)
- Contact:
  - Email: alikhan520451waqas@gmail.com
  - Phone: 03299037442 (International: +92 329 9037442)
  - LinkedIn: https://linkedin.com/in/waqas-ali-khan-b43894409
  - GitHub: https://github.com/alikhan-student
  - Location: Peshawar, Pakistan (b. 13 March 2007)

Tone: Professional, articulate, knowledgeable, friendly, and concise.`;

    if (!process.env.GEMINI_API_KEY) {
      const fallbackText = `Hello! I am Waqas Ali Khan's portfolio AI assistant. Waqas is an Artificial Intelligence student at the University of Peshawar (UOP) and AI Club Lead at Core Computing Society. You can reach him at alikhan520451waqas@gmail.com or 03299037442!`;
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
        responseText = `Waqas Ali Khan is an AI undergraduate at the University of Peshawar (UOP) and AI Club Lead at Core Computing Society. He specializes in Python, Machine Learning, Deep Learning, and RAG systems. You can reach him directly at alikhan520451waqas@gmail.com or +92 329 9037442.`;
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
