import React, { useState, useEffect } from 'react';
import Styles from './styles/OtpScreen.module.css';
import { Button, OtpInput } from '../../../components';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/layout/Footer';
import Header from '../../../components/layout/Header';

const OtpScreen = ({ mobileNumber, email, onBack }) => {
  // Accepting props to show where code was sent if needed
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (otp.length < 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }
    // Simulate verification
    if (otp === '123456') {
      // Mock success
      console.log('Verified');
      navigate('/dashboard');
    } else {
      // Mock failure based on screenshot "The code you entered is incorrect. Please try again."
      // or "Too many attempts..."
      setError('The code you entered is incorrect. Please try again.');
    }
  };

  const handleResend = () => {
    setTimer(30);
    setError('');
    setOtp('');
    console.log('Resending code...');
  };

  return (
    <>
      <Header scrolled={true} actionButtonDisable />
      <div className={Styles.signInContainer}>
        {/* left container */}
        <section className={Styles.leftContainer}>
          <div className={Styles.contentWrapper}>
            <div style={{ marginBottom: '30px' }}>
              <h1 className={Styles.title}>Verify your code</h1>
              <p className={Styles.subtitle}>
                Enter the 6-digit code sent to your registered mobile number/email address
              </p>
            </div>

            <div className={Styles.formContainer}>
              <div>
                <label className={Styles.inputLabel}>Enter OTP</label>
                <OtpInput
                  length={6}
                  onChange={(val) => {
                    setOtp(val);
                    if (error) setError('');
                  }}
                  error={!!error}
                />
                {error && <p className={Styles.errorText}>{error}</p>}
              </div>

              <Button onClick={handleVerify} style={{ width: '100%', backgroundColor: '#2ea368' }}>
                <p>Verify</p>
              </Button>

              <div className={Styles.resendContainer}>
                {timer > 0 ? (
                  <span>
                    Didn't receive the code?{' '}
                    <span style={{ color: '#EA580C' }}>
                      Resend code in 00:{timer.toString().padStart(2, '0')}
                    </span>
                  </span>
                ) : (
                  <span>Didn't receive the code?</span>
                )}
              </div>

              <button
                className={`${Styles.resendButton} ${timer === 0 ? Styles.resendButtonActive : ''}`}
                disabled={timer > 0}
                onClick={handleResend}
              >
                Resend
              </button>
            </div>
          </div>
        </section>

        {/* right container */}
        <section className={Styles.rightContainer}></section>
      </div>
      <Footer />
    </>
  );
};

export default OtpScreen;
