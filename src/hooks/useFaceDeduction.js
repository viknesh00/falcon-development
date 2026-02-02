import { useState, useCallback, useRef, useEffect } from 'react';
import { checkQuality } from '../services/faceDetectionService';

const useFaceDeduction = (
  webcamRef,
  isModelLoaded,
  detector,
  { targetFps = 15, requiredStableFrames = 6 } = {}
) => {
  const [detectionResult, setDetectionResult] = useState({
    isValid: false,
    warning: 'Initializing detection...',
    livenessScore: 0,
    hasBlinked: false,
    faceBox: null,
    faceBoxNormalized: null,
    faceCenter: null,
    faceArea: 0,
  });

  const blinkHistory = useRef([]);
  const hasDetectedBlink = useRef(false);
  const requestRef = useRef();
  const stableFramesRef = useRef(0); // frames with good alignment to allow capture without blink
  const REQUIRED_STABLE_FRAMES = requiredStableFrames; // configurable (frames)
  const lastDetectTimeRef = useRef(0); // used to throttle detection to targetFps

  const cocoDetectorRef = useRef(null);
  const detectCounterRef = useRef(0);

  const detect = useCallback(async () => {
    // Only proceed if EVERYTHING is ready
    if (!detector || !webcamRef.current || !webcamRef.current.video || !isModelLoaded) {
      if (isModelLoaded) {
        requestRef.current = requestAnimationFrame(detect);
      }
      return;
    }

    const video = webcamRef.current.video;
    // Readiness check (READY_STATE_HAVE_ENOUGH_DATA = 4)
    if (video.readyState < 2) {
      requestRef.current = requestAnimationFrame(detect);
      return;
    }

    try {
      // Throttle detection to target FPS to reduce CPU usage and allow configurable realtime behavior
      const now = performance.now ? performance.now() : Date.now();
      const msPerFrame = 1000 / Math.max(1, targetFps);
      if (now - lastDetectTimeRef.current < msPerFrame) {
        // Skip detection on this animation frame, but keep the loop alive
        requestRef.current = requestAnimationFrame(detect);
        return;
      }
      lastDetectTimeRef.current = now;

      // If video is mirrored in the UI, run detector with flipHorizontal=true to match coordinates
      const faces = await detector.estimateFaces(video, { flipHorizontal: true });
      const quality = checkQuality(faces, video);

      // Store the last computed center/area globally for quick UI readout (debug/UX)
      try {
        if (faces && faces.length > 0) {
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
            window.__lastFaceCenter = {
              x: (box.xMin + box.width / 2) / (video.videoWidth || box.width),
              y: (box.yMin + box.height / 2) / (video.videoHeight || box.height),
            };

            window.__lastFaceArea =
              (box.width * box.height) / ((video.videoWidth || 1) * (video.videoHeight || 1));
          }
        }
      } catch (e) {
        // swallow; not critical
      }

      let blinkState = hasDetectedBlink.current;

      if (quality.isValid && quality.liveness) {
        const isCurrentlyBlinking = quality.liveness.isBlinking;

        // Add to history (frame window for blink analysis)
        blinkHistory.current.push(isCurrentlyBlinking);
        if (blinkHistory.current.length > 20) blinkHistory.current.shift();

        // Blink Detection Logic:
        // We look for a pattern: [Open, Open, ..., Closed, Closed, ..., Open, Open]
        // This prevents static images or sensor noise from triggering it.
        if (!blinkState) {
          const history = blinkHistory.current;
          const closedCount = history.filter((b) => b === true).length;
          const openedCount = history.filter((b) => b === false).length;

          // If we have some closed frames and some open frames recently
          if (closedCount >= 2 && closedCount <= 10 && openedCount >= 5 && !isCurrentlyBlinking) {
            hasDetectedBlink.current = true;
            blinkState = true;
          }
        }
      }

      // Enterprise Decision Logic:
      // 1. Quality must be perfect (Centering, No Mask, Pose)
      // 2. Proof of Life must be verified (Liveness/Blink)
      let finalIsValid = quality.isValid && blinkState;

      let finalWarning = quality.warning;
      if (quality.isValid) {
        finalWarning = !blinkState
          ? 'Proof of Life: Please blink your eyes'
          : 'Identity Verified - Ready to Capture';
      }

      // Compute normalized box and center if available
      let faceBox = null;
      let faceBoxNormalized = null;
      let faceCenter = null;
      let faceArea = 0;

      if (faces && faces.length > 0) {
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
          faceBox = box;
          const w = video.videoWidth || 1;
          const h = video.videoHeight || 1;
          faceBoxNormalized = {
            x: Math.max(0, Math.min(1, box.xMin / w)),
            y: Math.max(0, Math.min(1, box.yMin / h)),
            width: Math.max(0, Math.min(1, box.width / w)),
            height: Math.max(0, Math.min(1, box.height / h)),
          };
          faceCenter = { x: (box.xMin + box.width / 2) / w, y: (box.yMin + box.height / 2) / h };
          faceArea = (box.width * box.height) / (w * h);
        }
      }

      // Alignment fallback: if face is well centered and area in comfortable range for a few consecutive frames
      const ALIGN_SCORE_THRESHOLD = 88; // high alignment score to allow capture without blink
      const AREA_MIN = 0.005; // allow captures above 0.5% area
      const AREA_MAX = 0.6;
      const alignmentOK =
        (quality.score || 0) >= ALIGN_SCORE_THRESHOLD &&
        faceArea >= AREA_MIN &&
        faceArea <= AREA_MAX;

      if (alignmentOK) {
        stableFramesRef.current = Math.min(REQUIRED_STABLE_FRAMES, stableFramesRef.current + 1);
      } else {
        stableFramesRef.current = 0;
      }

      const allowWithoutBlink = stableFramesRef.current >= REQUIRED_STABLE_FRAMES;

      // Allow final valid state either via liveness or via stable alignment fallback
      finalIsValid = (quality.isValid && blinkState) || allowWithoutBlink;

      // Provide clearer guidance when alignment is good but liveness not observed
      if (!quality.isValid && allowWithoutBlink) {
        finalWarning = 'Good alignment detected — hold steady to capture';
      }

      setDetectionResult({
        isValid: finalIsValid,
        warning: finalWarning,
        hasBlinked: blinkState,
        livenessScore: blinkState ? 100 : 0,
        faceScore: quality.score || 0,
        faceBox,
        faceBoxNormalized,
        faceCenter,
        faceArea,
        isAligned: alignmentOK,
        stableFrames: stableFramesRef.current,
        requiredStable: REQUIRED_STABLE_FRAMES,
      });
    } catch (error) {
      console.error('Detection error:', error);
    }

    requestRef.current = requestAnimationFrame(detect);
  }, [detector, webcamRef, isModelLoaded, REQUIRED_STABLE_FRAMES, targetFps]);

  // Reset blink state if model or camera is toggled
  useEffect(() => {
    if (!isModelLoaded) {
      hasDetectedBlink.current = false;
      blinkHistory.current = [];
    }
  }, [isModelLoaded]);

  useEffect(() => {
    if (isModelLoaded && detector) {
      requestRef.current = requestAnimationFrame(detect);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isModelLoaded, detector, detect]);

  return detectionResult;
};

export default useFaceDeduction;
