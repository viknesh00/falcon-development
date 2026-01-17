import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './api/ProtectedRoute';
import Layout from './components/layout/Layout';
import Home from './Pages/landingPage/Home';
import Login from './Pages/auth/Login';
import SignupScreen from './Pages/auth/Signup-Screen/index';
import Dashboard from './Pages/dashboard/Dashboard';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
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
