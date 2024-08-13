import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoryService } from '../../../_services/category.service';
import { productService } from '../../../_services/product.service';
import ProductCard from '../Product/ProductCard';  
import './CategoryPage.css';  // Fichier CSS pour styliser la page de la catégorie

const CategoryPage = () => {
    const { categoryId } = useParams();  // Récupère l'ID de la catégorie depuis l'URL
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                // Récupère les informations sur la catégorie
                const categoryData = await categoryService.getCategoryById(categoryId);
                setCategory(categoryData);

                // Récupère les produits associés à cette catégorie
                const productsData = await productService.getProductsByCategory(categoryId);
                setProducts(productsData.products);
            } catch (error) {
                setError('Erreur lors du chargement de la catégorie ou des produits.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryAndProducts();
    }, [categoryId]);

    if (loading) {
        return <div className="loading">Chargement en cours...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="category-page">
            {category && (
                <div className="category-header">
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                </div>
            )}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>Aucun produit trouvé dans cette catégorie.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
