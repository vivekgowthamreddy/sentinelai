import { useState } from 'react';
import Topbar from '../components/Topbar';
import { portScan, type PortScanResult } from '../api/sentinelApi';

const PortScanner = () => {
  const [target, setTarget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PortScanResult[] | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await portScan(target);
      console.log('PORT SCAN API RESPONSE:', res); // DEV: Log response to verify structure
      setResults(res);
    } catch (err: any) {
      console.error('Port scan failed:', err);
      setError(
        err?.message ||
        'Unable to scan ports. Please ensure the backend is running and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Topbar
        title="Port Scanner"
        subtitle="Check common ports for exposure on an IP address or domain"
        showSearch={false}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
          <form onSubmit={handleScan} className="card p-4 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-semibold text-(--color-text-primary)">Scan target</h2>
              <p className="text-sm text-(--color-text-secondary) mt-1">
                Enter an IP address or domain. Results depend on backend availability.
              </p>
            </div>

            <div>
              <label htmlFor="target" className="label-text">
                IP / domain
              </label>
              <input
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="input-field"
                placeholder="e.g. 192.168.1.10 or example.com"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-(--color-text-muted) mt-2">
                Use only targets you are authorized to scan.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!target.trim() || isLoading}
            >
              {isLoading ? 'Scanning…' : 'Scan Ports'}
            </button>
          </form>

          {error && (
            <div className="card p-5 sm:p-6">
              <h2 className="text-sm font-medium text-(--color-text-primary)">Connection required</h2>
              <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">{error}</p>
            </div>
          )}

          {results && (
            <div className="card p-4 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-(--color-text-primary)">Results</h2>
                  <p className="text-sm text-(--color-text-secondary) mt-1">
                    Ports and observed status.
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left">
                      <th className="text-xs font-medium text-(--color-text-secondary) pb-3">Port</th>
                      <th className="text-xs font-medium text-(--color-text-secondary) pb-3">Status</th>
                      <th className="text-xs font-medium text-(--color-text-secondary) pb-3">Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-6 text-sm text-(--color-text-secondary)">
                          No ports returned.
                        </td>
                      </tr>
                    ) : (
                      results.map((row, idx) => (
                        <tr key={`${row.port}-${idx}`} className="border-t border-(--color-border)">
                          <td className="py-3 text-sm text-(--color-text-primary)">{row.port}</td>
                          <td className="py-3 text-sm">
                            <span
                              className={
                                row.status === 'Open'
                                  ? 'badge badge-warning'
                                  : 'badge badge-neutral'
                              }
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-(--color-text-secondary)">
                            {row.service || '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortScanner;
