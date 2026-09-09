import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, AlertCircle, CheckCircle2, Code2, ShieldAlert } from 'lucide-react';
import { apiService } from '../services/api';
import { CodeRunResponse, TransactionPayload } from '../types';

const PRELOADED_RULES: Record<string, { name: string; description: string; code: string }> = {
  velocity: {
    name: 'Velocity & Rapid Transaction Shield',
    description: 'Detect rapid bursts of payments originating from the same account within a 1-hour window',
    code: `// Rule: Velocity & Rapid Burst Mitigation
const velocity = transaction.velocityLastHour || 0;
const amount = transaction.amount || 0;

console.log('Evaluating transaction ID:', transaction.transactionId);
console.log('Hourly velocity observed:', velocity);

const triggers = [];
let riskScore = 5;

// High-frequency burst threshold
if (velocity > 12) {
  triggers.push('TRIGGER_VELOCITY_CRITICAL_SPIKE');
  riskScore += 60;
  console.warn('Velocity exceeded safety limit of 12/hr!');
} else if (velocity > 5) {
  triggers.push('TRIGGER_VELOCITY_ELEVATED');
  riskScore += 25;
}

// Rapid micro-transaction carding test pattern
if (velocity > 8 && amount < 5) {
  triggers.push('TRIGGER_CARD_PROBING_ATTACK');
  riskScore += 45;
  console.error('Probable automated card-testing bot detected');
}

const decision = riskScore >= 70 ? 'BLOCK' : riskScore >= 35 ? 'FLAG' : 'ALLOW';

return {
  decision,
  riskScore,
  triggers,
};`,
  },

  sanction: {
    name: 'High-Risk Geo & OFAC Screening',
    description: 'Cross-reference beneficiary countries with global watchlists and sanction registries',
    code: `// Rule: High-Risk Sanctions & Country Check
const receiverCountry = transaction.receiver?.country || '';
const isSanctioned = transaction.receiver?.isSanctionedCountry;
const amount = transaction.amount || 0;

console.log('Screening beneficiary jurisdiction:', receiverCountry);

const triggers = [];
let riskScore = 10;

const sanctionedList = ['IR', 'KP', 'SY', 'CU', 'RU'];

if (isSanctioned || sanctionedList.includes(receiverCountry)) {
  triggers.push('SANCTION_OFAC_COUNTRY_MATCH');
  riskScore = 98;
  console.error('Direct match with OFAC sanctioned jurisdiction!');
  return {
    decision: 'BLOCK',
    riskScore,
    triggers,
  };
}

if (amount >= 10000) {
  triggers.push('AML_CTR_REPORTING_THRESHOLD');
  riskScore += 20;
  console.log('Transaction reaches $10k reporting limit');
}

return {
  decision: riskScore >= 60 ? 'FLAG' : 'ALLOW',
  riskScore,
  triggers,
};`,
  },

  kyc: {
    name: 'KYC & Channel Risk Tiering',
    description: 'Enforce step-up verification for unverified crypto off-ramps or large wires',
    code: `// Rule: KYC & High-Risk Channel Filter
const sender = transaction.sender || {};
const channel = transaction.channel || 'WIRE';
const amount = transaction.amount || 0;

console.log('Originator KYC status:', sender.isKycVerified ? 'VERIFIED' : 'UNVERIFIED');
console.log('Payment channel:', channel);

const triggers = [];
let riskScore = 15;

if (!sender.isKycVerified) {
  triggers.push('KYC_TIER_0_UNVERIFIED');
  riskScore += 35;
  
  if (channel === 'CRYPTO_GATEWAY') {
    triggers.push('UNVERIFIED_CRYPTO_OFFRAMP');
    riskScore += 45;
    console.error('High risk: Anonymous crypto gateway withdrawal!');
  }
}

if (amount > 50000) {
  triggers.push('HIGH_VALUE_WIRE_INSPECTION');
  riskScore += 25;
}

const decision = riskScore >= 75 ? 'BLOCK' : riskScore >= 40 ? 'FLAG' : 'ALLOW';

return {
  decision,
  riskScore,
  triggers,
};`,
  },
};

const SAMPLE_TX: TransactionPayload = {
  transactionId: 'TXN-SANDBOX-8910',
  amount: 24500,
  currency: 'USD',
  timestamp: new Date().toISOString(),
  sender: {
    name: 'Horizon FinTech Services Ltd',
    accountNumber: 'ACC-8819-2041',
    country: 'US',
    ipAddress: '198.51.100.10',
    deviceRisk: 'LOW',
    isKycVerified: true,
  },
  receiver: {
    name: 'Pacific Trade Alliance Corp',
    accountNumber: 'ACC-9921-1184',
    country: 'SG',
    institution: 'DBS Bank Singapore',
    isSanctionedCountry: false,
  },
  channel: 'WIRE',
  velocityLastHour: 7,
};

