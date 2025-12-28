import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      {children}
    </span>
  );
}
