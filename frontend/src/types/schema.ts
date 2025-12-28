import type { RiskLevel, SystemStatus } from './enums';

// API Request/Response Types
export interface ThreatAnalysisRequest {
  text: string;
  url?: string;
  childMode: boolean;
  networkRisk: boolean;
}

export interface ThreatAnalysisResult {
  globalRiskScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  mlRiskProbability: number;
  networkRiskLevel: string;
  isChildMode: boolean;
  threatVectors: string[];
  recommendedAction: string;
  incidentResponse: string;
  incidentTimeline: Array<{
    event: string;
    timestamp: string;
    details: Record<string, any>;
  }>;
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