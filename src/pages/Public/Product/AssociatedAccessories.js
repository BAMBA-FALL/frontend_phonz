import React, { useEffect, useState } from 'react';
import { productService } from '../../../_services/product.service'; // Service pour récupérer les accessoires
// import './AssociatedAccessories.css'; 

const AssociatedAccessories = ({ productId }) => { // Prend l'ID du produit en tant que prop
  const [accessories, setAccessories] = useState([]); // Liste des accessoires
  const [error, setError] = useState(null); // Gestion des erreurs

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const accessoriesData = await productService.getAccessoriesByProductId(productId); // Récupérer les accessoires associés
        setAccessories(accessoriesData); // Définir l'état avec la liste des accessoires
      } catch (error) {
        setError("Erreur lors de la récupération des accessoires.");
        console.error("Erreur:", error);
      }
    };

    fetchAccessories(); // Récupérer les accessoires
  }, [productId]); // Réexécuter lorsque productId change

  if (error) {
    return <div className="error">{error}</div>; // Afficher un message d'erreur
  }

  return (
    <div className="associated-accessories">
      <h3>Accessoires associés</h3>
      {accessories.length > 0 ? (
        <ul>
          {accessories.map((accessory) => (
            <li key={accessory._id}>
              <img
                src={`http://localhost:4000/uploads/${accessory.image}`} // Afficher l'image
                alt={accessory.title}
                width={50}
                height={50}
              />
              <p>{accessory.title}</p>
              <p>Prix : {accessory.price} €</p>
              <p>Description : {accessory.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun accessoire associé.</p>
      )}
    </div>
  );
};

export default AssociatedAccessories;
