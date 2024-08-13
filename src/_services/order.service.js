import Axios from "./caller.service";

// Créer une intention de paiement (checkout)
const checkout = async () => {
  try {
    const response = await Axios.post('/api/checkout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Créer une nouvelle commande dans la base de données
const createOrder = async (userId, items, totalAmount, paymentStatus) => {
  try {
    const response = await Axios.post('/api/order', { userId, items, totalAmount, paymentStatus });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Récupérer toutes les commandes
const getAllOrders = async () => {
  try {
    const response = await Axios.get('/api/order');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Récupérer une commande par son ID
const getOrder = async (orderId) => {
  try {
    const response = await Axios.get(`/api/order/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Supprimer une commande par son ID
const deleteOrder = async (orderId) => {
  try {
    const response = await Axios.delete(`/api/order/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour le statut de paiement d'une commande
const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    const response = await Axios.put(`/api/order/${orderId}/paymentStatus`, { paymentStatus });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderService = {
  checkout,
  createOrder,
  getAllOrders,
  getOrder,
  deleteOrder,
  updatePaymentStatus,
};
