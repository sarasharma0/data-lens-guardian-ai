import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types';
import { Shield, AlertCircle, CheckCircle, Upload, RotateCcw, Copy } from 'lucide-react';

const LiveDemo = () => {
  const { currentRole, setCurrentRole } = useRole();
  const [testData, setTestData] = useState(`Name: Sarah Johnson
SSN: 123-45-6789
Salary: $125,000
Email: sjohnson@company.com
Phone: (555) 123-4567
Credit Card: 4532-1234-5678-9012
DOB: 03/15/1985
Address: 123 Main St, NYC`);

  const sampleData = {
    name: 'Sarah Johnson',
    ssn: '123-45-6789',
    salary: '$125,000',
    email: 'sjohnson@company.com',
    phone: '(555) 123-4567',
    credit_card: '4532-1234-5678-9012',
    dob: '03/15/1985',
    address: '123 Main St, NYC'
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-primary text-primary-foreground';
      case 'hr_manager': return 'bg-success text-success-foreground';
      case 'engineer': return 'bg-shield-blue text-white';
      case 'intern': return 'bg-muted text-muted-foreground';
    }
  };

  const applyRoleRules = (field: string, value: string) => {
    const rules = {
      admin: {
        name: value,
        ssn: '***-**-6789',
        salary: value,
        email: 's***@company.com',
        phone: value,
        credit_card: '****-****-****-9012',
        dob: value,
        address: value
      },
      hr_manager: {
        name: 'Sarah J.',
        ssn: '[REDACTED]',
        salary: '$120K-$130K',
        email: 's***@company.com',
        phone: '[REDACTED]',
        credit_card: '[REDACTED]',
        dob: '03/15/****',
        address: '[REDACTED]'
      },
      engineer: {
        name: '[NO ACCESS]',
        ssn: '[NO ACCESS]',
        salary: '[NO ACCESS]',
        email: '[NO ACCESS]',
        phone: '[NO ACCESS]',
        credit_card: '[NO ACCESS]',
        dob: '[NO ACCESS]',
        address: '[NO ACCESS]'
      },
      intern: {
        name: '[NO ACCESS]',
        ssn: '[NO ACCESS]',
        salary: '[NO ACCESS]',
        email: '[NO ACCESS]',
        phone: '[NO ACCESS]',
        credit_card: '[NO ACCESS]',
        dob: '[NO ACCESS]',
        address: '[NO ACCESS]'
      }
    };

    return rules[currentRole]?.[field as keyof typeof rules[typeof currentRole]] || '[NO ACCESS]';
  };

  const getRuleDescription = (field: string) => {
    const descriptions = {
      admin: {
        name: 'Keep Full',
        ssn: 'Mask Partial',
        salary: 'Show Exact',
        email: 'Partial Mask',
        phone: 'Show Full',
        credit_card: 'Mask Middle',
        dob: 'Show Full',
        address: 'Show Full'
      },
      hr_manager: {
        name: 'First Name + Initial',
        ssn: 'Redact Completely',
        salary: 'Show Salary Band',
        email: 'Partial Mask',
        phone: 'Redact Completely',
        credit_card: 'Redact Completely',
        dob: 'Year Masked',
        address: 'Redact Completely'
      },
      engineer: {
        name: 'No Access',
        ssn: 'No Access',
        salary: 'No Access',
        email: 'No Access',
        phone: 'No Access',
        credit_card: 'No Access',
        dob: 'No Access',
        address: 'No Access'
      },
      intern: {
        name: 'No Access',
        ssn: 'No Access',
        salary: 'No Access',
        email: 'No Access',
        phone: 'No Access',
        credit_card: 'No Access',
        dob: 'No Access',
        address: 'No Access'
      }
    };

    return descriptions[currentRole]?.[field as keyof typeof descriptions[typeof currentRole]] || 'No Access';
  };

  const getRiskScore = () => {
    switch (currentRole) {
      case 'admin': return { before: 9.2, after: 2.1 };
      case 'hr_manager': return { before: 9.2, after: 3.4 };
      case 'engineer': return { before: 9.2, after: 0.8 };
      case 'intern': return { before: 9.2, after: 0.2 };
    }
  };

  const riskScore = getRiskScore();

  const detectedPIITypes = ['PERSON', 'US_SSN', 'EMAIL', 'PHONE', 'CREDIT_CARD', 'DATE'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Privacy Protection Demonstration</h1>
          <p className="text-muted-foreground">See how role-based access control protects sensitive data</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Current View:</span>
          <Badge className={getRoleColor(currentRole)}>
            {currentRole === 'hr_manager' ? 'HR Manager' : currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Original Data */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span>Original Data</span>
            </CardTitle>
            <CardDescription>Raw unprotected information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(sampleData).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                <span className="text-destructive font-mono">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Applied Rules */}
        <Card className="border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-warning">
              <Shield className="h-5 w-5" />
              <span>Applied Rules</span>
            </CardTitle>
            <CardDescription>Role-based transformation rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.keys(sampleData).map((key) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                <span className="text-warning font-mono text-xs">
                  {getRuleDescription(key)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Protected Output */}
        <Card className="border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <CheckCircle className="h-5 w-5" />
              <span>Protected Output</span>
            </CardTitle>
            <CardDescription>Safe data for {currentRole === 'hr_manager' ? 'HR Manager' : currentRole}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(sampleData).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                <span className="text-success font-mono">
                  {applyRoleRules(key, value)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Role Switcher */}
      <Card>
        <CardHeader>
          <CardTitle>Switch Roles to See Different Access Levels</CardTitle>
          <CardDescription>Each role has different privacy rules and data access permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            {(['admin', 'hr_manager', 'engineer', 'intern'] as UserRole[]).map((role) => (
              <Button
                key={role}
                variant={currentRole === role ? 'default' : 'outline'}
                onClick={() => setCurrentRole(role)}
                className="flex items-center space-x-2"
              >
                <Badge className={getRoleColor(role)} variant="outline">
                  {role === 'hr_manager' ? 'HR Manager' : role.charAt(0).toUpperCase() + role.slice(1)}
                </Badge>
              </Button>
            ))}
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <div className="font-medium">Risk Reduction</div>
              <div className="text-sm text-muted-foreground">
                From {riskScore.before} to {riskScore.after}
              </div>
            </div>
            <div className="text-2xl font-bold text-success">
              {riskScore.before} → {riskScore.after}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Data Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Test Data</CardTitle>
          <CardDescription>Paste your own data to see real-time anonymization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your data here to see real-time anonymization..."
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Use Sample Data
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detected PII Types */}
      <Card>
        <CardHeader>
          <CardTitle>Detected PII Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {detectedPIITypes.map((type) => (
              <Badge key={type} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveDemo;