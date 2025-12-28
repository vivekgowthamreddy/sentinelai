import { useState } from 'react';
import Topbar from '../components/Topbar';
import AnalyzerForm from '../components/AnalyzerForm';
import ResultSummary from '../components/ResultSummary';
import ImmuneSystemPanel from '../components/ImmuneSystemPanel';
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
      const [analysisResult, immuneResult] = await Promise.all([
        analyzeThreat(_data),
        immuneCheck(_data),
      ]);
      setResult(analysisResult);
      setImmuneData(immuneResult);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(
        'Unable to reach the SentinelAI API. Configure VITE_API_BASE_URL (or proxy /api) and ensure the backend is running.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

          {result && (
            <>
              <ResultSummary result={result} />
              <ImmuneSystemPanel immuneData={immuneData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatAnalyzer;