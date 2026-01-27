/**
 * Falcon Signup Form - Centralized JSON Configuration
 * This file contains all form steps, fields, validation rules, and data transformations
 * in a single, maintainable JSON structure.
 */

// ============================================================================
// FORM CONFIGURATION - All steps and fields defined here
// ============================================================================
export const FORM_CONFIGURATION = {
  steps: {
    1: {
      id: 1,
      title: 'Create your Falcon account',
      subtitle: 'Set up your account to start using Shariah-compliant financial services.',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'Email Address',
          icon: 'MailIcon',
          required: true,
          validation: 'email',
        },
        {
          name: 'mobileNumber',
          type: 'phone',
          label: 'Mobile Number',
          placeholder: 'Mobile Number',
          icon: 'PhoneIcon',
          required: true,
          validation: 'phone',
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Create Your Password',
          icon: 'LockIcon',
          required: true,
          validation: 'password',
          features: ['passwordToggle', 'virtualKeyboard'],
        },
        {
          name: 'confirmPassword',
          type: 'password',
          label: 'Confirm Password',
          placeholder: 'Confirm Your Password',
          icon: 'LockIcon',
          required: true,
          validation: 'confirmPassword',
          features: ['passwordToggle', 'virtualKeyboard'],
        },
      ],
      requiredFields: ['email', 'mobileNumber', 'password', 'confirmPassword'],
      nextButtonText: 'Continue',
      apiEndpoint: '/api/auth/register',
      dataTransform: (values) => ({
        email: values.email.trim(),
        mobileNumber: values.mobileNumber,
      }),
    },

    1.5: {
      id: 1.5,
      title: 'Create your Falcon account',
      subtitle: 'Set up your account to start using Shariah-compliant financial services.',
      fields: [
        {
          name: 'emailOtp',
          type: 'text',
          label: 'Email OTP',
          placeholder: 'Enter OTP',
          icon: null,
          required: true,
          validation: 'otp',
          section: 'Enter the OTP Sent to your Email',
        },
        {
          name: 'mobileOtp',
          type: 'text',
          label: 'Mobile OTP',
          placeholder: 'Enter OTP',
          icon: null,
          required: true,
          validation: 'otp',
          section: 'Enter the OTP Sent to your Mobile',
        },
      ],
      requiredFields: ['emailOtp', 'mobileOtp'],
      nextButtonText: 'Submit',
      apiEndpoint: '/api/auth/verify-otp',
      dataTransform: (values) => ({
        verification: {
          emailOtp: values.emailOtp.trim(),
          mobileOtp: values.mobileOtp.trim(),
        },
      }),
    },

    2: {
      id: 2,
      title: 'Personal and Financial Details',
      subtitle: 'Tell us a bit about yourself. This helps us serve you responsibly.',
      sections: [
        {
          name: 'personalInfo',
          title: null,
          fields: [
            {
              name: 'firstName',
              type: 'text',
              label: 'First Name',
              placeholder: 'Enter first name (as per ID)',
              icon: 'UserIcon',
              required: true,
              validation: 'text',
              flex: 1,
            },
            {
              name: 'lastName',
              type: 'text',
              label: 'Last Name',
              placeholder: 'Enter last name (as per ID)',
              icon: 'UserIcon',
              required: true,
              validation: 'text',
              flex: 1,
            },
            {
              name: 'dob',
              type: 'date',
              label: 'Date of Birth',
              placeholder: 'Pick your date of birth',
              icon: 'CalendarIcon',
              required: true,
              validation: 'date',
            },
          ],
        },
        {
          name: 'address',
          title: 'Residential Address',
          fields: [
            {
              name: 'buildingAddress',
              type: 'text',
              label: 'Building / Flat No',
              placeholder: 'Enter here',
              icon: 'LocationIcon',
              required: true,
              validation: 'text',
              flex: 1,
            },
            {
              name: 'street',
              type: 'text',
              label: 'Area/Street',
              placeholder: 'Enter here',
              icon: 'LocationIcon',
              required: true,
              validation: 'text',
              flex: 1,
            },
            {
              name: 'city',
              type: 'text',
              label: 'City',
              placeholder: 'Enter here',
              icon: 'LocationIcon',
              required: true,
              validation: 'text',
              flex: 1,
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'Postal Code',
              placeholder: 'Enter here',
              icon: 'LocationIcon',
              required: true,
              validation: 'text',
            },
          ],
        },
        {
          name: 'financial',
          title: null,
          fields: [
            {
              name: 'employmentStatus',
              type: 'dropdown',
              label: 'Employment Status',
              placeholder: 'Select employment status',
              icon: 'WorkIcon',
              required: true,
              validation: 'dropdown',
              options: ['Full-time', 'Part-time', 'Contract / Temporary', 'Self-Employed'],
            },
            {
              name: 'incomeRange',
              type: 'dropdown',
              label: 'Income Range',
              placeholder: 'Select income range',
              icon: 'CurrencyIcon',
              required: true,
              validation: 'dropdown',
              options: ['5000-10000', '10000-50000', '50000-100000', 'Above 100000'],
            },
            {
              name: 'monthlyCommitments',
              type: 'text',
              label: 'Monthly Commitments',
              placeholder: 'Enter your monthly commitments in Euros',
              icon: 'CurrencyIcon',
              required: true,
              validation: 'number',
            },
          ],
        },
      ],
      requiredFields: [
        'firstName',
        'lastName',
        'dob',
        'firstName',
        'lastName',
        'dob',
        'buildingAddress',
        'street',
        'city',
        'postalCode',
        'employmentStatus',
        'incomeRange',
        'employmentStatus',
        'incomeRange',
        // 'monthlyCommitments', // Optional as per user request
      ],
      nextButtonText: 'Continue',
      apiEndpoint: '/api/auth/register/personal-details',
      dataTransform: (values) => ({
        personal: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          dateOfBirth: values.dob,
        },
        address: {
          buildingAddress: values.buildingAddress.trim(),
          street: values.street.trim(),
          city: values.city.trim(),
          postalCode: values.postalCode.trim(),
        },
        financial: {
          employmentStatus: values.employmentStatus,
          incomeRange: values.incomeRange,
          monthlyCommitments: parseFloat(values.monthlyCommitments) || 0,
        },
      }),
    },

    3: {
      id: 3,
      title: 'Verify your identity',
      subtitle: 'Required by financial regulations.',
      fields: [
        {
          name: 'photoId',
          type: 'file',
          label: 'Photo ID',
          placeholder: 'Photo ID upload (Passport / Driving licence)',
          icon: 'UploadIcon',
          required: true,
          validation: 'file',
          accept: 'image/*',
        },
        {
          name: 'selfie',
          type: 'camera',
          label: 'Live Selfie',
          placeholder: 'Live selfie check',
          icon: 'CameraIcon',
          required: true,
          validation: 'file',
        },
      ],
      requiredFields: ['photoId', 'selfie'],
      nextButtonText: 'Finish',
      apiEndpoint: '/api/auth/register/identity-verification',
      dataTransform: (values) => ({
        verification: {
          photoIdFileName: values.photoId?.name || null,
          photoIdSize: values.photoId?.size || null,
          selfieUploaded: !!values.selfie,
        },
      }),
    },
  },
};

