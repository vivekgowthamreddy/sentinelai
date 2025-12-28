import { useState } from "react";
import Topbar from "../components/Topbar";
import AnalyzerForm from "../components/AnalyzerForm";
import ResultSummary from "../components/ResultSummary";
import ImmuneSystemPanel from "../components/ImmuneSystemPanel";
import ActiveDefenseOverlay from "../components/ActiveDefenseOverlay";
import CautionPanel from "../components/CautionPanel";
import type {
    ThreatAnalysisRequest,
    ThreatAnalysisResult,
    ImmuneSystemResponse,
} from "../types/schema";
import { analyzeThreat, immuneCheck } from "../api/sentinelApi";

const ThreatAnalyzer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ThreatAnalysisResult | null>(null);
    const [immune, setImmune] = useState<ImmuneSystemResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (data: ThreatAnalysisRequest) => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        setImmune(null);

        try {
            const payload: ThreatAnalysisRequest = {
                text: data.text,
                url: data.url || "",
                childMode: data.childMode,
                networkRisk: data.networkRisk,
            };

            console.log("SENDING PAYLOAD:", payload);
            const analysisResult = await analyzeThreat(payload);
            console.log("ANALYZE RESULT:", analysisResult);
            setResult(analysisResult);

            // Call immune check
            const immuneResult = await immuneCheck(payload);
            console.log("IMMUNE RESULT:", immuneResult);
            setImmune(immuneResult);
        } catch (err: unknown) {
            console.error("Analyze failed:", err);
            const error = err as { response?: { data?: { detail?: string } }; message?: string };
            setError(
                error?.response?.data?.detail ||
                error?.message ||
                "Failed to analyze threat. Please check backend connection."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Active Defense Overlay for HIGH / CRITICAL risks */}
            {result &&
                (result.riskLevel === "High" || result.riskLevel === "Critical") && (
                    <ActiveDefenseOverlay result={result} />
                )}

            <div className="h-full flex flex-col">
                <Topbar
                    title="Threat Analyzer"
                    subtitle="Analyze suspicious text or URLs to assess digital risk"
                />

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
                        {/* Analyzer Form */}
                        <AnalyzerForm
                            onAnalyze={handleAnalyze}
                            isLoading={isLoading}
                        />

                        {/* Loading */}
                        {isLoading && (
                            <div className="card p-6 sm:p-8 text-center">
                                <p className="text-(--color-text-secondary)">
                                    Analyzing threat…
                                </p>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="card p-5 sm:p-6">
                                <h2 className="text-sm font-medium text-(--color-text-primary)">
                                    System Error
                                </h2>
                                <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Caution Panel for MEDIUM risk */}
                        {result && result.riskLevel === "Medium" && (
                            <CautionPanel result={result} />
                        )}

                        {/* Results */}
                        {result && (
                            <>
                                <ResultSummary result={result} />
                                {immune && <ImmuneSystemPanel immuneData={immune} />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThreatAnalyzer;
