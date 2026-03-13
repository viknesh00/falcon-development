import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthContext';
import { useRole, ROLES } from '../../app/providers/RoleContext';

/**
 * ProtectedRoute - Ensures user is authenticated before accessing route
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

/**
 * RoleBasedRoute - Ensures user has required role(s) before accessing route
 */
export const RoleBasedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasAnyRole } = useRole();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
  //   // Redirect to role-specific dashboard or unauthorized page
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children;
};

/**
 * AdminRoute - Ensures user has admin or super_admin role
 */
export const AdminRoute = ({ children }) => {
  return (
    <RoleBasedRoute requiredRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>{children}</RoleBasedRoute>
  );
};

/**
 * ClientRoute - Ensures user has client role
 */
export const ClientRoute = ({ children }) => {
  return <RoleBasedRoute requiredRoles={[ROLES.CLIENT]}>{children}</RoleBasedRoute>;
};

export default ProtectedRoute;
