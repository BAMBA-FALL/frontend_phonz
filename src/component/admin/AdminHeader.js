import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './adminheader.css'; // Assurez-vous que le CSS est adapté
import { accountService} from '../../_services/account.service'
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
        <div className="adminheader">
            <h2>Tableau de bord</h2>
            <Button type="primary" onClick={handleLogout}>Déconnexion</Button>
        </div>
    );
};

export default AdminHeader;
