import caller from './caller.service';

async function getAllConfigs() {
  try {
    const response = await caller.call({ method: 'get', url: '/homepage-config' });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des configurations:', error);
    throw error;
  }
}

async function getConfigById(id) {
  try {
    const response = await caller.call({ method: 'get', url: `/homepage-config/${id}` });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la configuration avec ID ${id}:`, error);
    throw error;
  }
}

async function createConfig(configData) {
  try {
    const formData = new FormData();
    formData.append('sectionTitle', configData.sectionTitle);
    formData.append('order', configData.order);
    if (configData.categoryId) {
      formData.append('categoryId', configData.categoryId);
    }
    if (configData.subcategoryId) {
      formData.append('subcategoryId', configData.subcategoryId);
    }
    if (configData.images) {
      configData.images.forEach(image => {
        formData.append('images', image);
        formData.append(`width_${image.name}`, image.width || 0);
        formData.append(`height_${image.name}`, image.height || 0);
      });
    }

    const response = await caller.call({
      method: 'post',
      url: '/homepage-config',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la configuration:', error);
    throw error;
  }
}

async function updateConfig(id, configData) {
  try {
    const formData = new FormData();
    formData.append('sectionTitle', configData.sectionTitle);
    formData.append('order', configData.order);
    if (configData.images) {
      configData.images.forEach(image => {
        formData.append('images', image);
      });
    }

    const response = await caller.call({
      method: 'put',
      url: `/homepage-config/${id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la configuration avec ID ${id}:`, error);
    throw error;
  }
}

async function deleteConfig(id) {
  try {
    const response = await caller.call({
      method: 'delete',
      url: `/homepage-config/${id}`,
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la configuration avec ID ${id}:`, error);
    throw error;
  }
}

// Exports du service selon la structure demandée
export const homepageConfigService = {
  getAllConfigs,
  getConfigById,
  createConfig,
  updateConfig,
  deleteConfig,
};
