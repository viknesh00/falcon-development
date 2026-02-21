import React from 'react';
import { QardHasan, BusinessMicroFinance, CarFinance } from '../../assets';
import './styles/FinanceCards.css';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const FinanceCards = ({ data }) => {
  const navigate = useNavigate();

  // Map string types from JSON to imported images
  const imageMap = {
    QardHasan: QardHasan,
    BusinessMicroFinance: BusinessMicroFinance,
    CarFinance: CarFinance,
  };

  // Fallback if data is missing
  const eligibilityLimit = data?.eligibilityLimit || 0;
  const products = data?.products || [];

  return (
    <div className="finance-section">
      <div className="finance-inner-section">
        <div className="finance-header">
          <h3>Apply for Shariah-Compliant Finance</h3>
          <div className="finance-limit">
            <span>Eligible up to:</span>
            <span className="limit-amount">{eligibilityLimit}</span>
          </div>
        </div>

        <div className="finance-grid">
          {products.map((product) => (
            <div key={product.id} className="finance-card">
              <div
                className="finance-card-bg"
                style={{ backgroundImage: `url(${imageMap[product.type] || product.image})` }}
              >
                <div className="overlay"></div>
                <div className="card-content">
                  <h3>{product.title}</h3>
                  <p>{product.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => navigate('/loan/loan-application')} className="start-application-btn">
        Start Application
      </Button>
    </div>
  );
};

export default FinanceCards;
