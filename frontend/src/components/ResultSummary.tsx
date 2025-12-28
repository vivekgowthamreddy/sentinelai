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
        <span className={getRiskBadgeClasses()}>{result.riskLevel || 'Unknown'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 sm:p-6 lg:col-span-1 border-l-4 border-l-(--color-primary)">
          <p className="text-sm font-medium text-(--color-text-secondary)">Risk score</p>
          <p className={`mt-2 text-4xl sm:text-5xl font-semibold tracking-tight ${getRiskLevelColor()}`}>
            {result.globalRiskScore != null ? formatRiskScore(result.globalRiskScore) : 'N/A'}
          </p>
          <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">
            Higher scores indicate greater likelihood of malicious intent or unsafe links.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-2">
          <div className="card p-5 sm:p-6">
            <p className="text-sm font-medium text-(--color-text-secondary)">Risk level</p>
            <div className="mt-2 flex items-center gap-3">
              <span className={getRiskBadgeClasses()}>{result.riskLevel || 'Unknown'}</span>
              <p className="text-sm text-(--color-text-secondary)">
                Use this as a quick severity signal.
              </p>
            </div>
          </div>

          <div className="card p-5 sm:p-6">
            <p className="text-sm font-medium text-(--color-text-secondary)">Confidence</p>
            <p className="mt-2 text-2xl font-semibold text-(--color-text-primary)">
              {result.confidence != null && typeof result.confidence === 'number'
                ? `${Math.round(result.confidence * 100)}%`
                : result.confidence || 'N/A'}
            </p>
            <p className="text-sm text-(--color-text-secondary) mt-2">
              Indicates how strongly the system supports this assessment.
            </p>
          </div>

          <div className="card p-5 sm:p-6 sm:col-span-2">
            <h3 className="text-sm font-medium text-(--color-text-secondary)">Recommended action</h3>
            <p className="mt-2 text-sm sm:text-base text-(--color-text-primary) leading-relaxed">
              {result.recommendedAction || 'No recommendation available'}
            </p>
          </div>

          <div className="card p-5 sm:p-6 sm:col-span-2">
            <h3 className="text-sm font-medium text-(--color-text-secondary)">Incident response</h3>

            {/* Safely handle incidentResponse - can be object or string */}
            {result.incidentResponse ? (
              typeof result.incidentResponse === 'object' && 'nextSteps' in result.incidentResponse ? (
                <>
                  <p className="mt-2 text-sm font-medium text-(--color-text-primary)">
                    Severity: {result.incidentResponse.severity || 'Not specified'}
                  </p>
                  {Array.isArray(result.incidentResponse.nextSteps) && result.incidentResponse.nextSteps.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {result.incidentResponse.nextSteps.map((step: string, idx: number) => (
                        <li key={idx} className="text-sm text-(--color-text-primary) flex items-start gap-2">
                          <span className="text-(--color-primary) mt-0.5">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p className="mt-2 text-sm text-(--color-text-primary)">{String(result.incidentResponse)}</p>
              )
            ) : (
              <p className="mt-2 text-sm text-(--color-text-secondary)">No incident response available</p>
            )}

            {/* Safely handle timeline */}
            {result.incidentTimeline && Array.isArray(result.incidentTimeline) && result.incidentTimeline.length > 0 && (
              <div className="mt-4 pt-4 border-t border-(--color-border)">
                <p className="text-xs text-(--color-text-secondary)">Timeline</p>
                <div className="mt-2 space-y-1">
                  {result.incidentTimeline.map((item, idx: number) => (
                    <p key={idx} className="text-sm text-(--color-text-primary)">
                      {item?.eventType || 'Event'} - {item?.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}
                      {item?.details && typeof item.details === 'object' && `: ${JSON.stringify(item.details)}`}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;