/**
 * Public Routes - Accessible without authentication
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Home, SignupPage, SignInPage } from '../pages';

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <SignInPage /> },
  { path: '/sign-in', element: <Navigate to="/login" /> },
  { path: '/signup', element: <SignupPage /> },
];
