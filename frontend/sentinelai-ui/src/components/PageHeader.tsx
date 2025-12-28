export function PageHeader() {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-6 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-slate-100">SentinelAI – AI Immune Command Center</div>
          <div className="mt-1 text-sm text-slate-400">Real-time digital threat detection and immune response</div>
        </div>
        <div className="hidden text-right sm:block">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400">Cyber Defense</div>
          <div className="mt-1 text-xs text-slate-500">Enterprise-grade posture visualization</div>
        </div>
      </div>
    </section>
  );
}
