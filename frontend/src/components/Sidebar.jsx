import React from 'react';
import { Shield, Home, Baby, Lock, FileKey, Network, Code, AlertTriangle, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'child-safety', label: 'Child Safety', icon: Baby },
  { id: 'file-transfer', label: 'Secure Transfer', icon: FileKey },
  { id: 'password', label: 'Password Check', icon: Lock },
  { id: 'port-scanner', label: 'Port Scanner', icon: Network },
  { id: 'code-analyzer', label: 'Code Analyzer', icon: Code },
  { id: 'threat-analysis', label: 'Threat Analysis', icon: AlertTriangle },
  { id: 'reports', label: 'Reports & Alerts', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ currentPage, setCurrentPage, collapsed, setCollapsed }) => {
  return (
    <aside
      className={cn(
        'glass-card border-r border-border/30 flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-cyber">SentinelAI</h1>
              <p className="text-xs text-muted-foreground">Cyber Defense</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow mx-auto">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 -right-3 w-6 h-6 rounded-full bg-card border border-border hover:bg-muted z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>

      <Separator className="bg-border/30" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-muted/50',
                isActive && 'bg-primary/10 border border-primary/20 neon-glow',
                collapsed && 'justify-center px-0'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5 flex-shrink-0',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              {!collapsed && (
                <span
                  className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border/30">
          <div className="glass-card p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
              <span className="text-xs text-muted-foreground">System Status</span>
            </div>
            <p className="text-xs text-success font-medium">All systems operational</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;