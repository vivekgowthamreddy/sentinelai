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
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.55)]" />
            <h1 className="truncate text-base font-semibold tracking-wide text-slate-100">SentinelAI</h1>
          </div>
          <p className="mt-1 text-xs text-slate-400">AI Immune System Active</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-xs font-medium text-slate-300">Immune Status Beacon</div>
            <div className="text-[11px] text-slate-500">Real-time backend verdict</div>
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
        </div>
      </div>
    </header>
  );
}
