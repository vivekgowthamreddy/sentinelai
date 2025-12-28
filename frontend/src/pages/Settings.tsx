import Topbar from '../components/Topbar';

const Settings = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

  return (
    <div className="h-full flex flex-col">
      <Topbar
        title="Settings"
        subtitle="Application preferences and integration configuration"
        showSearch={false}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
          <div className="card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-(--color-text-primary)">Integration</h2>
            <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">
              Configure the backend URL using an environment variable.
            </p>

            <div className="mt-6">
              <label className="label-text">API base URL</label>
              <div className="input-field flex items-center justify-between gap-3">
                <span className="text-sm text-(--color-text-primary) truncate">
                  {apiBaseUrl || 'Not set'}
                </span>
                <span className="badge badge-neutral">ENV</span>
              </div>
              <p className="text-xs text-(--color-text-muted) mt-2">
                Set VITE_API_BASE_URL in a .env file and restart the dev server.
              </p>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-medium text-(--color-text-secondary)">Preferences</h3>
            <p className="mt-2 text-sm text-(--color-text-primary) leading-relaxed">
              User preferences and notification controls can be added here when backend support is available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
