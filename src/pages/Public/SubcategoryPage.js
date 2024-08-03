import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importez useParams et Link pour accéder aux paramètres de la route et créer des liens
import { productService } from '../../_services/product.service'; // Assurez-vous que le chemin est correct
import './SubcategoryPage.css'; // Assurez-vous que le chemin est correct

const SubcategoryPage = () => {
  const { subcategoryId } = useParams(); // Utilisez useParams pour obtenir l'ID de la sous-catégorie
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProductsBySubcategory(subcategoryId);
        setProducts(response.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="subcategory-page">
      <h1>Nos sous catégories Smartphones</h1>
      <ul className="products-list">
      {products.map(product => (
        <Link key={product._id} to={`/products/${product._id}`} className="product-card">
          <img className='product-image' src={`http://localhost:4000/uploads/${product.images[0]}`} alt={product.title} />
          <div className="product-details">
            <h3 className='product-item'>{product.title}</h3>
            <p className='product-item'> {product.description}</p>
            <h3 className='product-item'>Prix: {product.price} €</h3>
        
            </div>
         
        </Link>
      ))}
      </ul>
    </div>
  );
};

export default SubcategoryPage;
