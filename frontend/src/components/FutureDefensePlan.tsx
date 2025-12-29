import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Terminal, Server, Zap, ChevronRight } from 'lucide-react';

interface Recommendation {
    id: string;
    title: string;
    description: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
    impact: string;
    effort: 'LOW' | 'MEDIUM' | 'HIGH';
    command: string;
}

interface FutureDefensePlanProps {
    scanResult?: any; // Pass the raw scan result
    className?: string;
}

const FutureDefensePlan = ({ scanResult, className = "" }: FutureDefensePlanProps) => {
    const [plan, setPlan] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);

    useEffect(() => {
        const fetchPlan = async () => {
            if (!scanResult) return;

            setLoading(true);
            try {
                const response = await fetch('http://localhost:8000/api/defense-plan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(scanResult),
                });

                if (response.ok) {
                    const data = await response.json();
                    setPlan(data);
                    if (data.length > 0) setSelectedRec(data[0]);
                }
            } catch (err) {
                console.error("Failed to fetch defense plan", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, [scanResult]);

    if (!scanResult) return null;

    if (loading) {
        return (
            <div className={`p-8 flex items-center justify-center ${className}`}>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400 font-mono animate-pulse">Consulting Cyber Defense Matrix...</p>
                </div>
            </div>
        );
    }

    if (plan.length === 0) {
        return (
            <div className={`card p-8 text-center ${className}`}>
                <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Passive Weaknesses Dectected</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                    The active scan did not trigger any automatic defense recommendations. Your system appears hardened against basic scans.
                </p>
            </div>
        );
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'CRITICAL': return 'text-red-500 border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
            case 'HIGH': return 'text-orange-500 border-orange-500/50 bg-orange-500/10';
            case 'MEDIUM': return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
            case 'LOW': return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
            default: return 'text-slate-400 border-slate-600 bg-slate-800';
        }
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/20">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-shimmer bg-[size:200%_auto]">
                        Future Defense Protocol
                    </h2>
                    <p className="text-slate-400 text-sm">Automated hardening recommendations based on threat vectors</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LIST OF RECOMMENDATIONS */}
                <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {plan.map((item, idx) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setSelectedRec(item)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${selectedRec?.id === item.id
                                ? 'bg-slate-800 border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                                : 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'
                                }`}
                        >
                            {selectedRec?.id === item.id && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute inset-0 bg-blue-500/5 pointer-events-none"
                                />
                            )}
                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityColor(item.severity)}`}>
                                    {item.severity}
                                </span>
                                <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${selectedRec?.id === item.id ? 'rotate-90 text-blue-400' : ''}`} />
                            </div>
                            <h4 className={`font-semibold text-sm relative z-10 ${selectedRec?.id === item.id ? 'text-white' : 'text-slate-300'}`}>
                                {item.title}
                            </h4>
                        </motion.button>
                    ))}
                </div>

                {/* DETAIL VIEW */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {selectedRec && (
                            <motion.div
                                key={selectedRec.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="card bg-slate-900/50 backdrop-blur-md border border-slate-700 p-6 h-full flex flex-col relative"
                            >
                                {/* Background Tech Pattern */}
                                <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                                                <Shield className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white tracking-wide">{selectedRec.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-mono text-slate-500">ID: {selectedRec.id}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                                                    <span className="text-xs text-slate-400">Impact: {selectedRec.impact}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                            <h5 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold flex items-center gap-2">
                                                <AlertTriangle className="w-3 h-3" /> Vulnerability Context
                                            </h5>
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                {selectedRec.description}
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="text-xs uppercase tracking-wider text-blue-400 mb-3 font-semibold flex items-center gap-2">
                                                <Terminal className="w-3 h-3" /> Remediation Command
                                            </h5>
                                            <div className="group relative rounded-xl bg-black/40 border border-slate-800 overflow-hidden font-mono text-sm">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50" />
                                                <div className="flex items-center justify-between p-4">
                                                    <code className="text-green-400 break-all pl-2">
                                                        {selectedRec.command}
                                                    </code>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(selectedRec.command)}
                                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                                                        title="Copy Command"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                                                <span className="text-xs text-slate-500 block mb-1">Implementation Effort</span>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${selectedRec.effort === 'HIGH' ? 'bg-red-500' : selectedRec.effort === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                                                    <span className="text-sm font-medium text-slate-200">{selectedRec.effort}</span>
                                                </div>
                                            </div>
                                            <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                                                <span className="text-xs text-slate-500 block mb-1">Defense Layer</span>
                                                <div className="flex items-center gap-2">
                                                    <Server className="w-3 h-3 text-slate-400" />
                                                    <span className="text-sm font-medium text-slate-200">Network / System</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 flex justify-end">
                                        <button className="btn-primary text-sm">
                                            Generate Report
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default FutureDefensePlan;
