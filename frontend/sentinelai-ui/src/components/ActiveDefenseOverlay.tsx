import type { AnalyzeResponse } from "../types";
import { Badge } from "./Badge";

export function ActiveDefenseOverlay({
  result,
  open,
}: {
  result: AnalyzeResponse | null;
  open: boolean;
}) {
  if (!open || !result) return null;

  const criticality = result.incidentResponse?.severity ?? "CRITICAL";

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0a0f]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.75)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-300">ACTIVE DEFENSE</div>
              <h2 className="mt-1 text-xl font-semibold text-slate-100">Threat blocked by SentinelAI</h2>
              <p className="mt-2 text-sm text-slate-400">
                Backend verdict is <span className="font-semibold text-slate-200">{result.riskLevel}</span>. Interaction is
                temporarily disabled.
              </p>
            </div>
            <Badge tone={criticality === "CRITICAL" ? "critical" : "danger"}>{criticality}</Badge>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold text-slate-100">Recovery / Next Steps</div>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
              {(result.incidentResponse?.nextSteps ?? []).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            Recommended action: <span className="text-slate-300">{result.recommendedAction}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
