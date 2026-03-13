import React, { useRef } from 'react';
import styles from './Styles/UploadDocument.module.css';
import { UploadIcon } from '../../../shared/assets';

const UploadDocument = ({ name, onFileChange }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(name, file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileChange(name, file);
    }
  };

  return (
    <div
      className={styles.uploadBox}
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <img src={UploadIcon} alt="upload" className={styles.icon} />

      <p className={styles.text}>Click to upload or drag and drop</p>

      <p className={styles.subText}>PDF, PNG, JPG (max. 10MB)</p>

      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default UploadDocument;
