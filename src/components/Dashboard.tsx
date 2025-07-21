import React from 'react';
import { Shield, Database, Activity, Clock, TrendingDown, CheckCircle, AlertTriangle, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const stats = {
    totalPIISecured: 6575,
    riskReduction: { before: 9.2, after: 1.8 },
    dataSources: {
      googleDrive: 1247,
      oneDrive: 856,
      box: 432
    },
    totalFiles: 3535,
    queriesToday: 1247,
    piiBlocked: 45678,
    avgResponseTime: 43,
    uptime: 99.99
  };

  const recentActivity = [
    { time: '14:23', action: 'Engineering query processed', detail: '23 PII entities blocked', status: 'success' },
    { time: '14:22', action: 'HR accessed salary data', detail: 'applied role-based filters', status: 'success' },
    { time: '14:21', action: 'Intern attempted restricted access', detail: 'query blocked', status: 'warning' },
    { time: '14:20', action: 'Admin updated privacy rules', detail: 'SSN handling', status: 'success' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Metric */}
      <Card className="bg-gradient-shield text-white">
        <CardContent className="p-8 text-center">
          <div className="space-y-2">
            <h2 className="text-sm font-medium opacity-90">REAL-TIME PROTECTION</h2>
            <div className="text-4xl font-bold">{stats.totalPIISecured.toLocaleString()} PII Secured</div>
            <Progress value={85} className="w-64 mx-auto h-2 bg-white/20" />
            <div className="text-lg">
              Risk: <span className="font-bold">{stats.riskReduction.before}</span> → <span className="font-bold">{stats.riskReduction.after}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Data Sources:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>├─ Google Drive</span>
                  <span>{stats.dataSources.googleDrive}</span>
                </div>
                <div className="flex justify-between">
                  <span>├─ OneDrive</span>
                  <span>{stats.dataSources.oneDrive}</span>
                </div>
                <div className="flex justify-between">
                  <span>└─ Box</span>
                  <span>{stats.dataSources.box}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Files Protected:</span>
                <span className="font-medium">{stats.totalFiles.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total PII Found:</span>
                <span className="font-medium">{stats.totalPIISecured.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Rules:</span>
                <span className="font-medium">47</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Active Scans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Active Scans</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Current: HR_Salary</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>├─ 47 SSNs found</div>
                <div>├─ 156 names</div>
                <div>└─ 23 salaries</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Next: Employee_Dir</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Queue:</span>
                <span className="font-medium">234 files</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>ETA:</span>
                <span className="font-medium">14 minutes</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              Pause Scanning
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5" />
              <span>Quick Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Queries Today:</span>
                <span className="font-medium">{stats.queriesToday.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>PII Blocked:</span>
                <span className="font-medium">{stats.piiBlocked.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg Response:</span>
                <span className="font-medium">{stats.avgResponseTime}ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Uptime:</span>
                <span className="font-medium">{stats.uptime}%</span>
              </div>
            </div>

            <div className="border rounded-lg p-3 bg-muted/50">
              <div className="text-sm font-medium mb-1">Risk Reduction</div>
              <div className="text-lg font-bold text-success">
                {stats.riskReduction.before} ──► {stats.riskReduction.after}
              </div>
              <div className="text-xs text-muted-foreground">
                ▼▼▼▼▼▼▼▼▼▼
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      [{activity.time}] {activity.action}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;