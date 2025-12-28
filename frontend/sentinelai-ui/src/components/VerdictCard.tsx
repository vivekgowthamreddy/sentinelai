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
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-100">Verdict</div>
          <div className="mt-1 text-xs text-slate-500">Backend-authoritative decision</div>
        </div>
        <Badge tone={tone}>{result.riskLevel}</Badge>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/40 p-4">
          <div className="text-[11px] text-slate-400">Global Risk Score</div>
          <div className="mt-1 text-2xl font-semibold text-slate-100">{result.globalRiskScore}</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[11px] text-slate-400">Recommended Action</div>
            <div className="text-xs font-semibold text-slate-200">{result.recommendedAction}</div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0a0a0f]/40 p-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px] text-slate-400">ML Risk Probability</div>
            <div className="text-xs font-semibold text-slate-200">
              {Math.round(result.mlRiskProbability * 100)}%
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar value={result.mlRiskProbability * 100} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] text-slate-500">Network Risk</div>
              <div className="mt-1 text-xs font-semibold text-slate-200">{result.networkRiskLevel}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Child Mode</div>
              <div className="mt-1 text-xs font-semibold text-slate-200">
                {result.isChildMode ? "ENABLED" : "DISABLED"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-xs font-semibold text-slate-100">Threat Vectors</div>
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
