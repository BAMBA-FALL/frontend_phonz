import Axios from "./caller.service";

// Créer une permission
const createPermission = (name, description, endpoints) => {
  return Axios.post('/api/permissions', { name, description, endpoints });
}

// Récupérer toutes les permissions
const getAllPermissions = () => {
  return Axios.get('/api/permissions');
}


// Récupérer les permissions associées à un rôle spécifique depuis le backend
const getRolePermissions = (roleId) => {
    return Axios.get(`/api/roles/${roleId}/permissions`);
  }
  

// Récupérer une permission par son ID
const getPermissionById = (permissionId) => {
  return Axios.get(`/api/permissions/${permissionId}`);
}

// Mettre à jour une permission
const updatePermission = (permissionId, name, description) => {
  return Axios.put(`/api/permissions/${permissionId}`, { name, description });
}

// Supprimer une permission par son ID
const deletePermission = (permissionId) => {
  return Axios.delete(`/api/permissions/${permissionId}`);
}


// Fonction pour récupérer une permission par son nom
const getPermissionByName = (permissionName) => {
  return Axios.get(`/api/permissions/byName/${permissionName}`);
}

// Exporter les méthodes
export const permissionService = {
  createPermission,
  getAllPermissions,
  getRolePermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
  getPermissionByName
}
