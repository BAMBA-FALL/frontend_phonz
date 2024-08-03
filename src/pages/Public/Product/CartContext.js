import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const addToCart = (product, quantity = 1) => { // Quantité par défaut
    setCartItems((prevCartItems) => {
      // Rechercher un produit existant dans le panier en utilisant des critères uniques
      const existingItem = prevCartItems.find(
        (item) => item.id === product.id && item.color === product.color // Exemple: Utiliser ID et couleur
      );

      if (existingItem) {
        // Si le produit existe, incrémenter la quantité
        const newQuantity = existingItem.quantity + quantity;
        setQuantities({ ...quantities, [product.id]: newQuantity });
        return prevCartItems.map((item) =>
          item.id === product.id && item.color === product.color // Assurez-vous de mettre à jour le bon produit
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Si le produit est nouveau, l'ajouter au panier
        setQuantities({ ...quantities, [product.id]: quantity });
        return [...prevCartItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId)); // Retirer un produit du panier
  };

  const clearCart = () => {
    setCartItems([]); // Vider le panier
  };

  const increaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item // Augmenter la quantité
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } // Diminuer la quantité si > 1
          : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Calculer le prix total
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
