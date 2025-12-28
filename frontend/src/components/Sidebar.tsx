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
        <div className="fixed left-0 top-0 h-screen w-[--spacing-sidebar] bg-(--color-bg-card) border-r border-(--color-border) flex flex-col overflow-hidden shadow-2xl z-50">
            {/* Logo */}
            <div className="p-6 border-b border-(--color-border) bg-(--color-bg-card)">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-(--color-primary) to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <ShieldCheck className="w-6 h-6 text-white relative z-10" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-lg font-bold text-(--color-text-primary) leading-none tracking-tight">
                            SentinelAI
                        </h1>
                        <p className="text-xs text-(--color-text-secondary) mt-1 font-medium tracking-wide">
                            CYBER DEFENSE
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 min-h-0 overflow-hidden bg-(--color-bg-card)">
                <nav className="h-full overflow-y-auto px-4 pb-20 pt-6 space-y-6 scrollbar-thin scrollbar-thumb-(--color-border) scrollbar-track-transparent">
                    <ul className="space-y-1.5">
                        {navItems.map((item, idx) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <li key={item.path} style={{ animationDelay: `${idx * 50}ms` }} className="animate-enter opacity-0 [animation-fill-mode:forwards]">
                                    <Link
                                        to={item.path}
                                        className={`group flex items-center gap-3 px-4 py-3 rounded-[--radius-button] transition-all duration-200 relative overflow-hidden ${active
                                            ? 'bg-blue-600/10 text-(--color-primary) shadow-sm ring-1 ring-blue-500/20'
                                            : 'text-(--color-text-secondary) hover:bg-(--color-bg-subtle) hover:text-(--color-text-primary) hover:pl-5 hover:shadow-inner'
                                            }`}
                                    >
                                        {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-(--color-primary) rounded-r-full" />}
                                        <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} strokeWidth={active ? 2.5 : 2} />
                                        <span className={`text-sm ${active ? 'font-semibold tracking-wide' : 'font-medium'}`}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Status Indicator */}
                    <div className="pt-4 border-t border-(--color-border) mt-4">
                        <div className="px-4 py-3 rounded-lg bg-(--color-bg-subtle) border border-(--color-border)">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </div>
                                <span className="text-xs font-medium text-(--color-text-primary)">System Operational</span>
                            </div>
                            <p className="text-[10px] text-(--color-text-secondary)">
                                Version 2.4.0-stable
                            </p>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
