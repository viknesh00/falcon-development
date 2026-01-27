import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Webcam from 'react-webcam';
import { CameraIcon } from '../../assets';
import Styles from './Styles/authStyles.module.css';

const SelfieCheck = ({ value, onChange, error, touched, label = 'Live Selfie Check' }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      onChange(imageSrc);
      setShowCamera(false);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <p className={Styles.inputLabel}>
        {label} <span className={Styles.requiredIndicator}>*</span>
      </p>
      <div
        className={`${Styles.uploadWrapper} ${value ? Styles.uploaded : ''}`}
        onClick={() => setShowCamera(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {(!value || isHovered) && (
          <>
            <img src={CameraIcon} alt="" className={Styles.uploadIcon} />
            <p className={Styles.uploadText}>{value ? 'Retake selfie' : 'Live selfie check'}</p>
          </>
        )}
        {value && !isHovered && (
          <img src={value} alt="Selfie" className={Styles.previewThumbnail} />
        )}
      </div>
      {/* Webcam Modal */}
      {showCamera &&
        createPortal(
          <div className={Styles.webcamOverlay}>
            <div
              className={Styles.webcamContainer}
              style={{ height: '80vh', justifyContent: 'space-between' }}
            >
              {/* 80vh height as requested */}
              <div
                className={Styles.webcamFrame}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0,0,0,0.1)',
                }}
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  height="100%"
                  videoConstraints={{ facingMode: 'user' }}
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                />
              </div>
              <div className={Styles.webcamControls} style={{ marginTop: '20px' }}>
                <button
                  className={Styles.cancelBtn}
                  onClick={() => setShowCamera(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button className={Styles.captureBtn} onClick={handleCapture} type="button">
                  Capture
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      {error && touched && <div className={Styles.errorText}>{error}</div>}
    </div>
  );
};

export default SelfieCheck;
