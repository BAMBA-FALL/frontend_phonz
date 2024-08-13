import React, { useContext } from 'react';
import './cartSummary.css';

const CartSummary = () => {

  return (
    <div className='recapu'>
      <h3>Récapitulatif du panier</h3>
      <div className='rec'>
       
      </div>
      <div className='prix-total'>
        <div className='nombre-article'>
          <p>Nombre total d'articles:</p>
        </div>
        <div className='prix'>
          <p>Total global: €</p>
        </div>
        <button className='commande'>Passer la commande</button>
      </div>
    </div>
  );
};

export default CartSummary;
