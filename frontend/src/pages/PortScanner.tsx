import { useState } from 'react';
import Topbar from '../components/Topbar';
import { portScan, type PortScanResult } from '../api/sentinelApi';

const PortScanner = () => {
  const [target, setTarget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PortScanResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await portScan(target);
      console.log('PORT SCAN API RESPONSE:', res);
      setResults(res);
    } catch (err: unknown) {
      console.error('Port scan failed:', err);
      const error = err as { message?: string };
      setError(
        error?.message ||
        'Unable to scan ports. Please ensure the backend is running and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-(--color-background)">
      <Topbar
        title="Network Recon"
        subtitle="Active Port Scanning & Risk Assessment"
        showSearch={false}
      />

      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Target Input Pod */}
          <form onSubmit={handleScan} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-(--color-primary) to-(--color-accent) rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative bg-(--color-surface) rounded-xl p-8 border border-(--color-border) flex flex-col md:flex-row gap-6 items-end">
              <div className="flex-1 w-full">
                <label htmlFor="target" className="block text-xs font-mono text-(--color-text-secondary) uppercase tracking-wider mb-2">
                  Target IP / Hostname
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-(--color-primary)">Target://</span>
                  </div>
                  <input
                    id="target"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-(--color-background) text-(--color-text-primary) font-mono text-lg border border-(--color-border) rounded-lg py-3 pl-24 pr-4 focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all"
                    placeholder="192.168.1.1 or example.com"
                    disabled={isLoading}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!target.trim() || isLoading}
                className="w-full md:w-auto px-8 py-3.5 bg-(--color-primary) hover:bg-(--color-primary-hover) text-black font-bold rounded-lg shadow-[0_0_20px_rgba(0,255,242,0.3)] hover:shadow-[0_0_30px_rgba(0,255,242,0.5)] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>SCANNING...</span>
                  </>
                ) : (
                  <span>INITIATE SCAN</span>
                )}
              </button>
            </div>
          </form>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 animate-fade-in flex items-start gap-4">
              <div className="p-2 bg-red-500/20 rounded-full text-red-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <h3 className="text-red-400 font-bold mb-1">SCAN ERROR</h3>
                <p className="text-red-300/80 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Results Area */}
          {results && (
            <div className="space-y-8 animate-slide-up">

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Risk Level */}
                <div className={`relative overflow-hidden rounded-xl p-6 border bg-(--color-surface) ${results.networkRiskLevel === 'HIGH' ? 'border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]' :
                    results.networkRiskLevel === 'MEDIUM' ? 'border-yellow-500/30' :
                      'border-cyan-500/30'
                  }`}>
                  <div className="text-xs font-mono uppercase tracking-widest text-(--color-text-secondary) mb-2">Network Risk</div>
                  <div className={`text-4xl font-black ${results.networkRiskLevel === 'HIGH' ? 'text-red-500' :
                      results.networkRiskLevel === 'MEDIUM' ? 'text-yellow-500' :
                        'text-cyan-400'
                    }`}>
                    {results.networkRiskLevel}
                  </div>
                </div>

                {/* Open Ports Count */}
                <div className="relative overflow-hidden rounded-xl p-6 border border-(--color-border) bg-(--color-surface)">
                  <div className="text-xs font-mono uppercase tracking-widest text-(--color-text-secondary) mb-2">Open Ports</div>
                  <div className="text-4xl font-black text-(--color-text-primary)">
                    {results.openPorts.length} <span className="text-lg text-(--color-text-muted) font-normal">detected</span>
                  </div>
                </div>

                {/* Status */}
                <div className="relative overflow-hidden rounded-xl p-6 border border-(--color-border) bg-(--color-surface)">
                  <div className="text-xs font-mono uppercase tracking-widest text-(--color-text-secondary) mb-2">Scan Status</div>
                  <div className="text-xl font-bold text-(--color-primary) flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-(--color-primary) animate-pulse shadow-[0_0_10px_var(--color-primary)]"></span>
                    {String(results.scanStatus).toUpperCase()}
                  </div>
                  {/* @ts-expect-error notes field might exist on fallback */}
                  {results.note && <div className="text-xs text-(--color-text-muted) mt-2">{results.note}</div>}
                </div>
              </div>

              {/* Detail Table */}
              <div className="bg-(--color-surface) border border-(--color-border) rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-black/20 p-4 border-b border-(--color-border) flex justify-between items-center">
                  <h3 className="font-mono text-(--color-text-primary) text-lg">Detailed Port Map</h3>
                  <div className="text-xs text-(--color-text-muted) font-mono">PROTOCOL: TCP</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/5 text-(--color-text-secondary) text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium">Port</th>
                        <th className="p-4 font-medium">State</th>
                        <th className="p-4 font-medium">Service</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-(--color-border)">
                      {results.openPorts.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-8 text-center text-(--color-text-muted) italic">
                            No open ports detected on this target.
                          </td>
                        </tr>
                      ) : (
                        results.openPorts.map((ctx, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors group">
                            <td className="p-4 text-(--color-primary) font-mono font-bold group-hover:text-white transition-colors">
                              {ctx.port}
                            </td>
                            <td className="p-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                                OPEN
                              </span>
                            </td>
                            <td className="p-4 text-(--color-text-secondary) font-mono">
                              {ctx.service}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PortScanner;
