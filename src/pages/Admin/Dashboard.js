import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Input, Spin, Alert } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { productService } from '../../_services/product.service';
import { userService } from '../../_services/user.service';
import './dashboard.css';

const { Search } = Input;

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const count = await productService.getProductCount();
        setProductCount(count);
        setLoadingProducts(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de produits:", error);
        setError('Erreur lors de la récupération du nombre de produits');
        setLoadingProducts(false);
      }
    };

    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const count = await userService.getUserCount();
        setUserCount(count);
        setLoadingUsers(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'utilisateurs:", error);
        setError('Erreur lors de la récupération du nombre d\'utilisateurs');
        setLoadingUsers(false);
      }
    };

    fetchUserCount();
  }, []);

  const data = [
    {
      name: 'Produits',
      count: productCount,
    },
    {
      name: 'Utilisateurs',
      count: userCount,
    },
  ];

  const isLoading = loadingProducts || loadingUsers;

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {error && <Alert message={error} type="error" showIcon />}
          <div className="dashboard-header">
            <h2>Dashboard</h2>
            <Search
              placeholder="Recherche"
              enterButton
              className="dashboard-search-input"
            />
          </div>
          <Row gutter={16} className="dashboard-cards-container">
            <Col span={12}>
              <Link to="/admin/product" className="dashboard-card">
                <Card title="Nombre total de produits" bordered={false}>
                  <h3>{productCount}</h3>
                </Card>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="/admin/user" className="dashboard-card">
                <Card title="Nombre total d'utilisateurs" bordered={false}>
                  <h3>{userCount}</h3>
                </Card>
              </Link>
            </Col>
          </Row>
          <div className="dashboard-charts-container">
            <h3>Statistiques</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
