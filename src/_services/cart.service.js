import Axios from "./caller.service";

// Ajouter un produit au panier
const addToCart = async (productId, quantity) => {
  try {
    console.log('Produit à ajouter au panier:', productId);
    console.log('Quantité à ajouter au panier:', quantity); 
    const response = await Axios.post('/api/cart', { productId, quantity }); 
    console.log('Réponse de l\'API:', response.data);
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    throw error;
  }
};


// Supprimer un produit du panier
const removeFromCart = async (productId) => {
  try {
    const response = await Axios.delete(`/api/cart/${productId}`);
    return response.data.cart; 
  } catch (error) {
    throw error;
  }
};

// Mettre à jour la quantité d'un produit dans le panier
const updateCartItemQuantity = async (productId, quantity) => {
  try {
    const response = await Axios.put(`/api/cart/${productId}`, { quantity });
    console.log('Produit à ajouter:', { productId, quantity });
    console.log('URL API:', '/api/cart/add');
    return response.data.cart; 
  } catch (error) {
    throw error;
  }
};

// Récupérer tous les articles dans le panier
const getCartItems = async () => {
  try {
    const response = await Axios.get('/api/cart');
    return response.data.cart; // Accéder à la propriété 'cart' de la réponse
  } catch (error) {
    throw error;
  }
};

// Finaliser la commande (effectuer le paiement)
const checkout = async () => {
  try {
    const response = await Axios.post('/api/cart/checkout');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cartService = {
  addToCart,
  removeFromCart,
  checkout,
  updateCartItemQuantity,
  getCartItems // Ajout de la fonction pour récupérer les articles du panier
};
