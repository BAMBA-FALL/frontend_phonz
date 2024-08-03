import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { homepageConfigService } from '../../_services/homepageConfig.service';
import { categoryService } from '../../_services/category.service'; // Assurez-vous d'importer le service de catégories
import './HomepageAdminEdit.css'; // Assurez-vous d'avoir ce fichier CSS

const HomepageAdminEdit = () => {
    const { id } = useParams(); // Récupère l'ID de la section depuis les paramètres de l'URL
    const navigate = useNavigate(); // Utilise useNavigate pour la navigation

    const [config, setConfig] = useState({
        sectionTitle: '',
        subcategoryId: '',
        order: '',
        images: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]); // État pour les catégories

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await categoryService.getAllCategoriesWithSubcategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const fetchedConfig = await homepageConfigService.getHomepageConfigById(id);
                setConfig(fetchedConfig);
                const previews = fetchedConfig.images.map((img) => `http://localhost:4000/uploads/${img}`);
                setImagePreviews(previews);
            } catch (error) {
                console.error('Erreur lors de la récupération de la configuration:', error);
            }
        };

        fetchConfig();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfig({ ...config, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setConfig({ ...config, images: files });

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('sectionTitle', config.sectionTitle);
            formData.append('subcategoryId', config.subcategoryId);
            formData.append('order', config.order);
            config.images.forEach((file) => formData.append('images', file));

            await homepageConfigService.updateHomepageConfig(id, formData);
            navigate('/admin/homepage/admin'); // Redirige vers la page de gestion après l'enregistrement
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la configuration:', error);
        }
    };

    return (
        <div className="homepage-admin-edit">
            <h1>Modifier la Section de la Page d'Accueil</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sectionTitle">Titre de la section:</label>
                    <input
                        type="text"
                        id="sectionTitle"
                        name="sectionTitle"
                        value={config.sectionTitle}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subcategoryId">Catégorie:</label>
                    <select
                        id="subcategoryId"
                        name="subcategoryId"
                        value={config.subcategoryId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map((category) => (
                            category.subcategories.map((subcategory) => (
                                <option key={subcategory._id} value={subcategory._id}>
                                    {subcategory.name}
                                </option>
                            ))
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="order">Ordre:</label>
                    <input
                        type="number"
                        id="order"
                        name="order"
                        value={config.order}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Images:</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <div className="image-previews">
                        {imagePreviews.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Prévisualisation de l'image ${index + 1}`}
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                        ))}
                    </div>
                </div>

                <button type="submit">Sauvegarder</button>
            </form>
        </div>
    );
};

export default HomepageAdminEdit;
