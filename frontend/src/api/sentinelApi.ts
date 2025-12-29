import axios from "axios";
import type {
  ThreatAnalysisRequest,
  ThreatAnalysisResult,
  ImmuneSystemResponse,
  PasswordCheckResponse,
  PortScanResult,
  CodeAnalysisResponse,
} from "../types/schema";

const normalizeRiskLevel = (value: unknown) => {
  if (typeof value !== "string") return value;
  const v = value.trim().toUpperCase();
  if (!v) return value;
  return v[0] + v.slice(1).toLowerCase();
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

// Add error logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status || 'Network Error'}`);
    console.error('Error details:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const analyzeThreat = async (payload: ThreatAnalysisRequest) => {
  const res = await api.post("/analyze", payload);
  console.log("ANALYZE API RESPONSE:", res.data);
  const data = res.data as ThreatAnalysisResult;
  if (data && typeof data === "object") {
    data.riskLevel = normalizeRiskLevel(data.riskLevel) as ThreatAnalysisResult["riskLevel"];
    data.networkRiskLevel = normalizeRiskLevel(data.networkRiskLevel) as ThreatAnalysisResult["networkRiskLevel"];
  }
  return data;
};

export const immuneCheck = async (payload: Pick<ThreatAnalysisRequest, "text" | "url" | "childMode" | "networkRisk">) => {
  const res = await api.post("/immune-check", payload);
  console.log("IMMUNE-CHECK API RESPONSE:", res.data);
  const data = res.data as Record<string, unknown>;
  return {
    immuneAction: (data?.immuneAction ?? { mode: "", actions: [] }) as ImmuneSystemResponse["immuneAction"],
    preventionPolicy: (data?.preventionPolicy ?? { policy: "", notes: "" }) as ImmuneSystemResponse["preventionPolicy"],
  };
};

export const passwordCheck = async (password: string) => {
  const res = await api.post("/password-check", { password });
  console.log("PASSWORD-CHECK API RESPONSE:", res.data);
  return res.data;
};

// FIXED: Backend endpoint is /network-scan NOT /port-scan
export const portScan = async (target: string) => {
  const res = await api.post("/network-scan", { target });  // ✅ Fixed endpoint
  console.log("PORT-SCAN API RESPONSE:", res.data);
  const data = res.data as Record<string, unknown>;
  if (data && typeof data === "object" && (typeof data.error === "string" && data.error) || (typeof data.message === "string" && data.message)) {
    throw new Error(data.error as string || data.message as string);
  }
  if (data && typeof data === "object") {
    data.networkRiskLevel = normalizeRiskLevel(data.networkRiskLevel);
  }
  return data as unknown as PortScanResult;
};

// Code analyze endpoint doesn't exist in backend - will return 404
export const codeAnalyze = async (code: string, language?: string) => {
  const res = await api.post("/code-analyze", { code, language });
  console.log("CODE-ANALYZE API RESPONSE:", res.data);
  const data = res.data as CodeAnalysisResponse;
  if (data && typeof data === "object") {
    data.riskLevel = normalizeRiskLevel(data.riskLevel) as CodeAnalysisResponse["riskLevel"];
  }
  return data;
};

// Defense System Persistence
export const getDefenseStatus = async () => {
  const res = await api.get("/defense/status");
  return res.data;
};

export const resetDefense = async () => {
  const res = await api.post("/defense/reset", {});
  return res.data;
};

export const getDefenseReport = async () => {
  const res = await api.get("/defense/report");
  return res.data;
};

export const evolveDefense = async () => {
  const res = await api.post("/defense/evolve", {});
  return res.data;
};

export const browserNavigate = async (url: string) => {
  const res = await api.post("/browser/navigate", { url });
  return res.data;
};

// Export types for use in components
export type { PasswordCheckResponse, PortScanResult, CodeAnalysisResponse };
