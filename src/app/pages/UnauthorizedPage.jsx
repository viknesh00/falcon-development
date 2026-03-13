import React from 'react';
import { Button } from '../../shared/components';

/**
 * UnauthorizedPage - Shown when user doesn't have required role/permission
 */
const UnauthorizedPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ color: '#d32f2f', marginBottom: '16px' }}>403</h1>
        <h2 style={{ marginBottom: '16px' }}>Access Denied</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          You don't have permission to access this resource.
        </p>
        <Button varient="secondary" onClick={() => (window.location.href = '/')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
