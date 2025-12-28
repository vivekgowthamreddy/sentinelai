import type { AnalyzeResponse } from "../types";

export function ImmuneResponseCard({ result }: { result: AnalyzeResponse }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#05050d]/40">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">Recommended Immune Actions</div>
          <div className="mt-0.5 text-sm font-semibold text-slate-100">What you should do next</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-[#05050d]/35 p-4">
        <ul className="space-y-2 text-sm text-slate-200">
          {(result.incidentResponse?.nextSteps ?? []).map((s) => (
            <li key={s} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300/70" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-xs text-slate-500">
        Calm guidance, based on the backend verdict. No panic messaging.
      </div>
    </section>
  );
}
