import { AccountIcon, NotificationIcon, SearchGrayIcon } from '../../../assets';
import '../styles/dashboardheaderStyles.css';

const DashboardHeader = (params) => {
  return (
    <header className="dash-header">
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <img src={SearchGrayIcon} className="search-icon" />
          <input type="text" className="search-input" placeholder="Search" />
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
