import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  User, 
  Cpu, 
  Zap, 
  Brain,
  MessageSquare,
  Check,
  Copy
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview'>('gemini-3.5-flash');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hello! I am Waqas Ali Khan's interactive AI assistant. Ask me anything about Waqas's machine learning models, technical stack, leadership as AI Club Lead at Core Computing Society, or his studies at University of Peshawar. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const promptSuggestions = [
    "Tell me about the Multiple Linear Regression project",
    "How does the ad-spend saturation model work?",
    "What is Waqas's role at Core Computing Society?",
    "How do I reach Waqas for an internship?"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      // Prepare conversation payload for server API
      const conversationHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          model: selectedModel,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const modelReply = data.reply || "I apologize, but I could not formulate a reply at this moment.";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: modelReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Chat request error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `I'm having a brief connection delay. Waqas Ali Khan is an AI undergraduate at University of Peshawar and AI Club Lead at Core Computing Society. You can reach him directly at ${PERSONAL_INFO.email} or call ${PERSONAL_INFO.phoneFormatted}!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'reset-' + Date.now(),
        role: 'model',
        content: "Conversation history cleared. Ask me any question about Waqas Ali Khan's AI development journey!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 bg-[#0E1017] hover:bg-[#161824] border border-white/20 rounded-full shadow-2xl text-white transition-all active:scale-95"
          aria-label="Open AI Portfolio Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="font-display text-xs font-semibold tracking-wide">
            Chat with Waqas AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-[#090A0F] border border-white/[0.12] shadow-2xl overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-10 rounded-2xl'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] h-[580px] max-h-[85vh] rounded-2xl'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#0D0F18] border-b border-white/[0.08] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-zinc-800 border border-white/10 text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xs font-bold text-white tracking-tight">
                    Waqas AI Assistant
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  UOP · Core Computing Society
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-zinc-400">
              <button
                onClick={clearHistory}
                title="Clear Conversation"
                className="p-1.5 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Collapse" : "Expand"}
                className="hidden sm:inline-flex p-1.5 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Model Switcher Bar */}
          <div className="px-4 py-2 bg-[#0A0C12] border-b border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-400 shrink-0">
            <span className="text-zinc-500">Gemini Engine:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedModel('gemini-3.5-flash')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  selectedModel === 'gemini-3.5-flash'
                    ? 'bg-zinc-800 text-white border border-white/10'
                    : 'hover:text-zinc-200'
                }`}
              >
                3.5-flash (General)
              </button>
              <button
                onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  selectedModel === 'gemini-3.1-flash-lite'
                    ? 'bg-zinc-800 text-white border border-white/10'
                    : 'hover:text-zinc-200'
                }`}
              >
                3.1-lite (Fast)
              </button>
              <button
                onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  selectedModel === 'gemini-3.1-pro-preview'
                    ? 'bg-zinc-800 text-white border border-white/10'
                    : 'hover:text-zinc-200'
                }`}
              >
                3.1-pro (STEM)
              </button>
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-6 h-6 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed space-y-1 relative group ${
                    msg.role === 'user'
                      ? 'bg-zinc-100 text-zinc-950 font-medium'
                      : 'bg-[#12141F] text-zinc-200 border border-white/[0.07]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  
                  <div className="flex items-center justify-between gap-3 pt-1 text-[10px] opacity-70 font-mono">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => copyMessage(msg.id, msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
                      title="Copy text"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-zinc-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start items-center text-xs text-zinc-400 font-mono">
                <div className="w-6 h-6 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3 bg-[#12141F] rounded-xl border border-white/[0.07] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse [animation-delay:200ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse [animation-delay:400ms]" />
                  <span className="text-[11px] text-zinc-500 ml-1">Analyzing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          {messages.length <= 3 && (
            <div className="px-4 py-2 bg-[#090A0F] border-t border-white/[0.04] flex items-center gap-2 overflow-x-auto no-scrollbar">
              {promptSuggestions.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-white bg-[#10121A] hover:bg-zinc-800 border border-white/[0.06] rounded-md whitespace-nowrap shrink-0 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="p-3 bg-[#0D0F18] border-t border-white/[0.08] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Waqas's models, skills, or studies..."
                disabled={loading}
                className="flex-1 px-3.5 py-2 bg-black/50 border border-white/[0.08] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="p-2 bg-white hover:bg-zinc-200 text-zinc-950 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
