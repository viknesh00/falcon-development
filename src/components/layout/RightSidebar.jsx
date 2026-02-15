import React from 'react';
import { Utilities, CouncilTax, HealthInsurance, Phone, Rent } from '../../assets'; // Adjust path
import './styles/RightSidebar.css';

const RightSidebar = () => {
  const quickLinks = [
    { name: 'Utilities', icon: Utilities },
    { name: 'Council tax', icon: CouncilTax },
    { name: 'Phone', icon: Phone },
    { name: 'Rent', icon: Rent },
    { name: 'Insurance', icon: HealthInsurance },
    { name: 'Halal Investments', icon: HealthInsurance }, // Reusing icon as placeholder if needed, or check assets for correct one
  ];

  return (
    <aside className="right-sidebar">
      <div className="right-sidebar-content">
        <h4 className="right-sidebar-heading">QUICK LINKS</h4>
        <div className="quick-links-grid">
          {quickLinks.map((link) => (
            <div key={link.name} className="quick-link-item">
              <div className="quick-link-icon-wrapper">
                <img src={link.icon} alt={link.name} />
              </div>
              <span className="quick-link-label">{link.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
