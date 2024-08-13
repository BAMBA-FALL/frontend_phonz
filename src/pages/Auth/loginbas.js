import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './loginForm.css'; 
import { accountService } from '../../_services/account.service';

const Login = () => {
    const navigate = useNavigate();
    const [credentials , setCredentials] = useState({
        email: '',
        password: ''
    });

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
        accountService.login(credentials)
            .then(res => {
                accountService.saveToken(res.data.access_token);
                navigate('/admin');
            })
            .catch(error => console.log(error));
    };


    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder='email' className="input-field" value={credentials.email} onChange={onChange} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder='password' className="input-field" value={credentials.password}  onChange={onChange}/>
                </div>
                <div>
                    <button type="submit">Se connecter</button>
                </div>
            </form>



            <div className="signin-actions">
                <button className="signin-button" type="submit">S'inscrire</button>
                <span className="signin-signup-text">Vous avez un compte </span>
                <Link to="/login" className="login-signup-link">Connectez-vous ici</Link>
                </div>


        </div>
    );
};

export default Login;
