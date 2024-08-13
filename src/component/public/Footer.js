// Footer.js

import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <p>Informations de contact :</p>
        <ul>
          <li>Email : khadimmbackefall1@gmail.com</li>
          <li>Téléphone : +33605809262</li>
          <li>Adresse : 9 Place Lucie Aubrac, Choisy-le-Roi, France</li>
        </ul>
      </div>
      <div className='footer-social'>
        <p>Suivez-nous :</p>
        <ul>
          <li><a href='/home'>Facebook</a></li>
          <li><a href='/home'>Twitter</a></li>
          <li><a href='/home'>Instagram</a></li>
        </ul>
      </div>
      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} E-commerce.com. Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default Footer;
