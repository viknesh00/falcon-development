import React, { useState } from 'react';
import './styles/LoanActiveCardStyle.css';
import Switch from '../common/Switch';
import Button from '../common/Button';

const LoanActiveCard = ({ data }) => {
  const [autoDebit, setAutoDebit] = useState(data.autoDebitEnabled);

  const handleAutoDebitChange = (e) => {
    setAutoDebit(e.target.checked);
  };

  return (
    <div className="active-loan-card">
      <h3 className="card-title">{data.title}</h3>

      <div className="finance-details">
        <div className="finance-item">
          <span className="label">Finance Amount:</span>
          <span className="value">{data.financeAmount}</span>
        </div>
        <div className="finance-item">
          <span className="label">Total Payable:</span>
          <span className="value">{data.totalPayable}</span>
        </div>
      </div>

      <div className="repayment-progress">
        <div className="progress-label">
          <span>Repayment Progress:</span>
          <span className="scant-text">
            {data.repaymentProgress.completedDues} of {data.repaymentProgress.totalDues} dues
            completed
          </span>
        </div>
        <div className="stepper-container">
          {[...Array(data.repaymentProgress.totalDues)].map((_, index) => (
            <div
              key={index}
              className={`step-segment ${index < data.repaymentProgress.completedDues ? 'completed' : ''}`}
            ></div>
          ))}
        </div>
        <div className="progress-percentage">
          {Math.round(
            (data.repaymentProgress.completedDues / data.repaymentProgress.totalDues) * 100
          )}
          % Completed
        </div>
      </div>

      <div className="next-installment">
        <div className="installment-header">Next Instalment:</div>
        <div className="installment-amount">
          {data.nextInstallment.amount}{' '}
          <span className="due-date">
            Due on {data.nextInstallment.dueDate} ({data.nextInstallment.remaining} Remaining)
          </span>
        </div>
      </div>

      <div className="action-buttons">
        <Button className="btn-primary">Make Payment</Button>
        <Button variant="secondary">View Repayment Plan</Button>
      </div>

      <div className="auto-debit-status">
        <span>Auto Debit Status: {autoDebit ? 'Enabled' : 'Disabled'}</span>
        <Switch checked={autoDebit} onChange={handleAutoDebitChange} id="auto-debit-switch" />
      </div>
    </div>
  );
};

export default LoanActiveCard;
