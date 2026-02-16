import React from 'react';
import styles from './styles/LoanApplicationProgress.module.css';
import Button from '../common/Button';

const LoanApplicationProgress = ({ data, onTrackClick }) => {
  const {
    title = '',
    amount = 0,
    submittedOn = new Date(),
    decisionTime = { min: 0, max: 0, unit: 'Days' },
    steps = [],
  } = data || {};

  const formattedAmount =
    typeof amount === 'number'
      ? `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
      : amount;

  const formattedDate = new Date(submittedOn).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedDecisionTime =
    typeof decisionTime === 'object' && decisionTime.min && decisionTime.max
      ? `${decisionTime.min}-${decisionTime.max} ${decisionTime.unit || 'Days'}`
      : typeof decisionTime === 'string'
        ? decisionTime
        : `${decisionTime} Days`;

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>Amount</span>
          <span className={styles.infoValue}>{formattedAmount}</span>
        </div>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>Submitted On</span>
          <span className={styles.infoValue}>{formattedDate}</span>
        </div>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>Decision Time</span>
          <span className={styles.infoValue}>{formattedDecisionTime}</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <h3 className={styles.progressTitle}>Application Progress</h3>

        <div className={styles.progressBarContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.progressStep}>
              <div
                className={`${styles.stepBar} ${
                  step.status === 'completed'
                    ? styles.completed
                    : step.status === 'active'
                      ? styles.active
                      : steps.status === 'pending'
                        ? styles.pending
                        : ''
                }`}
              />
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        style={{ width: '100%' }}
        onClick={() => onTrackClick && onTrackClick()}
      >
        Track Application
      </Button>
    </div>
  );
};

export default LoanApplicationProgress;
