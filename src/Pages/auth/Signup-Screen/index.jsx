import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './Styles/authStyles.module.css';
import {
  LockIcon,
  MailIcon,
  PhoneIcon,
  OnBoardingVector,
  UploadIcon,
  ImageIcon,
  CameraIcon,
  CalendarIcon,
  UserIcon,
  LocationIcon,
  WorkIcon,
  CurrencyIcon,
  FalconLogo,
  SignUpLoading,
  FinalStepVector,
} from '../../../assets';
import StepIndicator from './Components/StepIndicator';
import Footer from '../../../components/layout/Footer';
import { validateStep1, validateStep2, validateOTP } from './helpers/validationSchemas';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const InputField = ({
  icon,
  type,
  name,
  placeholder,
  error,
  touched,
  isReactIcon = false,
  iconAsset,
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
        style={{
          placeholderColor: '#FFFFFFB2',
        }}
      />
    </div>
    {error && touched && <div className={Styles.errorText}>{error}</div>}
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
    <div
      className={`${Styles.inputWrapper} ${Styles.phoneInputWrapper} ${error && touched ? Styles.error : ''}`}
    >
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

const SignupScreen = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const navigate = useNavigate();

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
    fullName: '',
    dob: '',
    homeAddress: '',
    employmentStatus: '',
    incomeRange: '',
    monthlyCommitments: '',
  };

  const handleNext = async (values, actions) => {
    setIsSubmitting(true);
    // Simulate API calls for each step
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      if (step === 1) {
        setStep(1.5);
      } else if (step === 1.5) {
        setStep(2);
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
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
        <header className={Styles.header}>
          <div className={Styles.logo}>
            <img src="/assets/images/falcon-logo.jpg" alt="Falcon" />
            <span className={Styles.logoSpan}>Falcon</span>
          </div>
        </header>
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
        <header className={Styles.header}>
          <div className={Styles.logo}>
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

        <main className={Styles.mainContent}>
          <section className={`${Styles.formSection} ${Styles.fadeIn}`}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
                marginBottom: '40px',
              }}
            >
              <div>
                {step === 1 && (
                  <h1 className={Styles.title}>
                    Create your Falcon
                    <br />
                    account
                  </h1>
                )}
                {step === 1.5 && (
                  <h1 className={Styles.title}>
                    Create your Falcon
                    <br />
                    account
                  </h1>
                )}
                {step === 2 && (
                  <h1 className={Styles.title}>
                    Personal & financial
                    <br />
                    details
                  </h1>
                )}
                {step === 3 && <h1 className={Styles.title}>Verify your identity</h1>}
              </div>
              <div className={Styles.rowStepIndicator}>
                <StepIndicator currentStep={step} totalSteps={3} />
              </div>
            </div>

            <Formik
              initialValues={initialValues}
              validate={getValidationSchema()}
              onSubmit={handleNext}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form className={Styles.formGrid}>
                  {step === 1 && (
                    <>
                      <p className={Styles.subTitle}>
                        Set up your account to start using Shariah-compliant financial services.
                      </p>

                      <InputField
                        iconAsset={MailIcon}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        error={errors.email}
                        touched={touched.email}
                      />
                      <PhoneInputField
                        iconAsset={PhoneIcon}
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        error={errors.mobileNumber}
                        touched={touched.mobileNumber}
                        value={values.mobileNumber}
                        onChange={(val) => setFieldValue('mobileNumber', val)}
                      />
                      <InputField
                        iconAsset={LockIcon}
                        type="password"
                        name="password"
                        placeholder="Create Your Password"
                        error={errors.password}
                        touched={touched.password}
                      />
                      <InputField
                        iconAsset={LockIcon}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Your Password"
                        error={errors.confirmPassword}
                        touched={touched.confirmPassword}
                      />

                      <button type="submit" className={Styles.continueBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Continue'}
                      </button>

                      <p className={Styles.termsText}>
                        By continuing, you agree to Falcon's <a href="#">Terms and Conditions</a>.{' '}
                        <br />
                        We'll handle your data in line with our <a href="#">Privacy Policy</a>.
                      </p>
                    </>
                  )}

                  {step === 1.5 && (
                    <>
                      <p className={Styles.subTitle}>
                        Set up your account to start using Shariah-compliant financial services.
                      </p>

                      <div className={Styles.otpSection}>
                        <p className={Styles.otpTitle}>Enter the Otp Sent to your Email</p>
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
                        <p className={Styles.otpTitle}>Enter the Otp Sent to your Mobile</p>
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
                      <p className={Styles.subTitle}>
                        Tell us a bit about yourself. This helps us serve you responsibly.
                      </p>

                      <InputField
                        iconAsset={UserIcon}
                        type="text"
                        name="fullName"
                        placeholder="Full name (as per ID)"
                        error={errors.fullName}
                        touched={touched.fullName}
                      />
                      <InputField
                        iconAsset={CalendarIcon}
                        type="date"
                        name="dob"
                        placeholder="Date of birth"
                        error={errors.dob}
                        touched={touched.dob}
                      />
                      <InputField
                        iconAsset={LocationIcon}
                        type="text"
                        name="homeAddress"
                        placeholder="Home address"
                        error={errors.homeAddress}
                        touched={touched.homeAddress}
                      />
                      <InputField
                        iconAsset={WorkIcon}
                        type="text"
                        name="employmentStatus"
                        placeholder="Employment status"
                        error={errors.employmentStatus}
                        touched={touched.employmentStatus}
                      />
                      <InputField
                        iconAsset={CurrencyIcon}
                        type="text"
                        name="incomeRange"
                        placeholder="Income range"
                        error={errors.incomeRange}
                        touched={touched.incomeRange}
                      />
                      <InputField
                        iconAsset={CurrencyIcon}
                        type="text"
                        name="monthlyCommitments"
                        placeholder="Monthly commitments"
                        error={errors.monthlyCommitments}
                        touched={touched.monthlyCommitments}
                      />

                      <button type="submit" className={Styles.continueBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Continue'}
                      </button>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <p className={Styles.subTitle}>Required by financial regulations.</p>

                      <div className={Styles.uploadWrapper}>
                        <img src={UploadIcon} alt="" className={Styles.uploadIcon} />
                        <p className={Styles.uploadText}>
                          Photo ID upload (Passport / Driving licence)
                        </p>
                        <img
                          src={UploadIcon}
                          alt=""
                          className={Styles.uploadActionIcon}
                          style={{ transform: 'rotate(0deg)' }}
                        />
                      </div>

                      <div className={Styles.uploadWrapper}>
                        <img src={CameraIcon} alt="" className={Styles.uploadIcon} />
                        <p className={Styles.uploadText}>Live selfie check</p>
                      </div>

                      <button type="submit" className={Styles.continueBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Finalizing...' : 'Finish'}
                      </button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </section>

          <section className={Styles.illustrationContainer}>
            <div className={Styles.illustrationSection}>
              <img
                src={OnBoardingVector}
                alt="Falcon Illustration"
                className={Styles.illustration}
              />
            </div>
          </section>
        </main>

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
