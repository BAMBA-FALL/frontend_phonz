import React, { createContext, useContext, useState, useEffect } from 'react';
import { panierService } from '../../../_services/panier.service';
import { accountService } from '../../../_services/account.service'; // Vérifiez ce service

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [userId, setUserId] = useState(null);

  // Charger l'ID utilisateur depuis le service d'authentification
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUser = await accountService.getCurrentUser(); // Assurez-vous que cette méthode fonctionne
        setUserId(currentUser.id);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID utilisateur:', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const loadPanier = async () => {
      if (userId) {
        try {
          const data = await panierService.getPanier(userId);
          setPanier(data.items || []);
        } catch (error) {
          console.error('Erreur lors de la récupération du panier:', error);
        }
      } else {
        const savedPanier = localStorage.getItem('panier');
        setPanier(savedPanier ? JSON.parse(savedPanier) : []);
      }
    };

    loadPanier();
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      localStorage.setItem('panier', JSON.stringify(panier));
    }
  }, [panier, userId]);

  const addProductToPanier = async (produitId, quantite) => {
    try {
      const data = await panierService.addProductToPanier(produitId, quantite);
      setPanier(data.items || []);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit au panier:', error);
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

  const clearPanier = () => {
    setPanier([]);
    localStorage.removeItem('panier');
  };

  const getCartCount = () => panier.reduce((total, item) => total + (item.quantite || 0), 0);

  return (
    <PanierContext.Provider value={{ panier, addProductToPanier, updateProductQuantity, removeProductFromPanier, clearPanier, getCartCount, setUserId }}>
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
