import Axios from "./caller.service";

const searchProducts = async (query) => {
  try {
    const response = await Axios.get(`/api/search?query=${query}`);
    return response.data.products;
  } catch (error) {
    console.error('Erreur lors de la recherche de produits:', error);
    throw error;
  }
};

export const searchResultsService = {
  searchProducts,
};
