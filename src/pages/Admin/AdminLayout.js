import React from 'react';
import { Layout } from 'antd';
import AdminHeader from '../../component/admin/AdminHeader';
import SideMenu from '../../component/admin/SideMenu';
import { Outlet } from 'react-router-dom';
import './adminLayout.css';

const { Sider, Header, Content, Footer } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className="admin-sider">
        <SideMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className="admin-header">
          <AdminHeader />
        </Header>
        <Content className="admin-content">
          <Outlet />
        </Content>
        <Footer className="admin-footer">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
