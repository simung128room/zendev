export interface SessionInfo {
  sessionId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  quota: {
    total: number;
    used: number;
    remaining: number;
  };
  clientType: 'web' | 'android' | 'api';
  apiVersion: string;
  mode: string;
}

export interface TransactionPayload {
  transactionId: string;
  amount: number;
  currency: string;
  timestamp: string;
  sender: {
    name: string;
    accountNumber: string;
    country: string;
    ipAddress: string;
    deviceRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    isKycVerified: boolean;
  };
  receiver: {
    name: string;
    accountNumber: string;
    country: string;
    institution: string;
    isSanctionedCountry: boolean;
  };
  channel: 'WIRE' | 'CARD_ONLINE' | 'ACH' | 'CRYPTO_GATEWAY' | 'INSTANT_PAY';
  velocityLastHour: number;
  merchantCategoryCode?: string;
  note?: string;
}

export interface VerificationResult {
  transactionId: string;
  riskScore: number; // 0 - 100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'APPROVED' | 'FLAGGED_FOR_REVIEW' | 'REJECTED';
  flaggedRules: Array<{
    ruleId: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    message: string;
    category: 'AML' | 'VELOCITY' | 'GEO_SANCTION' | 'AMOUNT_THRESHOLD' | 'DEVICE_INTEGRITY';
  }>;
  aiAuditSummary: string;
  evaluatedAt: string;
  latencyMs: number;
  complianceChecks: {
    amlScreening: 'PASS' | 'WARN' | 'FAIL';
    ofacSanctions: 'PASS' | 'WARN' | 'FAIL';
    pepCheck: 'PASS' | 'WARN' | 'FAIL';
    velocityCheck: 'PASS' | 'WARN' | 'FAIL';
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  meta?: {
    model?: string;
    latencyMs?: number;
    riskTags?: string[];
  };
}

export interface CodeRunRequest {
  code: string;
  transaction: TransactionPayload;
  ruleName?: string;
}

export interface CodeRunResponse {
  ok: boolean;
  executionTimeMs: number;
  result?: {
    decision: 'ALLOW' | 'BLOCK' | 'FLAG';
    riskScore: number;
    triggers: string[];
    logs: string[];
  };
  error?: string;
}

export interface ApiHealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  endpoints: string[];
  env: {
    hasGeminiKey: boolean;
    nodeEnv: string;
    appUrl?: string;
  };
}
