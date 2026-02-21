import AccountCard from '../../components/dashboard/AccountCard';
import TransactionTable from '../../components/dashboard/TransactionTable';
import FinanceCards from '../../components/dashboard/FinanceCards';
import LoanActiveCard from '../../components/dashboard/LoanActiveCard';
import { loanData } from '../../data/loanData';
import { LoanScreenHelper } from '../Loans/helper/LoanScreenHelper';
import './styles/Dashboard.css';

const Dashboard = () => {
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
