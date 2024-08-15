import React, { useState, useEffect } from 'react';
import './productList.css';
import { productService } from '../../../_services/product.service'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData.products); 
      } catch (error) {
        setError('Erreur lors de la récupération des produits');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div className='product-list-container'>
    {products.map(product => (
      <Link key={product._id} to={`/products/${product._id}`} className="product-list-card">
        <img className='product-list-image' src={`http://localhost:4000/uploads/${product.images[0]}`} alt={product.title} />
        <div className="product-list-details">
          <h3 className='product-list-item'>{product.title}</h3>
          <p className='product-list-item'>{product.description}</p>
          <h3 className='product-list-item'>Prix: {product.price} €</h3>
        </div>
      </Link>
    ))}
  </div>
  
  );
};

export default ProductList;
