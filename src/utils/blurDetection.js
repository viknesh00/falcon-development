export const checkBlur = (video) => {
  // Basic blur detection using variance of Laplacian-like operator
  // This is a simplified version for browser performance
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 100;
  canvas.height = 100;
  ctx.drawImage(video, 0, 0, 100, 100);
  const imageData = ctx.getImageData(0, 0, 100, 100);
  const data = imageData.data;

  // Convert to grayscale and calculate simple variance
  let sum = 0;
  let sumSq = 0;
  for (let i = 0; i < data.length; i += 4) {
    const val = (data[i] + data[i + 1] + data[i + 2]) / 3;
    sum += val;
    sumSq += val * val;
  }

  const n = data.length / 4;
  const mean = sum / n;
  const variance = sumSq / n - mean * mean;

  // This is a very rough heuristic for blur
  if (variance < 100)
    return { isValid: false, warning: 'Camera focus unstable: Please hold still' };

  return { isValid: true };
};
