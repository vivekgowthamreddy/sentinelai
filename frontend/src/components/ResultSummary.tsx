import type { ResultSummaryProps } from '../types/schema';
import { formatRiskScore } from '../utils/formatters';

const ResultSummary = ({ result }: ResultSummaryProps) => {
  // ALWAYS render component, never return null
  if (!result) {
    return null; // Parent handles conditional rendering
  }

  const getRiskLevelColor = () => {
    const level = result?.riskLevel || '';
    if (level === 'Low') return 'text-(--color-success)';
    if (level === 'Medium') return 'text-(--color-warning)';
    if (level === 'High' || level === 'Critical') return 'text-(--color-error)';
    return 'text-(--color-text-primary)';
  };

  const getRiskBadgeClasses = () => {
    const level = result?.riskLevel || '';
    if (level === 'Low') return 'badge badge-success';
    if (level === 'Medium') return 'badge badge-warning';
    if (level === 'High' || level === 'Critical') return 'badge badge-danger';
    return 'badge badge-neutral';
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-end justify-between gap-4 border-b border-(--color-border) pb-4">
        <div>
          <h2 className="text-xl font-semibold text-(--color-text-primary) tracking-tight">
            Analysis Results
          </h2>
          <p className="text-sm text-(--color-text-secondary) mt-1">
            Intelligence report generated for triage.
          </p>
        </div>
        <span className={`${getRiskBadgeClasses()} px-4 py-1.5 text-sm`}>{result.riskLevel || 'Unknown'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="card p-6 lg:col-span-1 border-l-4 border-l-(--color-primary) animate-scale-in animate-float flex flex-col justify-between h-full bg-gradient-to-br from-(--color-bg-card) to-(--color-bg-subtle)">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-(--color-text-secondary)">Risk Score</p>
            <div className="mt-4 flex items-baseline gap-2">
              <p className={`text-6xl font-bold tracking-tighter ${getRiskLevelColor()}`}>
                {result.globalRiskScore != null ? formatRiskScore(result.globalRiskScore) : 'N/A'}
              </p>
              <span className="text-xl text-(--color-text-muted)">/100</span>
            </div>
          </div>
          <p className="text-sm text-(--color-text-secondary) mt-6 leading-relaxed">
            Probability of malicious intent based on behavioral heuristics and known threat patterns.
          </p>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2">
          {/* Risk Level Card */}
          <div className="card p-6 animate-scale-in delay-100 hover:border-(--color-primary-hover) transition-colors">
            <p className="text-sm font-semibold uppercase tracking-wider text-(--color-text-secondary)">Severity Level</p>
            <div className="mt-4 flex items-center gap-4">
              <span className={`${getRiskBadgeClasses()} px-3 py-1 text-sm`}>{result.riskLevel || 'Unknown'}</span>
              <p className="text-sm text-(--color-text-primary) font-medium">
                Authorized action required.
              </p>
            </div>
          </div>

          {/* Confidence Card */}
          <div className="card p-6 animate-scale-in delay-200 hover:border-(--color-primary-hover) animate-pulse-glow transition-colors">
            <p className="text-sm font-semibold uppercase tracking-wider text-(--color-text-secondary)">Model Confidence</p>
            <div className="mt-4">
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-(--color-text-primary)">
                  {result.confidence != null && typeof result.confidence === 'number'
                    ? `${Math.round(result.confidence * 100)}%`
                    : result.confidence || 'N/A'}
                </p>
                <span className="text-sm text-(--color-text-secondary) mb-1.5">certainty</span>
              </div>
              {/* Simple progress bar visual */}
              <div className="w-full bg-(--color-bg-subtle) rounded-full h-1.5 mt-3 overflow-hidden">
                <div
                  className="bg-(--color-primary) h-1.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${result.confidence && typeof result.confidence === 'number' ? result.confidence * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="card p-6 sm:col-span-2 animate-scale-in delay-300 border-t-4 border-t-(--color-success)">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-text-secondary) flex items-center gap-2">
              <svg className="w-4 h-4 text-(--color-success)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Recommended Action
            </h3>
            <p className="mt-3 text-base text-(--color-text-primary) leading-relaxed font-medium">
              {result.recommendedAction || 'No recommendation available'}
            </p>
          </div>

          {/* Incident Response Card */}
          <div className="card p-6 sm:col-span-2 animate-scale-in delay-300">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-text-secondary) flex items-center gap-2">
              <svg className="w-4 h-4 text-(--color-warning)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              Incident Response Protocol
            </h3>

            {/* Safely handle incidentResponse - can be object or string */}
            {result.incidentResponse ? (
              typeof result.incidentResponse === 'object' && 'nextSteps' in result.incidentResponse ? (
                <div className="mt-4 bg-(--color-bg-subtle) rounded-lg p-4 border border-(--color-border)">
                  <p className="text-sm font-bold text-(--color-text-primary) border-b border-(--color-border) pb-2 mb-3">
                    SEVERITY: <span className={getRiskLevelColor()}>{result.incidentResponse.severity || 'Unspecified'}</span>
                  </p>
                  {Array.isArray(result.incidentResponse.nextSteps) && result.incidentResponse.nextSteps.length > 0 && (
                    <ul className="space-y-2.5">
                      {result.incidentResponse.nextSteps.map((step: string, idx: number) => (
                        <li key={idx} className="text-sm text-(--color-text-primary) flex items-start gap-3">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-(--color-primary) mt-1.5"></span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm text-(--color-text-primary)">{String(result.incidentResponse)}</p>
              )
            ) : (
              <p className="mt-3 text-sm text-(--color-text-secondary)">No response protocol generated.</p>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Footer */}
      {result.incidentTimeline && Array.isArray(result.incidentTimeline) && result.incidentTimeline.length > 0 && (
        <div className="mt-4 pt-4 border-t border-(--color-border) text-center">
          <p className="text-xs text-(--color-text-secondary) font-mono">
            CASE ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} • LOGGED: {new Date().toISOString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultSummary;