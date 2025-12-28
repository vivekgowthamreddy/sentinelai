import { AlertCircle } from 'lucide-react';
import type { ThreatAnalysisResult } from '../types/schema';

interface CautionPanelProps {
    result: ThreatAnalysisResult;
}

const CautionPanel = ({ result }: CautionPanelProps) => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 sm:p-6 rounded-lg">
            <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-yellow-900 mb-2">
                        Caution: Medium Risk Detected
                    </h3>
                    <p className="text-sm text-yellow-800 leading-relaxed mb-3">
                        {result.recommendedAction}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="badge badge-warning">Risk Score: {result.globalRiskScore}</span>
                        <span className="badge badge-warning">
                            Confidence: {typeof result.confidence === 'number' ? `${Math.round(result.confidence * 100)}%` : result.confidence}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CautionPanel;
