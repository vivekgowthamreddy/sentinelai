import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Eye, Moon, Sun, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: false,
    criticalOnly: false,
  });

  const [scanning, setScanning] = useState({
    autoScan: true,
    deepScan: false,
    scheduledScans: true,
  });

  const [privacy, setPrivacy] = useState({
    dataCollection: true,
    analytics: true,
    shareReports: false,
  });

  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [scanSensitivity, setScanSensitivity] = useState('medium');

  const saveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const resetSettings = () => {
    toast.info('Settings reset to defaults');
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize SentinelAI to match your security preferences</p>
      </div>

      {/* Notifications */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Configure how you receive security alerts and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-alerts" className="text-base">Email Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive security alerts via email</p>
            </div>
            <Switch
              id="email-alerts"
              checked={notifications.emailAlerts}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, emailAlerts: checked })
              }
            />
          </div>

          <Separator className="bg-border/30" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Real-time browser notifications</p>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, pushNotifications: checked })
              }
            />
          </div>

          <Separator className="bg-border/30" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-reports" className="text-base">Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">Summary of security activity each week</p>
            </div>
            <Switch
              id="weekly-reports"
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, weeklyReports: checked })
              }
            />
          </div>

          <Separator className="bg-border/30" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="critical-only" className="text-base">Critical Alerts Only</Label>
              <p className="text-sm text-muted-foreground">Only notify for high-priority threats</p>
            </div>
            <Switch
              id="critical-only"
              checked={notifications.criticalOnly}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, criticalOnly: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Scanning */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Security Scanning</span>
          </CardTitle>
          <CardDescription>Configure automated security scans and monitoring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-scan" className="text-base">Automatic Scanning</Label>
              <p className="text-sm text-muted-foreground">Continuously monitor for threats</p>
            </div>
            <Switch
              id="auto-scan"
              checked={scanning.autoScan}
              onCheckedChange={(checked) => setScanning({ ...scanning, autoScan: checked })}
            />
          </div>

          <Separator className="bg-border/30" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="deep-scan" className="text-base">Deep Scanning</Label>
              <p className="text-sm text-muted-foreground">More thorough but slower scans</p>
            </div>
            <Switch
              id="deep-scan"
              checked={scanning.deepScan}
              onCheckedChange={(checked) => setScanning({ ...scanning, deepScan: checked })}
            />
          </div>

          <Separator className="bg-border/30" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="scheduled-scans" className="text-base">Scheduled Scans</Label>
              <p className="text-sm text-muted-foreground">Run daily security checks</p>
            </div>
            <Switch
              id="scheduled-scans"
              checked={scanning.scheduledScans}
              onCheckedChange={(checked) => setScanning({ ...scanning, scheduledScans: checked })}
            />
          </div>

          <Separator className="bg-border/30" />

          <div className="space-y-3">
            <Label htmlFor="scan-sensitivity" className="text-base">Scan Sensitivity</Label>
            <Select value={scanSensitivity} onValueChange={setScanSensitivity}>
              <SelectTrigger id="scan-sensitivity" className="bg-muted/30 border-border/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Fewer false positives</SelectItem>
                <SelectItem value="medium">Medium - Balanced detection</SelectItem>
                <SelectItem value="high">High - Maximum sensitivity</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Higher sensitivity may increase false positives</p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-primary" />
            <span>Privacy & Data</span>
          </CardTitle>
          <CardDescription>Control your data and privacy preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-collection" className="text-base">Anonymous Data Collection</Label>
              <p className="text-sm text-muted-foreground">Help improve SentinelAI with usage data</p>
            </div>
            <Switch
              id="data-collection"
              checked={privacy.dataCollection}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, dataCollection: checked })}
            />
          </div>

          <Separator className="bg-border/30" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics" className="text-base">Analytics</Label>
              <p className="text-sm text-muted-foreground">Track security metrics and trends</p>
            </div>
            <Switch
              id="analytics"
              checked={privacy.analytics}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, analytics: checked })}
            />
          </div>

          <Separator className="bg-border/30" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="share-reports" className="text-base">Share Threat Reports</Label>
              <p className="text-sm text-muted-foreground">Contribute to threat intelligence database</p>
            </div>
            <Switch
              id="share-reports"
              checked={privacy.shareReports}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, shareReports: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Customize the look and feel of SentinelAI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="theme" className="text-base">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme" className="bg-muted/30 border-border/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">
                  <div className="flex items-center space-x-2">
                    <Moon className="w-4 h-4" />
                    <span>Dark Mode</span>
                  </div>
                </SelectItem>
                <SelectItem value="light">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <span>Light Mode</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-border/30" />

          <div className="space-y-3">
            <Label htmlFor="language" className="text-base">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="bg-muted/30 border-border/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>English</span>
                  </div>
                </SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-4">
        <Button variant="outline" onClick={resetSettings}>
          Reset to Defaults
        </Button>
        <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;