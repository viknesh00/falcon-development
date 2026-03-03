import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoanApplication from '../Pages/Loans/LoanApplication';

test('Loan application page renders', () => {
  render(
    <BrowserRouter>
      <LoanApplication />
    </BrowserRouter>
  );

  const title = screen.getByText(/Loan Application/i);
  expect(title).toBeInTheDocument();
});
