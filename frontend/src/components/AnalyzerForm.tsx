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
        
        // Auto-prepend https:// if URL provided but doesn't start with http:// or https://
        let processedUrl = url.trim();
        if (processedUrl && !processedUrl.match(/^https?:\/\//)) {
            processedUrl = `https://${processedUrl}`;
        }
        
        onAnalyze({
            text,
            url: processedUrl || undefined,
            childMode,
            networkRisk: networkRisk ? 'MEDIUM' : 'LOW',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-8 animate-slide-up">
            <div className="flex items-start justify-between gap-6 pb-6 border-b border-(--color-border)">
                <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-(--color-text-primary) tracking-tight">Threat Input Analysis</h2>
                    <p className="text-sm text-(--color-text-secondary) mt-1.5 leading-relaxed m-0">
                        Paste suspicious content and (optionally) a URL. Configure toggles to adjust strictness.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn-secondary px-4 py-2 h-9 text-xs uppercase tracking-wider hover:text-(--color-text-primary)"
                    onClick={handleClear}
                    disabled={isLoading}
                >
                    Clear All
                </button>
            </div>

            {/* Message Input */}
            <div className="space-y-3">
                <label htmlFor="message" className="label-text">
                    Suspicious Content <span className="text-(--color-text-secondary) font-normal ml-2">(e.g., email body, chat logs)</span>
                </label>
                <textarea
                    id="message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="input-field resize-none min-h-[180px] leading-relaxed font-mono text-sm"
                    rows={6}
                    placeholder="Paste suspicious text here..."
                    required
                    disabled={isLoading}
                />
                <p className="text-xs text-(--color-text-muted) flex items-center gap-1.5 pl-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-(--color-primary)"></span>
                    Use plain text. Avoid pasting secrets like passwords or private keys.
                </p>
            </div>

            {/* URL Input */}
            <div className="space-y-3">
                <label htmlFor="url" className="label-text">
                    Target URL <span className="text-(--color-text-secondary) font-normal ml-2">(Optional)</span>
                </label>
                <div className="relative group">
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="input-field pl-11"
                        placeholder="example.com (https:// will be added automatically)"
                        disabled={isLoading}
                    />
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted) group-focus-within:text-(--color-primary) transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </div>
                </div>
            </div>

            {/* Toggle Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                    htmlFor="childMode"
                    className="group flex items-center justify-between gap-4 rounded-[--radius-card] border border-(--color-border) bg-(--color-bg-subtle) hover:bg-(--color-bg-card) p-4 cursor-pointer transition-all duration-200 hover:border-(--color-border-hover)" // Fixed bg variable
                >
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors">Child Safety Mode</p>
                        <p className="text-xs text-(--color-text-secondary) mt-1">
                            Stricter content filtering for minors.
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
                        <div className="h-6 w-11 rounded-full border border-(--color-border) bg-(--color-bg-card) peer-checked:bg-(--color-primary) transition-colors duration-200" />
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
                    </div>
                </label>

                <label
                    htmlFor="networkRisk"
                    className="group flex items-center justify-between gap-4 rounded-[--radius-card] border border-(--color-border) bg-(--color-bg-subtle) hover:bg-(--color-bg-card) p-4 cursor-pointer transition-all duration-200 hover:border-(--color-border-hover)" // Fixed bg variable
                >
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-(--color-text-primary) group-hover:text-(--color-primary) transition-colors">Network Scanning</p>
                        <p className="text-xs text-(--color-text-secondary) mt-1">
                            Flag external links as high risk.
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
                        <div className="h-6 w-11 rounded-full border border-(--color-border) bg-(--color-bg-card) peer-checked:bg-(--color-primary) transition-colors duration-200" />
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
                    </div>
                </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <button
                    type="submit"
                    className="btn-primary w-full h-12 text-base shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 transform active:scale-[0.99]"
                    disabled={!text.trim() || isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </span>
                    ) : 'Run Threat Analysis'}
                </button>
            </div>
        </form>
    );
};

export default AnalyzerForm;
