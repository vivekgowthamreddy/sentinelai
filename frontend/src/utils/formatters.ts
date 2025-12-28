import type { ConfidenceLevel } from '../types/enums';

// Format risk score as percentage
export const formatRiskScore = (score: number): string => {
  return `${Math.round(score * 100)}%`;
};

// Format confidence level
export const formatConfidence = (confidence: ConfidenceLevel): string => {
  return confidence;
};

// Format timestamp to readable date
export const formatTimestamp = (timestamp: string | Date): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};