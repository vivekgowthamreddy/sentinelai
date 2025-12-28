import type { AnalyzeResponse } from "../types";

export function IncidentTimeline({ result }: { result: AnalyzeResponse | null }) {
  const timeline = result?.incidentTimeline ?? [];

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#05050d]/40">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-200" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 8v4l3 2" />
            <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">Threat Memory</div>
          <div className="mt-0.5 text-sm font-semibold text-slate-100">Incident Timeline</div>
        </div>
      </div>

      <div className="mt-5">
        {timeline.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#05050d]/35 p-4 text-sm text-slate-400">
            No incidents recorded yet.
          </div>
        ) : (
          <div className="relative pl-6">
            <div className="absolute left-2 top-1 bottom-1 w-px bg-white/10" />
            <div className="space-y-4">
              {timeline.map((item) => {
                const details = Object.entries(item.details)
                  .slice(0, 3)
                  .map(([k, v]) => `${k}: ${String(v)}`)
                  .join(" • ");

                return (
                  <div key={item.timestamp} className="relative">
                    <div className="absolute -left-[2px] top-1.5 h-3 w-3 rounded-full border border-white/15 bg-cyan-300/30 shadow-[0_0_0_4px_rgba(34,211,238,0.08)]" />
                    <div className="rounded-xl border border-white/10 bg-[#05050d]/35 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs font-semibold text-slate-100">{item.eventType}</div>
                        <div className="text-[11px] text-slate-500">{new Date(item.timestamp).toLocaleString()}</div>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-400">{details}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
