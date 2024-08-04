import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../_services/product.service';
import { userService } from '../../_services/user.service';
import './dashboard.css';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const count = await productService.getProductCount();
        setProductCount(count);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de produits:", error);
        setError('Erreur lors de la récupération du nombre de produits');
      }
    };

    const fetchUserCount = async () => {
      try {
        const count = await userService.getUserCount();
        setUserCount(count);
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'utilisateurs:", error);
        setError('Erreur lors de la récupération du nombre d\'utilisateurs');
      }
    };

    // Appel des deux fonctions de récupération des données
    fetchProductCount();
    fetchUserCount();
    setLoading(false); // Marquer le chargement comme terminé après la récupération des données
  }, []);

  return (
    <div className="dashboard-container">
      {loading && <p>Chargement en cours...</p>}
      {error && <p>Erreur : {error}</p>}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <input type="text" placeholder="Recherche" className="dashboard-search-input" />
        <img src={require('../../images/image1.jpg')} alt="Profile" className="dashboard-profile-image" />
      </div>
      <div className="dashboard-cards-container">
        <Link to="/admin/product" className="dashboard-card">
          <div className="dashboard-card-content">
            <h3>Nombre total de produits</h3>
            <p>{productCount}</p>
          </div>
        </Link>
        <Link to="/admin/user" className="dashboard-card">
          <div className="dashboard-card-content">
            <h3>Nombre total d'utilisateurs</h3>
            <p>{userCount}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
