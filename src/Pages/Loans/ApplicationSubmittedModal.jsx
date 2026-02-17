import { CloseIcon } from '../../assets';
import { Button } from '../../components';
import styles from './styles/ApplicationSubmittedModal.module.css';

const ApplicationSubmittedModal = ({ onClose }) => {
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
          <div className={styles.value}>APP-UK-2026-01458</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Submission Date</div>
          <div className={styles.value}>15 February 2026</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Requested Amount</div>
          <div className={styles.value}>£85,000</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Estimated Monthly Instalment</div>
          <div className={styles.value}>£1,572.50</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Total Payable</div>
          <div className={styles.value}>£85,000</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>Declaration & Shariah Agreement</div>
          <div className={`${styles.value} ${styles.success}`}>Accepted</div>
        </div>

        <div className={styles.section}>
          <div className={styles.statusLabel}>Status</div>
          <div className={styles.statusValue}>Application Submitted</div>
        </div>

        <div className={styles.section}>
          <div className={styles.timeLabel}>Estimated Decision Time</div>
          <div className={styles.timeValue}>5–7 Working Days</div>
        </div>

        <Button>Track Application Status</Button>
      </div>
    </div>
  );
};

export default ApplicationSubmittedModal;
