import React, { useState } from 'react';
import { AlertTriangle, Activity, Search, Shield, Globe, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { toast } from 'sonner';

export const ThreatAnalysis = () => {
  const [target, setTarget] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const analyzeThreat = () => {
    if (!target) {
      toast.error('Please enter an IP address or domain');
      return;
    }

    setAnalyzing(true);
    toast.info('Analyzing threat indicators...');

    // Simulate threat analysis
    setTimeout(() => {
      const mockResults = {
        target,
        threatLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        suspicionScore: Math.floor(Math.random() * 40) + 30,
        findings: [
          {
            id: 1,
            type: 'Connection Pattern',
            severity: 'medium',
            description: 'Multiple rapid connections detected from different geographic locations',
            details: '47 connections in 10 minutes from 12 different countries',
          },
          {
            id: 2,
            type: 'IP Reputation',
            severity: 'low',
            description: 'IP address has been reported in 2 threat databases',
            details: 'Listed in SpamHaus and AbuseIPDB with low confidence scores',
          },
          {
            id: 3,
            type: 'Traffic Anomaly',
            severity: 'high',
            description: 'Unusual traffic pattern detected',
            details: 'Traffic volume increased by 340% compared to baseline',
          },
        ],
        ipHops: [
          { hop: 1, ip: '192.168.1.1', location: 'Local Gateway', latency: '1ms', status: 'normal' },
          { hop: 2, ip: '10.0.0.1', location: 'ISP Router', latency: '12ms', status: 'normal' },
          { hop: 3, ip: '203.0.113.1', location: 'Tokyo, Japan', latency: '45ms', status: 'normal' },
          { hop: 4, ip: '198.51.100.1', location: 'Singapore', latency: '78ms', status: 'suspicious' },
          { hop: 5, ip: '192.0.2.1', location: 'Unknown Proxy', latency: '156ms', status: 'suspicious' },
          { hop: 6, ip: target, location: 'Destination', latency: '234ms', status: 'reached' },
        ],
        behaviors: [
          { behavior: 'Port Scanning', detected: true, count: 23 },
          { behavior: 'DDoS Attempts', detected: false, count: 0 },
          { behavior: 'Brute Force', detected: true, count: 8 },
          { behavior: 'Bot Activity', detected: true, count: 15 },
          { behavior: 'Malware Download', detected: false, count: 0 },
        ],
      };

      setResults(mockResults);
      setAnalyzing(false);
      toast.success('Threat analysis complete!');
    }, 3000);
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'High':
        return 'text-destructive';
      case 'Medium':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  const getThreatBadge = (level) => {
    switch (level) {
      case 'High':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'Medium':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-success/20 text-success border-success/30';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getHopStatus = (status) => {
    switch (status) {
      case 'suspicious':
        return 'text-warning';
      case 'reached':
        return 'text-primary';
      default:
        return 'text-success';
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Threat & Trojan Analysis</h1>
        <p className="text-muted-foreground">Detect suspicious behavior and potential malware activity</p>
      </div>

      {/* Analysis Input */}
      <Card className="glass-card border border-primary/20 neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Threat Analysis</span>
          </CardTitle>
          <CardDescription>Enter an IP address or domain to analyze for threat indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="192.168.1.100 or suspicious-domain.com"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeThreat()}
              className="flex-1 bg-muted/30 border-border/30 focus:border-primary/50 font-mono"
            />
            <Button onClick={analyzeThreat} disabled={analyzing} className="bg-primary hover:bg-primary/90">
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {results && (
        <div className="space-y-6 animate-slide-in">
          {/* Threat Level */}
          <Card className={`glass-card border ${results.threatLevel === 'High' ? 'border-destructive/30' : 'border-border/30'}`}>
            <CardHeader>
              <CardTitle>Threat Assessment</CardTitle>
              <CardDescription>
                Analysis target: <span className="font-mono text-foreground">{results.target}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className={`text-5xl font-bold ${getThreatColor(results.threatLevel)}`}>
                    {results.suspicionScore}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Suspicion Score</p>
                </div>
                <Badge className={getThreatBadge(results.threatLevel)}>
                  {results.threatLevel === 'High' && <AlertTriangle className="w-4 h-4 mr-1" />}
                  {results.threatLevel} Threat
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Threat Level</span>
                  <span className="text-foreground font-medium">{results.suspicionScore}%</span>
                </div>
                <div className="relative h-3 bg-muted/20 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                      results.threatLevel === 'High'
                        ? 'bg-destructive'
                        : results.threatLevel === 'Medium'
                        ? 'bg-warning'
                        : 'bg-success'
                    }`}
                    style={{ width: `${results.suspicionScore}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle>Detected Anomalies</CardTitle>
              <CardDescription>{results.findings.length} suspicious indicators found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.findings.map((finding) => (
                  <div
                    key={finding.id}
                    className="p-4 rounded-lg bg-muted/20 border border-border/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getSeverityBadge(finding.severity)}>
                            {finding.severity.toUpperCase()}
                          </Badge>
                          <h4 className="text-sm font-semibold text-foreground">{finding.type}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                        <p className="text-xs text-muted-foreground">{finding.details}</p>
                      </div>
                      <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Connection Path */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-primary" />
                <span>Connection Path Trace</span>
              </CardTitle>
              <CardDescription>Network route and IP hop analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {results.ipHops.map((hop) => (
                    <div
                      key={hop.hop}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20 border border-border/30"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{hop.hop}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-mono font-semibold text-foreground">{hop.ip}</p>
                          <Badge
                            variant="outline"
                            className={`${getHopStatus(hop.status)} border-current`}
                          >
                            {hop.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{hop.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">Latency: {hop.latency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Behavior Analysis */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Behavior Analysis</span>
              </CardTitle>
              <CardDescription>Suspicious activity detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.behaviors.map((behavior, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          behavior.detected ? 'bg-warning animate-pulse-glow' : 'bg-success'
                        }`}
                      />
                      <span className="text-sm font-medium text-foreground">{behavior.behavior}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {behavior.detected && (
                        <span className="text-sm text-warning font-semibold">{behavior.count} events</span>
                      )}
                      <Badge variant={behavior.detected ? 'destructive' : 'secondary'}>
                        {behavior.detected ? 'Detected' : 'Clear'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="glass-card border border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Security Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Block suspicious IP addresses at firewall level',
                  'Enable rate limiting to prevent brute force attacks',
                  'Monitor connection patterns for unusual activity',
                  'Implement geo-blocking for high-risk regions',
                  'Review and update security policies regularly',
                ].map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Card */}
      {!results && (
        <Card className="glass-card border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span>Threat Detection Indicators</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>Our threat analysis system monitors for:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Unusual connection patterns and geographic anomalies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>IP reputation across multiple threat databases</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Port scanning and brute force attempts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Bot-like behavior and automated attacks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Traffic volume anomalies and DDoS indicators</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThreatAnalysis;