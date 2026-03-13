import React from 'react';

import styles from './styles/LoanConfiguration.module.css';
import { Dropdown } from '../../../../shared/components';

const LoanConfiguration = ({ config, values, setFieldValue }) => {
  const fields = config.groups[0].fields;

  const amountField = fields.find((f) => f.type === 'slider');
  const tenureField = fields.find((f) => f.name === 'loanTenure');
  const markupField = fields.find((f) => f.name === 'markup');
  const serviceFeeField = fields.find((f) => f.name === 'serviceFee');

  const invoiceAmount = config.summary.invoiceAmount;
  const markupPercent = config.summary.markupPercent;
  const serviceFee = config.summary.serviceFee;

  const requestedAmount = values[amountField.name] || 10000;

  const markup = (requestedAmount * markupPercent) / 100;
  const totalRepayment = requestedAmount + markup + serviceFee;

  React.useEffect(() => {
    setFieldValue(markupField.name, markup);
    setFieldValue(serviceFeeField.name, serviceFee);
  }, [requestedAmount]);

  return (
    <div className={styles.loanWrapper}>
      {/* LEFT SIDE */}
      <div className={styles.loanLeft}>
        <label>{amountField.label}</label>

        <input
          type="range"
          min={amountField.min}
          max={amountField.max}
          step={amountField.step}
          value={requestedAmount}
          onChange={(e) => setFieldValue(amountField.name, Number(e.target.value))}
          className={styles.slider}
        />

        <div className={styles.sliderLabels}>
          <span>€{amountField.min}</span>
          <span>€{requestedAmount}</span>
          <span>€{amountField.max}</span>
        </div>

        {/* TENURE */}

        <div className={styles.tenureWrapper}>
          <label>{tenureField.label}</label>

          <Dropdown
            name={tenureField.name}
            options={tenureField.options}
            value={values[tenureField.name]}
            onChange={(val) => setFieldValue(tenureField.name, val)}
            placeholder={tenureField.placeholder}
          />
        </div>

        {/* FEES */}

        <div className={styles.feeRow}>
          <div>
            <label>{markupField.label}</label>
            <input value={`€${markup}`} readOnly />
          </div>

          <div>
            <label>{serviceFeeField.label}</label>
            <input value={`€${serviceFee}`} readOnly />
          </div>
        </div>

        {/* TOTAL */}

        <div className={styles.totalBox}>
          <span>Total Repayment Amount</span>
          <strong>€{totalRepayment}</strong>
        </div>
      </div>

      {/* RIGHT SUMMARY */}

      <div className={styles.loanSummary}>
        <h4>Loan Summary</h4>

        <div className={styles.summaryRow}>
          <span>Invoice Amount</span>
          <span>€{invoiceAmount}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Requested Loan</span>
          <span>€{requestedAmount}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Markup</span>
          <span>€{markup}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Service Fee</span>
          <span>€{serviceFee}</span>
        </div>

        <div className={styles.summaryTotal}>
          <span>Total Repayment Amount</span>
          <span>€{totalRepayment}</span>
        </div>
      </div>
    </div>
  );
};

export default LoanConfiguration;
