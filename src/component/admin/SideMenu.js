import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UserOutlined,
  PercentageOutlined,
  BarChartOutlined,
  SettingOutlined,
  StockOutlined,
  GiftOutlined,
  FileTextOutlined,
  MessageOutlined,
  DollarOutlined,
  ToolOutlined,
  SolutionOutlined,
  TeamOutlined,
  HomeOutlined,
  SubnodeOutlined,
  LineChartOutlined,
  GlobalOutlined,
  TransactionOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const SideMenu = () => {
  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {/* Dashboard */}
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>

        {/* Gestion des Utilisateurs */}
        <Menu.SubMenu key="user-management" icon={<UserOutlined />} title="Gestion des Utilisateurs">
          <Menu.Item key="user-list">
            <Link to="/admin/user">Liste des Utilisateurs</Link>
          </Menu.Item>
          <Menu.Item key="add-user-role">
            <Link to="/admin/user/adduserrole">Ajouter un Rôle</Link>
          </Menu.Item>
          <Menu.Item key="user-permissions">
            <Link to="/admin/user/permission">Permissions</Link>
          </Menu.Item>
          <Menu.Item key="admin-form">
            <Link to="/admin/user/adminform">Formulaire Admin</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Produits */}
        <Menu.SubMenu key="products" icon={<ShoppingOutlined />} title="Gestion des Produits">
          <Menu.Item key="products-list">
            <Link to="/admin/product">Liste des Produits</Link>
          </Menu.Item>
          <Menu.Item key="add-product">
            <Link to="/admin/product/add">Ajouter un Produit</Link>
          </Menu.Item>
          <Menu.Item key="product-accessories">
            <Link to="/admin/product/addaccessoryform">Ajouter un Accessoire</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Carousels */}
        <Menu.SubMenu key="carousels" icon={<TagsOutlined />} title="Gestion des Carousels">
          <Menu.Item key="carousels-list">
            <Link to="/admin/carousel">Liste des Carousels</Link>
          </Menu.Item>
          <Menu.Item key="add-carousel">
            <Link to="/admin/carousel/carousels/add">Ajouter un Carousel</Link>
          </Menu.Item>
          <Menu.Item key="edit-carousel">
            <Link to="/admin/carousel/carousels/edit">Modifier un Carousel</Link>
          </Menu.Item>
          <Menu.Item key="delete-carousel">
            <Link to="/admin/carousel/carousels/delete">Supprimer un Carousel</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Catégories */}
        <Menu.SubMenu key="category-management" icon={<TagsOutlined />} title="Gestion des Catégories">
          <Menu.Item key="categories-list">
            <Link to="/admin/category">Liste des Catégories</Link>
          </Menu.Item>
          <Menu.Item key="add-category">
            <Link to="/admin/category/category/add">Ajouter une Catégorie</Link>
          </Menu.Item>
          <Menu.Item key="edit-category">
            <Link to="/admin/category/category/edit">Modifier une Catégorie</Link>
          </Menu.Item>
          <Menu.Item key="delete-category">
            <Link to="/admin/category/category/delete">Supprimer une Catégorie</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Commandes */}
        <Menu.SubMenu key="orders" icon={<ShoppingCartOutlined />} title="Gestion des Commandes">
          <Menu.Item key="orders-pending">
            <Link to="/admin/orders/pending">Commandes en Attente</Link>
          </Menu.Item>
          <Menu.Item key="orders-history">
            <Link to="/admin/orders/history">Historique des Commandes</Link>
          </Menu.Item>
          <Menu.Item key="returns">
            <Link to="/admin/orders/returns">Gestion des Retours</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Clients */}
        <Menu.SubMenu key="customers" icon={<UserOutlined />} title="Gestion des Clients">
          <Menu.Item key="customers-list">
            <Link to="/admin/customers/list">Liste des Clients</Link>
          </Menu.Item>
          <Menu.Item key="customer-segments">
            <Link to="/admin/customers/segments">Segmentation des Clients</Link>
          </Menu.Item>
          <Menu.Item key="reviews">
            <Link to="/admin/customers/reviews">Commentaires et Avis</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Promotions et Marketing */}
        <Menu.SubMenu key="marketing" icon={<PercentageOutlined />} title="Promotions & Marketing">
          <Menu.Item key="coupons">
            <Link to="/admin/marketing/coupons">Coupons et Remises</Link>
          </Menu.Item>
          <Menu.Item key="banners">
            <Link to="/admin/marketing/banners">Bannières Publicitaires</Link>
          </Menu.Item>
          <Menu.Item key="email-marketing">
            <Link to="/admin/marketing/email-marketing">Email Marketing</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Stocks */}
        <Menu.SubMenu key="stock-management" icon={<StockOutlined />} title="Gestion des Stocks">
          <Menu.Item key="stock-list">
            <Link to="/admin/stock/list">Suivi des Stocks</Link>
          </Menu.Item>
          <Menu.Item key="replenishment">
            <Link to="/admin/stock/replenishment">Réapprovisionnement</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Fournisseurs */}
        <Menu.SubMenu key="suppliers" icon={<SolutionOutlined />} title="Gestion des Fournisseurs">
          <Menu.Item key="suppliers-list">
            <Link to="/admin/suppliers/list">Liste des Fournisseurs</Link>
          </Menu.Item>
          <Menu.Item key="supplier-orders">
            <Link to="/admin/suppliers/orders">Commandes Fournisseurs</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Réclamations */}
        <Menu.SubMenu key="complaints" icon={<MessageOutlined />} title="Gestion des Réclamations">
          <Menu.Item key="tickets-support">
            <Link to="/admin/support/tickets">Tickets Support</Link>
          </Menu.Item>
          <Menu.Item key="complaints-history">
            <Link to="/admin/support/history">Historique des Réclamations</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Pages CMS */}
        <Menu.SubMenu key="cms" icon={<FileTextOutlined />} title="Gestion des Pages CMS">
          <Menu.Item key="pages">
            <Link to="/admin/cms/page">Pages du Site</Link>
          </Menu.Item>
          <Menu.Item key="blog">
            <Link to="/admin/cms/blog">Blog</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Paramètres */}
        <Menu.SubMenu key="settings" icon={<SettingOutlined />} title="Paramètres">
          <Menu.Item key="general-settings">
            <Link to="/admin/settings/general">Paramètres Généraux</Link>
          </Menu.Item>
          <Menu.Item key="users-permissions">
            <Link to="/admin/settings/users">Utilisateurs et Permissions</Link>
          </Menu.Item>
          <Menu.Item key="integrations">
            <Link to="/admin/settings/integrations">Intégrations</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Livraisons */}
        <Menu.SubMenu key="deliveries" icon={<ToolOutlined />} title="Gestion des Livraisons">
          <Menu.Item key="delivery-methods">
            <Link to="/admin/delivery/methods">Modes de Livraison</Link>
          </Menu.Item>
          <Menu.Item key="delivery-tracking">
            <Link to="/admin/delivery/tracking">Suivi des Livraisons</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Logs & Historique */}
        <Menu.SubMenu key="logs-history" icon={<BarChartOutlined />} title="Logs & Historique">
          <Menu.Item key="admin-logs">
            <Link to="/admin/logs">Logs d'Administration</Link>
          </Menu.Item>
          <Menu.Item key="order-history">
            <Link to="/admin/orders/history">Historique des Commandes</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Gestion des Paiements */}
        <Menu.SubMenu key="payments" icon={<DollarOutlined />} title="Gestion des Paiements">
          <Menu.Item key="transactions">
            <Link to="/admin/payments/transactions">Transactions</Link>
          </Menu.Item>
          <Menu.Item key="payment-settings">
            <Link to="/admin/payments/settings">Paramètres de Paiement</Link>
          </Menu.Item>
        </Menu.SubMenu>

        {/* Personnalisation de l'Interface */}
        <Menu.SubMenu key="customization" icon={<ToolOutlined />} title="Personnalisation de l'Interface">
          <Menu.Item key="themes">
            <Link to="/admin/customization/themes">Thèmes</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
