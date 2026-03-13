export const checkLighting = (video) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth / 4; // Downscale for performance
  canvas.height = video.videoHeight / 4;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let brightness = 0;
  for (let i = 0; i < data.length; i += 4) {
    // Standard formula for luminance
    brightness += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }

  const avgBrightness = brightness / (canvas.width * canvas.height);

  if (avgBrightness < 40)
    return { isValid: false, warning: 'Environment too dark: Please add light' };
  if (avgBrightness > 220)
    return { isValid: false, warning: 'Environment too bright: Avoid direct light' };

  return { isValid: true };
};
