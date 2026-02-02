import { validateFacePose } from '../utils/faceValidations';
import { checkLighting } from '../utils/lightingCheck';
import { checkBlur } from '../utils/blurDetection';

/**
 * Checks the quality of a detected face in a video frame.
 * Orchestrates lighting, blur, and pose validations.
 */
export const checkQuality = (faces, video) => {
  if (!video || (faces && faces.length === 0)) {
    return { isValid: false, warning: 'Align face within the frame' };
  }

  // 1. Lighting Check
  const lightingResult = checkLighting(video);
  if (!lightingResult.isValid) return lightingResult;

  // 2. Blur Check
  const blurResult = checkBlur(video);
  if (!blurResult.isValid) return blurResult;

  // 3. Pose and Position Check
  const poseResult = validateFacePose(faces, video.videoWidth, video.videoHeight, video);
  if (!poseResult.isValid) return poseResult;

  return {
    isValid: true,
    warning: 'Compliance Check Passed',
    liveness: poseResult.liveness,
    score: poseResult.score,
  };
};
