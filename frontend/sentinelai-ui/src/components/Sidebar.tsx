import type { AnalyzeResponse, NetworkRisk } from "../types";
import { Badge } from "./Badge";

export function Sidebar({
  lastResult,
  childMode,
  onChildMode,
  networkRisk,
  onNetworkRisk,
}: {
  lastResult: AnalyzeResponse | null;
  childMode: boolean;
  onChildMode: (v: boolean) => void;
  networkRisk: NetworkRisk;
  onNetworkRisk: (v: NetworkRisk) => void;
}) {
  const risk = lastResult?.riskLevel ?? null;

  return (
    <aside className="h-[calc(100vh-72px)] w-full border-r border-white/10 bg-white/[0.02] px-5 py-5">
      <div className="space-y-6">
        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-100">Immune Status</div>
            <Badge
              tone={
                risk === "LOW"
                  ? "success"
                  : risk === "MEDIUM"
                    ? "warning"
                    : risk === "HIGH"
                      ? "danger"
                      : risk === "CRITICAL"
                        ? "critical"
                        : "neutral"
              }
            >
              {risk ?? "NO DATA"}
            </Badge>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-[#0a0a0f]/40 p-3">
              <div className="text-[11px] text-slate-400">Global Score</div>
              <div className="mt-1 text-lg font-semibold text-slate-100">
                {lastResult ? lastResult.globalRiskScore : "-"}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0a0a0f]/40 p-3">
              <div className="text-[11px] text-slate-400">Action</div>
              <div className="mt-1 text-sm font-semibold text-slate-100">
                {lastResult ? lastResult.recommendedAction : "-"}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-slate-100">Active Policies</div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-200">Child Safety Mode</div>
                <div className="text-[11px] text-slate-500">Escalates risk decisions</div>
              </div>
              <button
                type="button"
                onClick={() => onChildMode(!childMode)}
                className={`relative h-7 w-12 rounded-full border transition-colors ${
                  childMode ? "border-emerald-500/40 bg-emerald-500/15" : "border-white/10 bg-white/5"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white/80 shadow transition-all ${
                    childMode ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-200">Network Risk Level</div>
                  <div className="text-[11px] text-slate-500">Backend fusion input</div>
                </div>
              </div>
              <select
                value={networkRisk}
                onChange={(e) => onNetworkRisk(e.target.value as NetworkRisk)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#0a0a0f]/50 px-3 py-2 text-sm text-slate-100 outline-none ring-0 focus:border-cyan-400/40"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-slate-100">Threat Memory</div>
          <div className="mt-3 space-y-3">
            {(lastResult?.incidentTimeline ?? []).length === 0 ? (
              <div className="text-xs text-slate-500">No incidents recorded yet.</div>
            ) : (
              lastResult!.incidentTimeline.map((item) => (
                <div key={item.timestamp} className="rounded-lg border border-white/10 bg-[#0a0a0f]/40 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-200">{item.eventType}</div>
                    <div className="text-[11px] text-slate-500">{new Date(item.timestamp).toLocaleString()}</div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    {Object.entries(item.details)
                      .slice(0, 3)
                      .map(([k, v]) => `${k}: ${String(v)}`)
                      .join(" • ")}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </aside>
  );
}
