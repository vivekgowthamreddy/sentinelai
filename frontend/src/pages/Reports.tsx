import Topbar from '../components/Topbar';

const Reports = () => {
  return (
    <div className="h-full flex flex-col">
      <Topbar
        title="Reports"
        subtitle="Centralized records for scans, findings, and actions"
        showSearch={false}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
          <div className="card p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-(--color-text-primary)">Reports & alerts</h2>
            <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">
              This section will list historical scans and findings once connected to the backend.
            </p>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-medium text-(--color-text-secondary)">Recent activity</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-left">
                    <th className="text-xs font-medium text-(--color-text-secondary) pb-3">Time</th>
                    <th className="text-xs font-medium text-(--color-text-secondary) pb-3">Tool</th>
                    <th className="text-xs font-medium text-(--color-text-secondary) pb-3">Summary</th>
                    <th className="text-xs font-medium text-(--color-text-secondary) pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-(--color-border)">
                    <td colSpan={4} className="py-6 text-sm text-(--color-text-secondary)">
                      No reports available yet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
