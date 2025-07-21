import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, RolePermissions } from '@/types';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  rolePermissions: RolePermissions;
  roleDisplayName: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    dataSourceAccess: { 'google_drive': true, 'onedrive': true, 'box': true },
    piiRules: {
      ssn: 'partial',
      name: 'show',
      salary: 'show',
      email: 'partial',
      phone: 'show',
      credit_card: 'partial',
      address: 'show'
    },
    allowedPaths: ['*']
  },
  hr_manager: {
    dataSourceAccess: { 'google_drive': true, 'onedrive': true, 'box': false },
    piiRules: {
      ssn: 'redact',
      name: 'partial',
      salary: 'show',
      email: 'partial',
      phone: 'redact',
      credit_card: 'redact',
      address: 'redact'
    },
    allowedPaths: ['/HR/*', '/Benefits/*', '/Employee_Data/*']
  },
  engineer: {
    dataSourceAccess: { 'google_drive': false, 'onedrive': false, 'box': false },
    piiRules: {
      ssn: 'no_access',
      name: 'no_access',
      salary: 'no_access',
      email: 'no_access',
      phone: 'no_access',
      credit_card: 'no_access',
      address: 'no_access'
    },
    allowedPaths: ['/Engineering/*', '/Documentation/*', '/Technical/*']
  },
  intern: {
    dataSourceAccess: { 'google_drive': false, 'onedrive': false, 'box': false },
    piiRules: {
      ssn: 'no_access',
      name: 'no_access',
      salary: 'no_access',
      email: 'no_access',
      phone: 'no_access',
      credit_card: 'no_access',
      address: 'no_access'
    },
    allowedPaths: ['/Public/*', '/Training/*']
  }
};

const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  admin: 'Admin',
  hr_manager: 'HR Manager',
  engineer: 'Engineer',
  intern: 'Intern'
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  const value = {
    currentRole,
    setCurrentRole,
    rolePermissions: ROLE_PERMISSIONS[currentRole],
    roleDisplayName: ROLE_DISPLAY_NAMES[currentRole]
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};