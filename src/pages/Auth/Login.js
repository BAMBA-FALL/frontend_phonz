import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginForm.css';
import { accountService } from '../../_services/account.service';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await accountService.login(credentials);
      console.log('Token after login:', response.data.access_token);
      console.log('Connecté avec succès');
      
      localStorage.setItem('token', response.data.access_token);

      navigate('/admin');
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label className="login-label" htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" className="login-input-field" value={credentials.email} onChange={onChange} />
        </div>

        <div>
          <label className="login-label" htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" className="login-input-field" value={credentials.password} onChange={onChange} />
        </div>
        
        <div className="login-actions">
          <button type="submit" className="login-button">Se connecter</button>
          <span className="login-signup-text">Vous n'avez pas de compte ?</span>
          <Link to="/signinform" className="login-signup-link">Inscrivez-vous ici</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
