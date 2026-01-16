import React from 'react';
import DashboardHeader from './DashboardHeader';
import {
  FiCreditCard,
  FiArrowUpRight,
  FiLayers,
  FiShield,
  FiTrendingUp,
  FiUser,
  FiInfo,
  FiDollarSign,
} from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <DashboardHeader />

      <main className="dash-content">
        <div className="dash-hero-row">
          <div className="dash-hero">
            <h1>Welcome back, Dineshkumar Thiruppathi</h1>
            <p>Last logged in at 12/01/26, 08:50 AM</p>
          </div>
          <div className="hero-actions-dash">
            <button className="btn-primary-dash">
              <FiDollarSign /> Apply for a Loan
            </button>
            <button className="btn-outline-dash">
              <FiCreditCard /> Loan Payment
            </button>
          </div>
        </div>

        <div className="dash-grid">
          {/* Left: Accounts & Main Grid */}
          <div className="dash-main-pane">
            <div className="account-cards">
              <div className="card-item primary shadow-glow">
                <div className="card-top">
                  <FiLayers className="card-icon" />
                  <span>Savings Account</span>
                </div>
                <div className="card-balance">
                  <span className="currency">£</span>
                  <span className="amount">12,450.00</span>
                </div>
                <div className="card-bottom">
                  <span className="acc-number">Acc: ****8824</span>
                  <button className="btn-light-sm">View Details</button>
                </div>
              </div>

              <div className="card-item accent">
                <div className="card-top">
                  <FiCreditCard className="card-icon" />
                  <span>Credit Card</span>
                </div>
                <div className="card-balance">
                  <span className="currency">£</span>
                  <span className="amount">2,100.00</span>
                </div>
                <div className="card-bottom">
                  <span className="acc-number">Limit: £5,000</span>
                  <button className="btn-light-sm">Pay Bill</button>
                </div>
              </div>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <div className="icon-wrapper blue">
                  <FiTrendingUp />
                </div>
                <h3>Investment Portfolio</h3>
                <p>Track your Sharia-compliant wealth growth.</p>
                <button className="link-btn">
                  Explore <FiArrowUpRight />
                </button>
              </div>
              <div className="service-card">
                <div className="icon-wrapper green">
                  <FiShield />
                </div>
                <h3>Protection Plans</h3>
                <p>Secure your family's future with Takaful plans.</p>
                <button className="link-btn">
                  View Plans <FiArrowUpRight />
                </button>
              </div>
              <div className="service-card">
                <div className="icon-wrapper gold">
                  <FiLayers />
                </div>
                <h3>Fixed Deposits</h3>
                <p>Earn high ethical returns on your idle funds.</p>
                <button className="link-btn">
                  Open Now <FiArrowUpRight />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Quick Links or Sidebar */}
          <div className="dash-side-pane">
            <div className="side-card profile-info-card">
              <h3>
                <FiUser /> Account Details
              </h3>
              <div className="detail-row">
                <span className="label">Account Holder</span>
                <span className="value">Dineshkumar Thiruppathi</span>
              </div>
              <div className="detail-row">
                <span className="label">Account Type</span>
                <span className="value">Premium Ethical Savings</span>
              </div>
              <div className="detail-row">
                <span className="label">Wallet Status</span>
                <span className="value status-active">Active</span>
              </div>
              <div className="detail-row">
                <span className="label">IBAN</span>
                <span className="value">GB82 FALC 6016 1324 8824</span>
              </div>
              <button className="btn-text-sm">
                <FiInfo /> Manage Identity
              </button>
            </div>

            <div className="side-card">
              <h3>Quick Actions</h3>
              <div className="action-links">
                <a href="#">
                  <FiArrowUpRight /> Send Money
                </a>
                <a href="#">
                  <FiArrowUpRight /> Add Beneficiary
                </a>
                <a href="#">
                  <FiArrowUpRight /> Download Statement
                </a>
                <a href="#">
                  <FiArrowUpRight /> Reward Points
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .dashboard-layout {
          background: #f8fafc;
          min-height: 100vh;
          font-family: var(--font-main);
        }
        .dash-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
        }
        .dash-hero-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        }
        .hero-actions-dash {
          display: flex;
          gap: 12px;
        }
        .btn-primary-dash {
          background: var(--primary);
          color: var(--white);
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary-dash:hover {
          background: var(--primary-light);
          transform: translateY(-2px);
        }
        .btn-outline-dash {
          background: var(--white);
          color: var(--primary);
          border: 1.5px solid var(--primary);
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline-dash:hover {
          background: var(--primary);
          color: var(--white);
          transform: translateY(-2px);
        }
        .dash-hero h1 {
          font-size: 28px;
          color: var(--dark);
          margin-bottom: 8px;
        }
        .dash-hero p {
          color: var(--gray);
          font-size: 14px;
        }
        .dash-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 32px;
        }
        .account-cards {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
        }
        .card-item {
          flex: 1;
          padding: 32px;
          border-radius: var(--border-radius-lg);
          color: var(--white);
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          overflow: hidden;
        }
        .card-item.primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
        }
        .card-item.accent {
          background: linear-gradient(135deg, var(--dark) 0%, #1a2a26 100%);
        }
        .shadow-glow {
          box-shadow: 0 10px 30px rgba(15, 76, 58, 0.2);
        }
        .card-top {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          font-size: 14px;
          opacity: 0.9;
        }
        .card-icon {
          font-size: 20px;
        }
        .card-balance {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .currency {
          font-size: 24px;
          opacity: 0.8;
        }
        .amount {
          font-size: 42px;
          font-weight: 800;
        }
        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .acc-number {
          font-size: 13px;
          opacity: 0.7;
          letter-spacing: 1px;
        }
        .btn-light-sm {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: var(--white);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .service-card {
          background: var(--white);
          padding: 24px;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-sm);
        }
        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .icon-wrapper.blue {
          background: #eef2ff;
          color: #4f46e5;
        }
        .icon-wrapper.green {
          background: #ecfdf5;
          color: #10b981;
        }
        .icon-wrapper.gold {
          background: #fffbeb;
          color: #d97706;
        }

        .service-card h3 {
          font-size: 16px;
          margin-bottom: 8px;
          color: var(--dark);
        }
        .service-card p {
          font-size: 13px;
          color: var(--gray);
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .link-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .side-card {
          background: var(--white);
          padding: 24px;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-sm);
          margin-bottom: 24px;
        }
        .side-card h3 {
          font-size: 18px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--light-gray);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
        }
        .detail-row .label {
          font-size: 12px;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .detail-row .value {
          font-size: 14px;
          font-weight: 600;
          color: var(--dark);
        }
        .status-active {
          color: #10b981 !important;
        }
        .btn-text-sm {
          background: none;
          border: none;
          color: var(--primary);
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          margin-top: 8px;
          padding: 0;
        }
        .action-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .action-links a {
          color: var(--gray-dark);
          text-decoration: none;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .action-links a:hover {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
