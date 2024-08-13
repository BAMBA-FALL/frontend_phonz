import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { FaSearch, FaBars } from 'react-icons/fa';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import { categoryService } from '../../_services/category.service';
import { accountService } from '../../_services/account.service';
import { usePanier } from '../../pages/Public/Panier/PanierContext';
import './header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(accountService.isLogged());
  const [searchText, setSearchText] = useState('');
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsBySubcategory, setProductsBySubcategory] = useState({});
  const navigate = useNavigate();
  const { getCartCount, getPanier, setUserId } = usePanier();
  const cartCount = getCartCount();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await categoryService.getAllCategoriesWithSubcategories();
        console.log('Categories fetched:', allCategories);
        setCategories(allCategories);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchPanier = async () => {
        const userId = 'yourUserId'; // Assurez-vous que l'ID utilisateur est correct
        setUserId(userId);
        try {
          await getPanier(userId);
        } catch (error) {
          console.error('Erreur lors de la récupération du panier:', error);
        }
      };

      fetchPanier();
    }
  }, [isLoggedIn, getPanier, setUserId]);

  const handleLogout = async () => {
    try {
      await accountService.logout();
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/homepage');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/searchresults?query=${searchText.trim()}`);
    }
  };

  const handleMouseEnter = async (subcategoryId) => {
    try {
      const products = await categoryService.getProductsBySubcategory(subcategoryId);
      console.log(`Products for subcategory ${subcategoryId}:`, products);
      setProductsBySubcategory((prev) => ({
        ...prev,
        [subcategoryId]: products
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  const handleMouseLeave = () => {
    setProductsBySubcategory({});
  };

  const countClass = cartCount > 0 ? 'cart-count cart-count-full' : 'cart-count cart-count-empty';

  return (
    <header className='header'>
      <nav className='top-nav'>
        <Link to='/homepage'>
          <img className='logo' src={logo} alt="CALLWAYZ" />
        </Link>
        <div className="search-container">
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              className='input-search'
              type='text'
              placeholder='Que cherchez-vous ?'
              value={searchText}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-icon">
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="user-actions">
          <Link to='/service'>
            <FontAwesomeIcon icon={faTruck} />
          </Link>
          {isLoggedIn ? (
            <>
              <Link to='/profile'>Mon Profil</Link>
              <Link onClick={handleLogout}>Déconnexion</Link>
            </>
          ) : (
            <Link to='/login'>
              <IoPersonOutline size={22} color='green' />
            </Link>
          )}
          <div className="cart">
            <Link to='/shoppingcart' className='cart-link'>
              <LiaShoppingBagSolid size={22} />
              {cartCount > 0 && <span className={countClass}>{cartCount}</span>}
            </Link>
          </div>
        </div>
      </nav>

      <nav className='bottom-nav'>
        <div
          className="dropdown"
          onMouseEnter={() => setCategoryMenuOpen(true)}
          onMouseLeave={() => setCategoryMenuOpen(false)}
        >
          <FaBars className="menu-icon" /> TOUS LES PRODUITS
          {categoryMenuOpen && (
            <ul className="dropdown-menu">
              {categories.length === 0 ? (
                <li>Aucune catégorie disponible</li>
              ) : (
                categories.map(category => (
                  <React.Fragment key={category._id}>
                    <li
                      className="dropdown-item"
                      onMouseEnter={() => handleMouseEnter(category._id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link to={`/category/${category._id}`}>{category.name}</Link>
                      {category.subcategories.length > 0 && (
                        <ul className="submenu">
                          {category.subcategories.map(subcategory => (
                            <li key={subcategory._id}>
                              <Link to={`/subcategory/${subcategory._id}`}>
                                {subcategory.name}
                              </Link>
                              {productsBySubcategory[subcategory._id] && (
                                <ul className="product-menu">
                                  {productsBySubcategory[subcategory._id].map(product => (
                                    <li key={product._id}>{product.title}</li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </React.Fragment>
                ))
              )}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
