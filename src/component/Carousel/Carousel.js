import React, { useState } from 'react';
import './carousel.css'

// Importez les images depuis le dossier "images"
import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';

const Carousel = () => {
    // Liste des chemins des images pour le carrousel
    const images = [image1, image2, image3];

    // Utilisez useState pour gérer l'index de l'image actuellement affichée dans le carrousel
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fonction pour passer à l'image précédente
    const prevSlide = () => {
        const newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Fonction pour passer à l'image suivante
    const nextSlide = () => {
        const newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="carousel-container">
            {/* Affichez l'image actuelle */}
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
            
            {/* Boutons de navigation du carrousel */}
            <button onClick={prevSlide} className="carousel-button prev-button">Précédent</button>
            <button onClick={nextSlide} className="carousel-button next-button">Suivant</button>
        </div>
    );
};

export default Carousel;
