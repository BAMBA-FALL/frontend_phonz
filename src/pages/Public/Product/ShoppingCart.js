import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePanier } from '../PanierContext';
import './shoppingCart.css';
import panier from '../../../assets/panier.png';

const ShoppingCart = () => {
  const { panier: cartItems, removeProductFromPanier: removeFromCart, updateProductQuantity: updateQuantity, clearCart } = usePanier();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Debug: Afficher les items du panier
    console.log('Cart items:', cartItems);

    // Calculer le prix total du panier
    let newTotalPrice = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => {
        const quantity = item.quantite || 1;
        newTotalPrice += item.produit.price * quantity;
      });
    }
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handleQuantityChange = (productId, quantity) => {
    // Appeler la fonction pour mettre à jour la quantité
    updateQuantity(productId, quantity)
      .then(() => {
        console.log('Quantité mise à jour:', productId, quantity);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la quantité:', error);
      });
  };

  const handlePlaceOrder = () => {
    setNotification("Le site est en cours de développement. La fonctionnalité de commande n'est pas encore disponible.");
  };

  // Déboguer pour s'assurer que les données sont correctement passées et affichées
  console.log('Panier:', cartItems);

  return (
    <div>
      <h2>Détails de votre panier</h2>
      {notification && <p className="notification">{notification}</p>} 
      {cartItems.length === 0 ? (
        <div className='panier-container'>
          <p>Oupss</p>
          <p>Votre panier est vide</p>
          <Link to='/home'>
            <img className='panier-vide' src={panier} alt="panier-vide" />
          </Link>
          <button className='panier-achat'>
            <Link to="/home"></Link>Commencer vos achats
          </button>
        </div>
      ) : (
        <div className='shopping-cart-container'>
          {cartItems.map((item) => (
            <div className='cart-item' key={item.produit._id}>
              {console.log('Item du panier:', item)}
              {item.produit.images && item.produit.images[0] ? (
                <img
                  className='product-image-panier'
                  src={`http://localhost:4000/uploads/${item.produit.images[0]}`}
                  alt={item.produit.title}
                />
              ) : (
                <div className='product-image-placeholder'>No Image</div>
              )}
              <div className='product-details'>
                <h3>{item.produit.title}</h3>
                <p>Description: {item.produit.description}</p>
                <p>Prix: {item.produit.price} €</p>
                <div className="quantity-selector">
                  <button onClick={() => handleQuantityChange(item.produit._id, Math.max(item.quantite - 1, 1))}>-</button>
                  <span>{item.quantite}</span>
                  <button onClick={() => handleQuantityChange(item.produit._id, item.quantite + 1)}>+</button>
                </div>
              </div>
              <button
                className='remove-button'
                onClick={() => removeFromCart(item.produit._id)}
              >
                Retirer
              </button>
            </div>
          ))}
          <p>Prix total: {totalPrice} €</p>
          {/* <button onClick={clearCart}>Vider le panier</button> */}
          <button onClick={handlePlaceOrder}>Passer la commande</button> 
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
