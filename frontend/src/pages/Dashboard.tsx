import Topbar from '../components/Topbar';
import InfoCard from '../components/InfoCard';

const Dashboard = () => {
    return (
        <div className="h-full flex flex-col">
            <Topbar title="Dashboard" />

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 pt-8 space-y-8 no-scrollbar">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Welcome Section */}
                    <div className="card p-8 sm:p-10 animate-slide-up bg-gradient-to-r from-(--color-bg-card) to-(--color-bg-subtle) border-l-4 border-l-(--color-primary) card-hover card-glow-purple">
                        <h2 className="text-3xl sm:text-4xl font-bold text-(--color-text-primary) mb-3 tracking-tight">
                            Welcome to SentinelAI
                        </h2>
                        <p className="text-lg text-(--color-text-secondary) font-medium">
                            Your enterprise cybersecurity companion
                        </p>
                    </div>

                    {/* System Status Cards */}
                    <div className="animate-slide-up delay-100">
                        <h3 className="text-lg font-semibold text-(--color-text-primary) mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary) inline-block"></span>
                            System Status
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InfoCard
                                title="System Status"
                                value="Active"
                                status="Active"
                            />
                            <InfoCard
                                title="Recent Scans"
                                value="0"
                                status="Inactive"
                            />
                            <InfoCard
                                title="Threats Blocked"
                                value="0"
                                status="Active"
                            />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card p-8 sm:p-10 animate-slide-up delay-200 card-hover card-glow-cyan">
                        <h3 className="text-xl font-semibold text-(--color-text-primary) mb-4">
                            Quick Start
                        </h3>
                        <p className="text-(--color-text-secondary) mb-8 max-w-2xl leading-relaxed">
                            Get started by analyzing suspicious content, checking password security, or monitoring child safety online.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="/threat-analyzer" className="btn-primary w-full sm:w-auto shadow-blue-900/20">
                                Analyze Threat
                            </a>
                            <a href="/password-check" className="btn-secondary w-full sm:w-auto">
                                Check Password
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
