import { CloseIcon } from '../../assets';
import { Button } from '../../components';
import styles from './styles/EstimatedFinanceSummary.module.css';

const EstimatedFinanceSummary = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>
            Estimated Finance <br />
            Summary
          </span>
          <button className={styles.closeBtn} onClick={onClose}>
            <div className={styles.iconWrapper}>
              <img src={CloseIcon} alt="" className={styles.icon} />
            </div>
          </button>
        </div>

        <div className={styles.divider} />

        <div className={styles.row}>
          <div className={styles.label}>Bank Purchase Price</div>
          <div className={styles.value}>£85,000</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Total Sale Price (Payable)</div>
          <div className={styles.value}>£85,000</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Estimated Monthly Instalment</div>
          <div className={styles.value}>£1,572.50</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Total Instalments</div>
          <div className={styles.value}>60</div>
        </div>

        <Button onClick={onClose}>OK</Button>
      </div>
    </div>
  );
};

export default EstimatedFinanceSummary;
