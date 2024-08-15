import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../../_services/product.service';
// import './ProductsByCategory.css';

const ProductsByCategory = () => {
    const { categoryId } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productService.getProductsByCategory(categoryId);
                setProducts(response);
            } catch (error) {
                setError('Erreur lors de la récupération des produits');
                console.error(error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    if (error) {
        return <p className="products-error-message">{error}</p>;
    }

    return (
        <div className="products-container">
            <h1>Produits de la catégorie</h1>
            <div className="products-gallery">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-card">
                            <img
                                src={`http://localhost:4000/uploads/${product.image}`}
                                alt={product.name}
                                className="product-image"
                            />
                            <h2 className="product-title">{product.name}</h2>
                            <p className="product-price">${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucun produit disponible pour cette catégorie.</p>
                )}
            </div>
        </div>
    );
};

export default ProductsByCategory;
