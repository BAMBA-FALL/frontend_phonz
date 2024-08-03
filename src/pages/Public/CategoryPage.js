import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importez useParams pour accéder aux paramètres de la route
import { productService } from '../../_services/product.service'; // Assurez-vous que le chemin est correct

const CategoryPage = () => {
  const { categoryId } = useParams(); // Utilisez useParams pour obtenir les paramètres de la route
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProductsByCategory(categoryId);
        setProducts(response.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products in Category</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
