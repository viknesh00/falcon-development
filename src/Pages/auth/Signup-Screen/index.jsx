import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Styles from './Styles/authStyles.module.css';
import {
  LockIcon,
  MailIcon,
  PhoneIcon,
  UploadIcon,
  CameraIcon,
  UserIcon,
  WorkIcon,
  CurrencyIcon,
  SignUpLoading,
  FinalStepVector,
  SignUpRightImage,
  LocationIcon,
  EllipseIcon,
} from '../../../assets';
import Footer from '../../../components/layout/Footer';
import { validateStep1, validateStep2, validateOTP } from './helpers/validationSchemas';
import {
  Button,
  StepIndicator,
  Dropdown,
  DatePicker,
  InputField,
  PhoneInputField,
  FormStateResetter,
  SelfieCheck,
  PhotoIdUpload,
  AddressLookup,
  ManualAddressModal,
} from '../../../components';
import {
  getInitialValues,
  processFormData,
  validateFormStep,
  isStepValid,
  isFormComplete,
  getNextStep,
  FORM_METADATA,
} from '../../../config/formConfig';

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
  const navigate = useNavigate();

  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeVirtualField, setActiveVirtualField] = useState(null);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);

  // Initialize showAddressFields if entering step with data
  useEffect(() => {
    // Logic could go here, but simple boolean state is safe enough for now
  }, []);

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
        // navigate(FORM_METADATA.successRedirectUrl);
      }, FORM_METADATA.successRedirectDelay);
      interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % dynamicContent.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [step, dynamicContent.length]);

  const initialValues = getInitialValues();

  const handleNext = async (values, actions) => {
    setIsSubmitting(true);

    // Format form data using centralized config
    const formData = processFormData(step, values);

    // Log the form data as JSON for verification
    console.log(`📋 Step ${step} Form Data (JSON):`, JSON.stringify(formData, null, 2));

    // Simulate API calls for each step
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Get next step from centralized config
      const nextStep = getNextStep(step);
      if (nextStep) {
        setStep(nextStep);
        console.log(`Step ${step} submitted successfully`);
      } else {
        // Form complete
        console.log('Signup complete');
        setStep(4);
      }
      // Clear touched state when moving to next step so validation errors don't persist
      actions.setTouched({});
    } catch (error) {
      console.error('Error in signup flow:', error);
      actions.setStatus({ error: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
      actions.setSubmitting(false);
    }
  };

  const getValidationSchema = () => {
    // Use centralized validation from config
    return (values) => validateFormStep(step, values);
  };

  if (step === 4) {
    return (
      <>
        <div
          className={Styles.authContainer}
          style={{ height: 'auto', minHeight: '80vh', paddingBottom: '10px' }}
        >
          {/* ========================== Header Section ========================== */}
          <header className={Styles.header}>
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
          <main
            className={Styles.mainContent}
            style={{
              gridTemplateColumns: '1fr',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: '120px',
              height: 'auto',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '1200px',
                padding: '0 40px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className={`${Styles.successContainer} ${Styles.fadeIn}`}>
                <h1 className={Styles.successTitle}>Account Ready</h1>
                <p className={Styles.successMessage}>We're setting up your Falcon account.</p>
              </div>

              <div
                className={Styles.successIconWrapper}
                style={{ height: 'auto', marginTop: '20px', marginBottom: '40px' }}
              >
                <img src={FinalStepVector} alt="" style={{ maxWidth: '400px', width: '80%' }} />
              </div>

              <div className={Styles.loadingSection}>
                <h2 className={Styles.title} style={{ fontSize: '32px', color: '#48bb78' }}>
                  {dynamicContent[loadingIndex]}
                </h2>
                <img src={SignUpLoading} alt="" style={{ marginTop: '20px' }} />
              </div>
            </div>
          </main>
          <div className={Styles.featureFooter} style={{ marginBottom: '0', marginTop: '60px' }}>
            <span className={Styles.footerItem}>FCA & PRA aligned processes</span>
            <span className={Styles.footerItem}>Secure identity verification</span>
            <span className={Styles.footerItem}>Shariah-compliant financial services</span>
          </div>
        </div>
        <Footer />
      </>
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
              {({ errors, touched, values, setFieldValue, setFieldTouched, setTouched }) => (
                <Form className={Styles.formGrid}>
                  <FormStateResetter step={step} setTouched={setTouched} />
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
                          onToggleVirtualKeyboard={setShowVirtualKeyboard}
                          showVirtualKeyboard={showVirtualKeyboard}
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
                          onToggleVirtualKeyboard={setShowVirtualKeyboard}
                          showVirtualKeyboard={showVirtualKeyboard}
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

                      {/* <button type="submit" className={Styles.continueBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Continue'}
                      </button> */}
                      <Button
                        variant="primary"
                        className={Styles.continueBtn}
                        disabled={isSubmitting || !isStepValid(step, values)}
                        type="submit"
                      >
                        {isSubmitting ? 'Processing...' : 'Continue'}
                      </Button>
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

                      <Button
                        variant="primary"
                        className={Styles.continueBtn}
                        disabled={isSubmitting || !isStepValid(step, values)}
                        type="submit"
                      >
                        {isSubmitting ? 'Verifying...' : 'Submit'}
                      </Button>
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

                      <div>
                        <label className={Styles.inputLabel}>
                          Postal Code
                          <span className={Styles.requiredIndicator}>*</span>
                        </label>
                        <AddressLookup
                          value={values.postalCode}
                          onAddressSelect={(addr) => {
                            setFieldValue('buildingAddress', addr.buildingAddress);
                            setFieldValue('street', addr.street);
                            setFieldValue('city', addr.city);
                            setFieldValue('postalCode', addr.postalCode);
                            setShowAddressFields(true);
                          }}
                          onManualEntry={(term) => {
                            if (term) setFieldValue('postalCode', term);
                            setShowManualModal(true);
                          }}
                          error={errors.postalCode}
                          touched={touched.postalCode}
                        />
                      </div>

                      {/* Manual Modal */}
                      {showManualModal && (
                        <ManualAddressModal
                          initialValues={{
                            buildingAddress: values.buildingAddress,
                            street: values.street,
                            city: values.city,
                            postalCode: values.postalCode,
                          }}
                          onClose={() => setShowManualModal(false)}
                          onSave={(data) => {
                            setFieldValue('buildingAddress', data.buildingAddress);
                            setFieldValue('street', data.street);
                            setFieldValue('city', data.city);
                            setFieldValue('postalCode', data.postalCode);
                            setShowAddressFields(true);
                            setShowManualModal(false);
                          }}
                        />
                      )}

                      {(showAddressFields || values.buildingAddress) && (
                        <>
                          <div className={Styles.formRow}>
                            <div style={{ flex: 1 }}>
                              <label className={Styles.inputLabel}>
                                Building / Flat No
                                <span className={Styles.requiredIndicator}>*</span>
                              </label>
                              <InputField
                                iconAsset={LocationIcon}
                                type="text"
                                name="buildingAddress"
                                placeholder="Enter here"
                                error={errors.buildingAddress}
                                touched={touched.buildingAddress}
                                required
                              />
                            </div>
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
                          </div>

                          <div className={Styles.formRow}>
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
                        </>
                      )}

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
                          {/* <span className={Styles.requiredIndicator}>*</span> */}
                        </label>
                        <InputField
                          iconAsset={CurrencyIcon}
                          type="text"
                          name="monthlyCommitments"
                          placeholder="Enter your monthly commitments in Euros"
                          error={errors.monthlyCommitments}
                          touched={touched.monthlyCommitments}
                        />
                      </div>

                      <Button
                        variant="primary"
                        className={Styles.continueBtn}
                        disabled={isSubmitting || !isStepValid(step, values)}
                        type="submit"
                      >
                        {isSubmitting ? 'Saving...' : 'Continue'}
                      </Button>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className={Styles.uploadContainer}>
                        <PhotoIdUpload
                          value={values.photoId}
                          onChange={(file) => setFieldValue('photoId', file)}
                          error={errors.photoId}
                          touched={touched.photoId}
                        />

                        {/* Live Selfie Check */}
                        <SelfieCheck
                          value={values.selfie}
                          onChange={(val) => setFieldValue('selfie', val)}
                          error={errors.selfie}
                          touched={touched.selfie}
                        />
                      </div>
                      <div>
                        <Button
                          variant="primary"
                          className={Styles.continueBtn}
                          disabled={isSubmitting || !isStepValid(step, values)}
                          type="submit"
                        >
                          {isSubmitting ? 'Finalizing...' : 'Finish'}
                        </Button>
                      </div>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </section>

          {/* ========================== Illustration Section ========================== */}
          <section className={Styles.illustrationContainer}>
            <div className={Styles.illustrationSection}>
              <img src={EllipseIcon} alt="" className={Styles.ellipseIcon} />
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
