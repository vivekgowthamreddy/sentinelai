import { useState } from 'react';
import Topbar from '../components/Topbar';
import AnalyzerForm from '../components/AnalyzerForm';
import ResultSummary from '../components/ResultSummary';
import ImmuneSystemPanel from '../components/ImmuneSystemPanel';
import ActiveDefenseOverlay from '../components/ActiveDefenseOverlay';
import CautionPanel from '../components/CautionPanel';
import type { ThreatAnalysisRequest, ThreatAnalysisResult, ImmuneSystemResponse } from '../types/schema';
import { analyzeThreat, immuneCheck } from '../api/sentinelApi';

const ThreatAnalyzer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ThreatAnalysisResult | null>(null);
    const [immuneData, setImmuneData] = useState<ImmuneSystemResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (_data: ThreatAnalysisRequest) => {
        setIsLoading(true);
        setResult(null);
        setImmuneData(null);
        setError(null);

        try {
            // Call both endpoints in parallel
            const [analysisResult, immuneResult] = await Promise.allSettled([
                analyzeThreat(_data),
                immuneCheck(_data),
            ]);

            // Handle analysis result
            if (analysisResult.status === 'fulfilled' && analysisResult.value) {
                setResult(analysisResult.value);
            } else if (analysisResult.status === 'rejected') {
                const errorData = analysisResult.reason as any;
                throw new Error(errorData?.message || 'Analysis failed');
            }

            // Handle immune check result (non-critical, can fail gracefully)
            if (immuneResult.status === 'fulfilled' && immuneResult.value) {
                setImmuneData(immuneResult.value);
            } else {
                console.warn('Immune check failed, continuing without immune data');
            }
        } catch (error: any) {
            console.error('Analysis failed:', error);
            setError(
                error?.message ||
                'Unable to analyze threat. Please ensure the backend is running and try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Active Defense Overlay for HIGH/CRITICAL risks */}
            {result && (result.riskLevel === 'High' || result.riskLevel === 'Critical') && (
                <ActiveDefenseOverlay result={result} />
            )}

            <div className="h-full flex flex-col">
                <Topbar
                    title="Threat Analyzer"
                    subtitle="Analyze suspicious text or URLs to assess digital risk"
                />

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
                        <AnalyzerForm onAnalyze={handleAnalyze} isLoading={isLoading} />

                        {isLoading && (
                            <div className="card p-6 sm:p-8 text-center">
                                <p className="text-(--color-text-secondary)">Analyzing threat...</p>
                            </div>
                        )}

                        {error && (
                            <div className="card p-5 sm:p-6">
                                <h2 className="text-sm font-medium text-(--color-text-primary)">Connection required</h2>
                                <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Caution Panel for MEDIUM risk */}
                        {result && result.riskLevel === 'Medium' && (
                            <CautionPanel result={result} />
                        )}

                        {result && (
                            <>
                                <ResultSummary result={result} />
                                <ImmuneSystemPanel immuneData={immuneData} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThreatAnalyzer;
