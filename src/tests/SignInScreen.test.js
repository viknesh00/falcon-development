import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignInScreen from '../Pages/auth/SignIn-Screen';

// Mock child components
jest.mock('../components/index', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  InputField: ({ placeholder, ...props }) => <input placeholder={placeholder} {...props} />,
  PhoneInputField: ({ placeholder, ...props }) => <input placeholder={placeholder} {...props} />,
  SwitchOptions: () => <div data-testid="switch-options">SwitchOptions</div>,
}));

// Mock Helper
jest.mock('../Pages/auth/SignIn-Screen/helpers/sign-in.helper', () => ({
  SignInPress: jest.fn(),
  ForgotPasswordPress: jest.fn(),
  OnSingupPress: jest.fn(),
}));

jest.mock('../Pages/auth/SignIn-Screen/OtpScreen', () => {
  return function DummyOtpScreen({ onBack }) {
    return (
      <div data-testid="otp-screen">
        <button onClick={onBack}>Back</button>
      </div>
    );
  };
});

test('renders SignInScreen page', () => {
  render(
    <BrowserRouter>
      <SignInScreen />
    </BrowserRouter>
  );

  // Check for Welcome message
  expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();

  // Check for email input
  expect(screen.getByPlaceholderText(/Enter your registered email/i)).toBeInTheDocument();

  // Check for password input
  expect(screen.getByPlaceholderText(/Enter Your Password/i)).toBeInTheDocument();

  // Check for Login button
  expect(screen.getByText(/Log In/i)).toBeInTheDocument();
});
