import React from 'react';
import styles from './styles/ActiveFinanceCard.module.css';
import { LoanStatusHelper } from './helpers/helper';
import Button from '../common/Button';

const ActiveFinanceCard = ({ title = 'N/A', onClick, amount = null, dues = [] }) => {
  const formattedAmount = amount
    ? `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {formattedAmount && <h2 className={styles.mainAmount}>{formattedAmount}</h2>}
      </div>

      <div className={styles.detailsContainer}>
        {dues.map((due, index) => (
          <div key={index} className={styles.detailItem}>
            <p className={styles.label}>{due.dueLabel}</p>
            {due.dueAmount && (
              <p className={styles.value}>
                {`£${due.dueAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`}
              </p>
            )}
            {due.date && <p className={styles.value}>{due.date}</p>}
          </div>
        ))}
      </div>

      <Button variant="primary" onClick={onClick} className={styles.actionButton}>
        View Details
      </Button>
    </div>
  );
};

export default ActiveFinanceCard;
