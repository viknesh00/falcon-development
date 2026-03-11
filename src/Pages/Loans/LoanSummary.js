import React from 'react';
import styles from './LoanSummary.module.css';

const LoanSummary = ({ values }) => {
  return (
    <div className={styles.summaryBox}>
      <h4>Loan Summary</h4>

      <div className={styles.row}>
        <span>Invoice Amount</span>
        <span>£{values.invoiceAmount || 12000}</span>
      </div>

      <div className={styles.row}>
        <span>Requested Loan</span>
        <span>£{values.requestedAmount || 0}</span>
      </div>

      <div className={styles.row}>
        <span>Markup</span>
        <span>£{values.markup || 0}</span>
      </div>

      <div className={styles.row}>
        <span>Service Fee</span>
        <span>£{values.serviceFee || 0}</span>
      </div>

      <div className={styles.total}>
        <span>Total Repayment</span>
        <span>£{values.totalRepayment || 0}</span>
      </div>
    </div>
  );
};

export default LoanSummary;
