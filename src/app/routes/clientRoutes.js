/**
 * Client Routes - Accessible only by users with CLIENT role
 */
import React from 'react';
import {
  Dashboard,
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
} from '../pages';
import DashboardLayout from '../../shared/components/layout/DashboardLayout';
import LoanStatus from '../../domains/loans/presentation/pages/LoanStatus';

export const clientRoutes = [
  {
    element: <DashboardLayout />,
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
      { path: '/loan/track-application', element: <LoanStatus /> },
    ],
  },
];
