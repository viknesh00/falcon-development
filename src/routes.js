import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './api/ProtectedRoute';
import {
  Home,
  SignupScreen,
  Dashboard,
  SignInScreen,
  LoanScreen,
  LoanApplication,
  WalletScreen,
  TransactionScreen,
  AccountScreen,
  SettingScreen,
  SupportScreen,
  LoanDetailsScreen,
  AddAccountFormScreen,
  LoanApplyScreen,
  LoanInvoiceFinancing,
  ApplicationSuccess,
} from './Pages';
import { DashboardLayout } from './components';
import LoanStatus from './Pages/Loans/LoanStatus';

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
      { path: '/dashboard/addbankaccount', element: <AddAccountFormScreen /> },
      { path: '/loans', element: <LoanScreen /> },
      { path: '/wallet', element: <WalletScreen /> },
      { path: '/transactions', element: <TransactionScreen /> },
      { path: '/account', element: <AccountScreen /> },
      { path: '/settings', element: <SettingScreen /> },
      { path: '/support', element: <SupportScreen /> },
      { path: '/loan/loan-application', element: <LoanApplication /> },
      { path: '/loan/loan-apply', element: <LoanApplyScreen /> },
      { path: '/loan/invoice-financing', element: <LoanInvoiceFinancing /> },
      { path: '/loan/application-success', element: <ApplicationSuccess /> },
      { path: '/loan/:id', element: <LoanDetailsScreen /> },
      { path: '/track-application', element: <LoanStatus /> },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
];

export default routes;
