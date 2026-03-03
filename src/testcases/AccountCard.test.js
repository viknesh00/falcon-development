import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoanScreen from '../Pages/Loans/LoanScreen';

test('Loan screen renders correctly', () => {
  render(
    <BrowserRouter>
      <LoanScreen />
    </BrowserRouter>
  );

  const title = screen.getByText(/Your Loans/i);
  expect(title).toBeInTheDocument();
});

test('Loan Limit card should not appear', () => {
  render(
    <BrowserRouter>
      <LoanScreen />
    </BrowserRouter>
  );

  const loanLimit = screen.queryByText(/Available Loan Limit/i);
  expect(loanLimit).toBeNull();
});
