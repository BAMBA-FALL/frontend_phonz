import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../_services/account.service';
import axios from 'axios';
import './loginForm.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Déclaration de la fonction setCsrfToken
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Appel de la fonction pour récupérer le jeton CSRF lors du montage du composant
    fetchCsrfToken();
  }, []);

  // Remplacez le bloc try-catch de fetchCsrfToken par ceci
  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://localhost:4000/get-csrf-token', { withCredentials: true });

      if (!response.data.csrfToken) {
        throw new Error('CSRF token not received');
      }

      setCsrfToken(response.data.csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error.message);
    }
  };

//essaie
  useEffect(()=>{
    const product = ()=>{
      try {
        
      } catch (error) {
        
      }
    }
  },[])

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);

    // Appel du service de connexion avec les identifiants
    accountService.login(credentials)
      .then(res => {
        // Enregistrement du token dans le service et redirection vers '/admin'
        accountService.saveToken(res.data.access_token);
        navigate('/admin');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            className="input-field"
            value={credentials.email}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="input-field"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">Se connecter</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
