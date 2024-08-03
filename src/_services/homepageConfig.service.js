import Axios from './caller.service';

const getHomepageConfigs = async () => {
    try {
        const response = await Axios.get('/api/homepage-config');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const addOrUpdateHomepageConfig = async (configData) => {
    try {
        const response = await Axios.post('/api/homepage-config', configData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteHomepageConfig = async (configId) => {
    try {
        const response = await Axios.delete(`/api/homepage-config/${configId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const uploadHomepageConfig = async (formData) => {
    try {
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

const updateHomepageConfig = async (id, configData) => {
    try {
        const response = await Axios.put(`/api/homepage-config/${id}`, configData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
const getHomepageConfigById = async (id) => {
    try {
        const response = await Axios.get(`/api/homepage-config/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


const addHomepageConfig = async (formData) => {
    try {
        const response = await Axios.post('/api/homepage-config', formData); // Assurez-vous que ce chemin est correct
        return response.data;
    } catch (error) {
        throw error;
    }
};
// Assurez-vous que cette méthode est exportée
export const homepageConfigService = {
    getHomepageConfigs,
    addOrUpdateHomepageConfig,
    deleteHomepageConfig,
    uploadHomepageConfig,
    getHomepageConfigById, // Ajouter cette ligne
    addHomepageConfig,
    updateHomepageConfig
};
