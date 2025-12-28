export type NetworkRisk = "LOW" | "MEDIUM" | "HIGH";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface AnalyzeRequest {
  text: string;
  url: string;
  child_mode: boolean;
  network_risk: NetworkRisk;
}

export interface IncidentResponse {
  severity: "LOW" | "WARNING" | "CRITICAL";
  nextSteps: string[];
}

export interface IncidentTimelineItem {
  timestamp: string;
  eventType: string;
  details: Record<string, unknown>;
}

export interface AnalyzeResponse {
  globalRiskScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  mlRiskProbability: number;
  networkRiskLevel: NetworkRisk;
  isChildMode: boolean;
  threatVectors: string[];
  recommendedAction: "ALLOW" | "WARN_USER" | "IMMEDIATE_BLOCK";
  incidentResponse: IncidentResponse;
  incidentTimeline: IncidentTimelineItem[];
}
