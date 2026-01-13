import React, { useState, useRef } from 'react';
import './Auth.css';

const OtpModal = ({ isOpen, onVerify, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="otp-modal">
        <h2>Verify Mobile</h2>
        <p>Enter the 5-digit code we sent to your phone.</p>
        <div className="otp-inputs-row">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              className="otp-box"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
            />
          ))}
        </div>
        <button 
          className="btn-primary-modern" 
          onClick={() => onVerify(otp.join(''))}
          disabled={otp.join('').length < 5}
        >
          Verify OTP
        </button>
        <button 
          className="btn-text" 
          style={{ 
            marginTop: '16px', 
            color: 'var(--gray)', 
            fontSize: '14px', 
            border: 'none', 
            background: 'none', 
            cursor: 'pointer',
            fontWeight: 600
          }} 
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
