import axios from 'axios';
import type {
  ImmuneSystemResponse,
  ThreatAnalysisRequest,
  ThreatAnalysisResult,
} from '../types/schema';

export interface PasswordCheckResponse {
  passwordScore: number;
  strength: string;
  entropy: number;
  recommendations: string[];
  note?: string;
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

export interface ApiError {
  message: string;
  details?: any;
  status?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error: No response from server');
    } else {
      // Error in request setup
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API errors consistently
const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.detail || error.response.data?.message || 'Server error occurred',
      details: error.response.data,
      status: error.response.status,
    };
  } else if (error.request) {
    return {
      message: 'Unable to reach the server. Please ensure the backend is running.',
      details: 'Network error',
    };
  } else {
    return {
      message: error.message || 'An unexpected error occurred',
      details: error,
    };
  }
};

// Threat Analysis API
export const analyzeThreat = async (
  data: ThreatAnalysisRequest,
): Promise<ThreatAnalysisResult> => {
  try {
    // Convert camelCase to snake_case for backend
    const payload = {
      text: data.text,
      url: data.url || '',
      child_mode: data.childMode,
      network_risk: data.networkRisk ? 'HIGH' : 'LOW',
    };

    const response = await api.post<ThreatAnalysisResult>('/analyze', payload);
    console.log('ANALYZE API RESPONSE:', response.data); // DEV: Log response to verify structure
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Immune System Check API
export const immuneCheck = async (
  data: ThreatAnalysisRequest,
): Promise<ImmuneSystemResponse> => {
  try {
    // Convert camelCase to snake_case for backend
    const payload = {
      text: data.text,
      url: data.url || '',
      child_mode: data.childMode,
      network_risk: data.networkRisk ? 'HIGH' : 'LOW',
    };

    const response = await api.post<ImmuneSystemResponse>('/immune-check', payload);
    console.log('IMMUNE-CHECK API RESPONSE:', response.data); // DEV: Log response to verify structure
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const passwordCheck = async (
  password: string,
): Promise<PasswordCheckResponse> => {
  try {
    const response = await api.post<PasswordCheckResponse>('/password-check', {
      password,
    });
    console.log('PASSWORD-CHECK API RESPONSE:', response.data); // DEV: Log response to verify structure
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const portScan = async (target: string): Promise<PortScanResult[]> => {
  try {
    const response = await api.post<PortScanResult[]>('/port-scan', { target });
    console.log('PORT-SCAN API RESPONSE:', response.data); // DEV: Log response to verify structure
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const codeAnalyze = async (
  code: string,
  language?: string,
): Promise<CodeAnalysisResponse> => {
  try {
    const response = await api.post<CodeAnalysisResponse>('/code-analyze', {
      code,
      language,
    });
    console.log('CODE-ANALYZE API RESPONSE:', response.data); // DEV: Log response to verify structure
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};