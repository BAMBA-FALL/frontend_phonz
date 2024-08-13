import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchService } from '../../../_services/SearchResult.service'; // Modification ici
import { Checkbox, Collapse, Button, Slider, Spin } from 'antd';
import './SearchResults.css';

const { Panel } = Collapse;

const LeftNav = ({ filters, setFilters, onFilterChange }) => {
  const handleCheckboxChange = (checkedValues, filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: checkedValues,
    }));
  };

  const handlePriceChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: value,
    }));
  };

  return (
    <div className="left-nav">
      <h3>Filtres</h3>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Catégorie" key="1">
          <Checkbox.Group
            options={[
              { label: 'Catégorie 1', value: 'category1' },
              { label: 'Catégorie 2', value: 'category2' },
            ]}
            onChange={(checkedValues) => handleCheckboxChange(checkedValues, 'category')}
          />
        </Panel>
        <Panel header="Prix" key="2">
          <Slider
            range
            step={10}
            min={0}
            max={500}
            value={filters.price || [0, 500]}
            onChange={handlePriceChange}
            tooltipVisible
          />
          <div className="price-range-labels">
            <span>0€</span>
            <span>500€</span>
          </div>
        </Panel>
      </Collapse>
      <Button type="primary" onClick={onFilterChange} style={{ marginTop: '20px' }}>
        Appliquer les filtres
      </Button>
    </div>
  );
};

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const filteredProducts = await searchService.searchProducts(query, filters); // Modification ici
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Erreur lors de la recherche de produits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query]); // Effectue la recherche initiale

  const handleFilterChange = () => {
    fetchProducts(); // Applique les filtres lors du clic sur le bouton "Appliquer les filtres"
  };

  return (
    <div className="search-results-wrapper">
      <div className="search-results-container">
        <LeftNav filters={filters} setFilters={setFilters} onFilterChange={handleFilterChange} />
        <div className="search-results">
          <h1>Résultats de recherche pour "{query}"</h1>
          {loading ? (
            <Spin size="large" />
          ) : products.length === 0 ? (
            <p>Aucun produit trouvé.</p>
          ) : (
            <ul className="product-list">
              {products.map((product) => (
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
      </div>
    </div>
  );
};

export default SearchResults;
