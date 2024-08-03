import React from 'react';
import AdminHeader from '../../component/admin/AdminHeader';
import SideMenu from '../../component/admin/SideMenu';
<<<<<<< HEAD
import { Outlet } from 'react-router-dom';
import './adminLayout.css'
=======
import './adminLayout.css'; 
>>>>>>> dee5755be48440393c77323597d4561bcec40f91

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
