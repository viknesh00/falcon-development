import React, { useEffect } from 'react';
const FormStateResetter = ({ step, setTouched }) => {
  useEffect(() => {
    // Reset touched state when step changes
    setTouched({});
  }, [step, setTouched]);
  return null;
};

export default FormStateResetter;
