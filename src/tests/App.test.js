import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Falcon brand name', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/Falcon/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
