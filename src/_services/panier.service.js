import Axios from './caller.service'; // Importez votre instance Axios configurée

// Ajouter un produit au panier
const addProductToCart = async (produitId, quantite) => {
    try {
        const response = await Axios.post('api/panier/add', {
            produitId,
            quantite
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit au panier:', error);
        throw error;
    }
};

// Récupérer le panier de l'utilisateur
const getCart = async (userId) => {
    try {
        const response = await Axios.get(`api/panier/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du panier:', error);
        throw error;
    }
};

// Mettre à jour la quantité d'un produit dans le panier
const updateCartProduct = async (produitId, quantite) => {
    try {
        const response = await Axios.put('api/panier/update', {
            produitId,
            quantite
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit dans le panier:', error);
        throw error;
    }
};

// Supprimer un produit du panier
const removeProductFromCart = async (produitId) => {
    try {
        const response = await Axios.delete('api/panier/remove', {
            data: { produitId }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du produit du panier:', error);
        throw error;
    }
};

// Export du service panier de manière structurée
export const panierService = {
    addProductToCart,
    getCart,
    updateCartProduct,
    removeProductFromCart,
};
