/**
 * Admin Routes - Accessible only by users with ADMIN or SUPER_ADMIN role
 */
import React from 'react';

// Import admin pages/components as you create them
// For now, placeholder
const AdminDashboard = React.lazy(() => import('../../domains/admin/pages/AdminDashboard'));
const AdminUsers = React.lazy(() => import('../../domains/admin/pages/AdminUsers'));
const AdminLoans = React.lazy(() => import('../../domains/admin/pages/AdminLoans'));
const AdminLayout = React.lazy(() => import('../../shared/components/layout/AdminLayout'));

export const adminRoutes = [
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin/dashboard', element: <AdminDashboard /> },
      { path: '/admin/users', element: <AdminUsers /> },
      { path: '/admin/loans', element: <AdminLoans /> },
    ],
  },
];
