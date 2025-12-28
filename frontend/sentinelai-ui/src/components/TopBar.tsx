import type { RiskLevel } from "../types";
import { Badge } from "./Badge";

function beaconTone(riskLevel: RiskLevel | null) {
  if (!riskLevel) return "neutral" as const;
  if (riskLevel === "LOW") return "success" as const;
  if (riskLevel === "MEDIUM") return "warning" as const;
  if (riskLevel === "HIGH") return "danger" as const;
  return "critical" as const;
}

export function TopBar({ riskLevel }: { riskLevel: RiskLevel | null }) {
  const tone = beaconTone(riskLevel);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-gradient-to-b from-[#0a0a0f]/85 to-[#0a0a0f]/55 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.55)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
                <path d="M8.5 12l2.3 2.3L15.8 9.3" />
              </svg>
            </div>
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-wide text-slate-100">SentinelAI</div>
            <div className="mt-0.5 truncate text-[11px] text-slate-400">Cyber Defense</div>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 md:block">
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-4.3-4.3" />
                <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
              </svg>
            </div>
            <input
              placeholder="Search security tools, reports, or alerts…"
              className="w-full rounded-xl border border-white/10 bg-[#05050d]/45 py-2 pl-10 pr-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-300">Immune Status</div>
            <div className="text-[11px] text-slate-500">Real-time verdict</div>
          </div>

          <div className="relative">
            <span
              className={`absolute -inset-1 rounded-full ${
                tone === "success"
                  ? "animate-pulse-soft bg-emerald-500/20"
                  : tone === "warning"
                    ? "animate-pulse-soft bg-amber-400/20"
                    : tone === "danger"
                      ? "animate-pulse-soft bg-red-500/20"
                      : tone === "critical"
                        ? "animate-pulse-soft bg-fuchsia-400/20"
                        : "animate-pulse-soft bg-white/10"
              }`}
            />
            <Badge tone={tone}>{riskLevel ?? "NO DATA"}</Badge>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 text-slate-200 transition hover:border-white/15"
            aria-label="Notifications"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
              <path d="M10 21a2 2 0 0 0 4 0" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white shadow">
              3
            </span>
          </button>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-100">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-slate-100">Security Admin</div>
              <div className="text-[11px] text-slate-500">admin@sentinel.ai</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
