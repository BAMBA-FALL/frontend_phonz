import Axios from './caller.service'; 

// Obtenir toutes les catégories
const getAllCategories = async () => {
    try {
        const response = await Axios.get('/api/categories');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fonction pour obtenir des produits par catégorie
const getProductsByCategory = async (categoryId) => {
    try {
        const response = await Axios.get(`/api/categories/${categoryId}/products`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Obtenir une catégorie par son ID
const getCategoryById = async (categoryId) => {
    try {
        const response = await Axios.get(`/api/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Créer une nouvelle catégorie
const addCategory = async (categoryData) => {
    try {
        const response = await Axios.post('/api/categories', categoryData); // Les données à envoyer pour la création.
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Mettre à jour une catégorie par ID
const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await Axios.put(`/api/categories/${categoryId}`, categoryData); // Les données à envoyer pour la mise à jour.
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Supprimer une catégorie par ID
const deleteCategory = async (categoryId) => {
    try {
        const response = await Axios.delete(`/api/categories/${categoryId}`); // ID de la catégorie à supprimer.
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Obtenir les sous-catégories associées à une catégorie principale
const getSubCategories = async (parentCategoryId) => {
    try {
      const response = await Axios.get(`/api/categories/${parentCategoryId}/subcategories`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des sous-catégories:", error);
      throw error;
    }
  };
  
// Obtenir toutes les catégories principales
const getAllCategoriesWithSubcategories = async () => {
    try {
      const response = await Axios.get('/api/categories'); 
      const categories = response.data;
  

      const categoriesWithSubcategories = await Promise.all(
        categories.map(async (category) => {
          const subcategoriesResponse = await Axios.get(`/api/categories/${category._id}/subcategories`);
          return {
            ...category,
            subcategories: subcategoriesResponse.data,
          };
        })
      );
  
      return categoriesWithSubcategories; 
    } catch (error) {
      throw error; 
    }
  };
  
const getProductsBySubcategory = async (subcategoryId) => {
    try {
        const response = await Axios.get(`/api/products/subcategory/${subcategoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Obtenir une sous-catégorie par son ID
const getSubcategoryById = async (subcategoryId) => {
    try {
        const response = await Axios.get(`/api/categories/${subcategoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


  

export const categoryService = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    getProductsByCategory,
    getSubCategories,
    getAllCategoriesWithSubcategories,
    getProductsBySubcategory,
    getSubcategoryById
    
};
