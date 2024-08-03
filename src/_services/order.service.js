import Axios from "./caller.service";

// Récupérer toutes les commandes
const getAllOrders = () => {
  return Axios.get('/api/orders');
}

// Récupérer une commande par son ID
const getOrder = (orderId) => {
  return Axios.get(`/api/orders/${orderId}`);
}

// Supprimer une commande par son ID
const deleteOrder = (orderId) => {
  return Axios.delete(`/api/orders/${orderId}`);
}

// Créer une nouvelle commande
const createOrder = async (userId, items, totalAmount, paymentStatus) => {
  try {
    const response = await Axios.post('/api/orders', { userId, items, totalAmount, paymentStatus });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour le statut de paiement d'une commande
const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    const response = await Axios.put(`/api/orders/${orderId}/paymentStatus`, { paymentStatus });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderService = {
  getAllOrders,
  getOrder,
  deleteOrder,
  createOrder,
  updatePaymentStatus,
};
