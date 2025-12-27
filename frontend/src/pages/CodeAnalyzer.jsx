import React, { useState } from 'react';
import { Code, FileCode, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { toast } from 'sonner';

export const CodeAnalyzer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const analyzeCode = () => {
    if (!code.trim()) {
      toast.error('Please enter code to analyze');
      return;
    }

    setAnalyzing(true);
    toast.info('Analyzing code for vulnerabilities...');

    // Simulate code analysis
    setTimeout(() => {
      const mockVulnerabilities = [
        {
          id: 1,
          severity: 'high',
          type: 'XSS',
          title: 'Cross-Site Scripting Vulnerability',
          line: 12,
          description: 'User input is being inserted into the DOM without sanitization',
          code: 'element.innerHTML = userInput;',
          fix: 'element.textContent = userInput; // or use DOMPurify.sanitize(userInput)',
        },
        {
          id: 2,
          severity: 'medium',
          type: 'Validation',
          title: 'Missing Input Validation',
          line: 8,
          description: 'No validation on user input before processing',
          code: 'const userId = req.params.id;',
          fix: 'const userId = parseInt(req.params.id, 10); if (isNaN(userId)) { return res.status(400).send("Invalid ID"); }',
        },
        {
          id: 3,
          severity: 'low',
          type: 'Security',
          title: 'Hardcoded Credentials',
          line: 3,
          description: 'API key is hardcoded in source code',
          code: 'const API_KEY = "sk_live_abc123xyz";',
          fix: 'const API_KEY = process.env.API_KEY;',
        },
      ];

      setResults({
        totalIssues: mockVulnerabilities.length,
        critical: 0,
        high: mockVulnerabilities.filter((v) => v.severity === 'high').length,
        medium: mockVulnerabilities.filter((v) => v.severity === 'medium').length,
        low: mockVulnerabilities.filter((v) => v.severity === 'low').length,
        vulnerabilities: mockVulnerabilities,
        securityScore: 65,
      });
      setAnalyzing(false);
      toast.success('Analysis complete!');
    }, 2000);
  };

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

  const exampleCode = `function loginUser(username, password) {
  // Missing input validation
  const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
  
  // SQL Injection vulnerability
  db.query(query, (err, results) => {
    if (results.length > 0) {
      // Exposing sensitive data
      return { success: true, user: results[0] };
    }
  });
}`;

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Code Vulnerability Analyzer</h1>
        <p className="text-muted-foreground">Identify security flaws and vulnerabilities in your code</p>
      </div>

      {/* Code Input */}
      <Card className="glass-card border border-primary/20 neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-primary" />
            <span>Code Input</span>
          </CardTitle>
          <CardDescription>Paste your code snippet to analyze for security vulnerabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={language} onValueChange={setLanguage} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="sql">SQL</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <Textarea
              placeholder={`Paste your ${language} code here...`}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[300px] font-mono text-sm bg-muted/30 border-border/30 focus:border-primary/50"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCode(exampleCode)}
              className="text-xs"
            >
              Load Example Code
            </Button>
          </div>

          <Button
            onClick={analyzeCode}
            disabled={analyzing}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {analyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Analyzing Code...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Analyze Code
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {results && (
        <div className="space-y-6 animate-slide-in">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="glass-card border border-border/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Security Score</p>
                <p className="text-3xl font-bold text-warning">{results.securityScore}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border border-destructive/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Critical</p>
                <p className="text-3xl font-bold text-destructive">{results.critical}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border border-destructive/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">High</p>
                <p className="text-3xl font-bold text-destructive">{results.high}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border border-warning/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Medium</p>
                <p className="text-3xl font-bold text-warning">{results.medium}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border border-primary/30">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Low</p>
                <p className="text-3xl font-bold text-primary">{results.low}</p>
              </CardContent>
            </Card>
          </div>

          {/* Vulnerabilities */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle>Detected Vulnerabilities</CardTitle>
              <CardDescription>{results.totalIssues} security issues found</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {results.vulnerabilities.map((vuln) => (
                    <div
                      key={vuln.id}
                      className="p-4 rounded-lg bg-muted/20 border border-border/30 space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getSeverityColor(vuln.severity)}>
                              {vuln.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{vuln.type}</Badge>
                            <span className="text-xs text-muted-foreground">Line {vuln.line}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">{vuln.title}</h4>
                          <p className="text-sm text-muted-foreground">{vuln.description}</p>
                        </div>
                        {vuln.severity === 'high' || vuln.severity === 'critical' ? (
                          <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
                        )}
                      </div>

                      {/* Vulnerable Code */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <XCircle className="w-4 h-4 text-destructive" />
                          <p className="text-xs font-semibold text-destructive">Vulnerable Code:</p>
                        </div>
                        <pre className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 text-xs font-mono text-foreground overflow-x-auto">
                          {vuln.code}
                        </pre>
                      </div>

                      {/* Fixed Code */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <p className="text-xs font-semibold text-success">Recommended Fix:</p>
                        </div>
                        <pre className="p-3 rounded-lg bg-success/5 border border-success/20 text-xs font-mono text-foreground overflow-x-auto">
                          {vuln.fix}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="glass-card border border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Secure Coding Best Practices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Always validate and sanitize user inputs',
                  'Use parameterized queries to prevent SQL injection',
                  'Store sensitive data in environment variables',
                  'Implement proper error handling without exposing stack traces',
                  'Use HTTPS for all data transmission',
                  'Keep dependencies updated and scan for known vulnerabilities',
                ].map((practice, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{practice}</p>
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
              <Code className="w-5 h-5 text-primary" />
              <span>Common Vulnerabilities We Check</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground mb-2">Web Vulnerabilities</h4>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Cross-Site Scripting (XSS)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>SQL Injection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Cross-Site Request Forgery (CSRF)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Insecure Direct Object References</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground mb-2">Code Quality Issues</h4>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Hardcoded credentials</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Missing input validation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Insecure data storage</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Weak cryptography</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CodeAnalyzer;