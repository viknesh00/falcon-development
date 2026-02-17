import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActiveFinanceCard, Button, LoanApplicationProgress } from '../../components';
import LoanScreenStyles from './styles/LoanScreen.module.css';
import LoansStatusCard from '../../components/Loans/LoansStatusCard';
import { LoanScreenHelper } from './helper/LoanScreenHelper';

// JSON Data for the cards
const loansStatusData = [
  {
    id: 1,
    title: 'Outstanding Balance',
    value: '£78,430.55',
    description: '',
    variant: 'outstanding',
  },
  {
    id: 2,
    title: 'Active Loans',
    value: '2',
    description: '1 Home, 1 Car',
    variant: 'active',
  },
  {
    id: 3,
    title: 'Applied Loans',
    value: '2',
    description: '1 Under Review/ 1 Not Submitted',
    variant: 'applied',
  },
  {
    id: 4,
    title: 'Closed Loans',
    value: '3',
    description: 'No delayed payments',
    variant: 'closed',
  },
];

const ActiveFinanceCardData = [
  {
    title: 'Home Purchase Plan',
    amount: 7043055,
    dues: [
      {
        dueLabel: 'Remaining',
        dueAmount: 500,
      },
      {
        dueLabel: 'Monthly',
        dueAmount: 500,
      },
      {
        dueLabel: 'Next Due',
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      },
    ],
  },
  {
    title: 'Car Loan',
    amount: 7043055,
    dues: [
      {
        dueLabel: 'Remaining',
        dueAmount: 500,
      },
      {
        dueLabel: 'Monthly',
        dueAmount: 500,
      },
      {
        dueLabel: 'Next Due',
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      },
    ],
  },
];

const ActiveFinanceApplicationData = [
  {
    id: 1,
    title: 'Home Purchase Plan (Murabaha)',
    amount: 85000,
    submittedOn: '2026-02-10',
    decisionTime: { min: 5, max: 7, unit: 'Days' },
    steps: [
      { label: 'Application Submitted', status: 'completed' },
      { label: 'Documents Verified', status: 'completed' },
      { label: 'Shariah Review', status: 'active' },
      { label: 'Final Approval', status: 'pending' },
    ],
  },
  {
    id: 2,
    title: 'Home Purchase Plan (Murabaha)',
    amount: 85000,
    submittedOn: '2026-02-10',
    decisionTime: { min: 5, max: 7, unit: 'Days' },
    steps: [
      { label: 'Application Submitted', status: 'completed' },
      { label: 'Documents Verified', status: 'completed' },
      { label: 'Shariah Review', status: 'completed' },
      { label: 'Final Approval', status: 'pending' },
    ],
  },
];

const LoanScreen = () => {
  const navigate = useNavigate();
  const helper = useMemo(() => new LoanScreenHelper(navigate), [navigate]);

  return (
    <section className={LoanScreenStyles.container}>
      {/* title */}
      <div className={LoanScreenStyles.titleContainer}>
        <h1>Your Loans</h1>
        <Button variant="primary" onClick={() => helper.onApplyNewClick()}>
          <p>Apply New</p>
        </Button>
      </div>

      {/* status cards */}
      <div className={LoanScreenStyles.cardsContainer}>
        {loansStatusData.map((card) => (
          <LoansStatusCard
            key={card.id}
            title={card.title}
            value={card.value}
            description={card.description}
            variant={card.variant}
            onClick={() => helper.onLoanStatusClick(card.id)}
          />
        ))}
      </div>

      {/* active finances */}
      <div className={LoanScreenStyles.activeFinancesContainer}>
        <p className={LoanScreenStyles.activeFinancesTitle}>
          Your Active Finances ({ActiveFinanceCardData.length || 0})
        </p>

        <div className={LoanScreenStyles.activeFinancesGrid}>
          {/* active finance cards */}
          {ActiveFinanceCardData.map((finance, index) => (
            <ActiveFinanceCard
              amount={finance.amount}
              key={index}
              title={finance.title}
              onClick={() => helper.onActiveFinanceClick(index)}
              dues={finance.dues}
            />
          ))}
        </div>
      </div>

      {/* finance application */}
      <div className={LoanScreenStyles.financeApplicationContainer}>
        <p className={LoanScreenStyles.financeApplicationTitle}>
          Your Finance Applications ({ActiveFinanceApplicationData.length || 0})
        </p>

        {/* finance application progress */}
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            overflowY: 'auto',
            paddingBottom: '1rem',
          }}
        >
          {ActiveFinanceApplicationData.map((app) => (
            <LoanApplicationProgress
              key={app.id}
              data={app}
              onTrackClick={() => helper.onTrackApplicationClick(app.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanScreen;
