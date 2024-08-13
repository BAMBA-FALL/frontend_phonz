import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { homepageConfigService } from '../../../_services/homepageConfig.service';
import { categoryService } from '../../../_services/category.service';
import CarouselComponent from '../Carousel/CarouselComponent';
import './Homepage.css';

const Homepage = () => {
    const [configs, setConfigs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [homepageConfigs, categoryResponse] = await Promise.all([
                    homepageConfigService.getHomepageConfigs(),
                    categoryService.getAllCategoriesWithSubcategories()
                ]);
                console.log("Homepage Configs:", homepageConfigs);
                console.log("Categories:", categoryResponse);
                setConfigs(homepageConfigs);
                setCategories(categoryResponse);
            } catch (error) {
                setError('Erreur lors de la récupération des données');
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const getCategoryBySubcategoryId = (subcategoryId) => {
        for (const category of categories) {
            const subcategory = category.subcategories.find(sub => sub._id === subcategoryId);
            if (subcategory) {
                return category; 
            }
        }
        return { name: 'Catégorie inconnue', _id: '' };
    };

    if (error) {
        return <p className="homepage-error-message">{error}</p>;
    }

    return (
        <div className="homepage-container">
            {/* Vérifiez si le carrousel est bien rendu */}
            <CarouselComponent />

            {configs.length > 0 ? (
                configs.map(config => {
                    const category = config.subcategoryId ? getCategoryBySubcategoryId(config.subcategoryId) : { _id: config.categoryId };
                    return (
                        <div key={config._id} className="homepage-section-card">
                            <h2 className="homepage-section-title">{config.sectionTitle}</h2>
                            <div className="homepage-image-gallery">
                                {Array.isArray(config.images) && config.images.length > 0 ? (
                                    config.images.map((image, index) => (
                                        <Link 
                                            key={index} 
                                            to={`/products/${config.subcategoryId ? `subcategory/${config.subcategoryId}` : `category/${category._id}`}`}
                                            className="homepage-card"
                                            style={{
                                                width: `${config.imageSizes?.[index]?.width || 300}px`,
                                                height: 'auto',
                                            }}
                                        >
                                            <img
                                                src={`http://localhost:4000/uploads/${image}`}
                                                alt={`Image ${index}`}
                                                className="homepage-image"
                                            />
                                            <p className="homepage-image-category">
                                                {config.subcategoryId ? category.name : 'Catégorie'}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <p>Aucune image disponible.</p>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>Aucune configuration disponible.</p>
            )}
        </div>
    );
};

export default Homepage;
