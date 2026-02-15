import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Pages/landingPage/Home';

test('renders Home page', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // Check for main heading
  const headingElement = screen.getByText(/Ethical financing, built to be simple/i);
  expect(headingElement).toBeInTheDocument();

  // Check for "Open an account" button
  const buttonElement = screen.getByText(/Open an account/i);
  expect(buttonElement).toBeInTheDocument();
});
