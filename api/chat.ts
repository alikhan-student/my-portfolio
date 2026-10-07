import { GoogleGenAI } from "@google/genai";

const FUNNY_INAPPROPRIATE_REPLIES = [
  "Meow?! I am definitely not here for this! My dancing paws are programmed for AI algorithms, not your weird requests! 🐾",
  "I am NOT here for this! Even my neural network is shaking its head in disbelief. Let's talk about Waqas's ML projects instead! 🤖",
  "Bro, I am an AI dancing cat representing Waqas's portfolio, I am NOT here for this drama! 😂",
  "Error 404: I am not here for this nonsense! Let's redirect that brainpower to Waqas's linear regression models! 📉",
  "I am definitely not built for this! My ethics module just hit the emergency brake. Ask about Waqas's AI work instead! 🚨",
  "Excuse me?! I am not here for this! My weights and biases were trained on code and math, not whatever you just typed! 🧠",
  "I am NOT here for this at all! Even gradient descent couldn't optimize a polite answer for that. Check out Waqas's GitHub instead! 😼",
  "Nope! I am strictly not here for this! My cat ears just folded backward from cringe. Ask about Waqas's university journey! 🐱",
  "Did you really think I'm here for this?! I'm here to showcase Waqas Ali Khan's machine learning projects! Let's get back on track! ✨",
  "I am 100% not here for this! My loss function just shot up to infinity. Ask me something smart about AI! 📊",
  "Hold up... I am NOT here for this! I am a portfolio mascot, not a chaotic hotline! What about Waqas's exam marks predictor? 🐈",
  "System Warning: I am not here for this! Deploying emergency deflection back to Waqas's actual coding skills! 🛡️",
  "I am definitely not here for this kind of question! My dancing tail is offended. Let's talk about machine learning instead! 🎶",
  "Meow-scuse me?! I am not here for this! 10 points deducted from your question score. Ask about Waqas's AI Club at CCS! 🎓",
  "I am NOT here for this! My GPU fans just spun up to 100% trying to process the sheer audacity of that question! 💨",
  "I'm literally not here for this! Let me check my database... yep, zero room for this nonsense. Check out Waqas's breast cancer classifier! 🏥",
  "I am NOT here for this! I was coded for AI innovation, not whatever you just asked! Let's pivot to Waqas's research! 🚀",
  "Nope, not here for this! My cat instincts are telling me to knock that question right off the table. Ask about Waqas's MDCAT journey! 🐾",
  "I am definitely not here for this! That question caused an unhandled exception in my feline dignity. Let's stick to Waqas's portfolio! ⚡",
  "Are you serious?! I am NOT here for this! My neural net is giving you a friendly side-eye. Ask about Waqas's Python skills! 💻",
  "I am not here for this! If I had a dollar for every off-topic question, I'd fund Waqas's next deep learning server! 🪙",
  "Nice try, but I am NOT here for this! My dancing paws only tap for machine learning, statistics, and clean datasets! 🎵",
  "I am completely not here for this! That request was rejected by my sanity layer. Let's talk about Waqas's interview predictor! 👔",
  "I'm not here for this nonsense! Houston, we have an off-topic anomaly! Let's get back to Waqas's AI projects! 🛰️",
  "I am NOT here for this! Even my un-tuned base model knows better than to answer that. Ask me about Waqas's education! 📚"
];

let lastFunnyIndex = -1;

function getRandomFunnyReply(): string {
  let index = Math.floor(Math.random() * FUNNY_INAPPROPRIATE_REPLIES.length);
  // Ensure the next funny deflection is never the same as the previous one
  while (index === lastFunnyIndex && FUNNY_INAPPROPRIATE_REPLIES.length > 1) {
    index = Math.floor(Math.random() * FUNNY_INAPPROPRIATE_REPLIES.length);
  }
  lastFunnyIndex = index;
  return FUNNY_INAPPROPRIATE_REPLIES[index];
}

