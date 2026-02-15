import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import DashboardHeader from '../../Pages/dashboard/helper/DashboardHeader';
import './styles/DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div>
      <section className="dashboard-layout-container">
        <Sidebar />
        <main className="main-content">
          <DashboardHeader />
          <div className="content-scrollable">
            <Outlet />
          </div>
        </main>
        <RightSidebar />
      </section>
    </div>
  );
};

export default DashboardLayout;
