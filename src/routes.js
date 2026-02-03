import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './api/ProtectedRoute';
import Layout from './components/layout/Layout';
import { Home, SignupScreen, Dashboard, SignInScreen } from './Pages';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <SignInScreen /> },
  { path: '/signup', element: <SignupScreen /> },
  { path: '/sign-in', element: <Navigate to="/login" /> },
  { path: '/dashboard', element: <Dashboard /> },
  {
    path: '/*',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [],
  },

  { path: '*', element: <Navigate to="/" /> },
];

export default routes;
