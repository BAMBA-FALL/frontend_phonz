import React, { useEffect, useState } from 'react';
import { categoryService } from '../../../_services/category.service';

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAllCategories();
                setCategories(data);
            } catch (err) {
                setError('Erreur lors de la récupération des catégories.');
                console.error('Erreur:', err);
            }
        };

        fetchCategories();
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesList;
