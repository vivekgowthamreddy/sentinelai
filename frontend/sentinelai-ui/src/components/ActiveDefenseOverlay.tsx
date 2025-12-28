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
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
      <div className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(circle_at_20%_0%,rgba(248,113,113,0.25),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(232,121,249,0.14),transparent_55%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded-2xl border border-red-400/20 bg-gradient-to-b from-[#0a0a0f]/92 to-[#05050d]/92 p-6 shadow-[0_0_0_1px_rgba(248,113,113,0.10),0_35px_120px_rgba(0,0,0,0.78)]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-100" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                    <path d="M10.3 4.3l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-2.7l-8-14a2 2 0 0 0-3.4 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-red-200">Active Defense</div>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-100">Threat blocked by SentinelAI</h2>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Backend verdict: <span className="font-semibold text-slate-100">{result.riskLevel}</span>. Inputs are locked.
              </p>
            </div>
            <Badge tone={criticality === "CRITICAL" ? "critical" : "danger"}>{criticality}</Badge>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-[#05050d]/45 p-4">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-300">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-red-200" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
                <path d="M8 12h8" />
              </svg>
              Recovery / Next Steps
            </div>
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
