import { useMemo, useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import Topbar from '../components/Topbar';
import { passwordCheck, type PasswordCheckResponse } from '../api/sentinelApi';

const PasswordCheck = () => {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PasswordCheckResponse | null>(null);

  const scoreText = useMemo(() => {
    if (!result) return '';
    return `${result.passwordScore}%`;
  }, [result]);

  const badgeClass = useMemo(() => {
    if (!result) return 'badge badge-neutral';
    const strength = result.strength.toUpperCase();
    switch (strength) {
      case 'STRONG':
        return 'badge badge-success';
      case 'MEDIUM':
        return 'badge badge-warning';
      case 'WEAK':
      default:
        return 'badge badge-danger';
    }
  }, [result]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await passwordCheck(password);
      setResult(res);
    } catch (err) {
      console.error('Password check failed:', err);
      setError(
        'Unable to reach the SentinelAI API. Configure VITE_API_BASE_URL (or proxy /api) and ensure the backend is running.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Topbar
        title="Password Strength Analyzer"
        subtitle="Evaluate password strength without storing the password"
        showSearch={false}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
          <form onSubmit={handleAnalyze} className="card p-4 sm:p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-(--color-text-primary)">Password input</h2>
                <p className="text-sm text-(--color-text-secondary) mt-1 leading-relaxed">
                  SentinelAI does not store passwords. Avoid using real production passwords.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label-text">
                Enter password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={isVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Enter password to analyze…"
                  autoComplete="new-password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-1 top-1/2 -translate-y-1/2 icon-btn h-9 w-9"
                  aria-label={isVisible ? 'Hide password' : 'Show password'}
                  onClick={() => setIsVisible((v) => !v)}
                  disabled={isLoading}
                >
                  {isVisible ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
              <p className="text-xs text-(--color-text-muted) mt-2">
                The password is used only for this check and is not persisted by the UI.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!password || isLoading}
            >
              {isLoading ? 'Analyzing…' : 'Analyze Password'}
            </button>
          </form>

          {error && (
            <div className="card p-5 sm:p-6">
              <h2 className="text-sm font-medium text-(--color-text-primary)">Connection required</h2>
              <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-(--color-text-primary)">Results</h2>
                  <p className="text-sm text-(--color-text-secondary) mt-1">
                    Strength assessment and actionable recommendations.
                  </p>
                </div>
                <span className={badgeClass}>{result.strength}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="card p-5 sm:p-6 border-l-4 border-l-(--color-primary)">
                  <p className="text-sm font-medium text-(--color-text-secondary)">Strength score</p>
                  <p className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-(--color-text-primary)">
                    {scoreText}
                  </p>
                  <p className="text-sm text-(--color-text-secondary) mt-2 leading-relaxed">
                    Higher scores typically indicate better resistance to guessing and reuse-based attacks.
                  </p>
                </div>

                <div className="card p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-(--color-primary)" />
                    <h3 className="text-sm font-medium text-(--color-text-secondary)">Recommendations</h3>
                  </div>

                  <div className="mt-4">
                    {result.recommendations?.length ? (
                      <ul className="space-y-2">
                        {result.recommendations.map((r: string, idx: number) => (
                          <li key={idx} className="text-sm text-(--color-text-primary) flex items-start gap-2">
                            <span className="text-(--color-primary) mt-0.5">•</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-(--color-text-secondary)">No recommendations provided.</p>
                    )}
                  </div>

                  {result.note && (
                    <div className="mt-4 pt-4 border-t border-(--color-border)">
                      <p className="text-xs text-(--color-text-muted)">{result.note}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordCheck;
