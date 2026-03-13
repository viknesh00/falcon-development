import React, { useState } from 'react';
import Styles from './styles/AddAccount.module.css';
import { AddAccountCard } from '../../../shared/components';
import { useNavigate } from 'react-router-dom';

const AddAccount = ({ onClose }) => {
  const navigation = useNavigate();
  const handleAddAccount = () => {
    navigation('/dashboard/addbankaccount');
  };
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Add New Account</h1>
      <div
        className={Styles.closeIcon}
        style={{
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          maxWidth: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'red',
          fontWeight: 'bold',
        }}
        onClick={onClose}
      >
        X
      </div>
      {/* Add Account component */}
      <div className={Styles.accountSection}>
        <AddAccountCard
          discription={
            'Connect your UK bank account to receive financing disbursements and make repayments.'
          }
          onClick={handleAddAccount}
          text={'Add Your Bank Account'}
        />
      </div>
    </div>
  );
};

export default AddAccount;
