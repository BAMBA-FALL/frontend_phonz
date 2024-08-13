import Axios from './caller.service';  // Importez votre instance Axios pour les appels API

// Fonction pour rechercher des produits en fonction d'une requête
const searchProducts = async (query) => {
    try {
        const response = await Axios.get(`/api/search`, { params: { query } });
        return response.data.products; // Retourne les produits trouvés
    } catch (error) {
        console.error("Erreur lors de la recherche des produits:", error);
        throw error;
    }
};

export const searchService = {
    searchProducts,
};
