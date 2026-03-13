/**
 * Route Configuration Orchestrator
 * Combines public, client, and admin routes based on user authentication and role
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../providers/AuthContext';
// import { useRole, ROLES } from '../providers/RoleContext';
import { ProtectedRoute, ClientRoute, AdminRoute } from '../../infrastructure/auth/ProtectedRoute';
import { publicRoutes } from './publicRoutes';
import { clientRoutes } from './clientRoutes';
import { adminRoutes } from './adminRoutes';
import UnauthorizedPage from '../pages/UnauthorizedPage';

/**
 * Wraps routes with appropriate role-based guards
 */
const wrapClientRoutes = (routes) => {
  return routes.map((route) => ({
    ...route,
    element: (
      <ProtectedRoute>
        <ClientRoute>{route.element}</ClientRoute>
      </ProtectedRoute>
    ),
  }));
};

const wrapAdminRoutes = (routes) => {
  return routes.map((route) => ({
    ...route,
    element: (
      <ProtectedRoute>
        <AdminRoute>{route.element}</AdminRoute>
      </ProtectedRoute>
    ),
  }));
};

/**
 * Main route configuration that combines all routes
 */
export const createAppRoutes = () => {
  return [
    ...publicRoutes,
    ...wrapClientRoutes(clientRoutes),
    ...wrapAdminRoutes(adminRoutes),
    { path: '/unauthorized', element: <UnauthorizedPage /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ];
};

export default createAppRoutes;
