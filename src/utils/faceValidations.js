/**
 * Advanced Face Validation & Liveness Detection
 * Optimized for MediaPipe Face Mesh coordinates and coordinate system normalization.
 */

const EAR_THRESHOLD = 0.2;

const calculateEAR = (upper, lower, left, right) => {
  if (!upper || !lower || !left || !right) return 0.3;
  const v1 = Math.sqrt(Math.pow(upper.x - lower.x, 2) + Math.pow(upper.y - lower.y, 2));
  const h1 = Math.sqrt(Math.pow(left.x - right.x, 2) + Math.pow(left.y - right.y, 2));
  return v1 / h1;
};

export const validateFacePose = (faces, videoWidth, videoHeight, videoElement) => {
  if (!faces || faces.length === 0) {
    return {
      isValid: false,
      warning: 'Position your face within the frame',
      liveness: {},
      score: 0,
    };
  }

  if (faces.length > 1) {
    return { isValid: false, warning: 'Multiple faces detected', liveness: {}, score: 0 };
  }

  const rawFace = faces[0];

  // Normalize face object across different detector outputs (MediaPipe / BlazeFace)
  let box = rawFace.box || rawFace.boundingBox || null;
  let keypoints = rawFace.keypoints || rawFace.scaledMesh || null;

  // If keypoints are provided as arrays (scaledMesh), convert to objects
  if (Array.isArray(keypoints) && keypoints.length && Array.isArray(keypoints[0])) {
    keypoints = keypoints.map((kp, idx) => ({
      x: kp[0],
      y: kp[1],
      score: kp[2] ?? 1.0,
      index: idx,
    }));
  }

  // If keypoints are missing but scaledMesh is in rawFace, try to use that
  if (!keypoints && rawFace.scaledMesh && rawFace.scaledMesh.length) {
    keypoints = rawFace.scaledMesh.map((kp, idx) => ({
      x: kp[0],
      y: kp[1],
      score: 1.0,
      index: idx,
    }));
  }

  // If box is missing, derive from keypoints
  if (!box && keypoints && keypoints.length) {
    const xs = keypoints.map((k) => k.x);
    const ys = keypoints.map((k) => k.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    box = {
      xMin: minX,
      yMin: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  const vW = videoWidth || 1;
  const vH = videoHeight || 1;

  const normX = (x) => (x > 1 ? x / vW : x);
  const normY = (y) => (y > 1 ? y / vH : y);

  // 1. Occlusion Detection - REMOVED

  // 2. Centering Calculation
  const fCenterX = normX(box.xMin + box.width / 2);
  const fCenterY = normY(box.yMin + box.height / 2);
  const dx = Math.abs(fCenterX - 0.5);
  const dy = Math.abs(fCenterY - 0.5);

  // Debug Log (Development Only)
  console.log(
    `Face Stats: Center(${fCenterX.toFixed(2)}, ${fCenterY.toFixed(2)}) Diff(${dx.toFixed(2)}, ${dy.toFixed(2)}) Area(${(normX(box.width) * normY(box.height)).toFixed(2)})`
  );

  // Normalized centering score
  const centeringScore = Math.max(0, 1 - (dx + dy) * 2);
  const centeringPercentage = Math.round(centeringScore * 100);

  // 3. Size/Distance
  const faceArea = normX(box.width) * normY(box.height);
  if (faceArea < 0.04)
    // Relaxed from 0.08
    return {
      isValid: false,
      warning: 'Move closer to the camera',
      liveness: {},
      score: centeringPercentage,
    };
  if (faceArea > 0.8)
    // Relaxed from 0.6
    return {
      isValid: false,
      warning: 'Move slightly further back',
      liveness: {},
      score: centeringPercentage,
    };

  // 4. Liveness Check (Blink)
  const leftUpper = keypoints[159],
    leftLower = keypoints[145],
    leftLeft = keypoints[33],
    leftRight = keypoints[133];
  const rightUpper = keypoints[386],
    rightLower = keypoints[374],
    rightLeft = keypoints[263],
    rightRight = keypoints[362];
  let isBlinking = false;
  if (leftUpper && leftLower && rightUpper && rightLower) {
    const earL = calculateEAR(leftUpper, leftLower, leftLeft, leftRight);
    const earR = calculateEAR(rightUpper, rightLower, rightLeft, rightRight);
    isBlinking = (earL + earR) / 2 < EAR_THRESHOLD;
  }

  // 5. Pose (Head orientation)
  const nose = keypoints[1],
    lEye = keypoints[33],
    rEye = keypoints[263];
  if (lEye && rEye && nose) {
    const eyesDist = Math.abs(normX(rEye.x) - normX(lEye.x));
    const noseToLeft = Math.abs(normX(nose.x) - normX(lEye.x));
    const noseRatio = eyesDist > 0 ? noseToLeft / eyesDist : 0.5;

    if (noseRatio < 0.25 || noseRatio > 0.75) {
      // Relaxed from 0.35/0.65
      return {
        isValid: false,
        warning: 'Look directly at the camera',
        liveness: {},
        score: centeringPercentage,
      };
    }
  }

  // Final validation: Extreme leniency
  if (dx > 0.45 || dy > 0.45) {
    return {
      isValid: false,
      warning: 'Align face with the center guide',
      liveness: {},
      score: centeringPercentage,
    };
  }

  return { isValid: true, liveness: { isBlinking }, score: centeringPercentage };
};
