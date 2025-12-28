import Topbar from '../components/Topbar';
import InfoCard from '../components/InfoCard';

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col">
      <Topbar title="Dashboard" />
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {/* Welcome Section */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-(--color-text-primary) mb-3">
              Welcome to SentinelAI
            </h2>
            <p className="text-base sm:text-lg text-(--color-text-secondary)">
              Your enterprise cybersecurity companion
            </p>
          </div>

          {/* System Status Cards */}
          <div>
            <h3 className="text-lg font-semibold text-(--color-text-primary) mb-4">
              System Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
          <div className="card p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-(--color-text-primary) mb-4">
              Quick Start
            </h3>
            <p className="text-(--color-text-secondary) mb-6">
              Get started by analyzing suspicious content, checking password security, or monitoring child safety online.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="/threat-analyzer" className="btn-primary w-full sm:w-auto">
                Analyze Threat
              </a>
              <a href="/password-check" className="btn-secondary w-full sm:w-auto">
                Check Password
              </a>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-(--color-text-primary) mb-4">
              Security Tools
            </h3>
            <p className="text-(--color-text-secondary) mb-6">
              Additional utilities for assessment and review.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="/port-scanner" className="btn-secondary w-full sm:w-auto">
                Port Scanner
              </a>
              <a href="/code-analyzer" className="btn-secondary w-full sm:w-auto">
                Code Analyzer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;