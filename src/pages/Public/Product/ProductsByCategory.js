import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryService } from '../../../_services/category.service';

const ProductsByCategory = () => {
    const { categoryId } = useParams(); // Obtenir l'ID de catégorie à partir de l'URL
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const { data } = await categoryService.getProductsByCategory(categoryId); // Utilise l'ID correct
                setProducts(data.products);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits par catégorie:', error);
            }
        };

        fetchProductsByCategory();
    }, [categoryId]); // Assurez-vous que le hook dépend de l'ID de catégorie

    return (
        <div>
            <h1>Produits dans la catégorie: {categoryId}</h1>
            {products.map(product => (
                <div key={product._id}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <span>{product.price} €</span>
                </div>
            ))}
        </div>
    );
};

export default ProductsByCategory;
