import type { AnalyzeResponse, NetworkRisk } from "../types";
import { Badge } from "./Badge";

type NavIcon =
  | "dashboard"
  | "immune"
  | "child"
  | "transfer"
  | "password"
  | "ports"
  | "code"
  | "threat"
  | "reports"
  | "settings";

function Icon({ name }: { name: NavIcon }) {
  const base = "h-4 w-4";

  if (name === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 13h8V3H3v10z" />
        <path d="M13 21h8V11h-8v10z" />
        <path d="M13 3h8v6h-8V3z" />
        <path d="M3 17h8v4H3v-4z" />
      </svg>
    );
  }

  if (name === "immune") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (name === "child") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
        <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
      </svg>
    );
  }

  if (name === "transfer") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 7h10" />
        <path d="M7 7l3-3" />
        <path d="M7 7l3 3" />
        <path d="M17 17H7" />
        <path d="M17 17l-3-3" />
        <path d="M17 17l-3 3" />
      </svg>
    );
  }

  if (name === "password") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        <path d="M6 11h12v10H6V11z" />
      </svg>
    );
  }

  if (name === "ports") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7h16" />
        <path d="M7 12h10" />
        <path d="M10 17h4" />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 9l-3 3 3 3" />
        <path d="M16 9l3 3-3 3" />
        <path d="M14 6l-4 12" />
      </svg>
    );
  }

  if (name === "threat") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (name === "reports") {
    return (
      <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2h9l3 3v17H6V2z" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
        <path d="M9 9h3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={base} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" />
      <path d="M19.4 15a7.8 7.8 0 0 0 .1-2l2-1.2-2-3.4-2.3.6a7.4 7.4 0 0 0-1.7-1l-.3-2.4H10.7l-.3 2.4a7.4 7.4 0 0 0-1.7 1L6.4 8.4l-2 3.4 2 1.2a7.8 7.8 0 0 0 .1 2l-2 1.2 2 3.4 2.3-.6a7.4 7.4 0 0 0 1.7 1l.3 2.4h4.6l.3-2.4a7.4 7.4 0 0 0 1.7-1l2.3.6 2-3.4-2-1.2z" />
    </svg>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: NavIcon;
  label: string;
  active: boolean;
}) {
  return (
    <button
      type="button"
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
        active
          ? "border border-cyan-300/20 bg-cyan-300/10 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]"
          : "border border-transparent text-slate-200 hover:border-white/10 hover:bg-white/5"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
          active
            ? "border-cyan-300/20 bg-cyan-300/10"
            : "border-white/10 bg-[#05050d]/35 group-hover:border-white/15"
        }`}
      >
        <span className={active ? "text-cyan-100" : "text-slate-300"}>
          <Icon name={icon} />
        </span>
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

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
  const systemIsAlert = risk === "HIGH" || risk === "CRITICAL";

  return (
    <aside className="h-[calc(100vh-60px)] w-full border-r border-white/10 bg-gradient-to-b from-white/5 to-transparent px-4 py-4 backdrop-blur">
      <div className="flex h-full flex-col">
        <div className="mb-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-100">
                <Icon name="immune" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-100">SentinelAI</div>
                <div className="mt-0.5 text-[11px] text-slate-500">AI Immune Tools</div>
              </div>
            </div>
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
        </div>

        <nav className="space-y-1">
          <SidebarItem icon="dashboard" label="Dashboard" active={false} />
          <SidebarItem icon="immune" label="Immune Analysis" active={true} />
          <SidebarItem icon="child" label="Child Safety" active={false} />
          <SidebarItem icon="transfer" label="Secure Transfer" active={false} />
          <SidebarItem icon="password" label="Password Check" active={false} />
          <SidebarItem icon="ports" label="Port Scanner" active={false} />
          <SidebarItem icon="code" label="Code Analyzer" active={false} />
          <SidebarItem icon="threat" label="Threat Analysis" active={false} />
          <SidebarItem icon="reports" label="Reports & Alerts" active={false} />
          <SidebarItem icon="settings" label="Settings" active={false} />
        </nav>

        <section className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">Immune Analysis</div>
          <div className="mt-3 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-100">Child Safety Mode</div>
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
              <div className="text-xs font-semibold text-slate-100">Network Risk Level</div>
              <div className="mt-0.5 text-[11px] text-slate-500">LOW / MEDIUM / HIGH</div>
              <select
                value={networkRisk}
                onChange={(e) => onNetworkRisk(e.target.value as NetworkRisk)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#05050d]/45 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
          </div>
        </section>

        <div className="mt-auto pt-4">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">System Status</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    systemIsAlert ? "bg-red-400 shadow-[0_0_16px_rgba(248,113,113,0.45)]" : "bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                  }`}
                />
                <div className="text-sm font-semibold text-slate-100">{systemIsAlert ? "Alert" : "Operational"}</div>
              </div>
              <div className="text-[11px] text-slate-500">{risk ?? "NO DATA"}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
