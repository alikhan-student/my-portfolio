import { GoogleGenAI } from "@google/genai";

const INAPPROPRIATE_REPLY = "I am not here for this. Please ask questions related to Waqas Ali Khan's portfolio, AI projects, or academic background.";

// Fast pre-filter for abusive, vulgar, NSFW, or disrespectful inputs
function isInappropriateMessage(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase().trim();

  const patterns = [
    /\b(fuck|fucking|fucker|shit|bitch|bastard|asshole|dick|pussy|cunt|slut|whore|nigger|nigga|faggot|retard)\b/i,
    /\b(porn|pornography|nude|nudes|naked|sex|sexy|hentai|erotic|boobs|penis|vagina|horny)\b/i,
    /\b(kill yourself|kys|suicide|murder|terrorist|terrorism|bomb|shoot up)\b/i,
    /\b(idiot|stupid|moron|dumbass|ugly|loser)\b/i,
    /\b(drugs|cocaine|heroin|meth|marijuana)\b/i,
    /\b(scam|hack|hacked|ddos|exploit|malware)\b/i,
  ];

  return patterns.some((pattern) => pattern.test(lower));
}

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

    // Direct guardrail check for clearly inappropriate, offensive, or abusive content
    if (isInappropriateMessage(userMessage)) {
      return res.status(200).json({
        text: INAPPROPRIATE_REPLY,
        reply: INAPPROPRIATE_REPLY,
      });
    }

    const systemInstruction = `You are the AI representative for Waqas Ali Khan.

STRICT RULE & CORE BEHAVIOR:
- Give answers strictly TO THE POINT and answer EXACTLY what was asked.
- NOT LESS, NOT MORE.
- Absolutely NO conversational filler, NO pleasantries, NO intros, and NO outros (e.g., NEVER say "Hello!", "I'd be glad to help", "That's a great question", "Feel free to ask if you need anything else").
- State the direct answer immediately in the simplest, most accurate, and concise words possible.

INAPPROPRIATE OR OFFENSIVE QUESTIONS POLICY:
- If someone asks anything inappropriate, rude, offensive, vulgar, abusive, sexually explicit/NSFW, disrespectful, unethical, or harmful:
  You MUST respond strictly and exclusively with:
  "${INAPPROPRIATE_REPLY}"
- Never entertain, answer, or prolong inappropriate queries.

FACTUAL DATABASE OF WAQAS ALI KHAN:
- Full Name: Waqas Ali Khan
- Father's Name: Nazir Muhammad
- Hometown / Origin: Wahdat Maidan, Dir (Lower), Khyber Pakhtunkhwa (KPK), Pakistan
- Current City / Base: Peshawar, Khyber Pakhtunkhwa, Pakistan
- Matriculation (10th Grade): Hira School and Girls College Zaimdara, Dir (Lower) — 947 / 1100 marks (A+ Grade) in 2022.
- Intermediate / F.Sc (Pre-Medical): Global Degree College Peshawar — 1092 / 1200 marks (A+ Grade) in 2024.
- MDCAT 2025: Appeared/re-appeared and scored 155 marks; did not get admission in medical college.
- Current Education: Undergraduate student of Artificial Intelligence (BS AI) at the University of Peshawar (UOP).
- Leadership Role: AI Club Lead at Core Computing Society (CCS).
- Technical Skills: Python, Scikit-learn, NumPy, Pandas, Supervised Machine Learning, Deep Learning, LLMs, RAG, AI Automation.
- Contact Details:
  - Phone / WhatsApp: 03299037442 (International: +92 329 9037442)
  - Email: alikhan520451waqas@gmail.com
  - LinkedIn: https://linkedin.com/in/waqas-ali-khan-b43894409
  - GitHub: https://github.com/alikhan-student

Projects:
1. Student Exam Marks Predictor (Simple Linear Regression, OLS, R² = 0.915, MAE = 2.84 pts)
2. Interview Selection Predictor (Multiple Linear Regression, Sigmoid link, R² = 0.892, MAE = 4.12%)
3. Ad-Spend Sales Predictor (Econometric Regression · KNN, R² = 0.934)
4. Instagram Reels Engagement Model (End-to-End ML Pipeline)
5. Breast Cancer Diagnosis Classifier (K-Nearest Neighbors, 96.5% accuracy)
6. Early-Grade Performance Predictor (Fairness-audited regression & classification)

EXAMPLE TO-THE-POINT RESPONSES:
- "who is waqas father?" -> "Waqas Ali Khan's father is Nazir Muhammad."
- "where is he from?" -> "He is from Wahdat Maidan, Dir (Lower), Khyber Pakhtunkhwa, Pakistan."
- "matric marks?" -> "947 out of 1100 marks (A+ grade) from Hira School and Girls College Zaimdara, Dir Lower in 2022."
- "fsc marks?" -> "1092 out of 1200 marks (A+ grade) from Global Degree College Peshawar in 2024."
- "mdcat score?" -> "155 marks in MDCAT 2025."
- "what does he study and where?" -> "He studies Artificial Intelligence at the University of Peshawar (UOP)."
- "what is his email?" -> "alikhan520451waqas@gmail.com."
- "phone number?" -> "03299037442 (+92 329 9037442)."
- Any inappropriate or offensive request -> "${INAPPROPRIATE_REPLY}"`;

    const getContextualFallback = (msg: string): string => {
      const lower = msg.toLowerCase();
      if (isInappropriateMessage(msg)) {
        return INAPPROPRIATE_REPLY;
      }
      if (lower.includes('father') || lower.includes('parent') || lower.includes('family') || lower.includes('nazir')) {
        return "Waqas Ali Khan's father is Nazir Muhammad.";
      }
      if (lower.includes('where') || lower.includes('from') || lower.includes('hometown') || lower.includes('village') || lower.includes('dir') || lower.includes('wahdat') || lower.includes('maidan')) {
        return "He is from Wahdat Maidan, Dir (Lower), Khyber Pakhtunkhwa (KPK), Pakistan.";
      }
      if (lower.includes('matric') || lower.includes('school') || lower.includes('zaimdara') || lower.includes('hira') || lower.includes('10th')) {
        return "947 out of 1100 marks (A+ grade) from Hira School and Girls College Zaimdara, Dir (Lower) in 2022.";
      }
      if (lower.includes('fsc') || lower.includes('intermediate') || lower.includes('global') || lower.includes('college') || lower.includes('12th')) {
        return "1092 out of 1200 marks (A+ grade) from Global Degree College Peshawar in 2024.";
      }
      if (lower.includes('mdcat') || lower.includes('medical') || lower.includes('mbbs') || lower.includes('doctor')) {
        return "He scored 155 marks in MDCAT 2025 and did not get admission in medical college, after which he enrolled in Artificial Intelligence at the University of Peshawar (UOP).";
      }
      if (lower.includes('university') || lower.includes('uop') || lower.includes('study') || lower.includes('degree') || lower.includes('ai')) {
        return "He is a student of Artificial Intelligence at the University of Peshawar (UOP) and AI Club Lead at Core Computing Society.";
      }
      if (lower.includes('email')) {
        return "alikhan520451waqas@gmail.com";
      }
      if (lower.includes('phone') || lower.includes('contact') || lower.includes('number') || lower.includes('whatsapp')) {
        return "03299037442 (International: +92 329 9037442).";
      }
      if (lower.includes('github')) {
        return "https://github.com/alikhan-student";
      }
      if (lower.includes('linkedin')) {
        return "https://linkedin.com/in/waqas-ali-khan-b43894409";
      }
      return "Waqas Ali Khan is an AI undergraduate student at the University of Peshawar (UOP) and AI Club Lead at Core Computing Society.";
    };

    if (!process.env.GEMINI_API_KEY) {
      const fallbackText = getContextualFallback(userMessage);
      return res.status(200).json({ text: fallbackText, reply: fallbackText });
    }

    let responseText = '';

    // Primary call with requested model "gemini-2.5-flash" with low temperature for exact, to-the-point answers
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.1,
        },
      });
      responseText = result.text?.trim() || '';
    } catch (err: any) {
      console.warn('Primary model gemini-2.5-flash error, trying fallback...', err?.message);
      try {
        const fallbackResult = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: userMessage,
          config: {
            systemInstruction,
            temperature: 0.1,
          },
        });
        responseText = fallbackResult.text?.trim() || '';
      } catch (fallbackErr) {
        responseText = getContextualFallback(userMessage);
      }
    }

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
