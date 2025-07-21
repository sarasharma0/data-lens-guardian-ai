import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/context/RoleContext';
import { CheckCircle, AlertTriangle, XCircle, TrendingDown, Download, Mail, Printer, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Audit = () => {
  const { currentRole } = useRole();
  const [timeFilter, setTimeFilter] = useState('today');
  const [roleFilter, setRoleFilter] = useState('all');

  const metrics24h = {
    totalQueries: 1247,
    piiBlocked: 45678,
    successRate: 99.97,
    accessDenials: 3
  };

  const compliance = [
    { name: 'GDPR Compliant', status: 'pass', description: 'Data processing compliant' },
    { name: 'CCPA Compliant', status: 'pass', description: 'California privacy compliant' },
    { name: 'HIPAA Ready', status: 'pass', description: 'Healthcare data protection' },
    { name: 'SOC2 Type II', status: 'pass', description: 'Security controls verified' }
  ];

  const auditEntries = [
    {
      time: '14:23:05',
      user: 'S.Chen',
      role: 'Admin',
      action: 'Query: "salary report"',
      piiProtected: '23 entities',
      status: 'success'
    },
    {
      time: '14:22:47',
      user: 'M.Chen',
      role: 'Engineer',
      action: 'DENIED: HR data access',
      piiProtected: 'Full block',
      status: 'denied'
    },
    {
      time: '14:22:12',
      user: 'J.Smith',
      role: 'HR Mgr',
      action: 'Export: Q4 review',
      piiProtected: '89 anonymized',
      status: 'success'
    },
    {
      time: '14:21:33',
      user: 'A.Rodriguez',
      role: 'Intern',
      action: 'DENIED: Salary query',
      piiProtected: 'Full block',
      status: 'denied'
    },
    {
      time: '14:21:05',
      user: 'S.Chen',
      role: 'Admin',
      action: 'Updated SSN rules',
      piiProtected: '-',
      status: 'success'
    },
    {
      time: '14:20:18',
      user: 'J.Smith',
      role: 'HR Mgr',
      action: 'Query: "team list"',
      piiProtected: '156 anonymized',
      status: 'success'
    },
    {
      time: '14:19:42',
      user: 'System',
      role: 'Auto',
      action: 'Scanned: Benefits.xlsx',
      piiProtected: '47 PII found',
      status: 'success'
    },
    {
      time: '14:19:01',
      user: 'M.Chen',
      role: 'Engineer',
      action: 'Query: "tech stack"',
      piiProtected: '0 (no PII)',
      status: 'success'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'denied': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-success';
      case 'warning': return 'text-warning';
      case 'fail': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const riskTrendData = [
    { day: 'Mon', risk: 9.2 },
    { day: 'Tue', risk: 8.1 },
    { day: 'Wed', risk: 6.5 },
    { day: 'Thu', risk: 4.2 },
    { day: 'Fri', risk: 2.8 },
    { day: 'Sat', risk: 1.9 },
    { day: 'Sun', risk: 1.8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compliance & Audit Trail</h1>
          <p className="text-muted-foreground">Monitor privacy protection and compliance status</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-success border-success">
            <div className="h-2 w-2 bg-success rounded-full mr-2" />
            Auto-refresh: ON
          </Badge>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">24HR Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Total Queries:</div>
              <div className="text-2xl font-bold">{metrics24h.totalQueries.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">PII Blocked:</div>
              <div className="text-2xl font-bold">{metrics24h.piiBlocked.toLocaleString()} <span className="text-sm text-muted-foreground">entities</span></div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Success Rate:</div>
              <div className="text-2xl font-bold text-success">{metrics24h.successRate}%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {compliance.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <CheckCircle className={`h-4 w-4 ${getStatusColor(item.status)}`} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
            <div className="pt-2">
              <div className="text-sm text-muted-foreground">Audit Coverage:</div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-success/20 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-full"></div>
                </div>
                <span className="text-sm font-medium">100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alerts (0)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">No PII Leaks</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">No Violations</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm">{metrics24h.accessDenials} Access Denials</span>
            </div>
            <div className="pt-2">
              <div className="text-sm text-muted-foreground">Last Incident:</div>
              <div className="font-medium">Never</div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-success">9.2 → 1.8</div>
                <div className="text-sm text-muted-foreground">Risk Score</div>
              </div>
              
              {/* Simple Risk Trend Chart */}
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">7-Day Trend</div>
                <div className="flex items-end justify-between h-16 space-x-1">
                  {riskTrendData.map((data, index) => (
                    <div key={data.day} className="flex flex-col items-center space-y-1">
                      <div 
                        className="bg-success rounded-sm w-3"
                        style={{ height: `${(10 - data.risk) * 6}px` }}
                      ></div>
                      <div className="text-xs text-muted-foreground">{data.day}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  ← After DataLens Shield
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Detailed Audit Log</CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="hr">HR Manager</SelectItem>
                  <SelectItem value="engineer">Engineer</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 text-sm font-medium">Time</th>
                  <th className="py-3 text-sm font-medium">User</th>
                  <th className="py-3 text-sm font-medium">Role</th>
                  <th className="py-3 text-sm font-medium">Action</th>
                  <th className="py-3 text-sm font-medium">PII Protected</th>
                  <th className="py-3 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditEntries.map((entry, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 text-sm font-mono">{entry.time}</td>
                    <td className="py-3 text-sm">{entry.user}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="text-xs">
                        {entry.role}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm">{entry.action}</td>
                    <td className="py-3 text-sm font-medium">{entry.piiProtected}</td>
                    <td className="py-3">
                      {getStatusIcon(entry.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-3">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email Report
            </Button>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Audit;