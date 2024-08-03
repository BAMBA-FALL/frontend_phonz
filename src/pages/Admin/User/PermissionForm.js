import React, { useState } from 'react';
import { permissionService } from '../../../_services/permission.service';
import './permissionForm.css'; // Importer le fichier de style

const PermissionForm = () => {
  const [permissionName, setPermissionName] = useState('');
  const [permissionDescription, setPermissionDescription] = useState('');
  const [permissionEndpoints, setPermissionEndpoints] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    <div className='form-container-permission'>
      <h2>Créer une permission</h2>
      <div>{errorMessage && <p className="error-message">{errorMessage}</p>}</div>
      <form onSubmit={handlePermissionSubmit}>
        <label className="form-label-permission">Nom de la permission:</label>
        <input type="text" className="form-input-permission" value={permissionName} onChange={(e) => setPermissionName(e.target.value)} />
        <label className="form-label-permission">Description de la permission:</label>
        <input type="text" className="form-input-permission" value={permissionDescription} onChange={(e) => setPermissionDescription(e.target.value)} />
        <label className="form-label-permission">Endpoints de la permission (séparés par des virgules):</label>
        <textarea 
               className="textarea-field-permission" 
                value={permissionEndpoints} 
               onChange={(e) => setPermissionEndpoints(e.target.value)} 
               />

        <button type="submit" className="form-button-permission">Créer la permission</button>
      </form>
      <div>{errorMessage && <p className="error-message">{errorMessage}</p>}</div>
    </div>
  );
};

export default PermissionForm;
