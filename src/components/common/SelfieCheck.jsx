import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Webcam from 'react-webcam';
import { CameraIcon } from '../../assets';
import Styles from './Styles/authStyles.module.css';

// Hooks
import useCamera from '../../hooks/useCamera';
import useFaceModel from '../../hooks/useFaceModel';
import useFaceDeduction from '../../hooks/useFaceDeduction';

const SelfieCheck = ({ value, onChange, error, touched, label = 'Live Selfie Check' }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize hooks
  const { webcamRef, isCameraReady, handleUserMedia, handleUserMediaError, captureScreenshot } =
    useCamera();
  // Load detector with recommended defaults (tfjs runtime, single face) — change runtime to 'mediapipe' if you prefer
  const { model, isLoaded: isModelLoaded } = useFaceModel({ runtime: 'tfjs', maxFaces: 1 });
  const {
    isValid,
    warning,
    hasBlinked,
    faceScore,
    faceBoxNormalized,
    faceCenter,
    faceArea,
    isAligned,
    stableFrames,
    requiredStable,
  } = useFaceDeduction(webcamRef, isModelLoaded && showCamera, model, {
    targetFps: 20,
    requiredStableFrames: 6,
  });

  // Center alignment helpers
  const CENTER_THRESHOLD = 0.12; // normalized distance to center (0..1)
  const MIN_AREA_FOR_CENTER = 0.002; // minimum face area when relying on center
  const centerOffset = faceCenter ? Math.hypot(faceCenter.x - 0.5, faceCenter.y - 0.5) : null;
  const isCentered =
    centerOffset !== null &&
    centerOffset <= CENTER_THRESHOLD &&
    (faceArea || 0) >= MIN_AREA_FOR_CENTER;

  // precompute capture enable/label to avoid complex JSX ternaries
  const canCapture = isValid || (faceArea || 0) >= 0.004 || isCentered;

  const captureLabel = (() => {
    if (isValid || (faceArea || 0) >= 0.004 || isCentered) {
      return 'Capture';
    }

    if (isAligned && stableFrames > 0) {
      return `Hold... ${Math.round((stableFrames / requiredStable) * 100)}%`;
    }

    return 'Capture';
  })();

  const handleCapture = async () => {
    // Final synchronous validation and robust capture fallback
    if (!isCameraReady || !webcamRef.current || !webcamRef.current.video) {
      console.warn('Camera not ready for capture');
      return;
    }

    try {
      const video = webcamRef.current.video;

      // If model not loaded we still allow capture when area threshold met from hook state
      // If model not loaded we still allow capture when area threshold met from hook state
      let faceCheck = { isValid: null, warning: null };
      let faces = [];

      if (model && isModelLoaded) {
        try {
          faces = await model.estimateFaces(video, { flipHorizontal: true });
          const svc = await import('../../services/faceDetectionService');
          faceCheck = await svc.checkQuality(faces, video);
        } catch (e) {
          // If the model fails at the moment of capture, fall back to hook-derived area
          // and continue the capture flow instead of aborting completely.
          console.warn('Face model failed during final capture; falling back to area checks', e);
          faces = [];
          faceCheck = {
            isValid: null,
            warning: 'Model error during capture',
          };
        }
      }

      // Determine capture allowance via 3 sources:
      //  - faceCheck.isValid (best)
      //  - live hook area (faceArea) if model unstable
      //  - re-computed area from 'faces' as backup
      let captureAllowed = false;

      if (faceCheck.isValid !== false) {
        captureAllowed = true;
      }

      // allow by current hook-derived area (helps when model had a transient miss)
      if (!captureAllowed && (faceArea || 0) >= 0.004) {
        captureAllowed = true;
      }

      // last-resort: recompute area from detected faces
      if (!captureAllowed && faces && faces.length > 0) {
        const f = faces[0];
        let box = f.box || f.boundingBox || null;
        let keypoints = f.keypoints || f.scaledMesh || null;
        if (Array.isArray(keypoints) && keypoints.length && Array.isArray(keypoints[0])) {
          keypoints = keypoints.map((kp) => ({ x: kp[0], y: kp[1] }));
        }
        if (!box && keypoints && keypoints.length) {
          const xs = keypoints.map((k) => k.x);
          const ys = keypoints.map((k) => k.y);
          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          const minY = Math.min(...ys);
          const maxY = Math.max(...ys);
          box = { xMin: minX, yMin: minY, width: maxX - minX, height: maxY - minY };
        }

        if (box) {
          const w = video.videoWidth || 1;
          const h = video.videoHeight || 1;
          const area = (box.width * box.height) / (w * h);
          if (area >= 0.004) captureAllowed = true;
        }
      }

      // Combine accessory flags from both faceCheck and hook state
      if (!captureAllowed) {
        console.warn('Capture blocked:', faceCheck.warning || 'Presentation or accessory detected');
        return;
      }

      // Attempt standard screenshot, fallback to canvas draw if needed
      let imageSrc = captureScreenshot();
      if (!imageSrc) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          imageSrc = canvas.toDataURL('image/jpeg');
        } catch (e) {
          console.error('Fallback canvas capture failed:', e);
        }
      }

      if (imageSrc) {
        onChange(imageSrc);
        setShowCamera(false);
      } else {
        console.warn('Capture failed: could not obtain image');
      }
    } catch (err) {
      console.error('Error during final capture validation:', err);
    }
  };

  const currentWarning = !isModelLoaded
    ? 'Initializing Biometric Engine...'
    : !isCameraReady
      ? 'Establishing Secure Camera Link...'
      : warning;

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
            <div className={Styles.webcamContainer}>
              <div className={Styles.webcamFrame}>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  height="100%"
                  videoConstraints={{
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    frameRate: { ideal: 30 },
                  }}
                  onUserMedia={handleUserMedia}
                  onUserMediaError={handleUserMediaError}
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                  mirrored={true}
                />

                {/* Detection Feedback Overlay */}
                <div className={Styles.feedbackContainer}>
                  <div className={`${Styles.faceGuide} ${isValid ? Styles.faceGuideOk : ''}`} />

                  {/* Moving center indicator (shows detected face center) */}
                  {faceCenter && (
                    <div
                      className={Styles.faceDot}
                      style={{
                        left: `${Math.max(0, Math.min(1, faceCenter.x)) * 100}%`,
                        top: `${Math.max(0, Math.min(1, faceCenter.y)) * 100}%`,
                        background: isCentered ? '#48bb78' : '#ecc94b',
                        borderColor: '#fff',
                      }}
                    />
                  )}

                  {/* Draw detected face bounding box for precise alignment */}
                  {faceBoxNormalized && (
                    <div
                      className={Styles.faceBox}
                      style={{
                        left: `${Math.max(0, faceBoxNormalized.x) * 100}%`,
                        top: `${Math.max(0, faceBoxNormalized.y) * 100}%`,
                        width: `${Math.max(0, faceBoxNormalized.width) * 100}%`,
                        height: `${Math.max(0, faceBoxNormalized.height) * 100}%`,
                        borderColor: isValid ? '#48bb78' : '#ecc94b',
                      }}
                    />
                  )}

                  {/* Top Stats Bar */}
                  {isCameraReady && isModelLoaded && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        right: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 35,
                      }}
                    >
                      {/* Alignment Score */}
                      <div
                        style={{
                          background: 'rgba(45, 55, 72, 0.7)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '700',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          minWidth: '100px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>ALIGNMENT</span>
                          <span>{faceScore}%</span>
                        </div>
                        <div
                          style={{
                            height: '4px',
                            width: '100%',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${faceScore}%`,
                              background: faceScore > 80 ? '#48bb78' : '#ecc94b',
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </div>
                      </div>

                      {/* Liveness Badge */}
                      <div
                        style={{
                          background: hasBlinked
                            ? 'rgba(72, 187, 120, 0.9)'
                            : 'rgba(45, 55, 72, 0.7)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '700',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: hasBlinked ? '#fff' : '#ecc94b',
                            animation: hasBlinked ? 'none' : 'pulse 1s infinite alternate',
                          }}
                        />
                        {hasBlinked ? 'Verified' : 'Proof of Life'}
                      </div>
                    </div>
                  )}

                  {currentWarning && (
                    <div
                      className={
                        !isModelLoaded || !isCameraReady
                          ? Styles.loadingOverlay
                          : isValid
                            ? Styles.successOverlay
                            : Styles.warningOverlay
                      }
                    >
                      {currentWarning}
                      {/* Face position readout for better UX while adjusting */}
                      {isCameraReady && isModelLoaded && (
                        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.95 }}>
                          <span style={{ display: 'block' }}>
                            Center:{' '}
                            {typeof faceCenter !== 'undefined' && faceCenter
                              ? `${faceCenter.x.toFixed(2)}, ${faceCenter.y.toFixed(2)}`
                              : '—'}
                          </span>
                          <span style={{ display: 'block' }}>
                            Area:{' '}
                            {typeof faceArea !== 'undefined' && faceArea
                              ? `${(faceArea * 100).toFixed(1)}%`
                              : '—'}
                          </span>

                          {/* When aligned but waiting for stability, show progress */}
                          {isAligned && !isValid && (
                            <div
                              style={{
                                marginTop: 6,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                              }}
                            >
                              <div style={{ fontSize: 12 }}>Hold steady</div>
                              <div
                                style={{
                                  width: 80,
                                  height: 8,
                                  background: 'rgba(255,255,255,0.12)',
                                  borderRadius: 6,
                                }}
                              >
                                <div
                                  style={{
                                    height: '100%',
                                    width: `${(stableFrames / requiredStable) * 100}%`,
                                    background: '#fff',
                                    borderRadius: 6,
                                    transition: 'width 0.14s linear',
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Immediate alerts for mask/eyewear/2D image - REMOVED */}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className={Styles.webcamControls} style={{ marginTop: '20px' }}>
                <button
                  className={Styles.cancelBtn}
                  onClick={() => setShowCamera(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={Styles.captureBtn}
                  onClick={handleCapture}
                  type="button"
                  disabled={!canCapture}
                  title={(() => {
                    if (!canCapture) {
                      return currentWarning || 'Alignment or area insufficient';
                    }
                    return 'Take selfie';
                  })()}
                  aria-disabled={!canCapture}
                >
                  {captureLabel}
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
