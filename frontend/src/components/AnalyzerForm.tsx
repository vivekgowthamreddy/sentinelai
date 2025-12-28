import { useState } from 'react';
import type { AnalyzerFormProps } from '../types/schema';

const AnalyzerForm = ({ onAnalyze, isLoading = false }: AnalyzerFormProps) => {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [childMode, setChildMode] = useState(false);
    const [networkRisk, setNetworkRisk] = useState(false);

    const handleClear = () => {
        setText('');
        setUrl('');
        setChildMode(false);
        setNetworkRisk(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAnalyze({
            text,
            url: url || undefined,
            childMode,
            networkRisk,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 sm:p-6 space-y-5 sm:space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h2 className="text-base font-semibold text-(--color-text-primary)">Threat input</h2>
                    <p className="text-sm text-(--color-text-secondary) mt-1 leading-relaxed">
                        Paste suspicious content and (optionally) a URL. Configure toggles to adjust strictness.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn-secondary px-4 py-2 h-10 text-sm"
                    onClick={handleClear}
                    disabled={isLoading}
                >
                    Clear
                </button>
            </div>

            {/* Message Input */}
            <div>
                <label htmlFor="message" className="label-text">
                    Enter suspicious message or content
                </label>
                <textarea
                    id="message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="input-field resize-none min-h-[160px] leading-relaxed"
                    rows={6}
                    placeholder="Paste suspicious text, email content, or message here..."
                    required
                    disabled={isLoading}
                />
                <p className="text-xs text-(--color-text-muted) mt-2">
                    Use plain text. Avoid pasting secrets.
                </p>
            </div>

            {/* URL Input */}
            <div>
                <label htmlFor="url" className="label-text">
                    Optional: URL to analyze
                </label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="input-field"
                    placeholder="https://example.com"
                    disabled={isLoading}
                />
            </div>

            {/* Toggle Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <label
                    htmlFor="childMode"
                    className="flex items-center justify-between gap-4 rounded-[--radius-card] border border-(--color-border) bg-white px-4 py-3"
                >
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-(--color-text-primary)">Child Mode</p>
                        <p className="text-xs text-(--color-text-secondary) mt-0.5">
                            Apply stricter checks for content suitable for minors.
                        </p>
                    </div>

                    <div className="relative">
                        <input
                            type="checkbox"
                            id="childMode"
                            checked={childMode}
                            onChange={(e) => setChildMode(e.target.checked)}
                            className="peer sr-only"
                            disabled={isLoading}
                        />
                        <div className="h-6 w-11 rounded-full border border-(--color-border) bg-(--color-bg-subtle) peer-checked:bg-(--color-primary) transition-colors duration-150" />
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white border border-(--color-border) shadow-sm transition-transform duration-150 peer-checked:translate-x-5" />
                    </div>
                </label>

                <label
                    htmlFor="networkRisk"
                    className="flex items-center justify-between gap-4 rounded-[--radius-card] border border-(--color-border) bg-white px-4 py-3"
                >
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-(--color-text-primary)">Network Risk</p>
                        <p className="text-xs text-(--color-text-secondary) mt-0.5">
                            Consider suspicious URLs and external links as higher risk.
                        </p>
                    </div>

                    <div className="relative">
                        <input
                            type="checkbox"
                            id="networkRisk"
                            checked={networkRisk}
                            onChange={(e) => setNetworkRisk(e.target.checked)}
                            className="peer sr-only"
                            disabled={isLoading}
                        />
                        <div className="h-6 w-11 rounded-full border border-(--color-border) bg-(--color-bg-subtle) peer-checked:bg-(--color-primary) transition-colors duration-150" />
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white border border-(--color-border) shadow-sm transition-transform duration-150 peer-checked:translate-x-5" />
                    </div>
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!text.trim() || isLoading}
            >
                {isLoading ? 'Analyzing...' : 'Analyze Threat'}
            </button>
        </form>
    );
};

export default AnalyzerForm;
