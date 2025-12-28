import type { AnalyzeResponse } from "../types";
import { Badge } from "./Badge";

export function CautionPanel({ result }: { result: AnalyzeResponse }) {
  return (
    <section className="sticky top-[88px] z-10 rounded-2xl border border-amber-300/25 bg-gradient-to-b from-amber-300/12 to-white/5 p-5 shadow-[0_0_0_1px_rgba(245,158,11,0.10),0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-300/25 bg-[#05050d]/30">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-200" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M10.3 4.3l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-2.7l-8-14a2 2 0 0 0-3.4 0z" />
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-200">Caution Mode</div>
              <div className="mt-0.5 text-sm font-semibold text-slate-100">Medium-risk activity detected</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-300/90">
            Continue is allowed, but verification is recommended.
          </div>
        </div>
        <Badge tone="warning">{result.incidentResponse?.severity ?? "WARNING"}</Badge>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-[#05050d]/35 p-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-300">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-200" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4" />
            <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
          </svg>
          Suggested Next Steps
        </div>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-200">
          {(result.incidentResponse?.nextSteps ?? []).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
