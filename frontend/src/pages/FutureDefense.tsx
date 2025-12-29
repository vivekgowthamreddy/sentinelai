import { useState, useEffect } from 'react';
import { Shield, Zap, Bell, Lock, Cpu, Brain, Activity, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import Topbar from '../components/Topbar';

const DemoSimulation = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const steps = [
        {
            icon: Search,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/30",
            title: "System Scanning...",
            desc: "Passive monitoring active. No anomalies detected."
        },
        {
            icon: AlertTriangle,
            color: "text-red-400",
            bg: "bg-red-500/10",
            border: "border-red-500/30",
            title: "Threat Detected!",
            desc: "Unauthorized shell access attempt identified in pid:4120."
        },
        {
            icon: Bell,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/30",
            title: "Awaiting Consent",
            desc: "User informed. Waiting for authorization to neutralize..."
        },
        {
            icon: CheckCircle,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/30",
            title: "Threat Neutralized",
            desc: "Process terminated. Security patch applied. System Secure."
        }
    ];

    const current = steps[step];
    const Icon = current.icon;

    return (
        <div className={`w-full max-w-md p-6 rounded-xl border ${current.border} ${current.bg} transition-all duration-500 transform scale-100`}>
            <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full ${current.bg} border ${current.border} shadow-[0_0_30px_rgba(0,0,0,0.3)] animate-bounce-subtle`}>
                    <Icon className={`w-10 h-10 ${current.color}`} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className={`text-xl font-bold ${current.color} mb-1 transition-colors duration-300`}>
                        {current.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {current.desc}
                    </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2 mt-4">
                    {steps.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === step ? `w-8 ${current.color.replace('text-', 'bg-')}` : 'w-2 bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const FutureDefense = () => {
    return (
        <div className="h-full flex flex-col bg-(--color-background)">
            <Topbar
                title="System Evolution"
                subtitle="The Roadmap to Autonomous Cyber Defense"
                showSearch={false}
            />

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-5xl mx-auto space-y-12">

                    {/* Hero Section */}
                    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-cyan-950/10 p-8 sm:p-12 text-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 animate-pulse" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyan-500/20 mb-6 ring-2 ring-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                <Cpu className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight mb-4">
                                SENTINEL <span className="text-white">IMMUNE SYSTEM</span>
                            </h2>
                            <p className="text-xl text-cyan-100/80 max-w-2xl mx-auto leading-relaxed">
                                The next generation of cybersecurity is not just a tool—it's a living defense organism.
                                Coming soon to SentinelAI.
                            </p>
                            <div className="mt-8 inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-sm font-mono tracking-widest">
                                STATUS: POSITIVE DEVELOPMENT
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    {/* Dummy Demo Simulation */}
                    <div className="mt-12 border border-gray-800 rounded-xl bg-black/40 overflow-hidden">
                        <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex items-center justify-between">
                            <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> LIVE SYSTEM SIMULATION
                            </span>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                        </div>
                        <div className="p-8 min-h-[300px] flex items-center justify-center relative">
                            <DemoSimulation />
                        </div>
                    </div>

                    {/* Footer/CTA */}
                    <div className="text-center pt-8 border-t border-gray-800">
                        <Lock className="w-8 h-8 text-gray-600 mx-auto mb-4" />
                        <h4 className="text-gray-500 font-mono text-sm tracking-widest uppercase">
                            Secure Your Future
                        </h4>
                        <p className="text-gray-600 mt-2 text-sm">
                            SentinelAI Version 3.0 Roadmap
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FutureDefense;
