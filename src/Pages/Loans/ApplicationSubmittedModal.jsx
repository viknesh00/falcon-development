import { CloseIcon } from '../../assets';
import { Button } from '../../components';
import styles from './styles/ApplicationSubmittedModal.module.css';
import { LoanScreenHelper } from './helper/LoanScreenHelper';

const ApplicationSubmittedModal = ({ onClose, data }) => {
  const {
    applicationId = '',
    submissionDate = '',
    requestedAmount = 0,
    estimatedMonthlyInstalment = 0,
    totalPayable = 0,
    declarationStatus = '',
    status = '',
    estimatedDecisionTime = '',
  } = data || {};

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>
            Your Application <br />
            Submitted Successfully
          </span>
          <button className={styles.closeBtn} onClick={onClose}>
            <div className={styles.iconWrapper}>
              <img src={CloseIcon} alt="" className={styles.icon} />
            </div>
          </button>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.label}>Application ID</div>
          <div className={styles.value}>{applicationId}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Submission Date</div>
          <div className={styles.value}>{LoanScreenHelper.formatDate(submissionDate)}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Requested Amount</div>
          <div className={styles.value}>{LoanScreenHelper.formatCurrency(requestedAmount)}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Estimated Monthly Instalment</div>
          <div className={styles.value}>
            {LoanScreenHelper.formatCurrency(estimatedMonthlyInstalment)}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Total Payable</div>
          <div className={styles.value}>{LoanScreenHelper.formatCurrency(totalPayable)}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Declaration & Shariah Agreement</div>
          <div className={`${styles.value} ${styles.success}`}>{declarationStatus}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.statusLabel}>Status</div>
          <div className={styles.statusValue}>{status}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.timeLabel}>Estimated Decision Time</div>
          <div className={styles.timeValue}>{estimatedDecisionTime}</div>
        </div>

        <Button style={{ width: '100%' }} onClick={onClose}>
          Track Application Status
        </Button>
      </div>
    </div>
  );
};

export default ApplicationSubmittedModal;
