import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

export const RoleContext = createContext(null);

// Define available roles
export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  SUPER_ADMIN: 'super_admin',
};

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    'view_all_users',
    'manage_users',
    'manage_loans',
    'manage_accounts',
    'view_analytics',
    'manage_admin_panel',
  ],
  [ROLES.ADMIN]: ['manage_loans', 'manage_accounts', 'view_analytics', 'manage_dashboard'],
  [ROLES.CLIENT]: [
    'view_own_loans',
    'apply_for_loan',
    'view_transactions',
    'manage_own_account',
    'view_dashboard',
  ],
};

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();

  const getUserRole = () => {
    return user?.role || null;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const hasPermission = (permission) => {
    const userRole = user?.role;
    if (!userRole) return false;
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.includes(permission);
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every((perm) => hasPermission(perm));
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some((perm) => hasPermission(perm));
  };

  const value = {
    userRole: getUserRole(),
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    ROLES,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
};
