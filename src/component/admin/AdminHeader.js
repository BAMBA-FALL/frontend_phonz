import React from 'react';
import { accountService } from '../../_services/account.service';
import { useNavigate } from 'react-router-dom';
import './adminheader.css'
const AdminHeader = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await accountService.logout();
       
            localStorage.removeItem('token');

            navigate('/home');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="admin-header">
            <h2>Tableau de bord</h2>
            <button onClick={handleLogout}>Déconnexion</button>
        </div>
    );
};

export default AdminHeader;






