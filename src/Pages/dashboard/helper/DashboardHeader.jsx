import { useState } from 'react';
import { AccountIcon, NotificationIcon, SearchGrayIcon, SearchIcon } from '../../../assets';
import '../styles/dashboardheaderStyles.css';

const DashboardHeader = (params) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className="dash-header">
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <img
            src={isSearchActive ? SearchIcon : SearchGrayIcon}
            className="search-icon"
            alt="Search"
          />
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
          />
        </div>
      </div>

      <div className="header-actions">
        <div className="action-button">
          <button className="icon-btn" title="Notifications">
            <img src={NotificationIcon} alt="Notification" />
            <span className="badge">1</span>
            <span className="label">Notifications</span>
          </button>
        </div>

        <div className="profile-section">
          <div className="icon-btn" title="Profile">
            <img src={AccountIcon} alt="Profile" />
            <span className="label">Dhineshkumar</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
