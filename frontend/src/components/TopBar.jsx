import React, { useState } from 'react';
import { Search, Bell, User, Shield } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

export const TopBar = () => {
  const [notifications] = useState([
    { id: 1, type: 'warning', message: 'Unusual activity detected on port 8080', time: '5m ago' },
    { id: 2, type: 'success', message: 'Security scan completed successfully', time: '1h ago' },
    { id: 3, type: 'info', message: 'New security update available', time: '3h ago' },
  ]);

  return (
    <header className="glass-card border-b border-border/30 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search security tools, reports, or alerts..."
              className="pl-10 bg-muted/30 border-border/30 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-xs">
                  {notifications.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass-card">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="secondary">{notifications.length} new</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-start space-x-2 w-full">
                    <div
                      className={`w-2 h-2 mt-1.5 rounded-full ${
                        notif.type === 'warning'
                          ? 'bg-warning'
                          : notif.type === 'success'
                          ? 'bg-success'
                          : 'bg-primary'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="w-8 h-8 border border-primary/30">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">Security Admin</p>
                  <p className="text-xs text-muted-foreground">admin@sentinel.ai</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;