import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types';
import { Code, Play, Copy, Download, ExternalLink, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const APITest = () => {
  const { currentRole } = useRole();
  const [testQuery, setTestQuery] = useState('Show me all employee SSNs and salaries from the HR database');
  const [isExecuting, setIsExecuting] = useState(false);

  const exampleQueries = [
    'Show me all employee SSNs and salaries from the HR database',
    'List all engineers with their contact information',
    'What are the salary ranges for the marketing department?',
    'Find all documents containing credit card information'
  ];

  const getRoleResponse = (role: UserRole, query: string) => {
    const responses = {
      admin: {
        data: [
          { name: 'Sarah Johnson', ssn: '***-**-6789', salary: '$125,000' },
          { name: 'Mike Chen', ssn: '***-**-4321', salary: '$118,000' }
        ],
        pii_masked: 23,
        access_level: 'full_with_masking',
        response_time: '43ms'
      },
      hr_manager: {
        data: [
          { name: 'Sarah J.', ssn: '[REDACTED]', salary: '$120K-$130K' },
          { name: 'Mike C.', ssn: '[REDACTED]', salary: '$115K-$120K' }
        ],
        pii_masked: 31,
        access_level: 'hr_filtered',
        response_time: '38ms'
      },
      engineer: {
        error: 'Access denied - Engineers cannot access HR data',
        suggestion: 'Try technical documentation queries',
        accessible: ['engineering/*', 'documentation/*'],
        response_time: '12ms'
      },
      intern: {
        error: 'Insufficient permissions for salary data',
        suggestion: 'Access limited to public documentation',
        accessible: ['public/*', 'training/*'],
        response_time: '8ms'
      }
    };

    return responses[role];
  };

  const handleExecuteQuery = async () => {
    setIsExecuting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsExecuting(false);
  };

  const curlCommand = `curl -X POST https://api.datalens-shield.com/v1/protect \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "X-User-Role: ${currentRole}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "${testQuery}",
    "max_results": 100,
    "include_metadata": true
  }'`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Integration Playground</h1>
          <p className="text-muted-foreground">Test role-based data access through our API</p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Zap className="h-3 w-3" />
          <span>Latency: 43ms</span>
        </Badge>
      </div>

      {/* Query Input */}
      <Card>
        <CardHeader>
          <CardTitle>Test Query</CardTitle>
          <CardDescription>Enter a query to test role-based data access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your query here..."
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            className="min-h-[80px]"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button 
                onClick={handleExecuteQuery}
                disabled={isExecuting}
                className="flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>{isExecuting ? 'Executing...' : 'Execute All Roles'}</span>
              </Button>
            </div>
            
            <div className="flex space-x-2">
              {exampleQueries.slice(0, 4).map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setTestQuery(query)}
                >
                  {['Salary Data', 'Employee PII', 'Project Info', 'Credit Cards'][index]}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* cURL Command */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>cURL Command</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">{curlCommand}</pre>
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Role-based Responses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admin Response */}
        <Card className="border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Admin Response</span>
              <Badge className="bg-primary text-primary-foreground">✅ Full Access</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre className="whitespace-pre-wrap">
{JSON.stringify(getRoleResponse('admin', testQuery), null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* HR Manager Response */}
        <Card className="border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>HR Manager Response</span>
              <Badge className="bg-success text-success-foreground">⚠️ Filtered Access</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre className="whitespace-pre-wrap">
{JSON.stringify(getRoleResponse('hr_manager', testQuery), null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Engineer Response */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Engineer Response</span>
              <Badge variant="destructive">❌ Access Denied</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre className="whitespace-pre-wrap">
{JSON.stringify(getRoleResponse('engineer', testQuery), null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Intern Response */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Intern Response</span>
              <Badge variant="secondary">🚫 Restricted</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre className="whitespace-pre-wrap">
{JSON.stringify(getRoleResponse('intern', testQuery), null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SDK and Documentation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Download SDK</CardTitle>
            <CardDescription>Get started with our client libraries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Python SDK
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Node.js SDK
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Go SDK
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Learn how to integrate DataLens Shield</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                API Reference
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Quick Start Guide
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Best Practices
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>Manage your API credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button size="sm" className="w-full">
                Generate API Key
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                View Usage Limits
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Webhook Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Example Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Example Integration</CardTitle>
          <CardDescription>See how DataLens Shield integrates with popular AI platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="openai" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="openai">OpenAI</TabsTrigger>
              <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
              <TabsTrigger value="azure">Azure AI</TabsTrigger>
            </TabsList>
            <TabsContent value="openai" className="mt-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <pre>{`import openai
from datalens_shield import DataLensClient

# Initialize DataLens Shield
shield = DataLensClient(api_key="your-key")

# Process query through shield first
safe_data = shield.protect(
    query="Show employee data",
    user_role="hr_manager"
)

# Then send to OpenAI
response = openai.Completion.create(
    model="gpt-4",
    prompt=safe_data.anonymized_prompt
)`}</pre>
              </div>
            </TabsContent>
            <TabsContent value="anthropic" className="mt-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <pre>{`import anthropic
from datalens_shield import DataLensClient

# Shield processes data first
shield = DataLensClient(api_key="your-key")
safe_data = shield.protect(query, user_role)

# Claude only sees anonymized data
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    messages=[{"role": "user", "content": safe_data.prompt}]
)`}</pre>
              </div>
            </TabsContent>
            <TabsContent value="azure" className="mt-4">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <pre>{`from azure.ai.openai import OpenAIClient
from datalens_shield import DataLensClient

# DataLens Shield middleware
shield = DataLensClient(api_key="your-key")
protected = shield.protect(query, user_role)

# Azure AI receives only safe data
client = OpenAIClient(endpoint, credential)
result = client.completions.create(
    deployment_name="gpt-35-turbo",
    prompt=protected.anonymized_query
)`}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default APITest;