export const RulesSandbox: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('velocity');
  const [code, setCode] = useState(PRELOADED_RULES.velocity.code);
  const [txJson, setTxJson] = useState(JSON.stringify(SAMPLE_TX, null, 2));
  const [executionResult, setExecutionResult] = useState<CodeRunResponse | null>(null);
  const [running, setRunning] = useState(false);

  const handleTemplateChange = (key: string) => {
    setSelectedTemplate(key);
    setCode(PRELOADED_RULES[key].code);
    setExecutionResult(null);
  };

  const handleRunCode = async () => {
    setRunning(true);
    try {
      let parsedTx: TransactionPayload = SAMPLE_TX;
      try {
        parsedTx = JSON.parse(txJson);
      } catch {
        alert('Invalid JSON in transaction payload box');
        setRunning(false);
        return;
      }

      const res = await apiService.runCode({
        code,
        transaction: parsedTx,
        ruleName: PRELOADED_RULES[selectedTemplate]?.name,
      });
      setExecutionResult(res);
    } catch (err: any) {
      alert(`Execution failed: ${err.message}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Terminal className="w-7 h-7 text-emerald-400" />
            <span>Developer Policy Sandbox & Code Runner</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Test and simulate programmable JavaScript fraud decisioning rules executed via <code className="text-emerald-400">/api/run-code</code>.
          </p>
        </div>

        <button
          onClick={handleRunCode}
          disabled={running}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
        >
          {running ? (
            <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-slate-950" />
          )}
          <span>{running ? 'Executing in Sandbox...' : 'Run Sandbox Simulation'}</span>
        </button>
      </div>

      {/* Template Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-mono uppercase text-slate-400 font-bold mr-2 whitespace-nowrap">
          Preloaded Rule Templates:
        </span>
        {Object.entries(PRELOADED_RULES).map(([key, item]) => (
          <button
            key={key}
            onClick={() => handleTemplateChange(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedTemplate === key
                ? 'bg-slate-800 border-emerald-500 text-emerald-400 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Grid: Code Editor & Transaction Payload & Console Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: JavaScript Code Editor */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono">
                fraud_rule_definition.js
              </span>
            </div>
            <button
              onClick={() => setCode(PRELOADED_RULES[selectedTemplate].code)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Code
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-96 bg-slate-950 font-mono text-xs text-emerald-300 p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
          />
          <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span>Executed inside isolated sandbox context with `transaction` and `console`</span>
            <span>JavaScript ES2022</span>
          </div>
        </div>

        {/* Right: Test Payload & Output */}
        <div className="lg:col-span-5 space-y-6">
          {/* Transaction Payload JSON */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white font-mono">Mock Transaction JSON</span>
              <span className="text-[10px] text-slate-500 font-mono">Editable input</span>
            </div>
            <textarea
              value={txJson}
              onChange={(e) => setTxJson(e.target.value)}
              className="w-full h-40 bg-slate-950 font-mono text-[11px] text-slate-300 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Execution Result Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white font-mono">Execution Verdict & Console</span>
              {executionResult && (
                <span className="text-[10px] font-mono text-slate-400">
                  {executionResult.executionTimeMs}ms execution
                </span>
              )}
            </div>

            {!executionResult ? (
              <div className="py-8 text-center text-xs text-slate-500">
                Click &ldquo;Run Sandbox Simulation&rdquo; to execute the JavaScript rule logic against the mock payload.
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {/* Result header */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono">Decision:</span>
                    <span
                      className={`text-sm font-black uppercase ${
                        executionResult.result?.decision === 'ALLOW'
                          ? 'text-emerald-400'
                          : executionResult.result?.decision === 'FLAG'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {executionResult.result?.decision || 'ERROR'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block font-mono">Risk Index:</span>
                    <span className="text-sm font-black text-white font-mono">
                      {executionResult.result?.riskScore ?? 99} / 100
                    </span>
                  </div>
                </div>

                {/* Triggers */}
                {executionResult.result?.triggers && executionResult.result.triggers.length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                      Triggered Rules:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {executionResult.result.triggers.map((trig, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px]"
                        >
                          {trig}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Console Logs */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Console Logs:
                  </span>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 max-h-36 overflow-y-auto space-y-1">
                    {executionResult.result?.logs && executionResult.result.logs.length > 0 ? (
                      executionResult.result.logs.map((log, idx) => (
                        <div key={idx} className="leading-tight">
                          <span className="text-slate-600 mr-1">&gt;</span>
                          {log}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600">No console output recorded</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
