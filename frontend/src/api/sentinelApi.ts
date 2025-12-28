import axios from 'axios';
import type {
  ImmuneSystemResponse,
  ThreatAnalysisRequest,
  ThreatAnalysisResult,
} from '../types/schema';

export interface PasswordCheckResponse {
  strengthScore: number;
  strengthLevel: 'Weak' | 'Medium' | 'Strong';
  warnings?: string[];
  recommendations?: string[];
}

export interface PortScanResult {
  port: number;
  status: 'Open' | 'Closed';
  service?: string;
}

export interface CodeAnalysisResponse {
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  issues: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Threat Analysis API
export const analyzeThreat = async (
  data: ThreatAnalysisRequest,
): Promise<ThreatAnalysisResult> => {
  const response = await api.post<ThreatAnalysisResult>('/analyze', data);
  return response.data;
};

// Immune System Check API
export const immuneCheck = async (
  data: ThreatAnalysisRequest,
): Promise<ImmuneSystemResponse> => {
  const response = await api.post<ImmuneSystemResponse>('/immune-check', data);
  return response.data;
};

export const passwordCheck = async (
  password: string,
): Promise<PasswordCheckResponse> => {
  const response = await api.post<PasswordCheckResponse>('/password-check', {
    password,
  });
  return response.data;
};

export const portScan = async (target: string): Promise<PortScanResult[]> => {
  const response = await api.post<PortScanResult[]>('/port-scan', { target });
  return response.data;
};

export const codeAnalyze = async (
  code: string,
  language?: string,
): Promise<CodeAnalysisResponse> => {
  const response = await api.post<CodeAnalysisResponse>('/code-analyze', {
    code,
    language,
  });
  return response.data;
};