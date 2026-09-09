import React, { useState } from 'react';
import {
  ShieldAlert,
  Zap,
  ArrowRight,
  TrendingUp,
  Cpu,
  Lock,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  Play,
} from 'lucide-react';
import { apiService } from '../services/api';
import { VerificationResult } from '../types';

interface HeroLandingProps {
  onStartDemo: () => void;
  onOpenSandbox: () => void;
  onOpenDeployDocs: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartDemo,
  onOpenSandbox,
  onOpenDeployDocs,
}) => {
  const [quickAmount, setQuickAmount] = useState('14500');
  const [quickCountry, setQuickCountry] = useState('US');
  const [quickChannel, setQuickChannel] = useState<'WIRE' | 'CRYPTO_GATEWAY' | 'CARD_ONLINE'>('WIRE');
  const [quickResult, setQuickResult] = useState<VerificationResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleQuickScan = async () => {
    setIsScanning(true);
    try {
      const res = await apiService.verifyTransaction({
        transactionId: 'QUICK-DEMO-' + Math.floor(1000 + Math.random() * 9000),
        amount: parseFloat(quickAmount) || 1000,
        currency: 'USD',
        timestamp: new Date().toISOString(),
        sender: {
          name: 'Apex Merchant Services LLC',
          accountNumber: 'ACCT-8829-9912',
          country: 'US',
          ipAddress: '198.51.100.44',
          deviceRisk: 'LOW',
          isKycVerified: true,
        },
        receiver: {
          name: 'Global Ventures Ltd',
          accountNumber: 'BENEF-901-229',
          country: quickCountry,
          institution: 'ClearBank International',
          isSanctionedCountry: ['IR', 'KP', 'SY', 'RU'].includes(quickCountry),
        },
        channel: quickChannel,
        velocityLastHour: 2,
      });
      setQuickResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Zero-Latency Financial Security Layer • v2.4</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Stop Payment Fraud <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Before Settlement.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                ApexCheck delivers intelligent transaction screening, AML velocity detection, and an AI-driven compliance co-pilot with programmable JavaScript policy rules.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  id="btn-hero-launch-engine"
                  onClick={onStartDemo}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:opacity-95 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Launch Live Verification Engine</span>
                </button>

                <button
                  id="btn-hero-deploy-docs"
                  onClick={onOpenDeployDocs}
                  className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-all"
                >
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Architecture & Deployment Hub</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-black text-white">&lt; 38ms</div>
                  <div className="text-xs text-slate-400">P99 API Latency</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">99.99%</div>
                  <div className="text-xs text-slate-400">Verification SLA</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">$1.8B+</div>
                  <div className="text-xs text-slate-400">Monthly Volume Audited</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Quick Scanner Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wide">
                      Live Transaction Radar
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                    /api/verify-transaction
                  </span>
                </div>

                {/* Form fields */}
                <div className="space-y-4 pt-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Transaction Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
                      <input
                        type="number"
                        value={quickAmount}
                        onChange={(e) => setQuickAmount(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-7 pr-3 text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Destination Country</label>
                      <select
                        value={quickCountry}
                        onChange={(e) => setQuickCountry(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="US">United States (US)</option>
                        <option value="GB">United Kingdom (GB)</option>
                        <option value="DE">Germany (DE)</option>
                        <option value="SG">Singapore (SG)</option>
                        <option value="RU">High-Risk Watchlist (RU)</option>
                        <option value="IR">OFAC Sanctioned (IR)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Payment Rail</label>
                      <select
                        value={quickChannel}
                        onChange={(e) => setQuickChannel(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="WIRE">SWIFT / Wire</option>
                        <option value="CARD_ONLINE">Online Credit Card</option>
                        <option value="CRYPTO_GATEWAY">Crypto Off-Ramp</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleQuickScan}
                    disabled={isScanning}
                    className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10"
                  >
                    {isScanning ? (
                      <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ShieldAlert className="w-4 h-4" />
                    )}
                    <span>{isScanning ? 'Auditing Payload...' : 'Instant Risk Screening'}</span>
                  </button>
                </div>

                {/* Scan Result Output */}
                {quickResult && (
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-mono">Risk Assessment</span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                          quickResult.status === 'APPROVED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : quickResult.status === 'FLAGGED_FOR_REVIEW'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {quickResult.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-500">Risk Score:</span>
                      <span className="font-bold text-white text-sm">{quickResult.riskScore} / 100</span>
                    </div>

                    <p className="text-[11px] text-slate-300 border-t border-slate-800/80 pt-2 leading-relaxed">
                      {quickResult.aiAuditSummary}
                    </p>

                    {quickResult.flaggedRules.length > 0 && (
                      <div className="pt-1">
                        <div className="text-[10px] text-amber-400 font-semibold mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Flagged Security Triggers:</span>
                        </div>
                        <ul className="text-[10px] text-slate-400 list-disc list-inside space-y-0.5">
                          {quickResult.flaggedRules.map((rule) => (
                            <li key={rule.ruleId}>
                              <span className="font-mono text-slate-300">{rule.ruleId}</span>: {rule.message}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Built for High-Growth Fintechs & Neobanks
          </h2>
          <p className="text-slate-400 text-sm">
            Everything your risk team and developers need to automate compliance and protect revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Real-Time AML & Velocity Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detect structuring, card-testing loops, and anomalous spikes across accounts. Built-in OFAC SDN and global sanction registry checks.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <span>Sub-40ms execution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Financial Auditor Copilot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep compliance analysis powered by Google Gemini. Instantly summarize edge cases, generate SAR filings, and parse cross-border regulatory nuances.
            </p>
            <div className="pt-2 text-xs font-semibold text-cyan-400 flex items-center gap-1">
              <span>Server-side Gemini 3.8</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Programmable Rule Sandbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Write, debug, and simulate custom fraud rules in JavaScript via our <code className="text-emerald-400">/api/run-code</code> sandbox without deploying fresh code.
            </p>
            <div className="pt-2 text-xs font-semibold text-teal-400 flex items-center gap-1" onClick={onOpenSandbox}>
              <span>Try interactive sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-16">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <h2 className="text-2xl font-bold text-white">Transparent SaaS Pricing</h2>
          <p className="text-xs text-slate-400">Scale from early-stage fintech MVP to enterprise volume.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div>
              <h4 className="font-bold text-white text-base">Developer / MVP</h4>
              <p className="text-xs text-slate-400">For testing and seed stage startups</p>
            </div>
            <div className="text-3xl font-black text-white">$0 <span className="text-xs font-normal text-slate-400">/mo (Sandbox free)</span></div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10,000 checks / month
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard AML & OFAC screening
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Gemini AI Copilot (100 req/day)
              </li>
            </ul>
          </div>

          {/* Growth */}
          <div className="rounded-2xl bg-slate-900 border-2 border-emerald-500/60 p-6 space-y-4 relative shadow-xl shadow-emerald-500/5">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950">
              Most Popular
            </span>
            <div>
              <h4 className="font-bold text-white text-base">Fintech Scale</h4>
              <p className="text-xs text-slate-400">For scaling payment aggregators & SaaS</p>
            </div>
            <div className="text-3xl font-black text-white">$249 <span className="text-xs font-normal text-slate-400">/mo</span></div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 250,000 checks / month
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom Rules Engine & Sandbox
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated Android APK & Webhooks
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Gemini 3.8 Flash audits
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div>
              <h4 className="font-bold text-white text-base">Bank / Enterprise</h4>
              <p className="text-xs text-slate-400">For tier-1 financial institutions</p>
            </div>
            <div className="text-3xl font-black text-white">Custom</div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-million volume tier
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> On-prem or dedicated Cloud Run cluster
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom ML scoring models & SLA
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
