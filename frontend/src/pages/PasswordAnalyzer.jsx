import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

export const PasswordAnalyzer = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (password) {
      analyzePassword(password);
    } else {
      setStrength(0);
      setAnalysis(null);
    }
  }, [password]);

  const analyzePassword = (pwd) => {
    let score = 0;
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
      noCommon: !['password', '123456', 'qwerty'].some(common => pwd.toLowerCase().includes(common)),
    };

    // Calculate score
    if (checks.length) score += 20;
    if (checks.uppercase) score += 15;
    if (checks.lowercase) score += 15;
    if (checks.numbers) score += 15;
    if (checks.special) score += 20;
    if (checks.noCommon) score += 15;

    // Bonus for extra length
    if (pwd.length >= 16) score += 10;
    if (pwd.length >= 20) score += 10;

    setStrength(Math.min(score, 100));

    const strengthLevel =
      score >= 80 ? 'Strong' : score >= 60 ? 'Moderate' : score >= 40 ? 'Weak' : 'Very Weak';

    const recommendations = [];
    if (!checks.length) recommendations.push('Use at least 12 characters');
    if (!checks.uppercase) recommendations.push('Add uppercase letters (A-Z)');
    if (!checks.lowercase) recommendations.push('Add lowercase letters (a-z)');
    if (!checks.numbers) recommendations.push('Include numbers (0-9)');
    if (!checks.special) recommendations.push('Use special characters (!@#$%^&*)');
    if (!checks.noCommon) recommendations.push('Avoid common words and patterns');

    setAnalysis({
      score,
      level: strengthLevel,
      checks,
      recommendations,
      timeToCrack: calculateCrackTime(pwd.length, Object.values(checks).filter(Boolean).length),
    });
  };

  const calculateCrackTime = (length, complexity) => {
    const attempts = Math.pow(26 * complexity + 10, length);
    const seconds = attempts / 1000000000; // Assuming 1B attempts/sec

    if (seconds < 1) return 'Instant';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
    return `${Math.round(seconds / 31536000)} years`;
  };

  const getStrengthColor = () => {
    if (strength >= 80) return 'text-success';
    if (strength >= 60) return 'text-warning';
    if (strength >= 40) return 'text-destructive';
    return 'text-destructive';
  };

  const getProgressColor = () => {
    if (strength >= 80) return 'bg-success';
    if (strength >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Password Strength Analyzer</h1>
        <p className="text-muted-foreground">Create strong, secure passwords to protect your accounts</p>
      </div>

      {/* Password Input */}
      <Card className="glass-card border border-primary/20 neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-primary" />
            <span>Password Input</span>
          </CardTitle>
          <CardDescription>Enter a password to analyze its strength (never stored)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password to analyze..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-12 bg-muted/30 border-border/30 focus:border-primary/50 font-mono"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6 animate-slide-in">
          {/* Strength Meter */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle>Strength Assessment</CardTitle>
              <CardDescription>Overall password security evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-5xl font-bold ${getStrengthColor()}`}>{strength}</p>
                  <p className="text-sm text-muted-foreground mt-1">Strength Score</p>
                </div>
                <Badge
                  className={
                    analysis.level === 'Strong'
                      ? 'bg-success/20 text-success border-success/30'
                      : analysis.level === 'Moderate'
                      ? 'bg-warning/20 text-warning border-warning/30'
                      : 'bg-destructive/20 text-destructive border-destructive/30'
                  }
                >
                  {analysis.level}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Strength Level</span>
                  <span className="text-foreground font-medium">{strength}%</span>
                </div>
                <div className="relative h-3 bg-muted/20 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
                    style={{ width: `${strength}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Time to Crack</span>
                  <span className="text-sm font-bold text-foreground">{analysis.timeToCrack}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Checks */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle>Security Requirements</CardTitle>
              <CardDescription>Password complexity evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'length', label: 'At least 12 characters', checked: analysis.checks.length },
                  { key: 'uppercase', label: 'Uppercase letters (A-Z)', checked: analysis.checks.uppercase },
                  { key: 'lowercase', label: 'Lowercase letters (a-z)', checked: analysis.checks.lowercase },
                  { key: 'numbers', label: 'Numbers (0-9)', checked: analysis.checks.numbers },
                  { key: 'special', label: 'Special characters', checked: analysis.checks.special },
                  { key: 'noCommon', label: 'No common patterns', checked: analysis.checks.noCommon },
                ].map((check) => (
                  <div
                    key={check.key}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 border border-border/30"
                  >
                    {check.checked ? (
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    )}
                    <span className="text-sm text-foreground">{check.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <Card className="glass-card border border-warning/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-warning">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Recommendations</span>
                </CardTitle>
                <CardDescription>Improve your password security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-warning/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                      <p className="text-sm text-foreground">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Info Card */}
      {!password && (
        <Card className="glass-card border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Password Security Best Practices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>Create strong passwords by following these guidelines:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Use at least 12 characters (16+ recommended)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Mix uppercase and lowercase letters</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Include numbers and special characters</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Avoid common words, names, and patterns</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Use unique passwords for different accounts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Consider using a password manager</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PasswordAnalyzer;