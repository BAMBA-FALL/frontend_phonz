import Axios from "./caller.service";


const createRole = async (formData) => {
  try {
    const { name } = formData; // Extraire le champ name du formulaire data
    const response = await Axios.post('/api/roles', { name }); // Envoyer seulement le champ name dans la requête POST
    console.log(formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Récupérer un rôle par son nom
const getRoleByName = async (name) => {
  console.log('roleName:', name); 
  const response = await Axios.get(`/api/roles/byName/${name}`)
  console.log(response.data)
  return response.data
}

// Récupérer tous les rôles depuis le backend
const getRoles = () => {
  return Axios.get('/api/roles');
}


// Récupérer tous les rôles
const getAllRoles = () => {
  return Axios.get('/api/roles');
}

// Récupérer un rôle par son ID
const getRoleById = (roleId) => {
  return Axios.get(`/api/roles/${roleId}`);
}

// Mettre à jour un rôle
const updateRole = (roleId, roleName) => {
  return Axios.put(`/api/roles/${roleId}`, { roleName });
}

// Supprimer un rôle
const deleteRole = (roleId) => {
  return Axios.delete(`/api/roles/${roleId}`);
}


const assignPermissionsToRole = async (roleName, permissionIds) => {
  try {
    const response = await Axios.post('/api/assignPermissionsToRole', { roleName, permissionIds });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};



// Exporter les méthodes
export const roleService = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  getRoles,
  getRoleByName,
  assignPermissionsToRole
}