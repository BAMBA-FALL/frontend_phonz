import React, { useState, useEffect } from "react";
import { carouselService } from "../../../_services/carousel.service"; // Vérifiez le chemin

const ProductCarousel = () => {
  const [mescarousel, setMescarousel] = useState([]); // État initialisé à un tableau vide
  const [error, setError] = useState(null); // Pour les erreurs potentielles
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const carouselData = await carouselService.getCarousel(); // Récupération des données
        setMescarousel(carouselData.mescarousel || []); // Assurez-vous qu'il y a un tableau, sinon utilisez un tableau vide
      } catch (err) {
        setError("Il y a eu une erreur lors de la récupération du carousel."); // Gestion des erreurs
      } finally{
        setLoading(false);
      }
    };

    fetchCarousel(); // Appel de la fonction asynchrone
  }, []); // Exécuter useEffect une seule fois au montage du composant
  if (loading) {
    return <p>Chargement en cours...</p>;
}

if (error) {
    return <p>Erreur : {error}</p>;
}

  return (
    <div>
      <h2>Carousel</h2>
      {error ? ( // Si erreur, afficher le message
        <p>{error}</p>
      ) : mescarousel.length > 0 ? ( // Si pas d'erreur, mais données non vides
        <div>
          {mescarousel.map((carousel) => (
            <div key={carousel._id}> {/* Utilisez _id ou un autre identifiant unique */}
              {/* <p>{carousel.title}</p> */}
              <p>{carousel.description}</p>
            </div>
          ))}
        </div>
      ) : ( // Si mescarousel est vide, afficher un message d'attente
        <p>Chargement du carousel...</p>
      )}
    </div>
  );
};

export default ProductCarousel;
