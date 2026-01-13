import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import OtpModal from './OtpModal';
import { 
  FiChevronRight, FiCheck, FiMail, FiLock, FiSmartphone, FiUser, FiActivity, FiArrowRight
} from 'react-icons/fi';
import { ToastSuccess } from '../../services/ToastMsg';

const SignupStepper = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [kycProgress, setKycProgress] = useState(0); // 0: initial, 1: scanning ID, 2: scanning Face, 3: Success
  const [formData, setFormData] = useState({
    email: '',
    passcode: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
  });
  const navigate = useNavigate();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(step + 1);
    }, 800);
  };

  const startKYC = () => {
    setLoading(true);
    setKycProgress(1);
    // Simulate ID scanning
    setTimeout(() => {
      setKycProgress(2);
      // Simulate Face scanning
      setTimeout(() => {
        setKycProgress(3);
        setLoading(false);
      }, 2000);
    }, 2000);
  };

  const handleFinalSubmit = () => {
    ToastSuccess("Account created successfully!");
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="auth-step">
            <div className="auth-header">
              <h1>Let's get you started</h1>
              <p>First things first. We just need your email to secure your spot.</p>
            </div>
            <div className="form-group-modern">
              <label>Email address</label>
              <input 
                type="email" 
                className="modern-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group-modern">
              <label>Set a quick passcode</label>
              <input 
                type="text" 
                className="modern-input"
                placeholder="5-digit code"
                maxLength="5"
                value={formData.passcode}
                onChange={(e) => setFormData({...formData, passcode: e.target.value.replace(/\D/g, '')})}
              />
              <p className="passcode-hint">You'll use this to log in securely.</p>
            </div>
            <button 
              className="btn-primary-modern" 
              onClick={handleNext}
              disabled={!formData.email || formData.passcode.length < 5 || loading}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </div>
        );
      case 2:
        return (
          <div className="auth-step">
            <div className="auth-header">
              <h1>The Basics</h1>
              <p>Tell us a bit about yourself so we can set up your account.</p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="form-group-modern" style={{ flex: 1 }}>
                <label>First Name</label>
                <input 
                  type="text" 
                  className="modern-input"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="form-group-modern" style={{ flex: 1 }}>
                <label>Last Name</label>
                <input 
                  type="text" 
                  className="modern-input"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group-modern">
              <label>Mobile Number</label>
              <input 
                type="tel" 
                className="modern-input"
                placeholder="+44 7123 456789"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
              />
            </div>
            <button 
              className="btn-primary-modern" 
              onClick={() => setOtpModalOpen(true)}
              disabled={!formData.firstName || !formData.lastName || !formData.mobileNumber || loading}
            >
              Verify Mobile <FiSmartphone style={{ marginLeft: '8px' }} />
            </button>
            <OtpModal 
              isOpen={otpModalOpen} 
              onClose={() => setOtpModalOpen(false)}
              onVerify={(otp) => {
                setOtpModalOpen(false);
                handleNext();
              }}
            />
          </div>
        );
      case 3:
        return (
          <div className="auth-step">
            <div className="auth-header">
              <h1>Identity Check</h1>
              <p>We need a quick verify to keep things safe and secure.</p>
            </div>
            
            <div className="kyc-visual-container">
              {kycProgress === 0 && (
                <div className="kyc-initial pulse">
                  <FiUser style={{ fontSize: '48px', color: 'var(--primary)', opacity: 0.5 }} />
                  <p>Ready for verification</p>
                </div>
              )}
              {kycProgress === 1 && (
                <div className="kyc-scanning">
                  <div className="scan-line"></div>
                  <FiActivity />
                  <p>Scanning Document...</p>
                </div>
              )}
              {kycProgress === 2 && (
                <div className="kyc-scanning face">
                  <div className="scan-line horizontal"></div>
                  <FiUser />
                  <p>Verifying Face...</p>
                </div>
              )}
              {kycProgress === 3 && (
                <div className="kyc-success">
                  <div className="check-circle"><FiCheck /></div>
                  <p>Everything looks perfect!</p>
                </div>
              )}
            </div>

            <button 
              className="btn-primary-modern" 
              onClick={kycProgress === 3 ? handleNext : startKYC}
              disabled={loading}
            >
              {kycProgress === 3 ? "Continue" : (loading ? "Verifying..." : "Start KYC Verify")}
            </button>
          </div>
        );
      case 4:
        return (
          <div className="auth-step" style={{ textAlign: 'center' }}>
            <div className="success-icon-large">🎉</div>
            <div className="auth-header">
              <h1>You're All Set!</h1>
              <p>Your ethical finance journey starts here. Welcome to the future of banking.</p>
            </div>
            <button 
              className="btn-primary-modern success-btn" 
              onClick={handleFinalSubmit}
            >
              Go to Dashboard <FiArrowRight />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <div className="modern-progress-bar">
        <div className="modern-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="auth-form-container">
        {renderStep()}
      </div>

      {step === 1 && (
        <div className="auth-footer-text" style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--gray)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
        </div>
      )}

    </AuthLayout>
  );
};

export default SignupStepper;
