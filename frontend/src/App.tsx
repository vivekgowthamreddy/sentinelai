import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import ThreatAnalyzer from './pages/ThreatAnalyzer';
import PasswordCheck from './pages/PasswordCheck';
import PortScanner from './pages/PortScanner';
import CodeAnalyzer from './pages/CodeAnalyzer';
import ChildSafety from './pages/ChildSafety';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import FutureDefense from './pages/FutureDefense';

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/threat-analyzer" element={<ThreatAnalyzer />} />
                    <Route path="/password-check" element={<PasswordCheck />} />
                    <Route path="/port-scanner" element={<PortScanner />} />
                    <Route path="/code-analyzer" element={<CodeAnalyzer />} />
                    <Route path="/child-safety" element={<ChildSafety />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/future-defense" element={<FutureDefense />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
