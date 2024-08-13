import React, { useState, useEffect } from 'react';
import { usePanier } from '../Panier/PanierContext'; // Utilisez le bon chemin d'importation
import './shoppingCart.css';

const ShoppingCart = () => {
  const { panier, removeProductFromPanier, clearPanier } = usePanier();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let newTotalPrice = 0;
    panier.forEach((item) => {
      const quantity = item.quantite || 1; // Assurer que la quantité n'est pas NaN
      newTotalPrice += item.price * quantity; // Calculer le prix total
    });
    setTotalPrice(newTotalPrice);
  }, [panier]);

  const handlePlaceOrder = () => {
    setNotification("Le site est en cours de développement. La fonctionnalité de commande n'est pas encore disponible."); // Message informatif
  };

  return (
    <div>
      <h2>Panier</h2>
      {notification && <p className="notification">{notification}</p>} {/* Afficher les notifications */}
      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className='shopping-cart-container'>
          {panier.map((item) => (
            <div className='cart-item' key={item.produitId}>
              {/* Afficher les détails du produit */}
              <img
                className='product-image-panier'
                src={`http://localhost:4000/uploads/${item.image}`} // Assurez-vous que les images existent
                alt={item.title} // Assurez-vous que title existe
              />
              <div className='product-details'>
                <h3>{item.title}</h3> {/* Assurez-vous que title existe */}
                <p>Description: {item.description}</p> {/* Assurez-vous que description existe */}
                <p>Prix: {item.price} €</p> {/* Assurez-vous que price existe */}
                <p>Quantité: {item.quantite}</p>
              </div>
              <button
                className='remove-button'
                onClick={() => removeProductFromPanier(item.produitId)}
              >
                Retirer
              </button>
            </div>
          ))}
          <p>Prix total: {totalPrice} €</p>
          <button onClick={clearPanier}>Vider le panier</button>
          <button onClick={handlePlaceOrder}>Passer la commande</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
