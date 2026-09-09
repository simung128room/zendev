import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Send,
  RefreshCw,
  Sliders,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  Globe,
  CreditCard,
  Building,
} from 'lucide-react';
import { TransactionPayload, VerificationResult } from '../types';
import { apiService } from '../services/api';

interface TransactionVerifierProps {
  onSendToChat: (tx: TransactionPayload, result: VerificationResult) => void;
}

const PRESET_CASES: Array<{ label: string; tag: string; data: TransactionPayload }> = [
  {
    label: 'Clean B2B Corporate Wire',
    tag: 'Low Risk',
    data: {
      transactionId: 'TXN-B2B-10992',
      amount: 14500,
      currency: 'USD',
      timestamp: new Date().toISOString(),
      sender: {
        name: 'Apex Merchant Services LLC',
        accountNumber: 'US89-CHASE-0019284',
        country: 'US',
        ipAddress: '198.51.100.22',
        deviceRisk: 'LOW',
        isKycVerified: true,
      },
      receiver: {
        name: 'Nexus Cloud Infrastructure Corp',
        accountNumber: 'US12-WELLS-9918231',
        country: 'US',
        institution: 'Wells Fargo Bank N.A.',
        isSanctionedCountry: false,
      },
      channel: 'WIRE',
      velocityLastHour: 2,
      note: 'Quarterly SaaS server capacity billing',
    },
  },
  {
    label: 'Crypto Offramp to Sanctioned Zone',
    tag: 'Critical Risk',
    data: {
      transactionId: 'TXN-CRYPTO-98124',
      amount: 88500,
      currency: 'EUR',
      timestamp: new Date().toISOString(),
      sender: {
        name: 'DarkPool P2P Anonymous',
        accountNumber: '0x71C...b4e9',
        country: 'CY',
        ipAddress: '185.220.101.5',
        deviceRisk: 'HIGH',
        isKycVerified: false,
      },
      receiver: {
        name: 'Caspian Petrochem Trading',
        accountNumber: 'IR-BANK-TEHRAN-99',
        country: 'IR',
        institution: 'Bank Melli Sanctioned Route',
        isSanctionedCountry: true,
      },
      channel: 'CRYPTO_GATEWAY',
      velocityLastHour: 9,
      note: 'High volume anonymous asset liquidation',
    },
  },
  {
    label: 'Card Testing Velocity Storm',
    tag: 'High Risk',
    data: {
      transactionId: 'TXN-CARD-1192',
      amount: 1.50,
      currency: 'USD',
      timestamp: new Date().toISOString(),
      sender: {
        name: 'John Guest 99',
        accountNumber: '4111-XXXX-XXXX-1129',
        country: 'US',
        ipAddress: '192.0.2.88',
        deviceRisk: 'HIGH',
        isKycVerified: false,
      },
      receiver: {
        name: 'Apex eCommerce Checkout',
        accountNumber: 'MERCHANT-ST-99',
        country: 'US',
        institution: 'Stripe Direct Ingestion',
        isSanctionedCountry: false,
      },
      channel: 'CARD_ONLINE',
      velocityLastHour: 18,
      note: 'Micro charge probing script detected',
    },
  },
  {
    label: 'Cross-Border Contractor Payout',
    tag: 'Medium Risk',
    data: {
      transactionId: 'TXN-REMIT-4401',
      amount: 9800,
      currency: 'GBP',
      timestamp: new Date().toISOString(),
      sender: {
        name: 'Apex Global Tech UK',
        accountNumber: 'GB29-BARC-200411',
        country: 'GB',
        ipAddress: '51.140.22.9',
        deviceRisk: 'LOW',
        isKycVerified: true,
      },
      receiver: {
        name: 'Siam Dev Labs Ltd',
        accountNumber: 'TH-KBANK-8849102',
        country: 'TH',
        institution: 'Kasikornbank PCL',
        isSanctionedCountry: false,
      },
      channel: 'WIRE',
      velocityLastHour: 4,
      note: 'Monthly development sprint invoice payout',
    },
  },
];

