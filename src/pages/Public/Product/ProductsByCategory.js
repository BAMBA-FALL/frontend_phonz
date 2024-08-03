import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../../_services/product.service';

const ProductByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('CategoryId:', categoryId); // Ajoutez cette ligne pour vérifier l'ID de la catégorie
    const fetchProducts = async () => {
      try {
        const response = await productService.getProductsByCategory(categoryId);
        setProducts(response.products); // Utilisez le champ correct du résultat
      } catch (error) {
        setError('Erreur lors de la récupération des produits.');
        console.error(error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Produits dans cette catégorie</h1>
      {products.length > 0 ? (
        products.map(product => (
          <div key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Prix: {product.price}€</p>
          </div>
        ))
      ) : (
        <p>Aucun produit trouvé pour cette catégorie.</p>
      )}
    </div>
  );
};

export default ProductByCategory;