// ============================================================================
// FORM STATE INITIAL VALUES
// ============================================================================
export const getInitialValues = () => ({
  email: '',
  mobileNumber: '',
  password: '',
  confirmPassword: '',
  emailOtp: '',
  mobileOtp: '',
  firstName: '',
  lastName: '',
  dob: '',
  buildingAddress: '',
  street: '',
  city: '',
  postalCode: '',
  employmentStatus: '',
  incomeRange: '',
  monthlyCommitments: '',
  photoId: null,
  selfie: null,
});

// ============================================================================
// VALIDATION RULES
// ============================================================================
export const VALIDATION_RULES = {
  email: (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email address';
    return null;
  },

  phone: (value) => {
    if (!value) return 'Mobile number is required';
    if (value.replace(/\D/g, '').length < 10) return 'Invalid mobile number';
    return null;
  },

  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain a number';
    return null;
  },

  confirmPassword: (value, values) => {
    if (!value) return 'Please confirm your password';
    if (value !== values.password) return 'Passwords do not match';
    return null;
  },

  otp: (value) => {
    if (!value) return 'OTP is required';
    if (!/^\d{6}$/.test(value.trim())) return 'OTP must be 6 digits';
    return null;
  },

  text: (value) => {
    if (!value || value.trim() === '') return 'This field is required';
    if (value.trim().length < 2) return 'Must be at least 2 characters';
    return null;
  },

  date: (value) => {
    if (!value) return 'Date of birth is required';
    return null;
  },

  dropdown: (value) => {
    if (!value) return 'Please select an option';
    return null;
  },

  number: (value) => {
    if (!value) return null; // Allow empty if not required (required check is separate)
    if (isNaN(parseFloat(value))) return 'Must be a valid number';
    if (parseFloat(value) <= 0) return 'Must be greater than 0';
    return null;
  },

  file: (value) => {
    if (!value) return 'File is required';
    return null;
  },
};

