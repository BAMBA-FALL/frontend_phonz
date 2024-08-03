// src/pages/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchResultsService } from '../../_services/searchResult.service';
import './searchResults.css';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await searchResultsService.searchProducts(query);
        setProducts(products);
      } catch (error) {
        console.error('Erreur lors de la recherche de produits:', error);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="search-results">
      <h1>Résultats de recherche pour "{query}"</h1>
      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ul className="product-list">
          {products.map(product => (
            <li key={product._id} className="product-item">
              <Link to={`/products/${product._id}`}>
                <img 
                  src={`http://localhost:4000/uploads/${product.images[0]}`} 
                  alt={product.title} 
                  className="product-image" 
                />
              </Link>
              <div className="product-details">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Prix: {product.price} €</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
