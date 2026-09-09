import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  Server,
  Smartphone,
  Globe2,
  Terminal,
  Activity,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { apiService } from '../services/api';

export const DeploymentHub: React.FC = () => {
  const [method, setMethod] = useState<'methodA' | 'methodB'>('methodA');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [apiPingResult, setApiPingResult] = useState<any>(null);
  const [isPinging, setIsPinging] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestApi = async () => {
    setIsPinging(true);
    try {
      const startTime = performance.now();
      const [sessionRes, healthRes] = await Promise.all([
        apiService.initSession('web'),
        apiService.getHealth(),
      ]);
      const latency = Math.round(performance.now() - startTime);
      setApiPingResult({
        ok: true,
        latencyMs: latency,
        sessionRes,
        healthRes,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (e: any) {
      setApiPingResult({
        ok: false,
        error: e.message,
        timestamp: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsPinging(false);
    }
  };

  const vercelJsonCode = `{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}`;

  const serverExportCode = `// In server.ts:
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(\`Server running on port \${PORT}\`);
  });
}

export default app;`;

  const apkBuildCode = `# 1. Configure Frontend API URL in .env.production
VITE_API_BASE_URL=https://dev-api.apexcheck.space

# 2. Build Frontend
npm run build

# 3. Synchronize Capacitor assets
npx cap sync android

# 4. Compile Android APK in release/debug
cd android
./gradlew assembleDebug --no-daemon`;

  const envBackendCode = `# Backend Production Environment Variables
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
XKIRO_API_KEY=YOUR_XKIRO_KEY
UNOROUTER_API_KEY=YOUR_UNOROUTER_KEY

NODE_ENV=production
APP_URL=https://dev-api.apexcheck.space
ALLOWED_ORIGINS=https://apexcheck.space,https://localhost
TRUST_PROXY_HOPS=1`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture Blueprint & Production Guide</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            ApexCheck Full-Stack Topology & Deployment
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Complete architectural implementation for ApexCheck Fintech SaaS, supporting unified domain, decoupled microservices, and mobile APK builds.
          </p>
        </div>

        <button
          onClick={handleTestApi}
          disabled={isPinging}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <Activity className={`w-4 h-4 ${isPinging ? 'animate-spin' : ''}`} />
          <span>{isPinging ? 'Pinging /api/* ...' : 'Ping Live API Endpoints'}</span>
        </button>
      </div>

      {/* Live Ping Status Result Card */}
      {apiPingResult && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Live API Health Check
            </span>
            <span className="font-mono text-slate-400 text-[11px]">
              Response in {apiPingResult.latencyMs}ms at {apiPingResult.timestamp}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block mb-1 font-bold text-emerald-400">
                POST /api/init-session:
              </span>
              <pre className="text-slate-300 overflow-x-auto">
                {JSON.stringify(apiPingResult.sessionRes, null, 2)}
              </pre>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block mb-1 font-bold text-teal-400">
                GET /api/health:
              </span>
              <pre className="text-slate-300 overflow-x-auto">
                {JSON.stringify(apiPingResult.healthRes, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Visual Topology */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>System Flow Diagram</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {/* Node 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-2">
            <Smartphone className="w-8 h-8 text-emerald-400" />
            <span className="font-bold text-xs text-white">Client / End User</span>
            <span className="text-[11px] text-slate-400">Browser / Android APK</span>
          </div>

          {/* Node 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-2 relative">
            <Globe2 className="w-8 h-8 text-teal-400" />
            <span className="font-bold text-xs text-white">Landing & UI</span>
            <span className="text-[11px] text-slate-400">React 19 + Vite (Vercel)</span>
          </div>

          {/* Node 3 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-2">
            <Server className="w-8 h-8 text-cyan-400" />
            <span className="font-bold text-xs text-white">Backend Express</span>
            <span className="text-[11px] text-slate-400">/api/init-session, /api/chat</span>
          </div>

          {/* Node 4 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
            <span className="font-bold text-xs text-white">AI & Rules Engine</span>
            <span className="text-[11px] text-slate-400">Gemini 3.8 / xKiro / UnoRouter</span>
          </div>
        </div>
      </div>

      {/* Method Switcher */}
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="inline-flex bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setMethod('methodA')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                method === 'methodA'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Option A: Unified Domain (Recommended for Simplicity)
            </button>
            <button
              onClick={() => setMethod('methodB')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                method === 'methodB'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Option B: Decoupled Backend (Render/Railway + APK)
            </button>
          </div>
        </div>

        {method === 'methodA' ? (
          /* Option A Content */
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Option A: Single Domain Structure (Zero-CORS Setup)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Frontend and API live under the same origin. No CORS configuration or <code className="text-emerald-400">VITE_API_BASE_URL</code> required.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                  apexcheck.space
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-bold mb-1">Frontend UI Route:</div>
                  <div className="text-emerald-400 font-bold">https://apexcheck.space/</div>
                  <div className="text-slate-500 text-[11px] mt-1">Serves React single-page app static assets</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-bold mb-1">Backend API Route:</div>
                  <div className="text-cyan-400 font-bold">https://apexcheck.space/api/*</div>
                  <div className="text-slate-500 text-[11px] mt-1">Handled directly without cross-origin preflight</div>
                </div>
              </div>

              {/* Vercel.json code block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-bold">vercel.json (For Vercel Monorepo Serverless)</span>
                  <button
                    onClick={() => copyToClipboard(vercelJsonCode, 'vercelJson')}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'vercelJson' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'vercelJson' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                  {vercelJsonCode}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          /* Option B Content */
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Option B: Decoupled Architecture (Dedicated Backend & APK)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Frontend deployed on Vercel Edge, Express server running on Render or Railway, and Mobile APK pointing to the dedicated API host.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-lg">
                  dev-api.apexcheck.space
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-bold mb-1">Landing / Web Dashboard:</div>
                  <div className="text-emerald-400 font-bold">https://apexcheck.space</div>
                  <div className="text-slate-500 text-[11px] mt-1">Preset: Vite / Next static output</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-bold mb-1">Dedicated Express Container:</div>
                  <div className="text-cyan-400 font-bold">https://dev-api.apexcheck.space</div>
                  <div className="text-slate-500 text-[11px] mt-1">Render, Railway, or Google Cloud Run</div>
                </div>
              </div>

              {/* Backend Environment Variables */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-bold">Backend Production .env (Render/Railway)</span>
                  <button
                    onClick={() => copyToClipboard(envBackendCode, 'envBackend')}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'envBackend' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'envBackend' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                  {envBackendCode}
                </pre>
              </div>

              {/* APK Compilation Script */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-bold">Android APK Compilation Commands</span>
                  <button
                    onClick={() => copyToClipboard(apkBuildCode, 'apkBuild')}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'apkBuild' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'apkBuild' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                  {apkBuildCode}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DNS Configuration Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <h4 className="font-bold text-white text-sm">Recommended DNS Records</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Host / Name</th>
                <th className="py-2 px-3">Value / Target</th>
                <th className="py-2 px-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 px-3 text-emerald-400 font-bold">CNAME</td>
                <td className="py-2 px-3 font-bold text-white">@ / www</td>
                <td className="py-2 px-3">cname.vercel-dns.com</td>
                <td className="py-2 px-3 text-slate-400">Landing Page (Vercel)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-cyan-400 font-bold">CNAME</td>
                <td className="py-2 px-3 font-bold text-white">dev-api</td>
                <td className="py-2 px-3">your-backend.onrender.com</td>
                <td className="py-2 px-3 text-slate-400">Express API (Render/Railway)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
