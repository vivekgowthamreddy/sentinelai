import { useState } from 'react';
import { Bell, HelpCircle, Search } from 'lucide-react';

interface TopbarProps {
    title: string;
    subtitle?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearchChange?: (value: string) => void;
}

const Topbar = ({
    title,
    subtitle,
    showSearch = true,
    searchPlaceholder = 'Search tools, reports, or alerts…',
    onSearchChange,
}: TopbarProps) => {
    const [query, setQuery] = useState('');

    const handleSearchChange = (value: string) => {
        setQuery(value);
        onSearchChange?.(value);
    };

    return (
        <div className="sticky top-4 z-40 px-4 md:px-6 mb-6">
            <div className="bg-(--color-bg-subtle)/80 backdrop-blur-xl border border-(--color-border) shadow-lg rounded-[2rem] px-6 py-4 flex items-center transition-all duration-300">
                <div className="w-full flex items-center gap-6">
                    <div className="min-w-0 flex-1 animate-enter">
                        <h1 className="text-xl sm:text-2xl font-bold text-(--color-text-primary) truncate tracking-tight">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-sm text-(--color-text-secondary) mt-0.5 truncate font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {showSearch && (
                        <div className="hidden md:flex flex-1 max-w-lg animate-enter delay-100">
                            <div className="relative w-full group">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted) group-focus-within:text-(--color-primary) transition-colors duration-200" />
                                <input
                                    value={query}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="w-full h-10 pl-10 pr-4 rounded-full border border-(--color-border) bg-(--color-bg-card) text-sm text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-hidden focus:ring-2 focus:ring-(--color-primary)/50 focus:border-(--color-primary) transition-all duration-200 shadow-sm"
                                    placeholder={searchPlaceholder}
                                    aria-label="Search"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3 animate-enter delay-200">
                        <button type="button" className="icon-btn hover:text-(--color-primary) hover:border-(--color-primary)/30 hover:shadow-md hover:shadow-blue-500/10 active:scale-95" aria-label="Notifications">
                            <Bell className="w-[18px] h-[18px]" />
                        </button>
                        <button type="button" className="icon-btn hover:text-(--color-primary) hover:border-(--color-primary)/30 hover:shadow-md hover:shadow-blue-500/10 active:scale-95" aria-label="Help">
                            <HelpCircle className="w-[18px] h-[18px]" />
                        </button>
                        <div className="hidden sm:flex items-center gap-3 pl-4 ml-2 border-l border-(--color-border) group cursor-pointer">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-(--color-primary) to-blue-400 p-[2px] shadow-sm group-hover:shadow-md transition-all duration-200">
                                <div className="h-full w-full rounded-full bg-(--color-bg-card) flex items-center justify-center">
                                    <span className="font-bold text-xs text-(--color-primary)">SA</span>
                                </div>
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-semibold text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors">Security Admin</p>
                                <p className="text-[10px] uppercase tracking-wider text-(--color-text-secondary)">Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
