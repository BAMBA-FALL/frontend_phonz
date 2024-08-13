import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Import de jQuery
import 'select2'; // Import de la bibliothèque Select2
import { roleService } from '../../../_services/role.service';
import { permissionService } from '../../../_services/permission.service';
import './addRole.css'; 

const AddRole = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
        roleService.getRoles()
            .then(response => {
                console.log(response.data.roles); 
                setRoles(response.data.roles);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des rôles :', error);
            });
    }, []);

    useEffect(() => {
        if (selectedRole) {
            permissionService.getAllPermissions(selectedRole)
                .then(response => {
                    setPermissions(response.data.permissions);
                    $('#permissions').select2();
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des permissions du rôle :', error);
                });
        }
    }, [selectedRole]);

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setSelectedRole(selectedRole);
    };

    const handlePermissionChange = (e) => {
        const selectedPermissions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedPermissions(selectedPermissions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Utilisez le service pour associer les permissions au rôle sélectionné
            const response = await roleService.assignPermissionsToRole(selectedRole, selectedPermissions);
            console.log('Permissions assignées avec succès au rôle :', response.data);
            setSelectedRole('');
            setSelectedPermissions([]);
        } catch (error) {
            console.error('Erreur lors de l\'assignation des permissions au rôle :', error);
        }
    };

    return (
        <div className="addRoleContainer">
            <h2>Assigner des permissions à un rôle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="role">Rôle :</label>
                    <select id="role" className="roleSelect" value={selectedRole} onChange={handleRoleChange} required>
                        <option value="">Sélectionnez un rôle</option>
                        {roles.map(role => (
                         <option key={role._id} value={role.name}>{role.name}</option>
                         ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="permissions">Permissions :</label>
                    <select id="permissions" className="permissionsSelect"  multiple onChange={handlePermissionChange} required   style={{ maxHeight: '100px', overflowY: 'auto' }}>
                        {permissions.map(permission => (
                            permission.endpoints.map(endpoint => (
                                <option key={endpoint} >{endpoint}</option>
                            ))
                        ))}
                    </select>
                </div>

                <button type="submit" className="submitButton">Assigner les permissions</button>
            </form>
        </div>
    );
};

export default AddRole;
