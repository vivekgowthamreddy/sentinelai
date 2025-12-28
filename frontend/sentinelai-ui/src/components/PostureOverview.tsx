import type { AnalyzeResponse } from "../types";

function metricCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: "score" | "policies" | "posture" | "time";
}) {
  const iconSvg =
    icon === "score" ? (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h4l3 8 4-16 3 8h4" />
      </svg>
    ) : icon === "policies" ? (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
        <path d="M9 12h6" />
      </svg>
    ) : icon === "posture" ? (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 6v6l4 2" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 6v6l4 2" />
        <path d="M5 3v4" />
        <path d="M19 3v4" />
        <path d="M3 10h18" />
        <path d="M4 21h16" />
      </svg>
    );

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">{title}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">{value}</div>
          <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#05050d]/40">
          {iconSvg}
        </div>
      </div>
    </div>
  );
}

export function PostureOverview({ result }: { result: AnalyzeResponse | null }) {
  const lastScanTime = result?.incidentTimeline?.[0]?.timestamp
    ? new Date(result.incidentTimeline[0].timestamp).toLocaleString()
    : "-";

  const posture =
    !result
      ? "No Data"
      : result.riskLevel === "LOW"
        ? "Monitoring"
        : result.riskLevel === "MEDIUM"
          ? "Action Recommended"
          : "Immediate Action Required";

  const activePolicies = !result ? "-" : `${result.isChildMode ? "Child Safety" : "Standard"} • ${result.networkRiskLevel}`;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">System Posture Overview</div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {metricCard({
          title: "Global Risk Score",
          value: result ? String(result.globalRiskScore) : "-",
          subtitle: "Current combined score",
          icon: "score",
        })}
        {metricCard({
          title: "Active Policies",
          value: activePolicies,
          subtitle: "Child mode & network",
          icon: "policies",
        })}
        {metricCard({
          title: "Current Posture",
          value: posture,
          subtitle: "Operational stance",
          icon: "posture",
        })}
        {metricCard({
          title: "Last Scan Time",
          value: lastScanTime,
          subtitle: "From incident timeline",
          icon: "time",
        })}
      </div>
    </section>
  );
}
