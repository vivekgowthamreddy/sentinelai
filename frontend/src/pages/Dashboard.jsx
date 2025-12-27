import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import MetricCard from '../components/MetricCard';
import SecurityMeter from '../components/SecurityMeter';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';

export const Dashboard = () => {
  const [securityScore] = useState(87);
  const [metrics] = useState([
    { title: 'Total Scans', value: '2,847', icon: Activity, trend: 'up', trendValue: '12%', variant: 'primary' },
    { title: 'Active Threats', value: '3', icon: AlertTriangle, trend: 'down', trendValue: '45%', variant: 'warning' },
    { title: 'Secure Assets', value: '156', icon: CheckCircle, trend: 'up', trendValue: '8%', variant: 'success' },
    { title: 'Risk Level', value: 'Low', icon: Shield, trend: 'stable', trendValue: '0%', variant: 'success' },
  ]);

  const [recentActivity] = useState([
    { id: 1, type: 'scan', title: 'Port Scan Completed', detail: '192.168.1.1', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'alert', title: 'Suspicious Activity Detected', detail: 'Port 8080 - Multiple connection attempts', time: '15 minutes ago', status: 'warning' },
    { id: 3, type: 'scan', title: 'Code Analysis Completed', detail: 'auth.js - No vulnerabilities found', time: '1 hour ago', status: 'success' },
    { id: 4, type: 'transfer', title: 'Secure File Transfer', detail: 'confidential-data.pdf encrypted', time: '2 hours ago', status: 'success' },
    { id: 5, type: 'check', title: 'Website Safety Check', detail: 'example.com verified safe for children', time: '3 hours ago', status: 'success' },
  ]);

  const [threatTimeline] = useState([
    { time: '00:00', threats: 2 },
    { time: '04:00', threats: 1 },
    { time: '08:00', threats: 5 },
    { time: '12:00', threats: 3 },
    { time: '16:00', threats: 4 },
    { time: '20:00', threats: 2 },
    { time: '23:59', threats: 3 },
  ]);

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Command Center</h1>
          <p className="text-muted-foreground">Monitor your security posture and system health</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow" />
          <span className="text-sm text-success font-medium">Live Monitoring</span>
        </div>
      </div>

      {/* Security Score Card */}
      <Card className="glass-card border border-primary/20 neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Overall Security Status</span>
          </CardTitle>
          <CardDescription>Real-time security assessment across all monitored systems</CardDescription>
        </CardHeader>
        <CardContent>
          <SecurityMeter score={securityScore} />
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={metric.title} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <MetricCard {...metric} />
          </div>
        ))}
      </div>

      {/* Activity and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="glass-card border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest security events and scans</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/40 transition-all duration-200"
                  >
                    <div
                      className={`w-2 h-2 mt-2 rounded-full ${
                        activity.status === 'success'
                          ? 'bg-success'
                          : activity.status === 'warning'
                          ? 'bg-warning'
                          : 'bg-primary'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{activity.detail}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    <Badge
                      variant={activity.status === 'success' ? 'default' : 'secondary'}
                      className={activity.status === 'success' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Threat Timeline */}
        <Card className="glass-card border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Threat Timeline</span>
            </CardTitle>
            <CardDescription>24-hour threat detection activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Simple bar chart visualization */}
              <div className="h-[300px] flex items-end justify-between space-x-2">
                {threatTimeline.map((point, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                    <div className="w-full bg-muted/20 rounded-t-lg relative overflow-hidden" style={{ height: '250px' }}>
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-500"
                        style={{ height: `${(point.threats / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{point.time}</span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded" />
                  <span className="text-sm text-muted-foreground">Detected Threats</span>
                </div>
                <div className="text-sm">
                  <span className="text-foreground font-semibold">20</span>
                  <span className="text-muted-foreground"> threats today</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used security tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Scan URL', icon: Eye, color: 'primary' },
              { label: 'Check Password', icon: Shield, color: 'secondary' },
              { label: 'Analyze Code', icon: Activity, color: 'accent' },
              { label: 'Port Scan', icon: TrendingUp, color: 'primary' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="glass-card p-6 rounded-lg border border-border/30 hover:border-primary/50 transition-all duration-200 flex flex-col items-center space-y-2 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;