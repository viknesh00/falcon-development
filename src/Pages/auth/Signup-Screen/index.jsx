import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Styles from './Styles/authStyles.module.css';
import {
  LockIcon,
  MailIcon,
  PhoneIcon,
  OnBoardingVector,
  UploadIcon,
  CameraIcon,
  CalendarIcon,
  UserIcon,
  LocationIcon,
  WorkIcon,
  CurrencyIcon,
  SignUpLoading,
  FinalStepVector,
  EyeIcon,
  EyeOffIcon,
  SignUpRightImage,
} from '../../../assets';
import StepIndicator from './Components/StepIndicator';
import Dropdown from './Components/Dropdown';
import Footer from '../../../components/layout/Footer';
import { validateStep1, validateStep2, validateOTP } from './helpers/validationSchemas';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Webcam from 'react-webcam';
import VirtualKeyboard from './Components/VirtualKeyboard';
import DatePicker from './Components/DatePicker';

const InputField = ({
  icon,
  type,
  name,
  placeholder,
  error,
  touched,
  isReactIcon = false,
  iconAsset,
  showPasswordToggle = false,
  isPasswordVisible,
  onTogglePassword,
  useVirtualKeyboard = false,
  onVirtualKeyPress,
  activeField,
  setActiveField,
  required = false,
}) => (
  <div className={Styles.formGroup}>
    <div className={`${Styles.inputWrapper} ${error && touched ? Styles.error : ''}`}>
      {iconAsset !== null &&
        (isReactIcon ? (
          <div className={Styles.reactIconWrapper}>{icon}</div>
        ) : iconAsset ? (
          <div className={Styles.icon}>
            <img src={iconAsset} alt="" className={Styles.iconAsset} />
          </div>
        ) : icon ? (
          <img src={icon} alt="" className={Styles.icon} />
        ) : null)}
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={Styles.input}
        readOnly={useVirtualKeyboard}
        onFocus={() => setActiveField && setActiveField(name)}
        style={{
          placeholderColor: '#FFFFFFB2',
        }}
      />
      {showPasswordToggle && (
        <div className={Styles.eyeIcon} onClick={onTogglePassword}>
          <img src={isPasswordVisible ? EyeIcon : EyeOffIcon} alt="Toggle Password" />
        </div>
      )}
    </div>
    {error && touched && <div className={Styles.errorText}>{error}</div>}
    {useVirtualKeyboard && activeField === name && (
      <VirtualKeyboard onKeyPress={(key) => onVirtualKeyPress(name, key)} />
    )}
  </div>
);

const PhoneInputField = ({
  iconAsset,
  name,
  placeholder,
  error,
  touched,
  value,
  onChange,
  onBlur,
}) => (
  <div className={Styles.formGroup}>
    <div className={`${Styles.inputWrapper} ${error && touched ? Styles.error : ''}`}>
      <div className={Styles.icon}>
        <img src={iconAsset} alt="" className={Styles.iconAsset} />
      </div>
      <PhoneInput
        international
        defaultCountry="GB"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={Styles.phoneInput}
        name={name}
      />
    </div>
    {error && touched && <div className={Styles.errorText}>{error}</div>}
  </div>
);

// Dropdown options
const EMPLOYMENT_STATUS_OPTIONS = [
  'Full-time',
  'Part-time',
  'Contract / Temporary',
  'Self-Employed',
];

const INCOME_RANGE_OPTIONS = ['5000-10000', '10000-50000', '50000-100000', 'Above 100000'];

