import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

export const Reports = () => {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'Port Scan',
      severity: 'high',
      title: 'Suspicious Port Scanning Activity',
      description: 'Multiple port scan attempts detected from IP 203.0.113.45',
      timestamp: '2024-01-15 14:23:45',
      status: 'active',
      affectedAssets: ['Web Server', 'Database Server'],
    },
    {
      id: 2,
      type: 'Code Vulnerability',
      severity: 'critical',
      title: 'Critical XSS Vulnerability Detected',
      description: 'Cross-site scripting vulnerability found in user input handling',
      timestamp: '2024-01-15 13:45:12',
      status: 'resolved',
      affectedAssets: ['Web Application'],
    },
    {
      id: 3,
      type: 'Threat Detection',
      severity: 'medium',
      title: 'Unusual Traffic Pattern',
      description: 'Traffic volume increased by 340% from previous baseline',
      timestamp: '2024-01-15 12:18:30',
      status: 'investigating',
      affectedAssets: ['Load Balancer'],
    },
    {
      id: 4,
      type: 'Password',
      severity: 'low',
      title: 'Weak Password Detected',
      description: 'User account using password that does not meet security requirements',
      timestamp: '2024-01-15 11:05:22',
      status: 'resolved',
      affectedAssets: ['User Account: admin@company.com'],
    },
    {
      id: 5,
      type: 'File Transfer',
      severity: 'medium',
      title: 'Unencrypted File Transfer Attempt',
      description: 'Sensitive file attempted to be transferred without encryption',
      timestamp: '2024-01-15 10:34:18',
      status: 'blocked',
      affectedAssets: ['File Server'],
    },
    {
      id: 6,
      type: 'Child Safety',
      severity: 'high',
      title: 'Unsafe Website Access Attempt',
      description: 'Child account attempted to access website with high-risk content',
      timestamp: '2024-01-15 09:22:45',
      status: 'blocked',
      affectedAssets: ['Child Safety Filter'],
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'high':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-destructive/20 text-destructive';
      case 'resolved':
        return 'bg-success/20 text-success';
      case 'investigating':
        return 'bg-warning/20 text-warning';
      case 'blocked':
        return 'bg-primary/20 text-primary';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'blocked':
        return <Shield className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const typeMatch = filterType === 'all' || alert.type === filterType;
    return severityMatch && typeMatch;
  });

  const stats = {
    total: alerts.length,
    active: alerts.filter((a) => a.status === 'active').length,
    resolved: alerts.filter((a) => a.status === 'resolved').length,
    critical: alerts.filter((a) => a.severity === 'critical').length,
  };

  const downloadReport = () => {
    toast.success('Security report downloaded successfully!');
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Reports & Alerts</h1>
          <p className="text-muted-foreground">Centralized view of all security events and findings</p>
        </div>
        <Button onClick={downloadReport} className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border border-border/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Alerts</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border border-destructive/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active</p>
                <p className="text-3xl font-bold text-destructive">{stats.active}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border border-success/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Resolved</p>
                <p className="text-3xl font-bold text-success">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border border-destructive/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Critical</p>
                <p className="text-3xl font-bold text-destructive">{stats.critical}</p>
              </div>
              <Shield className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-card border border-border/30">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Severity</label>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="bg-muted/30 border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-muted/30 border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Port Scan">Port Scan</SelectItem>
                    <SelectItem value="Code Vulnerability">Code Vulnerability</SelectItem>
                    <SelectItem value="Threat Detection">Threat Detection</SelectItem>
                    <SelectItem value="Password">Password</SelectItem>
                    <SelectItem value="File Transfer">File Transfer</SelectItem>
                    <SelectItem value="Child Safety">Child Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Time Range</label>
                <Select defaultValue="7days">
                  <SelectTrigger className="bg-muted/30 border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Timeline */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Security Events Timeline</span>
          </CardTitle>
          <CardDescription>
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-5 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/40 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{alert.type}</Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {getStatusIcon(alert.status)}
                          <span className="ml-1">{alert.status}</span>
                        </Badge>
                      </div>
                      <h4 className="text-base font-semibold text-foreground mb-2">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>{alert.affectedAssets.join(', ')}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;