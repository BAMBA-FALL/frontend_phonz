import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sideMenu.css';

const SideMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="side-menu">
      <ul>
        <li><Link to="/admin/dashboard">Tableau de bord</Link></li>
        <nav className="admin-nav">
          <ul>
            <li><Link to="/">Mon site</Link></li>
            <li className={`nav-dropdown ${activeMenu === 'utilisateurs' ? 'active' : ''}`}>
              <span onClick={() => toggleDropdown('utilisateurs')}>
                Utilisateurs
                <span className={`arrow ${activeMenu === 'utilisateurs' ? 'up' : 'down'}`}>▼</span>
              </span>
              <ul>
                <li><Link to="/admin/user/index">Liste</Link></li>
                <li><Link to="/admin/user/adduserrole">User +</Link></li>
                <li><Link to="/admin/user/permission">Permission +</Link></li>
                <li><Link to="/admin/user/adminform">form role +</Link></li>
              </ul>
            </li>
            <li className={`nav-dropdown ${activeMenu === 'produits' ? 'active' : ''}`}>
              <span onClick={() => toggleDropdown('produits')}>
                Produits
                <span className={`arrow ${activeMenu === 'produits' ? 'up' : 'down'}`}>▼</span>
              </span>
              <ul>
                <li><Link to="/admin/product/index">Liste de produits</Link></li>
                <li><Link to="/admin/product/add">Ajouter un produit</Link></li>
                <li><Link to="/admin/product/addaccessoryform">Ajouter un accessoire</Link></li>
                <li><Link to="/admin/product/edit/:id">Modifier</Link></li>
                <li><Link to="/admin/product/delete/:id">Supprimer</Link></li>
              </ul>
            </li>
            <li className={`nav-dropdown ${activeMenu === 'carousels' ? 'active' : ''}`}>
              <span onClick={() => toggleDropdown('carousels')}>
                Carousels
                <span className={`arrow ${activeMenu === 'carousels' ? 'up' : 'down'}`}>▼</span>
              </span>
              <ul>
                <li><Link to="/admin/carousel/index">Liste de Carousel</Link></li>
                <li><Link to="/admin/carousels/add">Ajouter un Carousel</Link></li>
                <li><Link to="/admin/carousels/edit/:id">Modifier le carousel</Link></li>
                <li><Link to="/admin/carousels/delete/:id">Supprimer le carousel</Link></li>
              </ul>
            </li>
            <li className={`nav-dropdown ${activeMenu === 'categories' ? 'active' : ''}`}>
              <span onClick={() => toggleDropdown('categories')}>
                Mes catégories
                <span className={`arrow ${activeMenu === 'categories' ? 'up' : 'down'}`}>▼</span>
              </span>
              <ul>
                <li><Link to="/admin/category/index">Liste de Catégories</Link></li>
                <li><Link to="/admin/category/add">Ajouter un Catégories</Link></li>
                <li><Link to="/admin/category/edit/:id">Modifier un catégorie</Link></li>
                <li><Link to="/admin/category/delete/:id">Supprimer un catégorie</Link></li>
              </ul>
            </li>
            <li className={`nav-dropdown ${activeMenu === 'commandes' ? 'active' : ''}`}>
              <span onClick={() => toggleDropdown('commandes')}>
                Commandes
                <span className={`arrow ${activeMenu === 'commandes' ? 'up' : 'down'}`}>▼</span>
              </span>
              <ul>
                <li><Link to="/admin/product/index">Liste</Link></li>
              </ul>
            </li>
            <li className={`nav-dropdown ${activeMenu === 'homepage' ? 'active' : ''}`}>
              <span onClick={() => toggleDropdown('homepage')}>
                Page d'accueil
                <span className={`arrow ${activeMenu === 'homepage' ? 'up' : 'down'}`}>▼</span>
              </span>
              <ul>
                <li><Link to="/admin/homepage/admin">Configurer la Page d'Accueil</Link></li>
                <li><Link to="/admin/homepage/add-section">Ajouter une Section</Link></li> {/* Lien pour ajouter une nouvelle section */}
                <li><Link to="/admin/homepage/edit/:id">Modifier la Page d'Accueil</Link></li> 
              </ul>
            </li>
          </ul>
        </nav>
      </ul>
      <footer className="side-menu-footer">
        <p>&copy; {new Date().getFullYear()} Mon Site. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default SideMenu;
