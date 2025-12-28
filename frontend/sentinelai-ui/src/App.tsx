import { useMemo, useState } from "react";
import { analyze } from "./lib/api";
import type { AnalyzeRequest, AnalyzeResponse, NetworkRisk, RiskLevel } from "./types";
import { ActiveDefenseOverlay } from "./components/ActiveDefenseOverlay";
import { CautionPanel } from "./components/CautionPanel";
import { ImmuneResponseCard } from "./components/ImmuneResponseCard";
import { IncidentTimeline } from "./components/IncidentTimeline";
import { InputCard } from "./components/InputCard";
import { PageHeader } from "./components/PageHeader";
import { PostureOverview } from "./components/PostureOverview";
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
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(circle_at_85%_10%,rgba(99,102,241,0.12),transparent_50%),radial-gradient(circle_at_50%_110%,rgba(16,185,129,0.08),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>
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

        <section className="min-h-[calc(100vh-60px)] px-6 py-6 sm:px-0">
          <div className="space-y-6">
            <PageHeader />

            {error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <PostureOverview result={lastResult} />

            {lastResult?.riskLevel === "MEDIUM" ? <CautionPanel result={lastResult} /> : null}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <InputCard
                  value={form}
                  onChange={setForm}
                  onRun={runAnalysis}
                  disabled={inputsDisabled}
                  loading={loading}
                />
              </div>

              <div className="space-y-6">
                {lastResult ? <VerdictCard result={lastResult} /> : null}
                {lastResult ? <ImmuneResponseCard result={lastResult} /> : null}
              </div>
            </div>

            <IncidentTimeline result={lastResult} />

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
