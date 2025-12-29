import { useEffect, useState } from 'react';
import type { ImmuneSystemPanelProps } from '../types/schema';
import { getDefenseStatus, resetDefense, getDefenseReport, evolveDefense } from '../api/sentinelApi';
import SystemEvolutionPanel from './SystemEvolutionPanel';

const ImmuneSystemPanel = ({ immuneData }: ImmuneSystemPanelProps) => {
  const [persistentStatus, setPersistentStatus] = useState<string>("NORMAL");
  const [incidentCount, setIncidentCount] = useState<number>(0);
  const [evolutionLevel, setEvolutionLevel] = useState<number>(0);

  const fetchStatus = async () => {
    try {
      const status = await getDefenseStatus();
      setPersistentStatus(status.mode);
      setIncidentCount(status.incident_count);
      setEvolutionLevel(status.evolution_level);
    } catch (err) {
      console.error("Failed to fetch defense status", err);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 2000); // Poll every 2s
    return () => clearInterval(interval);
  }, []);

  const handleReset = async () => {
    await resetDefense();
    fetchStatus();
  };

  const handleEvolve = async () => {
    await evolveDefense();
    fetchStatus();
  };

  const handleDownloadReport = async () => {
    const report = await getDefenseReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `defense_report_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!immuneData && persistentStatus === "NORMAL" && evolutionLevel === 0) return null;

  const isLocked = persistentStatus === "ACTIVE_DEFENSE";

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* Evolution Panel Always Shows if active */}
      <SystemEvolutionPanel level={evolutionLevel} />

      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-(--color-text-primary)">
          Immune system response
        </h2>
        <p className="text-sm text-(--color-text-secondary) mt-1">
          {isLocked
            ? "SYSTEM UNDER ACTIVE DEFENSE. Threat persistency protocols engaged."
            : "What the platform would do automatically to reduce user impact."}
        </p>
      </div>

      {/* Persistent Defense Warning */}
      {isLocked && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="text-red-500 font-bold text-lg">⚠️ SYSTEM LOCKED DOWN</div>
          </div>
          <p className="text-red-400 text-sm mt-1">
            Active threats detected ({incidentCount}). Security protocols have locked high-risk features.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={handleDownloadReport}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-colors"
            >
              📥 Download Forensic Report
            </button>
            <button
              onClick={handleEvolve}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded transition-colors"
            >
              🧬 Evolve (Simulate Threat)
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
            >
              🔄 Reset System (Admin)
            </button>
            <a
              href="/secure-browser"
              target="_blank"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
            >
              🌐 Launch Safe Browser
            </a>
          </div>
        </div>
      )}

      {/* Default/Current Transaction View */}
      {(immuneData || isLocked) && (
        <div className={`card p-5 sm:p-6 ${isLocked ? 'opacity-75 blur-[1px]' : ''}`}>
          <div>
            <h3 className="text-sm font-medium text-(--color-text-secondary)">
              {isLocked ? "Last Detected Immune Action" : "Immune action"}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-(--color-text-primary) leading-relaxed">
              Mode: {isLocked ? "ACTIVE_DEFENSE (Persisted)" : (immuneData?.immuneAction?.mode || '—')}
            </p>
            {immuneData?.immuneAction?.actions && immuneData.immuneAction.actions.length > 0 && (
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
              {isLocked ? "HARDENED" : (immuneData?.preventionPolicy?.policy || '—')}
            </p>
            {immuneData?.preventionPolicy?.notes && (
              <p className="mt-2 text-xs text-(--color-text-muted) leading-relaxed">
                {immuneData.preventionPolicy.notes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImmuneSystemPanel;