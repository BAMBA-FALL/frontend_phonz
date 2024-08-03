import React, { useState, useEffect } from 'react';
import { permissionService } from '../../../_services/permission.service';
import { roleService } from '../../../_services/role.service';
import './AdminForm.css'; 

const AdminForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: [], // Tableau pour stocker les permissions sélectionnées
  });
  const [permissionsList, setPermissionsList] = useState([]);

  useEffect(() => {
    // Récupérer la liste des permissions depuis le backend lors du chargement du composant
    const fetchPermissions = async () => {
      try {
        const response = await permissionService.getAllPermissions();
        setPermissionsList(response.data.permissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };
    fetchPermissions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (e) => {
    const selectedPermissions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, permissions: selectedPermissions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await roleService.createRole(formData);
      console.log(response.data);
      // Ajoutez ici la logique de gestion après la soumission du formulaire
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input className="input-field" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom du rôle" required />
        <select id="permissions" className="permissionsSelect"  multiple onChange={handlePermissionChange} required   style={{ maxHeight: '100px', overflowY: 'auto' }}>
                        {permissionsList.map(permission => (
                            permission.endpoints.map(endpoint => (
                                <option key={endpoint} >{endpoint}</option>
                            ))
                        ))}
                    </select>
        <button className="submit-button" type="submit">Créer le rôle</button>
      </form>
    </div>
  );
};

export default AdminForm;
