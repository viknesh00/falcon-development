import AccountCard from '../../components/dashboard/AccountCard';
import TransactionTable from '../../components/dashboard/TransactionTable';
import FinanceCards from '../../components/dashboard/FinanceCards';
import LoanActiveCard from '../../components/dashboard/LoanActiveCard';
import './styles/Dashboard.css';

const Dashboard = () => {
  const activeLoan = {
    title: 'Home Purchase Plan (Murabaha)',
    financeAmount: '£85,000',
    totalPayable: '£85,000',
    repaymentProgress: {
      completedDues: 3,
      totalDues: 7,
    },
    nextInstallment: {
      amount: '£1,572.50',
      dueDate: '05 March 2026',
      remaining: 4,
    },
    autoDebitEnabled: true,
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
          <AccountCard />
          <TransactionTable />
        </div>

        <div className="side-cards-column">
          <FinanceCards />
          <LoanActiveCard data={activeLoan} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
