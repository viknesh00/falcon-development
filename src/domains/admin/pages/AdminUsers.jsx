/**
 * AdminUsers Page
 * User management interface for admins
 */
import React from 'react';
import { usePermission } from '../../../app/hooks/useAuth';

const AdminUsers = () => {
  const canManageUsers = usePermission('manage_users');

  if (!canManageUsers) {
    return (
      <div>
        <h2>Users Management</h2>
        <p>You don't have permission to manage users.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users Management</h2>

      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>User Management Interface</h3>
        <p>Add UI components here for:</p>
        <ul>
          <li>List all users</li>
          <li>View user details</li>
          <li>Edit user information</li>
          <li>Manage user roles and permissions</li>
          <li>Deactivate/activate users</li>
          <li>Search and filter users</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminUsers;
