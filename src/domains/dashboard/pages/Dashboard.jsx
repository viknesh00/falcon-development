import AccountCard from '../components/AccountCard';
import TransactionTable from '../components/TransactionTable';
import FinanceCards from '../components/FinanceCards';
import LoanActiveCard from '../components/LoanActiveCard';
import { loanData } from '../../../domains/loans/data/loanData';
import { LoanScreenHelper } from '../../loans/presentation/pages/helper/LoanScreenHelper';
import './styles/Dashboard.css';
import { useState } from 'react';
import AddAccount from './AddAccount';

/**
 * @typedef {Object} UserState
 * @property {boolean} accounts - Indicates whether the user has existing accounts or not.
 * **/

const Dashboard = () => {
  /** @type {UserState} */
  const [accounts, setAccounts] = useState(false);

  const helper = new LoanScreenHelper(null);
  const accountDetails = helper.getAccountDetails();
  const transactions = helper.getTransactions();
  const financeData = helper.getFinanceData();

  const rawActiveLoan = loanData.dashboardActiveLoan;
  const activeLoan = {
    ...rawActiveLoan,
    financeAmount: LoanScreenHelper.formatCurrency(rawActiveLoan.financeAmount),
    totalPayable: LoanScreenHelper.formatCurrency(rawActiveLoan.totalPayable),
    nextInstallment: {
      ...rawActiveLoan.nextInstallment,
      amount: LoanScreenHelper.formatCurrency(rawActiveLoan.nextInstallment.amount),
    },
  };

  // If user has no accounts, show AddAccount component
  if (!accounts) {
    return <AddAccount onClose={() => setAccounts(true)} />;
  }

  return (
    <div className="dashboard-content-wrapper">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome, DhineshKumar Thirupathi</h1>
        <p className="last-login">
          Last Login in {new Date().toLocaleDateString('en-GB')}, {new Date().toTimeString()}
        </p>
      </div>

      <h2 className="section-title">Your Account Details</h2>

      <div className="dashboard-grid-layout">
        <div className="main-cards-column">
          <AccountCard data={accountDetails} />
          <TransactionTable data={transactions} />
        </div>

        <div className="side-cards-column">
          <FinanceCards data={financeData} />
          <LoanActiveCard data={activeLoan} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
