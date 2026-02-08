import React from 'react';
import Styles from './styles/SignIn.module.css';
import { Formik } from 'formik';
import { Button, InputField, PhoneInputField, SwitchOptions } from '../../../components';
import { LockIcon, MailIcon, PhoneIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import SignInHelper from './helpers/sign-in.helper';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

import OtpScreen from './OtpScreen';

const SignInScreen = () => {
  const [initialValues] = React.useState({
    email: '',
    mobile: '',
    password: '',
  });
  const [selectedOption, setSelectedOption] = React.useState('personal');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const navigation = useNavigate();
  const [activeVirtualField, setActiveVirtualField] = React.useState('');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = React.useState(false);
  const [step, setStep] = React.useState('credentials');

  if (step === 'otp') {
    return <OtpScreen onBack={() => setStep('credentials')} />;
  }

  return (
    <>
      <Header scrolled={true} actionButtonDisable />
      <div style={{ paddingTop: '50px' }} className={Styles.signInContainer}>
        {/* left container */}
        <section className={Styles.leftContainer}>
          <div className={Styles.contentWrapper}>
            {/* Header Section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
              }}
            >
              <div>
                <h1 className={Styles.title}>Welcome back</h1>
                <p className={Styles.subtitle}>Sign in to manage your account securely.</p>
              </div>
              {/* Switch Options */}
              <SwitchOptions
                options={['personal', 'business']}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            {/* Form */}
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log('Form values', values);
                // SignInHelper.SignInPress(new_valus);
                // Move to OTP screen
                setStep('otp');
              }}
            >
              {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                <form className={Styles.formContainer} onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Email Address</label>
                    <InputField
                      iconAsset={MailIcon}
                      name="email"
                      type={'email'}
                      placeholder={'Enter your registered email'}
                      error={errors.email}
                      touched={touched.email}
                    />
                  </div>

                  <div className={Styles.orDivider}>OR</div>

                  {/* Mobile Field */}
                  <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Mobile Number</label>
                    <PhoneInputField
                      iconAsset={PhoneIcon}
                      name="mobile"
                      placeholder="Enter your registered mobile number"
                      value={values.mobile}
                      onChange={(val) => setFieldValue('mobile', val)}
                      error={errors.mobile}
                      touched={touched.mobile}
                    />
                  </div>

                  {/* Password Field */}
                  <div className={Styles.inputGroup}>
                    <label className={Styles.label}>Password</label>
                    <InputField
                      iconAsset={LockIcon}
                      type={isPasswordVisible ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter Your Password"
                      error={errors.password}
                      touched={touched.password}
                      showPasswordToggle={true}
                      isPasswordVisible={isPasswordVisible}
                      onTogglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
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

                  {/* Forgot Password */}
                  <p
                    className={Styles.forgotPassword}
                    onClick={() => SignInHelper.ForgotPasswordPress({ navigation })}
                  >
                    Forgot password?
                  </p>

                  {/* Submit Section */}
                  <div className={Styles.submitButtonWrapper}>
                    <div className={Styles.securityNote}>
                      <span>🔒</span>
                      <span>Your account is protected with secure authentication.</span>
                    </div>

                    <Button
                      type={'submit'}
                      onClick={handleSubmit}
                      className={Styles.loginButton}
                      variant="primary"
                      disabled={!values.email && !values.mobile}
                      style={{ width: '100%', backgroundColor: '#2ea368' }}
                    >
                      <p>Log In</p>
                    </Button>

                    <p className={Styles.createAccount}>
                      Don’t have an account?{' '}
                      <span
                        className={Styles.createLink}
                        onClick={() => SignInHelper.OnSingupPress(navigation)}
                      >
                        Create one
                      </span>
                    </p>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </section>

        {/* right container */}
        <section className={Styles.rightContainer} />
      </div>
      <Footer />
    </>
  );
};
export default SignInScreen;
