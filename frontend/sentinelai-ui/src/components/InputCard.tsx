import type { AnalyzeRequest } from "../types";

export function InputCard({
  value,
  onChange,
  onRun,
  disabled,
  loading,
}: {
  value: AnalyzeRequest;
  onChange: (v: AnalyzeRequest) => void;
  onRun: () => void;
  disabled: boolean;
  loading: boolean;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_22px_70px_rgba(0,0,0,0.60)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0a0a0f]/35">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100">Immune Analysis</div>
              <div className="mt-0.5 text-xs text-slate-500">Message + URL signal ingestion</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-300">Message</label>
          <textarea
            value={value.text}
            onChange={(e) => onChange({ ...value, text: e.target.value })}
            disabled={disabled || loading}
            rows={5}
            placeholder="Paste a message, DM, email content, or describe behavior..."
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#05050d]/50 px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-300">URL</label>
          <input
            value={value.url}
            onChange={(e) => onChange({ ...value, url: e.target.value })}
            disabled={disabled || loading}
            placeholder="https://example.com"
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#05050d]/50 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            Backend payload: <span className="text-slate-400">text</span>, <span className="text-slate-400">url</span>,{" "}
            <span className="text-slate-400">child_mode</span>, <span className="text-slate-400">network_risk</span>
          </div>
          <button
            type="button"
            onClick={onRun}
            disabled={disabled || loading || value.text.trim().length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-sky-400 px-4 py-2.5 text-sm font-semibold text-[#070712] shadow-[0_12px_40px_rgba(34,211,238,0.18)] transition hover:brightness-110 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
            </svg>
            {loading ? "Analyzing…" : "Run Immune Analysis"}
          </button>
        </div>
      </div>
    </section>
  );
}
