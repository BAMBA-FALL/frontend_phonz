import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoryService } from '../../../_services/category.service';
import { productService } from '../../../_services/product.service';
import ProductCard from '../Product/ProductCard'; 
import './SubcategoryPage.css'; // Fichier CSS pour styliser la page de la sous-catégorie

const SubcategoryPage = () => {
    const { subcategoryId } = useParams(); // Récupère l'ID de la sous-catégorie depuis l'URL
    const [subcategory, setSubcategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubcategoryAndProducts = async () => {
            try {
                // Récupère les informations sur la sous-catégorie
                const subcategoryData = await categoryService.getSubcategoryById(subcategoryId);
                setSubcategory(subcategoryData);

                // Récupère les produits associés à cette sous-catégorie
                const productsData = await productService.getProductsBySubcategory(subcategoryId);
                setProducts(productsData.products);
            } catch (error) {
                setError('Erreur lors du chargement de la sous-catégorie ou des produits.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategoryAndProducts();
    }, [subcategoryId]);

    if (loading) {
        return <div className="loading">Chargement en cours...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="subcategory-page">
            {subcategory && (
                <div className="subcategory-header">
                    <h1>{subcategory.name}</h1>
                    <p>{subcategory.description}</p>
                </div>
            )}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>Aucun produit trouvé dans cette sous-catégorie.</p>
                )}
            </div>
        </div>
    );
};

export default SubcategoryPage;
