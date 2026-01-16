import React from 'react';
import { FiSearch, FiBell, FiUser, FiPower, FiHelpCircle } from 'react-icons/fi';

const DashboardHeader = () => {
  return (
    <header className="dash-header">
      <div className="header-left">
        <div className="dash-logo">
          <img src="/assets/images/falcon-logo.jpg" alt="Falcon" />
          <span>Falcon Finance</span>
        </div>
        <nav className="dash-main-nav">
          <a href="#" className="active">
            Home
          </a>
          <a href="#">Accounts</a>
          <a href="#">Send Money</a>
          <a href="#">Cards</a>
          <a href="#">Loans</a>
        </nav>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search account, transactions..." />
        </div>

        <div className="header-actions">
          <button className="icon-btn" title="Help">
            <FiHelpCircle />
          </button>
          <button className="icon-btn" title="Notifications">
            <FiBell />
            <span className="badge">3</span>
          </button>
          <button className="icon-btn" title="Logout">
            <FiPower />
          </button>
          <div className="profile-pill">
            <div className="avatar">DT</div>
            <span>Dineshkumar</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dash-header {
          background: var(--primary);
          color: var(--white);
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          box-shadow: var(--shadow-md);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 48px;
        }
        .dash-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dash-logo img {
          width: 32px;
          height: 32px;
          border-radius: 4px;
        }
        .dash-logo span {
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.5px;
        }
        .dash-main-nav {
          display: flex;
          gap: 24px;
        }
        .dash-main-nav a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          padding: 8px 0;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .dash-main-nav a.active,
        .dash-main-nav a:hover {
          color: var(--white);
          border-bottom-color: var(--accent);
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .search-bar {
          position: relative;
          width: 300px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }
        .search-bar input {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--border-radius-md);
          padding: 10px 12px 10px 36px;
          color: var(--white);
          font-size: 14px;
        }
        .search-bar input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .icon-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 20px;
          cursor: pointer;
          position: relative;
          padding: 8px;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--white);
        }
        .badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: var(--danger);
          color: var(--white);
          font-size: 10px;
          padding: 2px 5px;
          border-radius: 10px;
        }
        .profile-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 16px 4px 4px;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .profile-pill:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .avatar {
          width: 32px;
          height: 32px;
          background: var(--accent);
          color: var(--dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
        }
        .profile-pill span {
          font-weight: 600;
          font-size: 14px;
        }
      `}</style>
    </header>
  );
};

export default DashboardHeader;
