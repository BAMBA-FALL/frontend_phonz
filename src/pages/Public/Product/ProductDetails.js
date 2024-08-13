import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service';
import { useParams } from 'react-router-dom';
import { usePanier } from '../Panier/PanierContext'; // Assurez-vous que le chemin est correct
import './productDetails.css';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [highlightedImage, setHighlightedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [reservationDate, setReservationDate] = useState(null);
  const { productId } = useParams();
  const { addProductToPanier } = usePanier(); // Assurez-vous que la fonction existe dans votre contexte

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId);
        setProduct(productData.product);
        if (productData.product.colors.length > 0) {
          setSelectedColor(productData.product.colors[0]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit:', error);
        setError('Erreur lors de la récupération des détails du produit');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addProductToPanier(product._id, 1); // Ajouter le produit avec une quantité de 1
      setReservationDate(new Date()); // Afficher le champ de saisie de date après avoir ajouté au panier
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    const imageForColor = product.images.find(image => image.color === color);
    if (imageForColor) {
      setHighlightedImage(imageForColor);
    }
  };

  const formatStorageCapacity = (capacity) => {
    if (capacity >= 1024) {
      const terabytes = (capacity / 1024).toFixed(1);
      return `${terabytes === '1.0' ? '1' : terabytes} TB`;
    } else {
      return `${capacity} Go`;
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product-details-container'>
      <div className='product-additional-images'>
        {product.images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:4000/uploads/${image}`}
            alt={product.title}
            className={`product-additional-image ${highlightedImage === image ? 'highlighted' : ''}`}
            onClick={() => setHighlightedImage(image)}
          />
        ))}
      </div>
      {highlightedImage && (
        <div className='product-highlighted-image-container'>
          <img
            src={`http://localhost:4000/uploads/${highlightedImage}`}
            alt={product.title}
            className='product-highlighted-image'
            width={400}
            height={400}
          />
        </div>
      )}

      <div className='product-items'>
        <h3 className='product-title'>{product.title}</h3>
        <p className='product-description'>{product.description}</p>
        <div className="color-buttons">
          {product.colors.map((color, index) => (
            <div className='carre-bouton' key={index}>
              <button
                style={{ backgroundColor: color }}
                className={`color-button ${color === selectedColor ? 'selected' : ''}`}
                onClick={() => handleColorClick(color)}
              />
            </div>
          ))}
        </div> 
        <p className='product-price'>Prix {product.price} €</p>
        <p>{product.type}</p>
        <p className="capacity-label">Capacité:</p> 
        <div className='storagelist'>
          {product.storageCapacity.map((capacity, index) => (
            <div key={index} className='storageCapacity'>
              {formatStorageCapacity(capacity)}
            </div>
          ))}
        </div>
        <button className='buttonClass' onClick={handleAddToCart}>Ajouter au panier</button>
        {reservationDate && (
          <div>
            <label htmlFor="reservationDate">Date de réservation :</label>
            <input type="date" id="reservationDate" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
          </div>
        )}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default ProductDetails;
