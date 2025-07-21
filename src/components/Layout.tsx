import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Shield, BarChart3, Play, Settings, Code, FileText, ChevronDown } from 'lucide-react';
import { useRole } from '@/context/RoleContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { currentRole, setCurrentRole, roleDisplayName } = useRole();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Live Demo', href: '/demo', icon: Play },
    { name: 'Configure', href: '/configure', icon: Settings },
    { name: 'API Test', href: '/api-test', icon: Code },
    { name: 'Audit', href: '/audit', icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-primary text-primary-foreground';
      case 'hr_manager': return 'bg-success text-success-foreground';
      case 'engineer': return 'bg-shield-blue text-white';
      case 'intern': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">DataLens Shield</h1>
                <p className="text-xs text-muted-foreground">Privacy Infrastructure for Enterprise AI</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Role Selector & Status */}
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-success border-success">
                <div className="h-2 w-2 bg-success rounded-full mr-2" />
                Active
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Badge className={getRoleColor(currentRole)}>
                      {roleDisplayName}
                    </Badge>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleRoleChange('admin')}>
                    <Badge className={getRoleColor('admin')} variant="outline">Admin</Badge>
                    <span className="ml-2">Full Access</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRoleChange('hr_manager')}>
                    <Badge className={getRoleColor('hr_manager')} variant="outline">HR Manager</Badge>
                    <span className="ml-2">HR Data</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRoleChange('engineer')}>
                    <Badge className={getRoleColor('engineer')} variant="outline">Engineer</Badge>
                    <span className="ml-2">Technical Only</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRoleChange('intern')}>
                    <Badge className={getRoleColor('intern')} variant="outline">Intern</Badge>
                    <span className="ml-2">Limited Access</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;