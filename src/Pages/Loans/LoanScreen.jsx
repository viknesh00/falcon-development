import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActiveFinanceCard, Button, LoanApplicationProgress } from '../../components';
import LoanScreenStyles from './styles/LoanScreen.module.css';
import LoansStatusCard from '../../components/Loans/LoansStatusCard';
import { LoanScreenHelper } from './helper/LoanScreenHelper';

const LoanScreen = () => {
  const navigate = useNavigate();
  const helper = useMemo(() => new LoanScreenHelper(navigate), [navigate]);

  const loansStatusData = helper.getLoanStatusData();
  const ActiveFinanceCardData = helper.getActiveFinanceData();
  const ActiveFinanceApplicationData = helper.getActiveApplicationData();
  const availableLoanAmount = helper.getAvailableLoanAmount();
  const userBalance = helper.getUserBalance();

  return (
    <section className={LoanScreenStyles.container}>
      {/* title */}
      <div className={LoanScreenStyles.titleContainer}>
        <h1>Your Loans</h1>
        <Button variant="primary" onClick={() => helper.onApplyNewClick()}>
          <p>Apply New</p>
        </Button>
      </div>

      {/* Available Loan Limit Section */}
      <div
        style={{
          backgroundColor: '#f4f6f8',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>Available Loan Limit</h3>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#27ae60' }}>
            {LoanScreenHelper.formatCurrency(availableLoanAmount)}
          </span>
        </div>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>
          Based on 80% of your total balance ({LoanScreenHelper.formatCurrency(userBalance)})
        </p>
        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#e0e0e0',
            borderRadius: '5px',
            marginTop: '0.5rem',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '80%',
              height: '100%',
              backgroundColor: '#27ae60',
              borderRadius: '5px',
            }}
          />
        </div>
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
