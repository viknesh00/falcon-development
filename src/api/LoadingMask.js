import React from 'react';
import './LoadingMask.css';

const LoadingMask = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-mask">
      <div className="loading-balls">
        <div className="loading-ball"></div>
        <div className="loading-ball"></div>
        <div className="loading-ball"></div>
      </div>
    </div>
  );
};

export default LoadingMask;
