import React from 'react';
import { QardHasan, BusinessMicroFinance, CarFinance } from '../../assets';
import './styles/FinanceCards.css';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const FinanceCards = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      title: 'Qard Hasan',
      subtitle: 'No Interest',
      image: QardHasan,
      bgClass: 'green-gradient',
    },
    {
      id: 2,
      title: 'Business Micro Finance',
      subtitle: 'No Interest',
      image: BusinessMicroFinance,
      bgClass: 'blue-gradient',
    },
    {
      id: 3,
      title: 'Car Finance (Ijarah)',
      subtitle: 'No Interest',
      image: CarFinance,
      bgClass: 'red-gradient',
    },
  ];

  return (
    <div className="finance-section">
      <div className="finance-inner-section">
        <div className="finance-header">
          <h3>Apply for Shariah-Compliant Finance</h3>
          <div className="finance-limit">
            <span>Eligible up to:</span>
            <span className="limit-amount">£50,000</span>
          </div>
        </div>

        <div className="finance-grid">
          {products.map((product) => (
            <div key={product.id} className="finance-card">
              <div className="finance-card-bg" style={{ backgroundImage: `url(${product.image})` }}>
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
