import type { RiskLevel, ConfidenceLevel, SystemStatus } from './enums';

// API Request/Response Types
export interface ThreatAnalysisRequest {
  message: string;
  url?: string;
  childMode: boolean;
  networkRisk: boolean;
}

export interface ThreatAnalysisResult {
  riskScore: number;
  riskLevel: RiskLevel;
  confidence: ConfidenceLevel;
  recommendedAction: string;
  incidentResponse: string;
  timeline: string;
}

export interface ImmuneSystemResponse {
  immuneAction: string;
  preventionPolicy: string;
}

// Component Props Types
export interface AnalyzerFormProps {
  onAnalyze: (data: ThreatAnalysisRequest) => void;
  isLoading?: boolean;
}

export interface ResultSummaryProps {
  result: ThreatAnalysisResult | null;
}

export interface ImmuneSystemPanelProps {
  immuneData: ImmuneSystemResponse | null;
}

export interface InfoCardProps {
  title: string;
  value: string | number;
  status?: SystemStatus;
}