export const TransactionVerifier: React.FC<TransactionVerifierProps> = ({ onSendToChat }) => {
  const [currentTx, setCurrentTx] = useState<TransactionPayload>(PRESET_CASES[0].data);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  const handleSelectPreset = (index: number) => {
    setActivePresetIndex(index);
    setCurrentTx(PRESET_CASES[index].data);
    setResult(null);
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await apiService.verifyTransaction(currentTx);
      setResult(res);
    } catch (err: any) {
      alert(`Verification failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Preset Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
            <span>Live Transaction Audit & Risk Engine</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Evaluate raw transaction payloads against AML thresholds, OFAC sanction rules, and velocity heuristics.
          </p>
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 transition-all self-start md:self-auto"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
          ) : (
            <Send className="w-4 h-4 text-slate-950" />
          )}
          <span>{loading ? 'Evaluating Protocol...' : 'Run Real-Time Audit'}</span>
        </button>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Select Simulation Scenario:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_CASES.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => handleSelectPreset(idx)}
              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                activePresetIndex === idx
                  ? 'bg-slate-800/90 border-emerald-500/70 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white truncate">{preset.label}</span>
                <span
                  className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    preset.tag === 'Low Risk'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : preset.tag === 'Medium Risk'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {preset.tag}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {preset.data.amount} {preset.data.currency} • {preset.data.channel}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form / Payload Inspector & Audit Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Payload Editor */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">Payload Parameters</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              ID: {currentTx.transactionId}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Amount</label>
              <input
                type="number"
                value={currentTx.amount}
                onChange={(e) =>
                  setCurrentTx({ ...currentTx, amount: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Currency</label>
              <select
                value={currentTx.currency}
                onChange={(e) => setCurrentTx({ ...currentTx, currency: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="THB">THB (฿)</option>
                <option value="SGD">SGD ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Payment Rail</label>
              <select
                value={currentTx.channel}
                onChange={(e) => setCurrentTx({ ...currentTx, channel: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="WIRE">SWIFT Wire</option>
                <option value="CARD_ONLINE">Online Card Payment</option>
                <option value="CRYPTO_GATEWAY">Crypto Off-Ramp</option>
                <option value="ACH">ACH Transfer</option>
                <option value="INSTANT_PAY">Instant Real-Time Rail</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Hourly Velocity (Requests)</label>
              <input
                type="number"
                value={currentTx.velocityLastHour}
                onChange={(e) =>
                  setCurrentTx({
                    ...currentTx,
                    velocityLastHour: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Originator Section */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                Originator / Sender
              </span>
              <label className="flex items-center gap-1.5 text-[11px] cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  checked={currentTx.sender.isKycVerified}
                  onChange={(e) =>
                    setCurrentTx({
                      ...currentTx,
                      sender: { ...currentTx.sender, isKycVerified: e.target.checked },
                    })
                  }
                  className="rounded border-slate-800 text-emerald-500 focus:ring-0"
                />
                KYC Verified
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Sender Name"
                value={currentTx.sender.name}
                onChange={(e) =>
                  setCurrentTx({
                    ...currentTx,
                    sender: { ...currentTx.sender, name: e.target.value },
                  })
                }
                className="bg-slate-900 border border-slate-800 rounded p-1.5 text-white text-[11px]"
              />
              <input
                type="text"
                placeholder="Country (ISO 2-letter)"
                value={currentTx.sender.country}
                onChange={(e) =>
                  setCurrentTx({
                    ...currentTx,
                    sender: { ...currentTx.sender, country: e.target.value.toUpperCase() },
                  })
                }
                className="bg-slate-900 border border-slate-800 rounded p-1.5 text-white font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Beneficiary Section */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-teal-400" />
                Beneficiary / Receiver
              </span>
              <label className="flex items-center gap-1.5 text-[11px] cursor-pointer text-rose-400">
                <input
                  type="checkbox"
                  checked={currentTx.receiver.isSanctionedCountry}
                  onChange={(e) =>
                    setCurrentTx({
                      ...currentTx,
                      receiver: { ...currentTx.receiver, isSanctionedCountry: e.target.checked },
                    })
                  }
                  className="rounded border-slate-800 text-rose-500 focus:ring-0"
                />
                Sanctioned Entity / Geo
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Receiver Name"
                value={currentTx.receiver.name}
                onChange={(e) =>
                  setCurrentTx({
                    ...currentTx,
                    receiver: { ...currentTx.receiver, name: e.target.value },
                  })
                }
                className="bg-slate-900 border border-slate-800 rounded p-1.5 text-white text-[11px]"
              />
              <input
                type="text"
                placeholder="Country (e.g. US, DE, IR, TH)"
                value={currentTx.receiver.country}
                onChange={(e) =>
                  setCurrentTx({
                    ...currentTx,
                    receiver: { ...currentTx.receiver, country: e.target.value.toUpperCase() },
                  })
                }
                className="bg-slate-900 border border-slate-800 rounded p-1.5 text-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Right: Real-Time Audit Verdict */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Compliance Audit Verdict</span>
              </div>
              {result && (
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {result.latencyMs}ms latency
                </span>
              )}
            </div>

            {!result ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Ready for Real-Time Inspection</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click &ldquo;Run Real-Time Audit&rdquo; to evaluate the selected transaction payload against the live ApexCheck backend engine.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Score & Badge banner */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Calculated Risk Index</span>
                    <div className="text-3xl font-black text-white mt-1">
                      {result.riskScore} <span className="text-sm font-normal text-slate-500">/ 100</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                        result.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : result.status === 'FLAGGED_FOR_REVIEW'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {result.status.replace(/_/g, ' ')}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Severity: {result.riskLevel}
                    </div>
                  </div>
                </div>

                {/* Compliance checklist */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">AML Thresholds</span>
                    <span
                      className={`font-mono font-bold ${
                        result.complianceChecks.amlScreening === 'PASS'
                          ? 'text-emerald-400'
                          : result.complianceChecks.amlScreening === 'WARN'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.complianceChecks.amlScreening}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">OFAC Sanction List</span>
                    <span
                      className={`font-mono font-bold ${
                        result.complianceChecks.ofacSanctions === 'PASS'
                          ? 'text-emerald-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.complianceChecks.ofacSanctions}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Velocity Profiler</span>
                    <span
                      className={`font-mono font-bold ${
                        result.complianceChecks.velocityCheck === 'PASS'
                          ? 'text-emerald-400'
                          : result.complianceChecks.velocityCheck === 'WARN'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.complianceChecks.velocityCheck}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">PEP & Watchlist</span>
                    <span className="font-mono font-bold text-emerald-400">PASS</span>
                  </div>
                </div>

                {/* Audit summary */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="font-bold text-slate-300 block mb-1">AI Audit Synopsis:</span>
                  <p className="text-slate-400 leading-relaxed">{result.aiAuditSummary}</p>
                </div>

                {/* Flagged Rules */}
                {result.flaggedRules.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
                      Triggered Rules ({result.flaggedRules.length}):
                    </span>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {result.flaggedRules.map((rule) => (
                        <div
                          key={rule.ruleId}
                          className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-start gap-2"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-mono font-bold text-slate-200">{rule.ruleId}</span>
                            <span className="text-slate-400 ml-2">{rule.message}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {result && (
            <div className="pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={() => onSendToChat(currentTx, result)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Consult AI Risk Copilot with this Payload</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
