/// <reference types="vite/client" />
import {
  SessionInfo,
  TransactionPayload,
  VerificationResult,
  CodeRunRequest,
  CodeRunResponse,
  ApiHealthResponse,
} from '../types';

const BASE_URL = ((import.meta as any).env?.VITE_API_BASE_URL || '').replace(/\/$/, '');

let currentSessionId: string | null = null;

export function getSessionId(): string | null {
  if (!currentSessionId) {
    currentSessionId = localStorage.getItem('apexcheck_session_id');
  }
  return currentSessionId;
}

export function setSessionId(id: string) {
  currentSessionId = id;
  localStorage.setItem('apexcheck_session_id', id);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  const sessionId = getSessionId();
  if (sessionId) {
    headers['X-Session-ID'] = sessionId;
  }
  headers['X-Client-Platform'] = 'web-dashboard';

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'omit',
  });

  if (!res.ok) {
    let errorDetail = `Request failed with status ${res.status}`;
    try {
      const errJson = await res.json();
      if (errJson.error || errJson.message) {
        errorDetail = errJson.error || errJson.message;
      }
    } catch {
      // ignore
    }
    throw new Error(errorDetail);
  }

  return res.json();
}

export const apiService = {
  async initSession(clientType: 'web' | 'android' | 'api' = 'web'): Promise<SessionInfo> {
    const existingId = getSessionId();
    const data = await request<{ ok: boolean; session: SessionInfo }>('/api/init-session', {
      method: 'POST',
      body: JSON.stringify({ sessionId: existingId, clientType }),
    });

    if (data?.session?.sessionId) {
      setSessionId(data.session.sessionId);
    }
    return data.session;
  },

  async sendChatMessage(payload: {
    message: string;
    context?: string;
    history?: Array<{ role: string; content: string }>;
  }): Promise<{ reply: string; model: string; latencyMs: number; sessionQuota?: { remaining: number } }> {
    const sessionId = getSessionId();
    return request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        message: payload.message,
        context: payload.context,
        history: payload.history,
      }),
    });
  },

  async verifyTransaction(transaction: TransactionPayload): Promise<VerificationResult> {
    return request<VerificationResult>('/api/verify-transaction', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  },

  async runCode(req: CodeRunRequest): Promise<CodeRunResponse> {
    return request<CodeRunResponse>('/api/run-code', {
      method: 'POST',
      body: JSON.stringify(req),
    });
  },

  async getHealth(): Promise<ApiHealthResponse> {
    return request<ApiHealthResponse>('/api/health');
  },
};
