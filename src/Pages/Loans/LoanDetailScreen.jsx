import React, { useEffect, useState } from 'react';
import Style from './styles/LoanDetailsScreen.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRightIcon } from '../../assets';
import { Button, DonutChart } from '../../components';
import DynamicTable from '../../components/common/Table';
import LoanDetailsHelper from './helper/LoanDetailScreen.helper';
import Switch from '../../components/common/Switch';

const LoanDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const helper = new LoanDetailsHelper(navigate);
  const [loanData, setLoanData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // In a real app, these would be async calls
    const data = helper.getLoanDetails(id);
    const hist = helper.getRepaymentHistory(id);
    setLoanData(data);
    setHistory(hist);
  }, []);

  const formatCurrency = (amount) => {
    return `£${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const columns = [
    { header: 'Details of Transaction', key: 'transactionDetails' },
    { header: 'Installment Date', key: 'date' },
    { header: 'Transaction Id', key: 'transactionId' },
    {
      header: 'EMI Amount',
      key: 'emiAmount',
      render: (row) => formatCurrency(row.emiAmount),
    },
    {
      header: 'Total Repaid Amount',
      key: 'totalRepaid',
      render: (row) => formatCurrency(row.totalRepaid),
    },
    {
      header: 'Remaining Amount',
      key: 'remaining',
      render: (row) => formatCurrency(row.remaining),
    },
  ];

  if (!loanData) return <div>Loading...</div>;

  return (
    <section className={Style.container}>
      {/* Back Button */}
      <div className={Style.titleContainer}>
        <div className={Style.backButtonContinaer} onClick={() => navigate(-1)}>
          {/* Using text arrow if icon issues persist, but sticking to requested icon */}
          <img className={Style.backIcon} src={ArrowRightIcon} alt="back" />
          Back
        </div>

        <div className={Style.headerTitle}>
          <h2>{loanData.title}</h2>
          <h1 className={Style.loanAmount}>{formatCurrency(loanData.amount)}</h1>
        </div>
      </div>

      {/* Loan Summary */}
      <div className={Style.loanSummary}>
        <div className={Style.installmentBox}>
          <span className={Style.installmentLabel}>Installment Amount</span>
          <div className={Style.installmentValue}>{formatCurrency(loanData.installmentAmount)}</div>
        </div>

        <div className={Style.amountBreakdown}>
          <div className={Style.amountRow}>
            <div className={`${Style.legendDot} ${Style.greenDot}`}></div>
            <div className={Style.amountLabel}>Repaid Amount</div>
            <div className={`${Style.amountValue} ${Style.repaidValue}`}>
              {formatCurrency(loanData.repaidAmount)}
            </div>
          </div>
          <div className={Style.amountRow}>
            <div className={`${Style.legendDot} ${Style.redDot}`}></div>
            <div className={Style.amountLabel}>Remaining Balance</div>
            <div className={`${Style.amountValue} ${Style.remainingValue}`}>
              {formatCurrency(loanData.remainingBalance)}
            </div>
          </div>
        </div>

        <div className={Style.chartContainer}>
          <DonutChart
            percentage={loanData.completedPercentage}
            color="#e74c3c"
            trackColor="#1D9B5E"
            size={160}
            strokeWidth={15}
          />
        </div>
      </div>

      <div className={Style.dates}>
        Next Instalment : {loanData.nextInstallmentDate} ({loanData.remainingInstallments}Remaining)
        · Closing Date:{loanData.closingDate}
      </div>

      <hr style={{ margin: '2rem 0', border: '1px solid #D7D5D5' }} />

      {/* Details Grid */}
      <div className={Style.detailsGrid}>
        <div className={Style.detailItem}>
          <span className={Style.detailLabel}>Disbursement Date</span>
          <span className={Style.detailValue}>{loanData.disbursementDate}</span>
        </div>
        <div className={Style.detailItem}>
          <span className={Style.detailLabel}>Total Repayments</span>
          <span className={Style.detailValue}>{loanData.totalRepayments}</span>
        </div>
        <div className={Style.detailItem}>
          <span className={Style.detailLabel}>Loan Number</span>
          <span className={Style.detailValue}>{loanData.loanNumber}</span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.detailLabel}>Auto Debit Status:</span>
          <div className={Style.autoDebit}>
            <span className={Style.detailValue}>
              {loanData.autoDebitStatus ? 'Enabled' : 'Disabled'}
            </span>
            <label className={Style.toggleSwitch}>
              <input type="checkbox" checked={loanData.autoDebitStatus} readOnly />
              <Switch checked={true} />
            </label>
          </div>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.detailLabel}>Loan Description</span>
          <span className={Style.detailValue}>{loanData.description}</span>
        </div>

        <Button variant="secondary" className={Style.settleButton}>
          Request Early Settlement
        </Button>
      </div>

      <hr style={{ margin: '2rem 0', border: '1px solid #D7D5D5' }} />
      {/* Repayment History */}
      <div className={Style.historySection}>
        <DynamicTable title="Repayment History" columns={columns} data={history} />
      </div>
    </section>
  );
};

export default LoanDetailScreen;
