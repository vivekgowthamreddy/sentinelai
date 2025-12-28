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
        <div className="h-[--spacing-topbar-height] border-b border-(--color-border) bg-white px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="w-full flex items-center gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-semibold text-(--color-text-primary) truncate">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-(--color-text-secondary) mt-1 truncate">
                            {subtitle}
                        </p>
                    )}
                </div>

                {showSearch && (
                    <div className="hidden md:flex flex-1 max-w-xl">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted)" />
                            <input
                                value={query}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full h-10 pl-9 pr-3 rounded-[--radius-input] border border-(--color-border) bg-white text-sm text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-hidden focus:ring-2 focus:ring-(--color-primary)"
                                placeholder={searchPlaceholder}
                                aria-label="Search"
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <button type="button" className="icon-btn" aria-label="Notifications">
                        <Bell className="w-[18px] h-[18px]" />
                    </button>
                    <button type="button" className="icon-btn" aria-label="Help">
                        <HelpCircle className="w-[18px] h-[18px]" />
                    </button>
                    <div className="hidden sm:flex items-center gap-2 pl-2 ml-2 border-l border-(--color-border)">
                        <div className="h-8 w-8 rounded-full bg-(--color-primary-light) border border-(--color-border)" />
                        <div className="leading-tight">
                            <p className="text-sm font-medium text-(--color-text-primary)">Security Admin</p>
                            <p className="text-xs text-(--color-text-secondary)">admin@sentinel.ai</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
