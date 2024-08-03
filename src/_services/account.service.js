import Axios from './caller.service';
// import jwt from 'jsonwebtoken';

const login = (credentials) => {
  return Axios.post('/api/login', credentials, { withCredentials: true })
    .then((response) => {
      console.log('Login API response:', response);
      // Extract token from response
      const token = response.data.access_token;
      // Save token to localStorage
      localStorage.setItem('token', token);
      return response;
    });
};

// Fonction d'enregistrement pour créer un nouvel utilisateur
const register = async (userData) => {
  return Axios.post('/api/register', userData, { withCredentials: true })
    .then((response) => {
      return response.data; // Retourne la réponse du serveur
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message); // Gérer les erreurs de l'API
      } else {
        throw new Error('Erreur lors de l\'enregistrement.'); // Autres erreurs
      }
    });
};


// const register = async(userData)=>{
//   return Axios.post('/api/register', userData,{withCredentials:true})
// }

let saveToken = (token) => {
  localStorage.setItem('token', token);
};

const logout = async () => {
  try {
    const response = await Axios.post('/api/logout');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    if (error.response) {
      if (
        error.response.status === 401 &&
        error.response.data.message ===
          "Le jeton d'authentification a expiré. Veuillez vous reconnecter."
      ) {
        // Gérer le cas où le jeton est expiré
        // Par exemple, rediriger l'utilisateur vers la page de connexion
        // ou afficher un message d'erreur approprié
        throw new Error(
          "Le jeton d'authentification a expiré. Veuillez vous reconnecter."
        );
      } else {
        // Le serveur a renvoyé une autre erreur avec un code d'erreur
        throw new Error(error.response.data.message);
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      throw new Error('La déconnexion a échoué. Veuillez réessayer.');
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      throw new Error('Une erreur est survenue lors de la déconnexion.');
    }
  }
};

let isLogged = () => {
  let token = localStorage.getItem('token');
  return !!token;
};

let getToken = () => {
  return localStorage.getItem('token');
};

// Fonction pour vérifier si le token est expiré
// const isTokenExpired = (token) => {
//   const decoded = jwt.decode(token);
//   if (decoded.exp < new Date().getTime() / 1000) {
//     return true;
//   }
//   return false;
// };

export const accountService = {
  login,
  saveToken,
  logout,
  isLogged,
  getToken,
  register
//   isTokenExpired
};
