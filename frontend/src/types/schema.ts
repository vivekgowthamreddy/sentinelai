import type { RiskLevel, SystemStatus } from './enums';

// API Request/Response Types
export interface ThreatAnalysisRequest {
  text: string;
  url?: string;
  childMode: boolean;
  networkRisk: string;
}

export interface ThreatAnalysisResult {
  globalRiskScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  mlRiskProbability: number;
  networkRiskLevel: string;
  isChildMode: boolean;
  threatVectors: string[]; // Array of threat vector strings
  recommendedAction: string;
  incidentResponse: {
    severity: string;
    nextSteps: string[];
  };
  incidentTimeline: Array<{
    timestamp: string;
    eventType: string;
    details: Record<string, unknown>; // Object with various properties
  }>;
}

export interface ImmuneSystemResponse {
  immuneAction: {
    mode: string;
    actions: string[];
  };
  preventionPolicy: {
    policy: string;
    notes: string;
  };
}

export interface PasswordCheckResponse {
  passwordScore: number;
  strength: string;
  entropy: number;
  recommendations: string[];
  note: string;
}

export interface PortScanResult {
  target: string;
  scanStatus: string;
  openPorts: Array<{
    port: string;
    service: string;
  }>;
  openPortCount: number;
  networkRiskLevel: string;
  note?: string;
}

export interface CodeAnalysisResponse {
  riskLevel: string;
  issues: Array<{
    type: string;
    message: string;
    line?: number;
  }>;
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