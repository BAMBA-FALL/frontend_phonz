import React, { useState } from 'react';
import { roleService } from '../../../_services/role.service';
import { permissionService } from '../../../_services/permission.service';

const MakerRolePermission = () => {
  const [name, setName] = useState('');
  const [permissionName, setPermissionName] = useState('');
  const [permissionDescription, setPermissionDescription] = useState('');
  const [permissionEndpoints, setPermissionEndpoints] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await roleService.createRole(name);
      console.log('Rôle créé avec succès:', response.data);
      setName('');
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de la création du rôle:', error);
      setErrorMessage('Erreur lors de la création du rôle');
    }
  };

  const handlePermissionSubmit = async (e) => {
    e.preventDefault();
    try {
      // Vérifier si une permission avec le même nom existe déjà
      const existingPermission = await permissionService.getPermissionByName(permissionName);
      if (existingPermission) {
        setErrorMessage('Une permission avec ce nom existe déjà');
        return;
      }

      // Si la permission n'existe pas, la créer
      const endpointsArray = permissionEndpoints.split(',').map(endpoint => endpoint.trim());
      const response = await permissionService.createPermission(permissionName, permissionDescription, endpointsArray);
      console.log('Permission créée avec succès:', response.data);
      // Réinitialiser le formulaire après la création de la permission
      setPermissionName('');
      setPermissionDescription('');
      setPermissionEndpoints('');
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de la création de la permission:', error);
      setErrorMessage('Erreur lors de la création de la permission');
    }
  };

  return (
    <div className='form-container'>
      <h2>Créer un rôle ou une permission</h2>
      <form onSubmit={handleRoleSubmit}>
        <label>Nom du rôle:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Créer le rôle</button>
      </form>
      <div>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div>
      <form onSubmit={handlePermissionSubmit}>
        <label>Nom de la permission:</label>
        <input type="text" value={permissionName} onChange={(e) => setPermissionName(e.target.value)} />
        <label>Description de la permission:</label>
        <input type="text" value={permissionDescription} onChange={(e) => setPermissionDescription(e.target.value)} />
        <label>Endpoints de la permission (séparés par des virgules):</label>
        <input type="text" value={permissionEndpoints} onChange={(e) => setPermissionEndpoints(e.target.value)} />
        <button type="submit">Créer la permission</button>
      </form>
      <div>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div>
    </div>
  );
};

export default MakerRolePermission;
