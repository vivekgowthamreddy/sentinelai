import { useState } from 'react';
import Topbar from '../components/Topbar';
import { codeAnalyze, type CodeAnalysisResponse } from '../api/sentinelApi';

const CodeAnalyzer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CodeAnalysisResponse | null>(null);

  const getRiskBadge = (level: CodeAnalysisResponse['riskLevel']) => {
    switch (level) {
      case 'Low':
        return 'badge badge-success';
      case 'Medium':
        return 'badge badge-warning';
      case 'High':
      case 'Critical':
        return 'badge badge-danger';
      default:
        return 'badge badge-neutral';
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await codeAnalyze(code, language || undefined);
      console.log('CODE ANALYZE API RESPONSE:', res); // DEV: Log response to verify structure
      setResult(res);
    } catch (err: unknown) {
      console.error('Code analysis failed:', err);
      const error = err as { message?: string };
      setError(
        error?.message ||
        'Unable to analyze code. Please ensure the backend is running and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setResult(null);
    setError(null);
    setLanguage('');
  };

  return (
    <div className="h-full flex flex-col">
      <Topbar
        title="Code Analyzer"
        subtitle="Review snippets for common security risks and unsafe patterns"
        showSearch={false}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
          <form onSubmit={handleAnalyze} className="card p-4 sm:p-6 space-y-5 animate-slide-up">
            <div>
              <h2 className="text-base font-semibold text-(--color-text-primary)">Input</h2>
              <p className="text-sm text-(--color-text-secondary) mt-1">
                Paste a snippet for analysis. Avoid secrets and production keys.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label htmlFor="language" className="label-text">
                  Language (optional)
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="input-field"
                  disabled={isLoading}
                >
                  <option value="">Auto</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="go">Go</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="code" className="label-text">
                  Code
                </label>
                <textarea
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="input-field resize-none min-h-[220px] leading-relaxed font-mono text-sm"
                  placeholder="Paste code here…"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={handleClear}
                className="w-1/3 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-colors font-semibold"
                disabled={isLoading}
              >
                Clear
              </button>
              <button
                type="submit"
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!code.trim() || isLoading}
              >
                {isLoading ? 'Analyzing…' : 'Analyze Code'}
              </button>
            </div>
          </form>

          {error && (
            <div className="card p-5 sm:p-6 animate-scale-in">
              <h2 className="text-sm font-medium text-(--color-text-primary)">Connection required</h2>
              <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-slide-up delay-100">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-(--color-text-primary)">Results</h2>
                  <p className="text-sm text-(--color-text-secondary) mt-1">
                    Security issues and an overall risk level.
                  </p>
                </div>
                <span className={getRiskBadge(result.riskLevel)}>{result.riskLevel}</span>
              </div>

              <div className="card p-5 sm:p-6 animate-scale-in delay-200">
                <h3 className="text-sm font-medium text-(--color-text-secondary)">Security issues</h3>
                {result.issues.length ? (
                  <ul className="mt-3 space-y-2">
                    {result.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm text-(--color-text-primary)">
                        {issue.type}: {issue.message} {issue.line ? `(Line ${issue.line})` : ''}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-(--color-text-secondary)">No issues returned.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeAnalyzer;
