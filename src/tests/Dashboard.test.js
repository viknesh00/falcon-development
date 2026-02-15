import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Pages/dashboard/Dashboard';

// Mock the DashboardHeader to avoid complex dependency issues if it uses Redux/Router
jest.mock('../Pages/dashboard/DashboardHeader', () => {
  return function DummyDashboardHeader() {
    return <div data-testid="dashboard-header">Mock Header</div>;
  };
});

test('renders Dashboard page', () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  // Check for Welcome message
  const welcomeMessage = screen.getByText(/Welcome back, Dineshkumar Thiruppathi/i);
  expect(welcomeMessage).toBeInTheDocument();

  // Check for Account Details section
  const accountDetails = screen.getByText(/Account Details/i);
  expect(accountDetails).toBeInTheDocument();

  // Check for Action buttons
  const applyLoanButton = screen.getByText(/Apply for a Loan/i);
  expect(applyLoanButton).toBeInTheDocument();
});
