import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ArrowRightIcon, CoinHand, CoinIcon, PlusCircule, StatementIcon } from '../../assets';
import './styles/AccountCard.css';

const AccountCard = ({ data }) => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  // Fallback if data is not provided yet
  const account = data || {
    type: 'Loading...',
    sortCode: '',
    accountNumber: '',
    balance: 0,
    currency: '',
  };

  const toggleAccountDetails = () => setShowAccountDetails(!showAccountDetails);
  const toggleBalance = () => setShowBalance(!showBalance);

  const getMaskedAccountNumber = (num) => {
    if (showAccountDetails) return num;
    const last4 = num.slice(-4);
    return `**** ${last4}`;
  };

  return (
    <div className="account-card">
      <div className="account-header">
        <div className="account-icon-wrapper">
          <span className="account-icon-placeholder">
            <img src={CoinHand} alt="Account" style={{ width: '20px' }} />
          </span>
          <span className="account-title">{account.type}</span>
        </div>
        <div className="account-arrow">
          <img src={ArrowRightIcon} alt="Account" style={{ width: '20px' }} />
        </div>
      </div>

      <div className="account-details">
        <div className="detail-item">
          <span className="label">Sort Code:</span>
          <span className="value">{account.sortCode}</span>
        </div>
        <div className="detail-item">
          <span className="label">Account No :</span>
          <span className="value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {getMaskedAccountNumber(account.accountNumber)}
            <button
              onClick={toggleAccountDetails}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                color: 'inherit',
              }}
            >
              {showAccountDetails ? <FiEye /> : <FiEyeOff />}
            </button>
          </span>
        </div>
      </div>

      <div className="balance-section">
        <span className="balance-label">Available Balance</span>
        <div className="balance-row">
          <h2 className="balance-amount">
            {showBalance
              ? `${account.currency} ${account.balance.toLocaleString()}`
              : `${account.currency} ***`}
          </h2>
          <button className="visibility-btn" onClick={toggleBalance}>
            {showBalance ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      <div className="account-actions">
        <button className="action-btn primary">
          <img src={PlusCircule} alt="Add Money" />
          Add Money
        </button>
        <button className="action-btn outline">
          <img src={CoinIcon} alt="Transfer Funds" />
          Transfer Funds
        </button>
        <button className="action-btn outline">
          <img src={StatementIcon} alt="View Statement" />
          View Statement
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
