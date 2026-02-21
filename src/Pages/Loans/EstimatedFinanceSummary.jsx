import { CloseIcon } from '../../assets';
import { Button } from '../../components';
import styles from './styles/EstimatedFinanceSummary.module.css';
import { LoanScreenHelper } from './helper/LoanScreenHelper';

const EstimatedFinanceSummary = ({ onClose, data }) => {
  // Fallback data
  const {
    bankPurchasePrice = 0,
    totalSalePrice = 0,
    estimatedMonthlyInstalment = 0,
    totalInstalments = 0,
  } = data || {};

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
          <div className={styles.value}>{LoanScreenHelper.formatCurrency(bankPurchasePrice)}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Total Sale Price (Payable)</div>
          <div className={styles.value}>{LoanScreenHelper.formatCurrency(totalSalePrice)}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Estimated Monthly Instalment</div>
          <div className={styles.value}>
            {LoanScreenHelper.formatCurrency(estimatedMonthlyInstalment)}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Total Instalments</div>
          <div className={styles.value}>{totalInstalments}</div>
        </div>

        <Button style={{ width: '100%' }} onClick={onClose}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default EstimatedFinanceSummary;
