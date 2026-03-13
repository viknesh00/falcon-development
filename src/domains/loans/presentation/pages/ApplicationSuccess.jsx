import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './styles/ApplicationSuccess.module.css';
import { Check } from '../../../../shared/assets';
import { Button } from '../../../../shared/components';

const ApplicationSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { applicationId, loanAmount, merchantName, approvalTime } = state || {};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={Check} alt="" className={styles.iconCircle} />

        <h2 className={styles.title}>Application Submitted Successfully!</h2>

        <p className={styles.subtitle}>
          Your invoice financing application has been received and is being processed.
        </p>

        <div className={styles.infoBox}>
          <div className={styles.infoItem}>
            <span>Application ID</span>
            <strong>{applicationId || '-'}</strong>
          </div>

          <div className={styles.infoItem}>
            <span>Loan Amount</span>
            <strong>{loanAmount || '-'}</strong>
          </div>

          <div className={styles.infoItem}>
            <span>Merchant Name</span>
            <strong>{merchantName || '-'}</strong>
          </div>

          <div className={styles.infoItem}>
            <span>Expected Approval Time</span>
            <strong>{approvalTime || '-'}</strong>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className={styles.nextSteps}>
          <h4>Next Steps :</h4>
          <ul>
            <li>Our team will review your application and verify the invoice details</li>
            <li>You will receive an email notification once the application is approved</li>
            <li>Funds will be disbursed to your registered bank account within 2 business days</li>
          </ul>
        </div>

        <Button className={styles.trackBtn} onClick={() => navigate('/loan/apply')}>
          Track Application
        </Button>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
