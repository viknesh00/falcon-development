import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoanApplication from '../Pages/Loans/LoanApplication';

test('Loan application page loads', () => {
  render(
    <BrowserRouter>
      <LoanApplication />
    </BrowserRouter>
  );

  const title = screen.getByText(/Loan Application/i);
  expect(title).toBeInTheDocument();
});

test('Submit button should be present', () => {
  render(
    <BrowserRouter>
      <LoanApplication />
    </BrowserRouter>
  );

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});
