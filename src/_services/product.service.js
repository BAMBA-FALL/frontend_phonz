import Axios from "./caller.service";


const getProducts = async () => {
    try {
      const response = await Axios.get('/api/products');
      console.log('Response from getProducts:', response.data); 
      return response.data; 
    } catch (error) {
      throw error; 
    }
  }



  const getProductById = async (productId) => {
    try {
        const response = await Axios.get(`/api/products/${productId}`);
        console.log('Response from getProductById:', response.data); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error; 
    }
}

  
const addProduct = async (productData) => {
  try {
    // Utilisez productData dans le corps de la requête
const response = await Axios.post('/api/products', productData);
    return response.data;
  } catch (error) {
    throw error; 
  }
}



const updateProduct = async (productId, productData) => {
  try {
    const response = await Axios.put(`/api/products/${productId}`, productData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
}




const deleteProduct = async (productId) => {
  try {
    const response = await Axios.delete(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error; 
  }
}


const addLikeToProduct = async (productId) => {
  try {
    const response = await Axios.post(`/api/products/${productId}/like`);
    return response.data; 
  } catch (error) {
    throw error; 
  }
}


const getProductCount = async () => {
  try {
    const response = await Axios.get('/api/products/count');
    console.log(response.data.count)
    return response.data.count;
  } catch (error) {
    throw error;
  }
};


// Nouvelle méthode pour récupérer les accessoires associés à un produit
const getAccessoriesByProductId = async (productId) => {
  try {
    const response = await Axios.get(`/api/products/${productId}/accessories`); // Récupérer les accessoires associés
    return response.data; // Retourner les accessoires
  } catch (error) {
    console.error("Erreur lors de la récupération des accessoires associés:", error);
    throw error;
  }
};


export const productService = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addLikeToProduct,
  getProductCount,
  getAccessoriesByProductId,
}
