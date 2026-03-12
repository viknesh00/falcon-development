import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HomeActive,
  AccountsActive,
  AccountsInactive,
  TransactionActive,
  TransactionInactive,
  WalletActive,
  WalletInactive,
  LoansActive,
  LoansInactive,
  SettingsActive,
  SettingsInactive,
  SupportActive,
  SupportInactive,
  FalconLogo,
  HomeInactive,
} from '../../assets';
import './styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/loans') {
      return location.pathname.startsWith('/loan');
    } else if (path === '/dashboard') {
      return location.pathname.startsWith('/dashboard');
    } else if (path === '/account') {
      return location.pathname.startsWith('/account');
    } else if (path === '/transactions') {
      return location.pathname.startsWith('/transactions');
    } else if (path === '/wallet') {
      return location.pathname.startsWith('/wallet');
    } else if (path === '/settings') {
      return location.pathname.startsWith('/settings');
    } else if (path === '/support') {
      return location.pathname.startsWith('/support');
    }
    return location.pathname === path;
  };

  const mainMenuItems = [
    { name: 'Home', path: '/dashboard', iconActive: HomeActive, iconInactive: HomeInactive },
    {
      name: 'Accounts',
      path: '/account',
      iconActive: AccountsActive,
      iconInactive: AccountsInactive,
    },
    {
      name: 'Transactions',
      path: '/transactions',
      iconActive: TransactionActive,
      iconInactive: TransactionInactive,
    },
    { name: 'Wallet', path: '/wallet', iconActive: WalletActive, iconInactive: WalletInactive },
    { name: 'Loans', path: '/loans', iconActive: LoansActive, iconInactive: LoansInactive },
  ];

  const preferenceItems = [
    {
      name: 'Settings',
      path: '/settings',
      iconActive: SettingsActive,
      iconInactive: SettingsInactive,
    },
    { name: 'Support', path: '/support', iconActive: SupportActive, iconInactive: SupportInactive },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <img src={FalconLogo} alt="Falcon Logo" />
        <span>Falcon</span>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-heading">MAIN MENU</h4>
        <nav className="sidebar-nav">
          {mainMenuItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <div className={`nav-item-container ${isActive(item.path) ? 'active' : ''}`}>
                <img
                  src={isActive(item.path) ? item.iconActive : item.iconInactive}
                  alt={item.name}
                  className={`nav-icon`}
                />
              </div>

              <span className="nav-label">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <h4 className="sidebar-heading">PREFERENCES</h4>
        <nav className="sidebar-nav">
          {preferenceItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <div className={`nav-item-container ${isActive(item.path) ? 'active' : ''}`}>
                <img
                  src={isActive(item.path) ? item.iconActive : item.iconInactive}
                  alt={item.name}
                  className="nav-icon"
                />
              </div>
              <span className="nav-label">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
