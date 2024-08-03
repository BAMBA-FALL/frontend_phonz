import React from 'react';

function Cards({ item }) {
  const { title, description, price, type, categorie, images } = item;

  return (
    <div className='product-card'>
      <div className='product-image'>
        {/* Afficher seulement la première image */}
        <img src={`http://localhost:4000/uploads/${images[0]}`} alt={title} />
      </div>

      <div className='details'>
        <p>{title}</p>
        <p>Description: {description}</p>
        <p>Prix: {price} €</p>
        <p>Type: {type}</p>
        <p>Catégorie: {categorie}</p>
      </div>
    </div>
  );
}

export default Cards;
