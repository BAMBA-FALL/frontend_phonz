import Axios from './caller.service';

// Ajouter une nouvelle configuration de la page d'accueil
const addHomepageConfig = async (configData, images) => {
    try {
        const formData = new FormData();
        formData.append('sectionTitle', configData.sectionTitle);
        formData.append('order', configData.order);
        if (configData.categoryId) formData.append('categoryId', configData.categoryId);
        if (configData.subcategoryId) formData.append('subcategoryId', configData.subcategoryId);

        // Ajouter les images et leurs tailles
        images.forEach((image, index) => {
            formData.append('images', image.file);
            formData.append(`width_${image.name}`, image.width);
            formData.append(`height_${image.name}`, image.height);
        });

        const response = await Axios.post('/api/homepage-config', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Obtenir toutes les configurations de la page d'accueil
const getAllHomepageConfigs = async () => {
    try {
        const response = await Axios.get('/api/homepage-config');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Obtenir une configuration spécifique
const getHomepageConfigById = async (id) => {
    try {
        const response = await Axios.get(`/api/homepage-config/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Mettre à jour une configuration existante
const updateHomepageConfig = async (id, configData, images) => {
    try {
        const formData = new FormData();
        formData.append('sectionTitle', configData.sectionTitle);
        formData.append('order', configData.order);

        // Ajouter les nouvelles images
        images.forEach((image) => {
            formData.append('images', image.file);
        });

        const response = await Axios.put(`/api/homepage-config/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Supprimer une configuration de la page d'accueil
const deleteHomepageConfig = async (id) => {
    try {
        const response = await Axios.delete(`/api/homepage-config/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const homepageConfigService = {
    addHomepageConfig,
    getAllHomepageConfigs,
    getHomepageConfigById,
    updateHomepageConfig,
    deleteHomepageConfig
};
