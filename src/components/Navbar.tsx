import React from 'react';
import { ShieldCheck, Activity, Terminal, MessageSquareCode, Cpu, Layers } from 'lucide-react';
import { SessionInfo } from '../types';

interface NavbarProps {
  activeTab: 'landing' | 'verify' | 'chat' | 'sandbox' | 'deploy';
  setActiveTab: (tab: 'landing' | 'verify' | 'chat' | 'sandbox' | 'deploy') => void;
  session: SessionInfo | null;
  serverStatus: 'connected' | 'checking' | 'offline';
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  session,
  serverStatus,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActiveTab('landing')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                ApexCheck
              </span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Fintech SaaS
              </span>
            </div>
            <p className="text-xs text-slate-400">Risk & Verification Intelligence</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          <button
            id="nav-tab-landing"
            onClick={() => setActiveTab('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'landing'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            id="nav-tab-verify"
            onClick={() => setActiveTab('verify')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'verify'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Live Verification</span>
          </button>

          <button
            id="nav-tab-chat"
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'chat'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>AI Risk Copilot</span>
          </button>

          <button
            id="nav-tab-sandbox"
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'sandbox'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Rules Sandbox</span>
          </button>

          <button
            id="nav-tab-deploy"
            onClick={() => setActiveTab('deploy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'deploy'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Deploy</span>
          </button>
        </nav>

        {/* Right Info & Session status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80">
            <span
              className={`w-2 h-2 rounded-full ${
                serverStatus === 'connected'
                  ? 'bg-emerald-400 animate-pulse'
                  : serverStatus === 'checking'
                  ? 'bg-amber-400'
                  : 'bg-rose-500'
              }`}
            />
            <span className="text-slate-300 font-mono text-[11px]">
              {serverStatus === 'connected' ? 'API 200 OK' : serverStatus}
            </span>
          </div>

          {session && (
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[10px] text-slate-400 font-mono">
                {session.sessionId.slice(0, 14)}...
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                Quota: {session.quota.remaining}/{session.quota.total}
              </span>
            </div>
          )}

          <button
            onClick={() => setActiveTab('verify')}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/10 transition-all"
          >
            Run Scan
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-2 bg-slate-950/80 text-[11px] overflow-x-auto">
        <button
          onClick={() => setActiveTab('landing')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'landing' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('verify')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'verify' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          Verify
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'chat' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          AI Copilot
        </button>
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'sandbox' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          Sandbox
        </button>
        <button
          onClick={() => setActiveTab('deploy')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'deploy' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          Deploy
        </button>
      </div>
    </header>
  );
};