const SignupScreen = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();

  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeVirtualField, setActiveVirtualField] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (e) => {
    if (e.target.scrollTop > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const dynamicContent = [
    'Wallet creation...',
    'Security and compliance checks...',
    'FCA & PRA aligned processes',
    'Secure identity verification',
    'Shariah-compliant financial services',
  ];

  useEffect(() => {
    let interval;
    if (step === 4) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
      interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % dynamicContent.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [step, dynamicContent.length]);

  const initialValues = {
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    emailOtp: '',
    mobileOtp: '',
    firstName: '',
    lastName: '',
    dob: '',
    buildingNumber: '',
    flatNumber: '',
    street: '',
    city: '',
    postalCode: '',
    employmentStatus: '',
    incomeRange: '',
    monthlyCommitments: '',
    photoId: null,
    selfie: null,
  };

  const handleNext = async (values, actions) => {
    setIsSubmitting(true);

    // Log the form data as JSON for verification
    console.log(`📋 Step ${step} Form Data (JSON):`, JSON.stringify(values, null, 2));

    // Simulate API calls for each step
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      if (step === 1) {
        // Send Step 1 data to backend
        console.log('Step 1 submitted:', {
          email: values.email,
          mobileNumber: values.mobileNumber,
        });
        setStep(1.5);
      } else if (step === 1.5) {
        // Send OTP verification to backend
        console.log('Step 1.5 submitted:', {
          emailOtp: values.emailOtp,
          mobileOtp: values.mobileOtp,
        });
        setStep(2);
      } else if (step === 2) {
        // Send personal details to backend
        console.log('Step 2 submitted:', {
          firstName: values.firstName,
          lastName: values.lastName,
          dob: values.dob,
          address: {
            building: values.buildingNumber,
            flat: values.flatNumber,
            street: values.street,
            city: values.city,
            postalCode: values.postalCode,
          },
          financial: {
            employmentStatus: values.employmentStatus,
            incomeRange: values.incomeRange,
            monthlyCommitments: values.monthlyCommitments,
          },
        });
        setStep(3);
      } else if (step === 3) {
        console.log('Step 3 submitted:', {
          photoId: values.photoId?.name,
          selfie: values.selfie ? 'uploaded' : 'not uploaded',
        });
        setStep(4);
      }
    } catch (error) {
      console.error('Error in signup flow:', error);
    } finally {
      setIsSubmitting(false);
      actions.setSubmitting(false);
    }
  };

  const getValidationSchema = () => {
    if (step === 1) return validateStep1;
    if (step === 1.5) return validateOTP;
    if (step === 2) return validateStep2;
    return () => ({});
  };

  if (step === 4) {
    return (
      <div className={Styles.authContainer}>
        {/* ========================== Header Section ========================== */}
        <header className={Styles.header}>
          <div onClick={() => navigate('/')} className={Styles.logo}>
            <img src="/assets/images/falcon-logo.jpg" alt="Falcon" />
            <span className={Styles.logoSpan}>Falcon</span>
          </div>
        </header>
        {/* ========================== Main Section ========================== */}
        <main
          className={Styles.mainContent}
          style={{ gridTemplateColumns: '1fr', justifyContent: 'center' }}
        >
          <div className={`${Styles.successContainer} ${Styles.fadeIn}`}>
            <h1 className={Styles.successTitle}>Account ready</h1>
            <p className={Styles.successMessage}>We're setting up your Falcon account.</p>
          </div>
          <div className={Styles.successIconWrapper}>
            <img src={FinalStepVector} alt="" />
          </div>
          <div className={Styles.loadingSection}>
            <h2 className={Styles.title} style={{ fontSize: '32px' }}>
              {dynamicContent[loadingIndex]}
            </h2>
            <img src={SignUpLoading} alt="" />
          </div>
        </main>
        <div className={Styles.featureFooter}>
          <span className={Styles.footerItem}>FCA & PRA aligned processes</span>
          <span className={Styles.footerItem}>Secure identity verification</span>
          <span className={Styles.footerItem}>Shariah-compliant financial services</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={Styles.authContainer}>
        {/* ========================== Header Section ========================== */}
        <header className={`${Styles.header} ${isScrolled ? Styles.scrolled : ''}`}>
          <div onClick={() => navigate('/')} className={Styles.logo}>
            <img src="/assets/images/falcon-logo.jpg" alt="Falcon" />
            <span className={Styles.logoSpan}>Falcon</span>
          </div>
          <nav className={Styles.nav}>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#how">How it Works?</a>
            <a href="#features">Features</a>
            <a href="#compliance">Compliance</a>
          </nav>
        </header>

        {/* ========================== Main Section ========================== */}
        <main className={Styles.mainContent}>
          <section className={`${Styles.formSection} ${Styles.fadeIn}`} onScroll={handleScroll}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
                marginBottom: '19px',
              }}
            >
              <div>
                {step === 1 && (
                  <>
                    <h1 className={Styles.title}>Create your Falcon account</h1>
                    <p className={Styles.subTitle}>
                      Set up your account to start using Shariah-compliant financial services.
                    </p>
                  </>
                )}
                {step === 1.5 && (
                  <>
                    <h1 className={Styles.title}>Create your Falcon account</h1>
                    <p className={Styles.subTitle}>
                      Set up your account to start using Shariah-compliant financial services.
                    </p>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h1 className={Styles.title}>Personal and Financial Details</h1>
                    <p className={Styles.subTitle}>
                      Tell us a bit about yourself. This helps us serve you responsibly.
                    </p>
                  </>
                )}
                {step === 3 && (
                  <>
                    <h1 className={Styles.title}>Verify your identity</h1>
                    <p className={Styles.subTitle}>Required by financial regulations.</p>
                  </>
                )}
              </div>
              <div className={Styles.rowStepIndicator}>
                <StepIndicator currentStep={step} totalSteps={3} />
              </div>
            </div>

            {/* ========================== Form Section ========================== */}
            <Formik
              initialValues={initialValues}
              validate={getValidationSchema()}
              onSubmit={handleNext}
            >
              {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
                <Form className={Styles.formGrid}>
                  {step === 1 && (
                    <>
                      <div>
                        <label className={Styles.inputLabel}>
                          Email Address
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <InputField
                          iconAsset={MailIcon}
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          error={errors.email}
                          touched={touched.email}
                        />
                      </div>
                      <div>
                        <label className={Styles.inputLabel}>
                          Mobile Number
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <PhoneInputField
                          iconAsset={PhoneIcon}
                          name="mobileNumber"
                          placeholder="Mobile Number"
                          error={errors.mobileNumber}
                          touched={touched.mobileNumber}
                          value={values.mobileNumber}
                          onChange={(val) => setFieldValue('mobileNumber', val)}
                        />
                      </div>
                      <div>
                        <label className={Styles.inputLabel}>
                          Password
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <InputField
                          iconAsset={LockIcon}
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Create Your Password"
                          error={errors.password}
                          touched={touched.password}
                          showPasswordToggle={true}
                          isPasswordVisible={showPassword}
                          onTogglePassword={() => setShowPassword(!showPassword)}
                          useVirtualKeyboard={true}
                          activeField={activeVirtualField}
                          setActiveField={setActiveVirtualField}
                          onVirtualKeyPress={(fieldName, key) => {
                            const currentVal = values[fieldName] || '';
                            if (key === 'BACKSPACE') {
                              setFieldValue(fieldName, currentVal.slice(0, -1));
                            } else {
                              setFieldValue(fieldName, currentVal + key);
                            }
                          }}
                        />
                      </div>

                      <div>
                        <label className={Styles.inputLabel}>
                          Confirm Password
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <InputField
                          iconAsset={LockIcon}
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="Confirm Your Password"
                          error={errors.confirmPassword}
                          touched={touched.confirmPassword}
                          showPasswordToggle={true}
                          isPasswordVisible={showConfirmPassword}
                          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                          useVirtualKeyboard={true}
                          activeField={activeVirtualField}
                          setActiveField={setActiveVirtualField}
                          onVirtualKeyPress={(fieldName, key) => {
                            const currentVal = values[fieldName] || '';
                            if (key === 'BACKSPACE') {
                              setFieldValue(fieldName, currentVal.slice(0, -1));
                            } else {
                              setFieldValue(fieldName, currentVal + key);
                            }
                          }}
                        />
                      </div>

                      <button type="submit" className={Styles.continueBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Continue'}
                      </button>

                      <p className={Styles.termsText}>
                        By continuing, you agree to Falcon’s Terms and Conditions. We’ll handle your
                        data in line with our Privacy Policy.
                      </p>
                    </>
                  )}

                  {step === 1.5 && (
                    <>
                      <p className={Styles.subTitle}>
                        Set up your account to start using Shariah-compliant financial services.
                      </p>

                      <div className={Styles.otpSection}>
                        <p className={Styles.otpTitle}>
                          Enter the Otp Sent to your Email
                          <span className={Styles.requiredIndicator}>*</span>
                        </p>
                        <InputField
                          iconAsset={null} // Design shows no icon inside the input for OTP in some views, but let's see
                          type="text"
                          name="emailOtp"
                          placeholder="Enter OTP"
                          error={errors.emailOtp}
                          touched={touched.emailOtp}
                        />
                      </div>

                      <div className={Styles.otpSection}>
                        <p className={Styles.otpTitle}>
                          Enter the Otp Sent to your Mobile
                          <span className={Styles.requiredIndicator}>*</span>
                        </p>
                        <InputField
                          iconAsset={null}
                          type="text"
                          name="mobileOtp"
                          placeholder="Enter OTP"
                          error={errors.mobileOtp}
                          touched={touched.mobileOtp}
                        />
                      </div>

                      <button type="submit" className={Styles.continueBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Verifying...' : 'Submit'}
                      </button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div style={{ flex: 1 }}>
                        <label className={Styles.inputLabel}>
                          First Name
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <InputField
                          iconAsset={UserIcon}
                          type="text"
                          name="firstName"
                          placeholder="Enter first name (as per ID)"
                          error={errors.firstName}
                          touched={touched.firstName}
                          required
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className={Styles.inputLabel}>
                          Last Name
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <InputField
                          iconAsset={UserIcon}
                          type="text"
                          name="lastName"
                          placeholder="Enter last name (as per ID)"
                          error={errors.lastName}
                          touched={touched.lastName}
                          required
                        />
                      </div>

                      <div>
                        <label className={Styles.inputLabel}>
                          Date of Birth
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <DatePicker
                          name="dob"
                          value={values.dob}
                          onChange={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          error={errors.dob}
                          touched={touched.dob}
                          placeholder="Pick your date of birth"
                        />
                      </div>

                      <h3 className={Styles.sectionTitle}>
                        Residential Address
                        <span className={Styles.requiredIndicator}>*</span>
                      </h3>

                      <div className={Styles.formRow}>
                        <div style={{ flex: 1 }}>
                          <label className={Styles.inputLabel}>
                            Building No
                            <span className={Styles.requiredIndicator}>*</span>
                          </label>
                          <InputField
                            iconAsset={LocationIcon}
                            type="text"
                            name="buildingNumber"
                            placeholder="Enter here"
                            error={errors.buildingNumber}
                            touched={touched.buildingNumber}
                            required
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className={Styles.inputLabel}>
                            Flat No
                            <span className={Styles.requiredIndicator}>*</span>
                          </label>
                          <InputField
                            iconAsset={LocationIcon}
                            type="text"
                            name="flatNumber"
                            placeholder="Enter here"
                            error={errors.flatNumber}
                            touched={touched.flatNumber}
                            required
                          />
                        </div>
                      </div>

                      <div className={Styles.formRow}>
                        <div style={{ flex: 1 }}>
                          <label className={Styles.inputLabel}>
                            Area/Street
                            <span className={Styles.requiredIndicator}>*</span>
                          </label>
                          <InputField
                            iconAsset={LocationIcon}
                            type="text"
                            name="street"
                            placeholder="Enter here"
                            error={errors.street}
                            touched={touched.street}
                            required
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className={Styles.inputLabel}>
                            City
                            <span className={Styles.requiredIndicator}>*</span>
                          </label>
                          <InputField
                            iconAsset={LocationIcon}
                            type="text"
                            name="city"
                            placeholder="Enter here"
                            error={errors.city}
                            touched={touched.city}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className={Styles.inputLabel}>
                          Postal Code
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <InputField
                          iconAsset={LocationIcon}
                          type="text"
                          name="postalCode"
                          placeholder="Enter here"
                          error={errors.postalCode}
                          touched={touched.postalCode}
                          required
                        />
                      </div>

                      <div>
                        <label className={Styles.inputLabel}>
                          Employment Status
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <Dropdown
                          iconAsset={WorkIcon}
                          name="employmentStatus"
                          placeholder="Select employment status"
                          options={EMPLOYMENT_STATUS_OPTIONS}
                          error={errors.employmentStatus}
                          touched={touched.employmentStatus}
                          value={values.employmentStatus}
                          onChange={(value) => setFieldValue('employmentStatus', value)}
                        />
                      </div>

                      <div>
                        <label className={Styles.inputLabel}>
                          Income Range
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <Dropdown
                          iconAsset={CurrencyIcon}
                          name="incomeRange"
                          placeholder="Select income range"
                          options={INCOME_RANGE_OPTIONS}
                          error={errors.incomeRange}
                          touched={touched.incomeRange}
                          value={values.incomeRange}
                          onChange={(value) => setFieldValue('incomeRange', value)}
                        />
                      </div>

                      <div>
                        <label className={Styles.inputLabel}>
                          Monthly Commitments
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <InputField
                          iconAsset={CurrencyIcon}
                          type="text"
                          name="monthlyCommitments"
                          placeholder="Enter your monthly commitments in Euros"
                          error={errors.monthlyCommitments}
                          touched={touched.monthlyCommitments}
                          required
                        />
                      </div>

                      <button type="submit" className={Styles.continueBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Continue'}
                      </button>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <p className={Styles.subTitle}>Required by financial regulations.</p>

                      {/* Photo ID Upload */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setFieldValue('photoId', file);
                          }
                        }}
                      />
                      <div
                        className={`${Styles.uploadWrapper} ${values.photoId ? Styles.uploaded : ''}`}
                        onClick={() => fileInputRef.current.click()}
                      >
                        <img src={UploadIcon} alt="" className={Styles.uploadIcon} />
                        <p className={Styles.uploadText}>
                          {values.photoId
                            ? 'Photo ID Uploaded'
                            : 'Photo ID upload (Passport / Driving licence)'}
                        </p>
                        {values.photoId ? (
                          <span className={Styles.fileName}>{values.photoId.name}</span>
                        ) : (
                          <img
                            src={UploadIcon}
                            alt=""
                            className={Styles.uploadActionIcon}
                            style={{ transform: 'rotate(0deg)' }}
                          />
                        )}
                      </div>

                      {/* Live Selfie Check */}
                      <div
                        className={`${Styles.uploadWrapper} ${values.selfie ? Styles.uploaded : ''}`}
                        onClick={() => !values.selfie && setShowCamera(true)}
                      >
                        <img src={CameraIcon} alt="" className={Styles.uploadIcon} />
                        <p className={Styles.uploadText}>
                          {values.selfie ? 'Selfie Verified' : 'Live selfie check'}
                        </p>
                        {values.selfie && (
                          <img
                            src={values.selfie}
                            alt="Selfie"
                            className={Styles.previewThumbnail}
                          />
                        )}
                      </div>

                      <button type="submit" className={Styles.continueBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Finalizing...' : 'Finish'}
                      </button>
                    </>
                  )}
                  {/* Webcam Modal - Moved inside Formik to access setFieldValue */}
                  {showCamera && (
                    <div className={Styles.webcamOverlay}>
                      <div className={Styles.webcamContainer}>
                        <div className={Styles.webcamFrame}>
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            videoConstraints={{ facingMode: 'user' }}
                          />
                        </div>
                        <div className={Styles.webcamControls}>
                          <button
                            className={Styles.cancelBtn}
                            onClick={() => setShowCamera(false)}
                            type="button"
                          >
                            Cancel
                          </button>
                          <button
                            className={Styles.captureBtn}
                            onClick={() => {
                              const imageSrc = webcamRef.current.getScreenshot();
                              if (imageSrc) {
                                setFieldValue('selfie', imageSrc);
                                setShowCamera(false);
                              }
                            }}
                            type="button"
                          >
                            Capture
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </section>

          {/* ========================== Illustration Section ========================== */}
          <section className={Styles.illustrationContainer}>
            <div className={Styles.illustrationSection}>
              <img
                src={SignUpRightImage}
                alt="Falcon Illustration"
                className={Styles.illustration}
              />
            </div>
          </section>
        </main>

        {/* ========================== Footer Section ========================== */}
        <div className={Styles.featureFooter}>
          <span className={Styles.footerItem}>FCA & PRA aligned processes</span>
          <span className={Styles.footerItem}>Secure identity verification</span>
          <span className={Styles.footerItem}>Shariah-compliant financial services</span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupScreen;
