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

  return (
    <section className={LoanScreenStyles.container}>
      {/* title */}
      <div className={LoanScreenStyles.titleContainer}>
        <h1>Your Loans</h1>
        <Button variant="primary" onClick={() => helper.onApplyNewClick()}>
          <p>Apply New</p>
        </Button>
      </div>

      {/* Loan Limit section removed as per MVP requirement */}

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
