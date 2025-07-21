import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types';
import { Users, Database, Shield, Settings, Save, Upload, Download, TestTube } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const Configure = () => {
  const { currentRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<UserRole>('hr_manager');

  const roles = [
    { id: 'admin', name: 'Admin', description: 'Full system access with minimal masking', users: 3 },
    { id: 'hr_manager', name: 'HR Manager', description: 'HR data access with salary bands', users: 8 },
    { id: 'engineer', name: 'Engineer', description: 'Technical data only, no PII access', users: 47 },
    { id: 'intern', name: 'Intern', description: 'Limited access to public documents', users: 12 }
  ];

  const dataSources = [
    { name: 'Google Drive', enabled: true, files: 1247, allowedPaths: '/HR/*, /Benefits/*' },
    { name: 'OneDrive', enabled: true, files: 856, allowedPaths: '/Employee_Data/*' },
    { name: 'Box', enabled: false, files: 432, allowedPaths: 'No access' }
  ];

  const piiTypes = [
    { type: 'SSN', action: 'redact', description: 'Social Security Numbers' },
    { type: 'Salary', action: 'band', description: 'Compensation Information', bands: '$50K-60K, $60K-80K, $80K-100K...' },
    { type: 'Name', action: 'partial', description: 'Personal Names' },
    { type: 'Email', action: 'partial', description: 'Email Addresses', example: 'j***@corp.com' },
    { type: 'Phone', action: 'redact', description: 'Phone Numbers' },
    { type: 'Credit Card', action: 'redact', description: 'Payment Information' },
    { type: 'Address', action: 'redact', description: 'Physical Addresses' }
  ];

  const piiPatterns = [
    'SSN', 'Credit Card', 'Email', 'Phone', 'Name', 'Address', 'Date of Birth'
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'show': return 'bg-success text-success-foreground';
      case 'partial': return 'bg-warning text-warning-foreground';
      case 'band': return 'bg-primary text-primary-foreground';
      case 'redact': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Privacy Configuration Center</h1>
        <p className="text-muted-foreground">Manage role-based access controls and privacy rules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Roles (4)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedRole === role.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedRole(role.id as UserRole)}
              >
                <div className="font-medium">{role.name}</div>
                <div className="text-sm opacity-80">{role.users} users</div>
              </div>
            ))}
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              + Add Role
            </Button>

            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>PII Patterns</span>
              </h4>
              <div className="space-y-1">
                {piiPatterns.map((pattern) => (
                  <div key={pattern} className="text-sm text-muted-foreground">
                    • {pattern}
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                + Add Pattern
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Configuration */}
        <div className="lg:col-span-3 space-y-6">
          {/* Role Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Privacy Rules for: {roles.find(r => r.id === selectedRole)?.name}</CardTitle>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
              <CardDescription>
                {roles.find(r => r.id === selectedRole)?.description}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Data Source Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data Source Access</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Source</th>
                      <th className="text-left py-2">Access</th>
                      <th className="text-left py-2">Allowed Paths</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSources.map((source, index) => (
                      <tr key={source.name} className="border-b">
                        <td className="py-3 font-medium">{source.name}</td>
                        <td className="py-3">
                          <Switch checked={source.enabled} />
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {source.allowedPaths}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* PII Transformation Rules */}
          <Card>
            <CardHeader>
              <CardTitle>PII Transformation Rules</CardTitle>
              <CardDescription>Configure how different types of PII are handled for this role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">PII Type</th>
                      <th className="text-left py-2">Action</th>
                      <th className="text-left py-2">Configuration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {piiTypes.map((pii, index) => (
                      <tr key={pii.type} className="border-b">
                        <td className="py-3 font-medium">{pii.type}</td>
                        <td className="py-3">
                          <Select defaultValue={pii.action}>
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="show">Show Full</SelectItem>
                              <SelectItem value="partial">Partial Mask</SelectItem>
                              <SelectItem value="band">Show Band/Range</SelectItem>
                              <SelectItem value="redact">Redact Completely</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">
                          {pii.action === 'band' && pii.bands && (
                            <div>Bands: {pii.bands}</div>
                          )}
                          {pii.action === 'partial' && pii.example && (
                            <div>Example: {pii.example}</div>
                          )}
                          {pii.action === 'redact' && (
                            <div>Completely hidden</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Path Restrictions</CardTitle>
                <CardDescription>Configure allowed file paths for this role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="/HR/*" />
                <Input placeholder="/Benefits/*" />
                <Input placeholder="/Employee_Data/*" />
                <Button variant="outline" size="sm">
                  + Add Path
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Query Limits</CardTitle>
                <CardDescription>Set rate limits and restrictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Max queries per hour:</span>
                  <Input className="w-20" defaultValue="100" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Max results per query:</span>
                  <Input className="w-20" defaultValue="50" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Allow file downloads:</span>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-3">
                <Button>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Rules
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Config
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Config
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Configure;