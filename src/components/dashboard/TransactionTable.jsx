import React from 'react';
import './styles/TransactionTable.css';

const TransactionTable = () => {
  const transactions = [
    {
      id: 1,
      details: 'Rent Payment - GreenView Properties Ltd',
      date: '05 Feb 2026',
      type: 'Debit',
      amount: '£1,200.00',
      status: 'Completed',
    },
    {
      id: 2,
      details: 'Home Purchase Plan Instalment (Murabaha)',
      date: '05 Feb 2026',
      type: 'Debit',
      amount: '£1,572.50',
      status: 'Auto Debit Successful',
    },
    {
      id: 3,
      details: 'Zakat Contribution - Community Relief Fund',
      date: '05 Feb 2026',
      type: 'Credit',
      amount: '£1,200.00',
      status: 'Completed',
    },
    {
      id: 4,
      details: 'Home Purchase Plan Instalment (Murabaha)',
      date: '05 Feb 2026',
      type: 'Debit',
      amount: '£1,572.50',
      status: 'Auto Debit Successful',
    },
  ];

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
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="details-col">{tx.details}</td>
                <td>{tx.date}</td>
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
