import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './api/ProtectedRoute';
import Layout from './components/layout/Layout';
import { Home, SignupScreen, Dashboard, SignInScreen, LoanScreen, LoanApplication } from './Pages';
import { DashboardLayout } from './components';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <SignInScreen /> },
  { path: '/signup', element: <SignupScreen /> },
  { path: '/sign-in', element: <Navigate to="/login" /> },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/loans', element: <LoanScreen /> },
      { path: '/wallet', element: <LoanScreen /> },
      { path: '/transactions', element: <LoanScreen /> },
      { path: '/account', element: <LoanScreen /> },
      { path: '/settings', element: <LoanScreen /> },
      { path: '/support', element: <LoanScreen /> },
      { path: '/loan/loan-application', element: <LoanApplication /> },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
];

export default routes;
