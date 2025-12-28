import { Link, useLocation } from 'react-router-dom';
import { Home, ShieldCheck, Lock, Baby, Scan, Code2, FileBarChart, Settings } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard', icon: Home },
        { path: '/threat-analyzer', label: 'Threat Analyzer', icon: ShieldCheck },
        { path: '/password-check', label: 'Password Check', icon: Lock },
        { path: '/port-scanner', label: 'Port Scanner', icon: Scan },
        { path: '/code-analyzer', label: 'Code Analyzer', icon: Code2 },
        { path: '/child-safety', label: 'Child Safety', icon: Baby },
        { path: '/reports', label: 'Reports', icon: FileBarChart },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-[--spacing-sidebar] bg-white border-r border-(--color-border) flex flex-col overflow-hidden">
            {/* Logo */}
            <div className="p-4 sm:p-6 border-b border-(--color-border)">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-(--color-primary) rounded-[--radius-button] flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-base font-semibold text-(--color-text-primary) leading-tight">
                            SentinelAI
                        </h1>
                        <p className="text-xs text-(--color-text-secondary) mt-0.5">
                            Cyber Defense
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <nav className="h-full overflow-y-auto p-3 sm:p-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-[--radius-button] transition-colors duration-150 ${active
                                                ? 'bg-(--color-primary-light) text-(--color-primary)'
                                                : 'text-(--color-text-secondary) hover:bg-(--color-bg-subtle) hover:text-(--color-text-primary)'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" strokeWidth={active ? 2 : 1.5} />
                                        <span className={`text-sm ${active ? 'font-medium' : 'font-normal'}`}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
