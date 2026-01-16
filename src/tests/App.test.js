import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Falcon brand name', () => {
  render(<App />);
  const brandElement = screen.getByText(/Falcon/i);
  expect(brandElement).toBeInTheDocument();
});
