import type { ResultSummaryProps } from '../types/schema';
import { formatRiskScore } from '../utils/formatters';

const ResultSummary = ({ result }: ResultSummaryProps) => {
  if (!result) return null;

  const getRiskLevelColor = () => {
    switch (result.riskLevel) {
      case 'Low':
        return 'text-(--color-success)';
      case 'Medium':
        return 'text-(--color-warning)';
      case 'High':
      case 'Critical':
        return 'text-(--color-error)';
      default:
        return 'text-(--color-text-primary)';
    }
  };

  const getRiskBadgeClasses = () => {
    switch (result.riskLevel) {
      case 'Low':
        return 'badge badge-success';
      case 'Medium':
        return 'badge badge-warning';
      case 'High':
      case 'Critical':
        return 'badge badge-danger';
      default:
        return 'badge badge-neutral';
    }
  };

  const formatConfidenceValue = () => {
    const raw = result.confidence as unknown;
    if (typeof raw === 'number') return `${Math.round(raw * 100)}%`;
    if (typeof raw === 'string') {
      const trimmed = raw.trim();
      const numeric = Number(trimmed);
      if (!Number.isNaN(numeric) && trimmed !== '') {
        if (numeric <= 1) return `${Math.round(numeric * 100)}%`;
        return `${Math.round(numeric)}%`;
      }
      return raw;
    }
    return String(raw);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-(--color-text-primary)">
            Results
          </h2>
          <p className="text-sm text-(--color-text-secondary) mt-1">
            A structured summary you can use for triage and incident workflows.
          </p>
        </div>
        <span className={getRiskBadgeClasses()}>{result.riskLevel}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 sm:p-6 lg:col-span-1 border-l-4 border-l-(--color-primary)">
          <p className="text-sm font-medium text-(--color-text-secondary)">Risk score</p>
          <p className={`mt-2 text-4xl sm:text-5xl font-semibold tracking-tight ${getRiskLevelColor()}`}>
            {formatRiskScore(result.riskScore)}
          </p>
          <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">
            Higher scores indicate greater likelihood of malicious intent or unsafe links.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2">
          <div className="card p-5 sm:p-6">
            <p className="text-sm font-medium text-(--color-text-secondary)">Risk level</p>
            <div className="mt-2 flex items-center gap-3">
              <span className={getRiskBadgeClasses()}>{result.riskLevel}</span>
              <p className="text-sm text-(--color-text-secondary)">
                Use this as a quick severity signal.
              </p>
            </div>
          </div>

          <div className="card p-5 sm:p-6">
            <p className="text-sm font-medium text-(--color-text-secondary)">Confidence</p>
            <p className="mt-2 text-2xl font-semibold text-(--color-text-primary)">
              {formatConfidenceValue()}
            </p>
            <p className="text-sm text-(--color-text-secondary) mt-2">
              Indicates how strongly the system supports this assessment.
            </p>
          </div>

          <div className="card p-5 sm:p-6 sm:col-span-2">
            <h3 className="text-sm font-medium text-(--color-text-secondary)">Recommended action</h3>
            <p className="mt-2 text-sm sm:text-base text-(--color-text-primary) leading-relaxed">
              {result.recommendedAction}
            </p>
          </div>

          <div className="card p-5 sm:p-6 sm:col-span-2">
            <h3 className="text-sm font-medium text-(--color-text-secondary)">Incident response</h3>
            <p className="mt-2 text-sm sm:text-base text-(--color-text-primary) leading-relaxed">
              {result.incidentResponse}
            </p>
            <div className="mt-4 pt-4 border-t border-(--color-border)">
              <p className="text-xs text-(--color-text-secondary)">Timeline</p>
              <p className="text-sm text-(--color-text-primary) mt-1">
                {result.timeline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;