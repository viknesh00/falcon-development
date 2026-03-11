import React, { useState } from 'react';
import Styles from './styles/AddAccount.module.css';
import { AddAccountCard } from '../../components';
import { useNavigate } from 'react-router-dom';

const AddAccount = () => {
  const navigation = useNavigate();
  const handleAddAccount = () => {
    navigation('/addbankaccount');
  };
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Add New Account</h1>

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
