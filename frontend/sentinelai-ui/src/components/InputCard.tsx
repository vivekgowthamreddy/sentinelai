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
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.55)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-100">Immune Analysis Input</div>
          <div className="mt-1 text-xs text-slate-500">Simulate message / behavior + optional URL</div>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        <div>
          <label className="text-xs font-medium text-slate-300">Message / Behavior</label>
          <textarea
            value={value.text}
            onChange={(e) => onChange({ ...value, text: e.target.value })}
            disabled={disabled || loading}
            rows={5}
            placeholder="Paste a message, DM, email content, or describe behavior..."
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0a0a0f]/60 px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-300">URL (optional)</label>
          <input
            value={value.url}
            onChange={(e) => onChange({ ...value, url: e.target.value })}
            disabled={disabled || loading}
            placeholder="https://example.com"
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#0a0a0f]/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500">
            Payload sent to backend: <span className="text-slate-400">text, url, child_mode, network_risk</span>
          </div>
          <button
            type="button"
            onClick={onRun}
            disabled={disabled || loading || value.text.trim().length === 0}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-2.5 text-sm font-semibold text-[#0a0a0f] shadow-[0_10px_30px_rgba(34,211,238,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing…" : "Run Immune Analysis"}
          </button>
        </div>
      </div>
    </section>
  );
}