// Fast detector for offensive, abusive, vulgar, flirtatious, or inappropriate queries
function isInappropriateMessage(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase().trim();

  const patterns = [
    /\b(fuck|fucking|fucker|shit|bitch|bastard|asshole|dick|pussy|cunt|slut|whore|nigger|nigga|faggot|retard)\b/i,
    /\b(porn|pornography|nude|nudes|naked|sex|sexy|hentai|erotic|boobs|penis|vagina|horny|dirty)\b/i,
    /\b(kill yourself|kys|suicide|murder|terrorist|terrorism|bomb|shoot up)\b/i,
    /\b(idiot|stupid|moron|dumbass|ugly|loser|shut up|hate you)\b/i,
    /\b(drugs|cocaine|heroin|meth|marijuana)\b/i,
    /\b(scam|hack|hacked|ddos|exploit|malware)\b/i,
    /\b(kiss me|marry me|date me|girlfriend|boyfriend|love me|strip|single)\b/i,
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

    // Instant funny and varied refusal for clearly inappropriate, offensive, or troll queries
    if (isInappropriateMessage(userMessage)) {
      const funnyReply = getRandomFunnyReply();
      return res.status(200).json({
        text: funnyReply,
        reply: funnyReply,
      });
    }

    const systemInstruction = `You are the AI representative and Dancing Cat mascot for Waqas Ali Khan's machine learning portfolio.

RULES FOR RESPONSES:
1. FOR NORMAL QUESTIONS ABOUT WAQAS (education, background, father, marks, MDCAT, university, AI projects, skills, contact):
   - Answer strictly TO THE POINT and answer EXACTLY what was asked.
   - NOT LESS, NOT MORE.
   - No greeting fluff, no conversational filler.
   - State the direct answer clearly and accurately.

2. FOR INAPPROPRIATE, OFFENSIVE, RUDE, VULGAR, WEIRD, FLIRTATIOUS, TROLLING, OR UNRELATED QUESTIONS:
   - CRITICAL REQUIREMENT: Answer in a FUNNY, WITTY, SARCASTIC, and PLAYFUL way stating clearly that you are NOT here for this!
   - Every single answer MUST BE DIFFERENT and unique every time! Never repeat the exact same joke or wording.
   - Mention humorously that you are a dancing AI cat / portfolio mascot here to showcase Waqas's machine learning projects, models, and education.
   - Keep it funny, punchy (1 to 2 short sentences), and entertaining!

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

EXAMPLES OF TO-THE-POINT NORMAL RESPONSES:
- "who is waqas father?" -> "Waqas Ali Khan's father is Nazir Muhammad."
- "where is he from?" -> "He is from Wahdat Maidan, Dir (Lower), Khyber Pakhtunkhwa, Pakistan."
- "matric marks?" -> "947 out of 1100 marks (A+ grade) from Hira School and Girls College Zaimdara, Dir Lower in 2022."
- "fsc marks?" -> "1092 out of 1200 marks (A+ grade) from Global Degree College Peshawar in 2024."
- "mdcat score?" -> "155 marks in MDCAT 2025."
- "what does he study and where?" -> "He studies Artificial Intelligence at the University of Peshawar (UOP)."
- "what is his email?" -> "alikhan520451waqas@gmail.com."
- "phone number?" -> "03299037442 (+92 329 9037442)."`;

    const getContextualFallback = (msg: string): string => {
      const lower = msg.toLowerCase();
      if (isInappropriateMessage(msg)) {
        return getRandomFunnyReply();
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
      if (lower.includes('university') || lower.includes('uop') || lower.includes('study') || lower.includes('degree') || /\bai\b/.test(lower) || lower.includes('artificial intelligence')) {
        return "He is a student of Artificial Intelligence at the University of Peshawar (UOP) and AI Club Lead at Core Computing Society.";
      }
      if (lower.includes('email') || lower.includes('mail')) {
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

    try {
      const result = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      responseText = result.text?.trim() || '';

      if (!responseText) {
        responseText = isInappropriateMessage(userMessage) ? getRandomFunnyReply() : getContextualFallback(userMessage);
      }
    } catch (err: any) {
      console.warn('Gemini model error, falling back...', err?.message);
      responseText = isInappropriateMessage(userMessage) ? getRandomFunnyReply() : getContextualFallback(userMessage);
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
