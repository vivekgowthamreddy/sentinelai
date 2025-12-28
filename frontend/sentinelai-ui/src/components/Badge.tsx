import type { ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "danger" | "critical";

export function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  const base = "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide";
  const toneClass =
    tone === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
      : tone === "warning"
        ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
        : tone === "danger"
          ? "border-red-500/30 bg-red-500/10 text-red-200"
          : tone === "critical"
            ? "border-fuchsia-400/35 bg-fuchsia-400/10 text-fuchsia-200"
            : "border-white/10 bg-white/5 text-slate-200";

  return <span className={`${base} ${toneClass}`}>{children}</span>;
}
