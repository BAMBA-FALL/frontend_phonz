// AddUserRole.js

import React, { useState, useEffect } from 'react';
import { userService } from '../../../_services/user.service';
import { roleService } from '../../../_services/role.service';
import { useNavigate } from 'react-router-dom';
import './adduserRole.css'; // Import du fichier CSS de style

const AddUserRole = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [roleName, setRoleName] = useState('');
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await roleService.getAllRoles();
                setRoles(response.data.roles);
            } catch (error) {
                console.error('Erreur lors du chargement des rôles :', error);
            }
        };

        fetchRoles();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await userService.createUserWithRole(username, name, email, password, confirmPassword, roleName);
            console.log('Nouvel utilisateur créé avec succès :', response.data);
            setUsername('');
            setName('');
            setEmail('');
            setPassword('');
            setRoleName('');
            setConfirmPassword('');
            navigate('/admin');
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
        }
    };

    return (
        <div className="add-user-role-container">
            <h2 className="add-user-role-title">Ajouter un utilisateur avec un rôle</h2>
            <form onSubmit={handleSubmit} className="add-user-role-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Nom d'utilisateur :</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="name" className="form-label">Nom :</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email :</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Mot de passe :</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirmez le mot de passe :</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="role" className="form-label">Rôle :</label>
                    <select id="role" value={roleName} onChange={(e) => setRoleName(e.target.value)} required className="form-select">
                        <option value="">Sélectionnez un rôle</option>
                        {roles.map((role) => (
                            <option key={role._id} value={role.roleName}>{role.roleName}</option>
                        ))}
                    </select>
                </div>

                <div className="button-container">
                    <button type="submit" className="submit-button">Enregistrer</button>
                </div>
            </form>
        </div>
    );
};

export default AddUserRole;