// ============================================================================
// FORM DATA PROCESSOR
// ============================================================================
/**
 * Processes form data according to the step configuration
 * @param {number|string} step - Current step number
 * @param {object} values - Form values
 * @returns {object} - Formatted data for API submission
 */
export const processFormData = (step, values) => {
  const stepConfig = FORM_CONFIGURATION.steps[step];

  if (!stepConfig || !stepConfig.dataTransform) {
    console.error(`Invalid step: ${step}`);
    return null;
  }

  return {
    step,
    timestamp: new Date().toISOString(),
    data: stepConfig.dataTransform(values),
  };
};

// ============================================================================
// VALIDATION PROCESSOR
// ============================================================================
/**
 * Validates form data for a specific step
 * @param {number|string} step - Current step number
 * @param {object} values - Form values to validate
 * @returns {object} - Validation errors object
 */
export const validateFormStep = (step, values) => {
  const stepConfig = FORM_CONFIGURATION.steps[step];
  const errors = {};

  if (!stepConfig) {
    console.error(`Invalid step: ${step}`);
    return errors;
  }

  // Get all fields for this step
  const allFields = stepConfig.sections
    ? stepConfig.sections.flatMap((section) => section.fields)
    : stepConfig.fields;

  // Validate each field
  allFields.forEach((field) => {
    const value = values[field.name];
    const validationType = field.validation;

    if (stepConfig.requiredFields.includes(field.name)) {
      // Run validation rule
      const validationFn = VALIDATION_RULES[validationType];
      if (validationFn) {
        const error = validationFn(value, values);
        if (error) {
          errors[field.name] = error;
        }
      }
    }
  });

  return errors;
};

// ============================================================================
// REQUIRED FIELDS CHECKER
// ============================================================================
/**
 * Checks if all required fields for a step are complete
 * @param {number|string} step - Current step number
 * @param {object} values - Form values
 * @returns {boolean} - True if all required fields are filled
 */
export const isStepValid = (step, values) => {
  const stepConfig = FORM_CONFIGURATION.steps[step];

  if (!stepConfig) {
    console.error(`Invalid step: ${step}`);
    return false;
  }

  return stepConfig.requiredFields.every((field) => {
    const value = values[field];

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    return !!value;
  });
};

// ============================================================================
// ICON MAPPER
// ============================================================================
/**
 * Maps icon names to actual icon components
 * This centralizes icon imports and makes them easily configurable
 */
export const ICON_MAPPER = {
  MailIcon: 'MailIcon',
  PhoneIcon: 'PhoneIcon',
  LockIcon: 'LockIcon',
  UserIcon: 'UserIcon',
  LocationIcon: 'LocationIcon',
  CalendarIcon: 'CalendarIcon',
  WorkIcon: 'WorkIcon',
  CurrencyIcon: 'CurrencyIcon',
  UploadIcon: 'UploadIcon',
  CameraIcon: 'CameraIcon',
};

// ============================================================================
// API ENDPOINTS
// ============================================================================
export const getApiEndpoint = (step) => {
  const stepConfig = FORM_CONFIGURATION.steps[step];
  return stepConfig?.apiEndpoint || null;
};

// ============================================================================
// FORM METADATA
// ============================================================================
export const FORM_METADATA = {
  totalSteps: 3,
  stepSequence: [1, 1.5, 2, 3],
  successRedirectUrl: '/dashboard',
  successRedirectDelay: 5000,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get step configuration
 */
export const getStepConfig = (step) => {
  return FORM_CONFIGURATION.steps[step] || null;
};

/**
 * Get field configuration for a specific step and field name
 */
export const getFieldConfig = (step, fieldName) => {
  const stepConfig = getStepConfig(step);
  if (!stepConfig) return null;

  const allFields = stepConfig.sections
    ? stepConfig.sections.flatMap((section) => section.fields)
    : stepConfig.fields;

  return allFields.find((field) => field.name === fieldName) || null;
};

/**
 * Get all required fields for a step
 */
export const getRequiredFields = (step) => {
  const stepConfig = getStepConfig(step);
  return stepConfig?.requiredFields || [];
};

/**
 * Get next step in sequence
 */
export const getNextStep = (currentStep) => {
  const currentIndex = FORM_METADATA.stepSequence.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === FORM_METADATA.stepSequence.length - 1) {
    return null;
  }
  return FORM_METADATA.stepSequence[currentIndex + 1];
};

/**
 * Check if form is complete (last step finished)
 */
export const isFormComplete = (currentStep) => {
  const nextStep = getNextStep(currentStep);
  return nextStep === null;
};
