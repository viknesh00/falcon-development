import { useRef, useCallback, useState } from 'react';

const useCamera = () => {
  const webcamRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  const handleUserMediaError = useCallback((error) => {
    console.error('Camera error:', error);
    setIsCameraReady(false);
  }, []);

  const captureScreenshot = useCallback(() => {
    if (webcamRef.current) {
      return webcamRef.current.getScreenshot();
    }
    return null;
  }, []);

  return {
    webcamRef,
    isCameraReady,
    handleUserMedia,
    handleUserMediaError,
    captureScreenshot,
  };
};

export default useCamera;
