import { useMemo, useState } from "react";
import { analyze } from "./lib/api";
import type { AnalyzeRequest, AnalyzeResponse, NetworkRisk, RiskLevel } from "./types";
import { ActiveDefenseOverlay } from "./components/ActiveDefenseOverlay";
import { CautionPanel } from "./components/CautionPanel";
import { InputCard } from "./components/InputCard";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { VerdictCard } from "./components/VerdictCard";

function isBlockingRisk(riskLevel: RiskLevel | null) {
  return riskLevel === "HIGH" || riskLevel === "CRITICAL";
}

export default function App() {
  const [form, setForm] = useState<AnalyzeRequest>({
    text: "",
    url: "",
    child_mode: false,
    network_risk: "MEDIUM",
  });

  const [lastResult, setLastResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const riskLevel = lastResult?.riskLevel ?? null;
  const overlayOpen = useMemo(() => {
    if (!lastResult) return false;
    return isBlockingRisk(lastResult.riskLevel);
  }, [lastResult]);

  const inputsDisabled = loading || overlayOpen;

  async function runAnalysis() {
    setError(null);
    setLoading(true);

    try {
      const res = await analyze(form);
      setLastResult(res);
    } catch (e) {
      setLastResult(null);
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function setChildMode(v: boolean) {
    setForm((prev) => ({ ...prev, child_mode: v }));
  }

  function setNetworkRisk(v: NetworkRisk) {
    setForm((prev) => ({ ...prev, network_risk: v }));
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar riskLevel={riskLevel} />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-0 sm:px-6 lg:grid-cols-[360px_1fr]">
        <div className="hidden lg:block">
          <Sidebar
            lastResult={lastResult}
            childMode={form.child_mode}
            onChildMode={setChildMode}
            networkRisk={form.network_risk}
            onNetworkRisk={setNetworkRisk}
          />
        </div>

        <section className="min-h-[calc(100vh-72px)] px-6 py-6 sm:px-0">
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-100">AI Immune Command Center</div>
                  <div className="mt-1 text-xs text-slate-500">
                    UI decisions are enforced by backend response from <span className="text-slate-300">POST /analyze</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  Network Risk: <span className="font-semibold text-slate-200">{form.network_risk}</span>
                  <span className="mx-2 text-slate-600">|</span>
                  Child Mode: <span className="font-semibold text-slate-200">{form.child_mode ? "ON" : "OFF"}</span>
                </div>
              </div>
            </div>

            {error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            {lastResult?.riskLevel === "MEDIUM" ? <CautionPanel result={lastResult} /> : null}

            <InputCard
              value={form}
              onChange={setForm}
              onRun={runAnalysis}
              disabled={inputsDisabled}
              loading={loading}
            />

            {lastResult ? <VerdictCard result={lastResult} /> : null}

            <div className="lg:hidden">
              <Sidebar
                lastResult={lastResult}
                childMode={form.child_mode}
                onChildMode={setChildMode}
                networkRisk={form.network_risk}
                onNetworkRisk={setNetworkRisk}
              />
            </div>
          </div>
        </section>
      </main>

      <ActiveDefenseOverlay
        result={lastResult}
        open={overlayOpen}
      />
    </div>
  );
}
