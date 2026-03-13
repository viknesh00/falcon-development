import React from 'react';
import styles from './styles/LoanCard.module.css';
import { Button } from '../../../../shared/components';

const LoanCard = ({ title, icon, onClick }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.iconCircle}>
        <img src={icon} alt={title} className={styles.icon} />
      </div>

      <Button className={styles.button} onClick={onClick}>
        Apply Now
      </Button>
    </div>
  );
};

export default LoanCard;
