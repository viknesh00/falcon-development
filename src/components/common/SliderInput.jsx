import React from 'react';
import Slider from '@mui/material/Slider';

const SliderInput = ({ value, min, max, step, onChange }) => {
  return (
    <Slider
      value={value || min}
      min={min}
      max={max}
      step={step}
      onChange={(e, val) => onChange(val)}
      valueLabelDisplay="auto"
    />
  );
};

export default SliderInput;
