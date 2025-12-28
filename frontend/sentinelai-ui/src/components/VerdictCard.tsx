import type { AnalyzeResponse } from "../types";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { Tag } from "./Tag";

export function VerdictCard({ result }: { result: AnalyzeResponse }) {
  const tone =
    result.riskLevel === "LOW"
      ? "success"
      : result.riskLevel === "MEDIUM"
        ? "warning"
        : result.riskLevel === "HIGH"
          ? "danger"
          : "critical";

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_22px_70px_rgba(0,0,0,0.55)] backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">Threat Verdict</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#05050d]/40">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-100" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-100">Risk Level</div>
              <div className="mt-0.5 text-xs text-slate-500">Backend-authoritative</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge tone={tone}>{result.riskLevel}</Badge>
          <div className="text-[11px] text-slate-500">Score: {result.globalRiskScore}/100</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#05050d]/40 p-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">Recommended Action</div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-100">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
              </svg>
              {result.recommendedAction}
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-[11px] text-slate-500">Global Risk Score</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight text-slate-100">{result.globalRiskScore}</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#05050d]/40 p-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">ML Probability</div>
            <div className="text-xs font-semibold text-slate-100">{Math.round(result.mlRiskProbability * 100)}%</div>
          </div>
          <div className="mt-3">
            <ProgressBar value={result.mlRiskProbability * 100} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] text-slate-500">Network</div>
              <div className="mt-1 text-xs font-semibold text-slate-100">{result.networkRiskLevel}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Child Mode</div>
              <div className="mt-1 text-xs font-semibold text-slate-100">
                {result.isChildMode ? "ENABLED" : "DISABLED"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M6 12h12M8 17h8" />
          </svg>
          Threat Vectors
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(result.threatVectors ?? []).length === 0 ? (
            <div className="text-xs text-slate-500">None detected.</div>
          ) : (
            result.threatVectors.map((v) => <Tag key={v}>{v}</Tag>)
          )}
        </div>
      </div>
    </section>
  );
}
