export type UserRole = 'admin' | 'hr_manager' | 'engineer' | 'intern';

export interface PIIEntity {
  type: string;
  start: number;
  end: number;
  originalText: string;
  anonymizedText: string;
}

export interface FileData {
  id: string;
  name: string;
  path: string;
  size: number;
  uploadedAt: Date;
  piiCount: number;
  classifications: string[];
}

export interface RolePermissions {
  dataSourceAccess: Record<string, boolean>;
  piiRules: Record<string, 'show' | 'partial' | 'redact' | 'no_access'>;
  allowedPaths: string[];
}

export interface QueryResult {
  originalData: string;
  anonymizedData: string;
  piiMasked: number;
  accessLevel: string;
  riskScore: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  userRole: UserRole;
  action: string;
  query?: string;
  filesAccessed: number;
  piiMasked: number;
  responseTime: number;
  accessGranted: boolean;
}

export interface SystemStats {
  totalFiles: number;
  totalPII: number;
  queriesToday: number;
  piiBlocked: number;
  averageResponseTime: number;
  uptime: number;
  riskReduction: {
    before: number;
    after: number;
  };
}