import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  RefreshCw,
  Trash2,
  Shield,
  Clock,
  Terminal,
  FileText,
} from 'lucide-react';
import { ChatMessage, TransactionPayload, VerificationResult } from '../types';
import { apiService } from '../services/api';

interface AiAuditorChatProps {
  initialContext?: {
    tx: TransactionPayload;
    result: VerificationResult;
  } | null;
}

const QUICK_PROMPTS = [
  'Audit an anomalous wire transfer of $89,200 to a sanctioned jurisdiction',
  'How to configure AML compliance rules for cross-border SaaS payouts?',
  'Explain PSD2 Strong Customer Authentication (SCA) exemptions for low-risk transactions',
  'What fraud detection rules should I deploy against card-testing velocity storms?',
];

export const AiAuditorChat: React.FC<AiAuditorChatProps> = ({ initialContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### 👋 Welcome to ApexCheck AI Financial Copilot

I am your dedicated **Risk & Compliance Intelligence Officer**. I can assist you with:
- **AML & Sanction Audits**: OFAC, FATF 40, PEP matching, and SAR filing advice.
- **Card Fraud Prevention**: Velocity modeling, carding defense, 3D-Secure 2.0.
- **Platform Architecture**: Vercel Serverless vs. Render vs. Mobile APK deployment.

*Ask any financial risk question or choose a prompt below to get started!*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      meta: { model: 'gemini-3.8-flash', latencyMs: 25 },
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeContext, setActiveContext] = useState<any>(initialContext || null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext) {
      setActiveContext(initialContext);
      setInput(`Can you provide an in-depth audit breakdown and risk mitigation plan for transaction ${initialContext.tx.transactionId} (${initialContext.tx.amount} ${initialContext.tx.currency})?`);
    }
  }, [initialContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await apiService.sendChatMessage({
        message: query,
        context: activeContext ? JSON.stringify(activeContext) : undefined,
        history,
      });

      const assistantMsg: ChatMessage = {
        id: 'msg_ai_' + Date.now(),
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        meta: {
          model: res.model,
          latencyMs: res.latencyMs,
        },
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          role: 'assistant',
          content: `⚠️ **Audit Error**: Unable to complete analysis. Detail: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Session refreshed. How can I assist your compliance or fraud auditing workflow?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setActiveContext(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/10">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>AI Financial & Compliance Copilot</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                gemini-3.8-flash
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Zero-exposure server-side reasoning for fraud, AML, and fintech architecture audits
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeContext && (
            <span className="hidden sm:inline-flex text-[11px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-1 rounded-lg items-center gap-1 font-mono">
              <FileText className="w-3 h-3" />
              Attached Tx Payload
            </span>
          )}
          <button
            onClick={clearChat}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs flex items-center gap-1"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl h-[520px] flex flex-col justify-between overflow-hidden shadow-xl">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-600/10'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                }`}
              >
                {/* Render formatted markdown-like text */}
                <div className="whitespace-pre-wrap font-sans text-xs space-y-1">
                  {msg.content}
                </div>

                <div
                  className={`flex items-center justify-between text-[10px] pt-1 font-mono ${
                    msg.role === 'user' ? 'text-emerald-200' : 'text-slate-500'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.meta && (
                    <span className="flex items-center gap-1 ml-3">
                      <Clock className="w-2.5 h-2.5" />
                      {msg.meta.latencyMs}ms • {msg.meta.model}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-bl-none p-4 text-xs text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>Auditing with Gemini financial model...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800/80">
          <div className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wide">
            Suggested Prompts:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AML requirements, fraud velocity rules, or transaction audit..."
              disabled={loading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/10"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
