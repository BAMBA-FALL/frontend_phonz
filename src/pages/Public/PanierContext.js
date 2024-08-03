import React, { createContext, useContext, useState } from 'react';
import { panierService } from '../../_services/panier.service';

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);

  const addProductToPanier = async (produitId, quantite) => {
    try {
      const data = await panierService.addProductToPanier(produitId, quantite);
      setPanier(data.items || []);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit au panier:', error);
    }
  };

  const getPanier = async (userId) => {
    try {
      const data = await panierService.getPanier(userId);
      setPanier(data.items || []);
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
    }
  };

  const updateProductQuantity = async (produitId, quantite) => {
    try {
      const data = await panierService.updateProductQuantity(produitId, quantite);
      setPanier(data.items || []);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit dans le panier:', error);
    }
  };

  const removeProductFromPanier = async (produitId) => {
    try {
      const data = await panierService.removeProductFromPanier(produitId);
      setPanier(data.items || []);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit du panier:', error);
    }
  };

  const getCartCount = () => panier.reduce((total, item) => total + (item.quantite || 0), 0);

  return (
    <PanierContext.Provider value={{ panier, addProductToPanier, getPanier, updateProductQuantity, removeProductFromPanier, getCartCount }}>
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => {
  const context = useContext(PanierContext);
  if (!context) {
    throw new Error('usePanier must be used within a PanierProvider');
  }
  return context;
};
