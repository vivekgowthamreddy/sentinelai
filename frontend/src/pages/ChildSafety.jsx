import React, { useState } from 'react';
import { Baby, Globe, Shield, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

export const ChildSafety = () => {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeWebsite = async () => {
    if (!url) {
      toast.error('Please enter a website URL');
      return;
    }

    setScanning(true);
    toast.info('Analyzing website safety...');

    // Simulate analysis
    setTimeout(() => {
      const mockResult = {
        url,
        safetyScore: Math.floor(Math.random() * 40) + 60,
        rating: ['Safe', 'Caution', 'Not Recommended'][Math.floor(Math.random() * 3)],
        contentRisk: Math.floor(Math.random() * 100),
        privacyRisk: Math.floor(Math.random() * 100),
        trackingIntensity: Math.floor(Math.random() * 100),
        findings: [
          'No age-inappropriate content detected',
          '3 tracking cookies found',
          'HTTPS encryption enabled',
          'Privacy policy available',
        ],
        recommendation: 'This website appears safe for children with parental guidance.',
      };
      setResult(mockResult);
      setScanning(false);
      toast.success('Analysis complete!');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Children's Online Safety</h1>
        <p className="text-muted-foreground">Evaluate whether websites and apps are safe for children</p>
      </div>

      {/* Analysis Input */}
      <Card className="glass-card border border-primary/20 neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-primary" />
            <span>Website Safety Analyzer</span>
          </CardTitle>
          <CardDescription>Enter a website URL to check its safety for children</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeWebsite()}
              className="flex-1 bg-muted/30 border-border/30 focus:border-primary/50"
            />
            <Button onClick={analyzeWebsite} disabled={scanning} className="bg-primary hover:bg-primary/90">
              {scanning ? (
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

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-slide-in">
          {/* Safety Rating */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle>Safety Assessment</CardTitle>
              <CardDescription>{result.url}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-5xl font-bold text-primary">{result.safetyScore}</p>
                  <p className="text-sm text-muted-foreground mt-1">Safety Score</p>
                </div>
                <Badge
                  className={
                    result.rating === 'Safe'
                      ? 'bg-success/20 text-success border-success/30'
                      : result.rating === 'Caution'
                      ? 'bg-warning/20 text-warning border-warning/30'
                      : 'bg-destructive/20 text-destructive border-destructive/30'
                  }
                >
                  {result.rating === 'Safe' && <CheckCircle className="w-4 h-4 mr-1" />}
                  {result.rating === 'Caution' && <AlertTriangle className="w-4 h-4 mr-1" />}
                  {result.rating === 'Not Recommended' && <AlertTriangle className="w-4 h-4 mr-1" />}
                  {result.rating}
                </Badge>
              </div>

              {/* Risk Indicators */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Content Risk</span>
                    <span className="text-foreground font-medium">{result.contentRisk}%</span>
                  </div>
                  <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-success to-warning rounded-full transition-all duration-500"
                      style={{ width: `${result.contentRisk}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Privacy Risk</span>
                    <span className="text-foreground font-medium">{result.privacyRisk}%</span>
                  </div>
                  <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-success to-warning rounded-full transition-all duration-500"
                      style={{ width: `${result.privacyRisk}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Tracking Intensity</span>
                    <span className="text-foreground font-medium">{result.trackingIntensity}%</span>
                  </div>
                  <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-success to-destructive rounded-full transition-all duration-500"
                      style={{ width: `${result.trackingIntensity}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle>Analysis Findings</CardTitle>
              <CardDescription>Detailed security and content assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.findings.map((finding, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{finding}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Card */}
      {!result && (
        <Card className="glass-card border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Baby className="w-5 h-5 text-primary" />
              <span>How It Works</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Our AI-powered analyzer evaluates websites for child safety by checking:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Content appropriateness and age restrictions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Privacy policies and data collection practices</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Tracking cookies and third-party integrations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Security measures and encryption standards</span>
                </li>
              </ul>
              <p className="text-foreground font-medium mt-4">
                Enter a URL above to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChildSafety;