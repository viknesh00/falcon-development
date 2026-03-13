import { isValidPhoneNumber } from 'react-phone-number-input';
export const validateStep1 = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.mobileNumber) {
    errors.mobileNumber = 'Mobile number is required';
  } else if (!isValidPhoneNumber(values.mobileNumber)) {
    errors.mobileNumber = 'Invalid mobile number';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(values.password)) {
    errors.password = 'Password must contain uppercase, lowercase and number';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
};

export const validateStep2 = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }
  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.dob) {
    errors.dob = 'Date of birth is required';
  }

  if (!values.buildingAddress) {
    errors.buildingAddress = 'Building / Flat address is required';
  }
  if (!values.street) {
    errors.street = 'Street is required';
  }
  if (!values.city) {
    errors.city = 'City is required';
  }
  if (!values.postalCode) {
    errors.postalCode = 'Postal Code is required';
  }

  if (!values.employmentStatus) {
    errors.employmentStatus = 'Employment status is required';
  }

  if (!values.incomeRange) {
    errors.incomeRange = 'Income range is required';
  }

  if (!values.monthlyCommitments) {
    errors.monthlyCommitments = 'Monthly commitments are required';
  }

  return errors;
};

export const validateOTP = (values) => {
  const errors = {};
  if (!values.emailOtp) errors.emailOtp = 'Email OTP is required';
  if (!values.mobileOtp) errors.mobileOtp = 'Mobile OTP is required';
  return errors;
};
