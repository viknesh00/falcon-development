import React from 'react';
import styles from './styles/LoansStatusCard.module.css';

const LoansStatusCard = ({ title, value, description, variant = 'default', onClick }) => {
  return (
    <div onClick={onClick} className={`${styles.card} ${styles[variant]}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.valueContainer}>
        <h2 className={styles.value}>{value}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
};

export default LoansStatusCard;
