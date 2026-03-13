import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LoanApplyStyles from './styles/LoanApplyScreen.module.css';
import LoanCard from '../components/LoanCard';
import { LoanCardHelper } from '../components/helpers/LoanCardHelper';
import { BillIcon, UserLoanIcon } from '../../../../shared/assets';

const LoanApply = () => {
  const navigate = useNavigate();
  const helper = useMemo(() => new LoanCardHelper(navigate), [navigate]);

  const loanCards = [
    {
      id: 1,
      title: 'Invoice Financing',
      icon: BillIcon,
      onClick: helper.onInvoiceFinancingClick,
    },
    {
      id: 2,
      title: 'Personal Loan',
      icon: UserLoanIcon,
      onClick: helper.onPersonalLoanClick,
    },
  ];

  return (
    <section className={LoanApplyStyles.container}>
      {/* title */}
      <div className={LoanApplyStyles.titlesection}>
        <h1 className={LoanApplyStyles.maintitle}>Apply Loan</h1>
        <p className={LoanApplyStyles.subtitle}>
          Choose the financing option that best suits your business needs
        </p>
      </div>

      {/* loan cards */}
      <div className={LoanApplyStyles.cardsContainer}>
        <div className={LoanApplyStyles.cardsContainer}>
          {loanCards.map((card) => (
            <LoanCard key={card.id} title={card.title} icon={card.icon} onClick={card.onClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanApply;
