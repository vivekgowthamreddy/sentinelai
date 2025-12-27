import React, { useState } from 'react';
import { Network, Search, Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { toast } from 'sonner';

export const PortScanner = () => {
  const [target, setTarget] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);

  const scanPorts = async () => {
    if (!target) {
      toast.error('Please enter an IP address or domain');
      return;
    }

    setScanning(true);
    toast.info('Scanning network ports...');

    // Simulate port scanning
    setTimeout(() => {
      const mockPorts = [
        { port: 22, service: 'SSH', status: 'open', risk: 'medium', description: 'Secure Shell - Remote administration' },
        { port: 80, service: 'HTTP', status: 'open', risk: 'low', description: 'Web server - Unencrypted traffic' },
        { port: 443, service: 'HTTPS', status: 'open', risk: 'low', description: 'Secure web server - Encrypted traffic' },
        { port: 3306, service: 'MySQL', status: 'open', risk: 'high', description: 'Database server - Should not be exposed' },
        { port: 8080, service: 'HTTP-Alt', status: 'open', risk: 'medium', description: 'Alternative HTTP port' },
        { port: 21, service: 'FTP', status: 'filtered', risk: 'medium', description: 'File Transfer Protocol' },
        { port: 25, service: 'SMTP', status: 'closed', risk: 'low', description: 'Email server' },
      ];

      setResults({
        target,
        totalPorts: 1000,
        openPorts: mockPorts.filter((p) => p.status === 'open').length,
        closedPorts: mockPorts.filter((p) => p.status === 'closed').length,
        filteredPorts: mockPorts.filter((p) => p.status === 'filtered').length,
        ports: mockPorts,
        scanTime: '12.4 seconds',
      });
      setScanning(false);
      toast.success('Port scan completed!');
    }, 3000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'high':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-success/20 text-success border-success/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-success';
      case 'filtered':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Network & Port Scanner</h1>
        <p className="text-muted-foreground">Identify open ports and potential security exposure risks</p>
      </div>

      {/* Scanner Input */}
      <Card className="glass-card border border-primary/20 neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-primary" />
            <span>Target Configuration</span>
          </CardTitle>
          <CardDescription>Enter an IP address or domain name to scan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="192.168.1.1 or example.com"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && scanPorts()}
              className="flex-1 bg-muted/30 border-border/30 focus:border-primary/50 font-mono"
            />
            <Button onClick={scanPorts} disabled={scanning} className="bg-primary hover:bg-primary/90">
              {scanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Scan Ports
                </>
              )}
            </Button>
          </div>

          <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Only scan networks and systems you own or have explicit permission to test. Unauthorized scanning may be illegal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Results */}
      {results && (
        <div className="space-y-6 animate-slide-in">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card border border-border/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Scanned</p>
                    <p className="text-3xl font-bold text-foreground">{results.totalPorts}</p>
                  </div>
                  <Network className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border border-success/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Open Ports</p>
                    <p className="text-3xl font-bold text-success">{results.openPorts}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border border-warning/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Filtered</p>
                    <p className="text-3xl font-bold text-warning">{results.filteredPorts}</p>
                  </div>
                  <Shield className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border border-border/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Scan Time</p>
                    <p className="text-2xl font-bold text-foreground">{results.scanTime}</p>
                  </div>
                  <Globe className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Port Details */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle>Detected Ports</CardTitle>
              <CardDescription>
                Scan target: <span className="font-mono text-foreground">{results.target}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {results.ports.map((port) => (
                    <div
                      key={port.port}
                      className="p-4 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/40 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{port.port}</p>
                            <p className="text-xs text-muted-foreground">Port</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{port.service}</p>
                            <p className="text-xs text-muted-foreground">{port.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRiskBadge(port.risk)}>{port.risk.toUpperCase()}</Badge>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(port.status)} border-current`}
                          >
                            {port.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      {port.risk === 'high' && (
                        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground">
                              This port should not be publicly accessible. Consider implementing firewall rules.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
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
                  'Close unnecessary open ports to reduce attack surface',
                  'Implement firewall rules to restrict access to sensitive services',
                  'Use VPN or SSH tunneling for remote database access',
                  'Keep all services updated with the latest security patches',
                  'Monitor port activity regularly for suspicious behavior',
                ].map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
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
              <Network className="w-5 h-5 text-primary" />
              <span>About Port Scanning</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Port scanning helps identify which network ports are open on a system:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-success">Open:</strong> Port is accepting connections</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-muted-foreground">Closed:</strong> Port is not accepting connections</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-warning">Filtered:</strong> Port status cannot be determined (firewall)</span>
                </li>
              </ul>
              <p className="text-foreground font-medium mt-4">
                Common ports to monitor: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL), 5432 (PostgreSQL)
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PortScanner;