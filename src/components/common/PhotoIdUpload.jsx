import React, { useState, useRef } from 'react';
import { UploadIcon } from '../../assets';
import Styles from './Styles/authStyles.module.css';

const PhotoIdUpload = ({ value, onChange, error, touched, label = 'Photo ID Upload' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
      }}
    >
      <p className={Styles.inputLabel}>
        {label} <span className={Styles.requiredIndicator}>*</span>
      </p>
      <input
        type="file"
        accept="image/*,application/pdf"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div
        className={`${Styles.uploadWrapper} ${value ? Styles.uploaded : ''}`}
        onClick={() => fileInputRef.current.click()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {(!value || isHovered) && (
          <>
            <img src={UploadIcon} alt="" className={Styles.uploadIcon} />
            <p className={Styles.uploadText} style={{ whiteSpace: 'pre-line' }}>
              {value ? 'Change Photo ID' : 'Photo ID upload \n (Passport / Driving licence)'}
            </p>
          </>
        )}
        {value && !isHovered && <span className={Styles.fileName}>{value.name}</span>}
      </div>
      {error && touched && <div className={Styles.errorText}>{error}</div>}
    </div>
  );
};

export default PhotoIdUpload;
