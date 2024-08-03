import Axios from "./caller.service";

const getAccessories = async () => {
  try {
    const response = await Axios.get('/api/accessories');
    console.log('Response from getAccessories:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAccessoryById = async (accessoryId) => {
  try {
    const response = await Axios.get(`/api/accessories/${accessoryId}`);
    console.log('Response from getAccessoryById:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching accessory by ID:', error);
    throw error;
  }
};

const addAccessory = async (accessoryData) => {
  try {
    // Utilisez accessoryData dans le corps de la requête
    const response = await Axios.post('/api/accessories', accessoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateAccessory = async (accessoryId, accessoryData) => {
  try {
    const response = await Axios.put(`/api/accessories/${accessoryId}`, accessoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteAccessory = async (accessoryId) => {
  try {
    const response = await Axios.delete(`/api/accessories/${accessoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const accessoryService = {
  getAccessories,
  getAccessoryById,
  addAccessory,
  updateAccessory,
  deleteAccessory
};
