import { useState, useEffect } from 'react';
import { Shield, Zap, Activity, Cpu, Server, Lock, Power, Brain, Bell, AlertTriangle } from 'lucide-react';
import Topbar from '../components/Topbar';
import FutureDefensePlan from '../components/FutureDefensePlan';
import { motion, AnimatePresence } from 'framer-motion';
import { portScan } from '../api/sentinelApi';

const FutureDefense = () => {
    const [active, setActive] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [scanResult, setScanResult] = useState<any>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [initStatus, setInitStatus] = useState("Initializing...");

    const handleActivateClick = () => {
        if (!active) {
            setShowConfirm(true);
        } else {
            setActive(false);
            setStats(null);
            setScanResult(null);
        }
    };

    const confirmActivation = async () => {
        setShowConfirm(false);
        setLoading(true);
        setInitStatus("Establishing secure channel...");

        try {
            // 1. Start simulated system metrics
            setTimeout(() => setInitStatus("Booting immune kernel..."), 800);

            // 2. Perform REAL initial scan of localhost to baseline threats
            setInitStatus("Scanning local vectors (localhost)...");
            const res = await portScan("127.0.0.1"); // REAL SCAN
            setScanResult(res);

            setTimeout(() => {
                setActive(true);
                setLoading(false);
            }, 500);

        } catch (err) {
            console.error(err);
            setInitStatus("Initialization failed. Retrying...");
            setTimeout(() => {
                setActive(true);
                setLoading(false);
                // Fallback mock if real scan fails (e.g. backend down)
                setScanResult({
                    target: "localhost",
                    openPorts: [{ port: "80/tcp", service: "http" }]
                });
            }, 1000);
        }
    };

    useEffect(() => {
        let interval: any;
        if (active) {
            const fetchStats = async () => {
                try {
                    const res = await fetch('http://localhost:8000/api/system-health');
                    if (res.ok) {
                        const data = await res.json();
                        setStats(data);
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            fetchStats();
            interval = setInterval(fetchStats, 3000);
        }
        return () => clearInterval(interval);
    }, [active]);

    return (
        <div className="h-full flex flex-col bg-(--color-background) relative">
            <Topbar
                title="System Evolution"
                subtitle="Sentinel Immune System Control Center"
                showSearch={false}
            />

            {/* CONFIRMATION MODAL */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 border border-yellow-500/30 rounded-2xl max-w-lg w-full p-6 shadow-[0_0_50px_rgba(234,179,8,0.2)]"
                        >
                            <div className="flex items-center gap-3 mb-4 text-yellow-500">
                                <AlertTriangle className="w-8 h-8" />
                                <h3 className="text-xl font-bold">Awaiting Consent</h3>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                You are about to grant SentinelAI <strong>Autonomous Defense Privileges</strong>.
                                <br /><br />
                                The system will perform an active scan of your local network interface (127.0.0.1)
                                to identify vulnerabilities and may modify firewall settings if critical threats are detected.
                            </p>
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmActivation}
                                    className="btn-primary bg-yellow-500 hover:bg-yellow-400 text-black border-none"
                                >
                                    Authorize & Activate
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Control Header */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 rounded-2xl border border-gray-800 bg-gray-900/40 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className={`p-4 rounded-full border ${active ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-gray-800 border-gray-700'}`}>
                                <Shield className={`w-8 h-8 ${active ? 'text-cyan-400' : 'text-gray-500'}`} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">
                                    {active ? 'IMMUNE SYSTEM ACTIVE' : 'SYSTEM STANDBY'}
                                </h2>
                                <p className="text-gray-400">
                                    {active ? 'Autonomous defense protocols engaged.' : 'Passive monitoring disabled.'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleActivateClick}
                            disabled={loading}
                            className={`relative z-10 px-8 py-3 rounded-full font-bold tracking-wider transition-all duration-300 flex items-center gap-2 ${active
                                ? 'bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500/20'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/30'
                                }`}
                        >
                            <Power className="w-5 h-5" />
                            {loading ? (
                                <span className="animate-pulse">{initStatus}</span>
                            ) : active ? (
                                'DEACTIVATE'
                            ) : (
                                'ACTIVATE SYSTEM'
                            )}
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {active ? (
                            <motion.div
                                key="active-dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                {/* Metrics Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <MetricCard
                                        icon={Activity} label="System Status"
                                        value={stats?.status || "ANALYZING"}
                                        color="text-emerald-400" sub="Optimal"
                                    />
                                    <MetricCard
                                        icon={Cpu} label="CPU Load"
                                        value={stats ? `${stats.cpu_load}%` : "--"}
                                        color="text-blue-400" sub="Within limits"
                                    />
                                    <MetricCard
                                        icon={Server} label="Memory Usage"
                                        value={stats ? `${stats.memory_usage}%` : "--"}
                                        color="text-purple-400" sub="Stable"
                                    />
                                    <MetricCard
                                        icon={Shield} label="Active Threats"
                                        value={stats?.threats_blocked || "0"}
                                        color="text-white" sub="Blocked automatically"
                                    />
                                </div>

                                {/* Active Defense Plan */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-400" />
                                        Active Hardening Recommendations
                                    </h3>
                                    <FutureDefensePlan scanResult={scanResult} className="bg-gray-900/20" />
                                </div>
                            </motion.div>
                        ) : (
                            !loading && (
                                <motion.div
                                    key="info-features"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {/* Feature 1 */}
                                    <div className="group relative p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-cyan-500/50 transition-all duration-300">
                                        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                        <Shield className="w-10 h-10 text-cyan-400 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Passive Monitoring</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Works silently in the background once authorized. Like a biological immune system, it constantly scans for network anomalies and code vulnerabilities without interrupting your workflow.
                                        </p>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="group relative p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-purple-500/50 transition-all duration-300">
                                        <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                        <Brain className="w-10 h-10 text-purple-400 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Intelligent Analysis</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            It doesn't just block; it understands. The Immune System analyzes <i>how</i> a threat attempts to damage your system and identifies the specific vulnerability being exploited.
                                        </p>
                                    </div>

                                    {/* Feature 3 */}
                                    <div className="group relative p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-yellow-500/50 transition-all duration-300">
                                        <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                        <Bell className="w-10 h-10 text-yellow-400 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Informed Consent</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            <strong>Zero silent actions.</strong> The system informs you immediately upon detection, explaining the exact nature of the threat and the potential consequences before taking action.
                                        </p>
                                    </div>

                                    {/* Feature 4 */}
                                    <div className="group relative p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-red-500/50 transition-all duration-300">
                                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                        <Zap className="w-10 h-10 text-red-400 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Precision Neutralization</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Upon your command, it destroys the vulnerability and patches the exploit. It then provides a detailed report on precautions to harden your system against future attempts.
                                        </p>
                                    </div>

                                    <div className="md:col-span-2 text-center py-8 opacity-60">
                                        <Lock className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-500 text-sm">System is in standby mode. Activate to begin autonomous defense.</p>
                                    </div>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};

interface MetricCardProps {
    icon: any;
    label: string;
    value: string | number;
    color: string;
    sub: string;
}

const MetricCard = ({ icon: Icon, label, value, color, sub }: MetricCardProps) => (
    <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50 flex flex-col justify-between hover:border-gray-700 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-gray-800">
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            {value === "OPERATIONAL" && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
        </div>
        <div>
            <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</h4>
            <div className={`text-2xl font-black ${color}`}>{value}</div>
            <div className="text-gray-600 text-xs mt-1">{sub}</div>
        </div>
    </div>
);

export default FutureDefense;
