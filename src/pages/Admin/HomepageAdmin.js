import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../_services/category.service';
import { homepageConfigService } from '../../_services/homepageConfig.service';
import './HomepageAdmin.css';

const HomepageAdmin = () => {
    const [categories, setCategories] = useState([]);
    const [configs, setConfigs] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const fetchedCategories = await categoryService.getAllCategoriesWithSubcategories();
                setCategories(fetchedCategories);

                const fetchedConfigs = await homepageConfigService.getHomepageConfigs();
                setConfigs(fetchedConfigs);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error.message);
            }
        };

        fetchInitialData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await homepageConfigService.deleteHomepageConfig(id);
            setConfigs(configs.filter(config => config._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la configuration:', error);
        }
    };

    return (
        <div className="homepage-admin">
            <h1>Page d'administration de la page d'accueil</h1>

            <h2>Configurations actuelles</h2>
            <div className="config-cards">
                {configs.length > 0 ? (
                    configs.map(config => (
                        <div key={config._id} className="config-card">
                            <h3>{config.sectionTitle}</h3>
                            <p>
                                {categories.find(cat => cat.subcategories.some(sub => sub._id === config.subcategoryId))?.subcategories.find(sub => sub._id === config.subcategoryId)?.name || 'Non spécifié'}
                            </p>
                            <div className="config-images">
                                {config.images && config.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:4000/uploads/${image}`} // Assurez-vous que le chemin est correct
                                        alt={`Image ${index}`}
                                        className="config-image"
                                    />
                                ))}
                            </div>
                            <div className="config-actions">
                                <Link to={`/admin/homepage/edit/${config._id}`} className="btn-edit">Modifier</Link>
                                <button onClick={() => handleDelete(config._id)}>Supprimer</button>
                            </div>
                            <div className="move-buttons">
                                <button
                                    onClick={() => {
                                        // Handle move up
                                        const index = configs.findIndex(c => c._id === config._id);
                                        if (index > 0) {
                                            const newConfigs = [...configs];
                                            [newConfigs[index], newConfigs[index - 1]] = [newConfigs[index - 1], newConfigs[index]];
                                            setConfigs(newConfigs);
                                        }
                                    }}
                                    className="btn-move"
                                >
                                    ▲
                                </button>
                                <button
                                    onClick={() => {
                                        // Handle move down
                                        const index = configs.findIndex(c => c._id === config._id);
                                        if (index < configs.length - 1) {
                                            const newConfigs = [...configs];
                                            [newConfigs[index], newConfigs[index + 1]] = [newConfigs[index + 1], newConfigs[index]];
                                            setConfigs(newConfigs);
                                        }
                                    }}
                                    className="btn-move"
                                >
                                    ▼
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucune configuration disponible.</p>
                )}
            </div>
        </div>
    );
};

export default HomepageAdmin;
