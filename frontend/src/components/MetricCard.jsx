import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';

export const MetricCard = ({ title, value, icon: Icon, trend, trendValue, variant = 'default' }) => {
  const variantStyles = {
    default: 'border-border/30',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    danger: 'border-destructive/30 bg-destructive/5',
    primary: 'border-primary/30 bg-primary/5',
  };

  const iconColors = {
    default: 'text-foreground',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-destructive',
    primary: 'text-primary',
  };

  return (
    <Card className={cn('glass-card border transition-all duration-300 hover:shadow-elegant', variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
            {trend && (
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    'text-xs font-medium',
                    trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                  )}
                >
                  {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn('p-3 rounded-lg bg-muted/20', iconColors[variant])}>
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;