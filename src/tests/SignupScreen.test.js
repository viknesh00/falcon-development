import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignupScreen from '../Pages/auth/Signup-Screen';

// Mock child components to avoid deep rendering issues and isolate the page test
jest.mock('../components/index', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  StepIndicator: () => <div data-testid="step-indicator">StepIndicator</div>,
  Dropdown: () => <div data-testid="dropdown">Dropdown</div>,
  DatePicker: () => <div data-testid="datepicker">DatePicker</div>,
  InputField: ({ placeholder, ...props }) => <input placeholder={placeholder} {...props} />,
  PhoneInputField: ({ placeholder, ...props }) => <input placeholder={placeholder} {...props} />,
  FormStateResetter: () => null,
  SelfieCheck: () => <div data-testid="selfie-check">SelfieCheck</div>,
  PhotoIdUpload: () => <div data-testid="photo-id-upload">PhotoIdUpload</div>,
  AddressLookup: () => <div data-testid="address-lookup">AddressLookup</div>,
}));

jest.mock('../config/formConfig', () => ({
  getInitialValues: () => ({
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  }),
  processFormData: (step, values) => values,
  validateFormStep: jest.fn(() => ({})), // Always valid for initial render test
  isStepValid: jest.fn(() => true),
  getNextStep: jest.fn(),
  FORM_METADATA: {
    successRedirectDelay: 1000,
    successRedirectUrl: '/dashboard',
  },
}));

test('renders SignupScreen page', () => {
  render(
    <BrowserRouter>
      <SignupScreen />
    </BrowserRouter>
  );

  // Check for main heading
  expect(screen.getByText(/Create your Falcon account/i)).toBeInTheDocument();

  // Check for email input
  expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();

  // Check for mobile number input
  expect(screen.getByPlaceholderText(/Mobile Number/i)).toBeInTheDocument();
});
