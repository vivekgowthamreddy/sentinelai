import React from 'react';
import { Progress } from './ui/progress';
import { cn } from '../lib/utils';

export const SecurityMeter = ({ score, size = 'lg' }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Secure';
    if (score >= 60) return 'Moderate';
    return 'At Risk';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className={cn('text-4xl font-bold', getScoreColor(score))}>{score}</p>
          <p className="text-sm text-muted-foreground">Security Score</p>
        </div>
        <div className="text-right">
          <p className={cn('text-lg font-semibold', getScoreColor(score))}>{getScoreLabel(score)}</p>
          <p className="text-xs text-muted-foreground">Status</p>
        </div>
      </div>
      <div className="relative">
        <Progress value={score} className="h-3" />
        <div
          className={cn('absolute top-0 left-0 h-3 rounded-full transition-all duration-500', getProgressColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default SecurityMeter;