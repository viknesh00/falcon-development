import React from 'react';
import './styles/TransactionTable.css';
import { LoanScreenHelper } from '../../Pages/Loans/helper/LoanScreenHelper';

const TransactionTable = ({ data = [] }) => {
  return (
    <div className="transaction-section">
      <div className="section-header">
        <h3>Recent Transactions</h3>
        <h4>Last updated: 14 February 2026, 10:15 AM</h4>
      </div>

      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Details of Transaction</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tx) => (
              <tr key={tx.id}>
                <td className="details-col">{tx.details}</td>
                <td>{LoanScreenHelper.formatDate(tx.date)}</td>
                <td className={`type-col ${tx.type.toLowerCase()}`}>{tx.type}</td>
                <td className="amount-col">{tx.amount}</td>
                <td className="status-col">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
