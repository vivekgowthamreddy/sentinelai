import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ChildSafety from './pages/ChildSafety';
import FileTransfer from './pages/FileTransfer';
import PasswordAnalyzer from './pages/PasswordAnalyzer';
import PortScanner from './pages/PortScanner';
import CodeAnalyzer from './pages/CodeAnalyzer';
import ThreatAnalysis from './pages/ThreatAnalysis';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'child-safety':
        return <ChildSafety />;
      case 'file-transfer':
        return <FileTransfer />;
      case 'password':
        return <PasswordAnalyzer />;
      case 'port-scanner':
        return <PortScanner />;
      case 'code-analyzer':
        return <CodeAnalyzer />;
      case 'threat-analysis':
        return <ThreatAnalysis />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 grid-pattern">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;