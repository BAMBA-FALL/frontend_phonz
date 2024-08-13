import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { accountService } from "../../_services/account.service";
import './signinform.css';

const SignInForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        setError('');

        try {
            const response = await accountService.register(userData);
            console.log('Utilisateur enregistré avec succès:', response.data);
            setUserData({
                username: '',
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="form-container-signup">
            <form onSubmit={handleSubmit}>
                <label className="form-label">Nom d'utilisateur</label>
                <input className="form-input" name="username" placeholder="" onChange={handleChange} value={userData.username} />

                <label className="form-label">Nom</label>
                <input className="form-input" name="name" placeholder="" onChange={handleChange} value={userData.name} />

                <label className="form-label">Email</label>
                <input className="form-input" name="email" placeholder="" onChange={handleChange} value={userData.email} />

                <label className="form-label">Mot de passe</label>
                <input className="form-input" type="password" name="password" placeholder="" onChange={handleChange} value={userData.password} />

                <label className="form-label">Confirmer le mot de passe</label>
                <input className="form-input" type="password" name="confirmPassword" placeholder="" onChange={handleChange} value={userData.confirmPassword} />

                <div className="signin-actions">
                    <button className="signin-button" type="submit">S'inscrire</button>
                    <span className="signin-signup-text">Vous avez un compte </span>
                    <Link to="/login" className="login-signup-link">Connectez-vous ici</Link>
                </div>
            </form>
            {error && <p className="form-error">{error}</p>}
        </div>
    )
}

export default SignInForm;
