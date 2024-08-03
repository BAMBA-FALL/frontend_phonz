import React from 'react';
import AdminHeader from '../../component/admin/AdminHeader';
import SideMenu from '../../component/admin/SideMenu';
import { Outlet } from 'react-router-dom';
import './adminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-content">
        <SideMenu />
        <div className="admin-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
