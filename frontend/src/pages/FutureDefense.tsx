import Topbar from '../components/Topbar';
import { Shield, Zap, Bell, Lock, Cpu, Brain } from 'lucide-react';

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
