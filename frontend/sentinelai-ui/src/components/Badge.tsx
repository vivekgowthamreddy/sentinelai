import type { ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "danger" | "critical";

export function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase backdrop-blur";
  const toneClass =
    tone === "success"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]"
      : tone === "warning"
        ? "border-amber-300/30 bg-amber-300/10 text-amber-100 shadow-[0_0_0_1px_rgba(245,158,11,0.10)]"
        : tone === "danger"
          ? "border-red-400/30 bg-red-400/10 text-red-100 shadow-[0_0_0_1px_rgba(248,113,113,0.10)]"
          : tone === "critical"
            ? "border-fuchsia-300/35 bg-fuchsia-300/10 text-fuchsia-100 shadow-[0_0_0_1px_rgba(232,121,249,0.10)]"
            : "border-white/10 bg-white/5 text-slate-100";

  return (
    <span className={`${base} ${toneClass} relative overflow-hidden`}>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
      <span className="relative">{children}</span>
    </span>
  );
}
