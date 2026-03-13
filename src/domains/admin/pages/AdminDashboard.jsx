/**
 * AdminDashboard Page
 * Main dashboard for admin users
 */
import React from 'react';
import { useCurrentUser } from '../../../app/hooks/useAuth';

const AdminDashboard = () => {
  const { user, userRole } = useCurrentUser();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user?.name || 'Admin'}!</p>
      <p>Role: {userRole}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '30px',
        }}
      >
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          <h3>Users Management</h3>
          <p>Manage system users and permissions</p>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          <h3>Loans Management</h3>
          <p>Oversee all loan applications and approvals</p>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          <h3>Analytics</h3>
          <p>View system analytics and reports</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
