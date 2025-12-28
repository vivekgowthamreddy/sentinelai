import type { ImmuneSystemPanelProps } from '../types/schema';

const ImmuneSystemPanel = ({ immuneData }: ImmuneSystemPanelProps) => {
  if (!immuneData) return null;

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-(--color-text-primary)">
          Immune system response
        </h2>
        <p className="text-sm text-(--color-text-secondary) mt-1">
          What the platform would do automatically to reduce user impact.
        </p>
      </div>

      <div className="card p-5 sm:p-6">
        <div>
          <h3 className="text-sm font-medium text-(--color-text-secondary)">Immune action</h3>
          <p className="mt-2 text-sm sm:text-base text-(--color-text-primary) leading-relaxed">
            Mode: {immuneData.immuneAction?.mode || '—'}
          </p>
          {Array.isArray(immuneData.immuneAction?.actions) && immuneData.immuneAction.actions.length > 0 && (
            <ul className="mt-3 space-y-2">
              {immuneData.immuneAction.actions.map((action, idx) => (
                <li key={idx} className="text-sm text-(--color-text-primary) flex items-start gap-2">
                  <span className="text-(--color-primary) mt-0.5">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-(--color-border)">
          <h3 className="text-sm font-medium text-(--color-text-secondary)">Prevention policy</h3>
          <p className="mt-2 text-sm sm:text-base text-(--color-text-primary) leading-relaxed">
            {immuneData.preventionPolicy?.policy || '—'}
          </p>
          {immuneData.preventionPolicy?.notes && (
            <p className="mt-2 text-xs text-(--color-text-muted) leading-relaxed">
              {immuneData.preventionPolicy.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImmuneSystemPanel;