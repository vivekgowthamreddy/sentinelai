import type { AnalyzeResponse } from "../types";
import { Badge } from "./Badge";

export function CautionPanel({ result }: { result: AnalyzeResponse }) {
  return (
    <section className="sticky top-[88px] z-10 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-amber-200">CAUTION MODE</div>
          <div className="mt-1 text-sm font-semibold text-slate-100">Medium-risk activity detected</div>
          <div className="mt-1 text-xs text-slate-400">
            You can continue, but SentinelAI recommends additional verification.
          </div>
        </div>
        <Badge tone="warning">{result.incidentResponse?.severity ?? "WARNING"}</Badge>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-[#0a0a0f]/30 p-4">
        <div className="text-sm font-semibold text-slate-100">Suggested Next Steps</div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-200">
          {(result.incidentResponse?.nextSteps ?? []).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
