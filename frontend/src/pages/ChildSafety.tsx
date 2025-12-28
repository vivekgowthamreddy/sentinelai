import Topbar from '../components/Topbar';

const ChildSafety = () => {
  return (
    <div className="h-full flex flex-col">
      <Topbar
        title="Child Safety"
        subtitle="Guidance and safeguards for age-appropriate content"
        showSearch={false}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
          <div className="card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-(--color-text-primary)">Overview</h2>
            <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">
              Use Child Safety tools to apply stricter screening for messages and links that may be shared with minors.
              This page provides recommended guardrails and policy guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card p-6">
              <h3 className="text-sm font-medium text-(--color-text-secondary)">Recommended guardrails</h3>
              <ul className="mt-3 space-y-2">
                <li className="text-sm text-(--color-text-primary)">Block unknown shortened links and file downloads.</li>
                <li className="text-sm text-(--color-text-primary)">Flag messages requesting personal information.</li>
                <li className="text-sm text-(--color-text-primary)">Require review for new contacts or suspicious domains.</li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-sm font-medium text-(--color-text-secondary)">Operational checklist</h3>
              <ul className="mt-3 space-y-2">
                <li className="text-sm text-(--color-text-primary)">Enable content filtering and link reputation checks.</li>
                <li className="text-sm text-(--color-text-primary)">Log and review flagged messages weekly.</li>
                <li className="text-sm text-(--color-text-primary)">Educate users on safe sharing practices.</li>
              </ul>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-medium text-(--color-text-secondary)">Next step</h3>
            <p className="mt-2 text-sm text-(--color-text-primary) leading-relaxed">
              When backend support is connected, this area can trigger child-mode checks and show structured results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildSafety;
