import { useState, useEffect } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as tf from '@tensorflow/tfjs';

let detectorInstance = null;
let isLoading = false;

const useFaceModel = ({ runtime = 'tfjs', maxFaces = 2 } = {}) => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (detectorInstance) {
        setModel(detectorInstance);
        return;
      }

      if (isLoading) return;
      isLoading = true;

      try {
        await tf.ready();
        // Set backend to webgl for better performance when using tfjs runtime
        if (runtime === 'tfjs' && tf.getBackend() !== 'webgl') {
          await tf.setBackend('webgl');
        }

        const modelType = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
          runtime,
          refineLandmarks: true,
          maxFaces,
        };

        console.info('Loading face detector', detectorConfig);
        detectorInstance = await faceLandmarksDetection.createDetector(modelType, detectorConfig);
        setModel(detectorInstance);
      } catch (err) {
        console.error('Failed to load face model:', err);
        setError(err);
      } finally {
        isLoading = false;
      }
    };

    load();
  }, [runtime, maxFaces]);

  return { model, error, isLoaded: !!model };
};

export default useFaceModel;
