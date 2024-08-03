// Header.jsx
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
import { usePanier } from '../../pages/Public/PanierContext';
import './header.css';

const Header = () => {
<<<<<<< HEAD
  const [isLoggedIn, setIsLoggedIn] = useState(accountService.isLogged());
  const [searchText, setSearchText] = useState('');
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsBySubcategory, setProductsBySubcategory] = useState({});
  const navigate = useNavigate();
  const { getCartCount } = usePanier();
  const cartCount = getCartCount();
=======
    const [isLoggedIn, setIsLoggedIn] = useState(accountService.isLogged());
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { getCartCount } = useCart();
>>>>>>> dee5755be48440393c77323597d4561bcec40f91

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await categoryService.getAllCategoriesWithSubcategories();
        setCategories(allCategories);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await accountService.logout();
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/home');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

<<<<<<< HEAD
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

  // Déterminez la classe à appliquer en fonction du nombre d'articles
  const countClass = cartCount > 0 ? 'cart-count cart-count-full' : 'cart-count cart-count-empty';

  return (
    <header className='header'>
      {/* Première barre de navigation */}
      <nav className='top-nav'>
        <Link to='/home'>
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
=======
    return (
        <div>
            <header className='header'>
                <nav>
                    <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                        <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
                        <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
                        <div className={menuOpen ? "menu-line open" : "menu-line"}></div>
                    </div>
                    <ul className={menuOpen ? "menu-list open" : "menu-list"}>
                        <li>
                            <Link to='/home' onClick={() => setMenuOpen(false)}>CALLWAYZ</Link>
                        </li>
                        <div className="search-bar">
                            <input
                                className='input-search'
                                type='text'
                                placeholder='Que cherchez-vous ?'
                                value={searchText}
                                onChange={handleSearch}
                            />
                        
                                <FaSearch className="search-icon" />
                           
                        </div>
                        <li>
            <Link to='/service' onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faTruck} /> {/* Utilisation de l'icône de camion */}
            </Link>
        </li>
                        {/* <li>
                            <Link to='/contact' onClick={() => setMenuOpen(false)}>Contact</Link>
                        </li> */}
                        {/* {isLoggedIn && (
                            <li>
                                <Link to='/admin' onClick={() => setMenuOpen(false)}>Admin</Link>
                            </li>
                        )} */}
                        {isLoggedIn && (
                            <li>
                                <Link to='/profile' onClick={() => setMenuOpen(false)}>Mon Profil</Link>
                            </li>
                        )}
                        {/* <li>
                            <Link to='/shoppingcart' onClick={() => setMenuOpen(false)}>
                                <div className="cart-icon-container">
                                    <LiaShoppingBagSolid size={22} color="black" />
                                    {getCartCount() > 0 && (
                                        <span className="cart-count">{getCartCount()}</span>
                                    )}
                                </div>
                            </Link>
                        </li>  */}
                        <div className="user-icon">
                            {isLoggedIn ? (
                                <Link onClick={handleLogout}>Déconnexion</Link>
                            ) : (
                                <Link to='/login'> <IoPersonOutline size={22} color='green' /></Link>
                            )}
                        </div>
                    </ul>
                </nav>
            </header>
>>>>>>> dee5755be48440393c77323597d4561bcec40f91
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

      {/* Deuxième barre de navigation */}
      <nav className='bottom-nav'>
        <div
          className="dropdown"
          onMouseEnter={() => setCategoryMenuOpen(true)}
          onMouseLeave={() => setCategoryMenuOpen(false)}
        >
          <FaBars className="menu-icon" /> TOUS LES PRODUITS
          {categoryMenuOpen && (
            <ul className="dropdown-menu">
              {categories.map(category => (
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
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
