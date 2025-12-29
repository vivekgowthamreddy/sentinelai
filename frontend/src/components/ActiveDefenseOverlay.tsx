import { AlertTriangle, Shield, Clock } from 'lucide-react';
import type { ThreatAnalysisResult } from '../types/schema';

interface ActiveDefenseOverlayProps {
    result: ThreatAnalysisResult;
    onClose: () => void;
}

const ActiveDefenseOverlay = ({ result, onClose }: ActiveDefenseOverlayProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="max-w-3xl w-full space-y-6 my-auto">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="relative">
                            <Shield className="w-20 h-20 text-red-500 animate-pulse" />
                            <AlertTriangle className="w-10 h-10 text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">
                            ACTIVE DEFENSE ENGAGED
                        </h1>
                        <p className="text-xl text-white/90">
                            {result?.riskLevel || 'HIGH'} Risk Detected
                        </p>
                    </div>
                </div>

                {/* Risk Score Card */}
                <div className="bg-red-950/50 border-2 border-red-500 rounded-lg p-6">
                    <div className="text-center">
                        <p className="text-sm text-red-300 mb-2">Risk Score</p>
                        <p className="text-6xl font-bold text-red-500">{result?.globalRiskScore ?? 'N/A'}</p>
                        <p className="text-sm text-red-300 mt-2">
                            Confidence: {result?.confidence != null && typeof result.confidence === 'number'
                                ? `${Math.round(result.confidence * 100)}%`
                                : result?.confidence || 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Recommended Action */}
                <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        Recommended Action
                    </h2>
                    <p className="text-white/90 leading-relaxed">{result?.recommendedAction || 'Follow security protocols'}</p>
                </div>

                {/* Incident Response */}
                <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        Incident Response Protocol
                    </h2>

                    {/* Ultra-defensive: handle incidentResponse as object OR string */}
                    {result?.incidentResponse ? (
                        typeof result.incidentResponse === 'object' && 'nextSteps' in result.incidentResponse ? (
                            <>
                                <p className="text-white/90 font-medium mb-2">
                                    Severity: {result.incidentResponse.severity || 'Not specified'}
                                </p>
                                {Array.isArray(result.incidentResponse.nextSteps) && result.incidentResponse.nextSteps.length > 0 && (
                                    <ul className="space-y-2">
                                        {result.incidentResponse.nextSteps.map((step: string, idx: number) => (
                                            <li key={idx} className="text-white/80 flex items-start gap-2">
                                                <span className="text-yellow-400 mt-1">→</span>
                                                <span>{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <p className="text-white/90">{String(result.incidentResponse)}</p>
                        )
                    ) : (
                        <p className="text-white/90">Follow incident response procedures</p>
                    )}

                    {/* Ultra-defensive: check array before mapping */}
                    {result?.incidentTimeline && Array.isArray(result.incidentTimeline) && result.incidentTimeline.length > 0 && (
                        <div className="pt-4 border-t border-gray-700 mt-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <p className="text-sm font-medium text-gray-300">Timeline</p>
                            </div>
                            <div className="space-y-2">
                                {result.incidentTimeline.map((item, idx: number) => (
                                    <div key={idx} className="text-sm text-white/80">
                                        <span className="font-medium">{item?.eventType || 'Event'}</span>
                                        <span className="text-gray-400 ml-2">{item?.timestamp ? new Date(item.timestamp).toLocaleString() : 'N/A'}</span>
                                        {item?.details && typeof item.details === 'object' && <span className="text-gray-300 ml-2">- {JSON.stringify(item.details)}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Warning Message & Actions */}
                <div className="text-center space-y-4">
                    <p className="text-sm text-red-400 font-medium">
                        ⚠ High Risk Threat Detected. Please proceed with extreme caution.
                    </p>

                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg transition-colors text-sm font-semibold uppercase tracking-wider"
                    >
                        I Acknowledge the Risk - Return to Analyzer
                    </button>

                    <p className="text-xs text-gray-500">
                        SentinelAI Immune System has logged this incident.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ActiveDefenseOverlay;
