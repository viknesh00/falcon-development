/**
 * AdminLayout Component
 * Layout wrapper for admin pages
 * Can be customized as needed
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        {/* Admin Sidebar Content */}
        <div className="admin-menu">
          <h3>Admin Menu</h3>
          {/* Add admin menu items here */}
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          {/* Admin Header Content */}
          <h1>Admin Panel</h1>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
