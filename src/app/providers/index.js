import React from 'react';
import { AuthProvider } from './AuthContext';
import { RoleProvider } from './RoleContext';

/**
 * AppProvider - Combines all context providers
 * Wrapper component that provides auth and role-based access control
 */
export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <RoleProvider>{children}</RoleProvider>
    </AuthProvider>
  );
};

// Export contexts and hooks
export { AuthContext, useAuth } from './AuthContext';
export { RoleContext, useRole, ROLES, ROLE_PERMISSIONS } from './RoleContext';
