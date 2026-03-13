/**
 * AdminLoans Page
 * Loan management interface for admins
 */
import React from 'react';
import { usePermission } from '../../../app/hooks/useAuth';

const AdminLoans = () => {
  const canManageLoans = usePermission('manage_loans');

  if (!canManageLoans) {
    return (
      <div>
        <h2>Loans Management</h2>
        <p>You don't have permission to manage loans.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Loans Management</h2>

      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Loan Management Interface</h3>
        <p>Add UI components here for:</p>
        <ul>
          <li>View all loan applications</li>
          <li>Review loan details</li>
          <li>Approve/reject loans</li>
          <li>Track loan status</li>
          <li>Generate loan reports</li>
          <li>Filter loans by status</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLoans;
