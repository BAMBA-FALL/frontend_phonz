// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';



import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { carouselService } from '../../_services/carousel.service';

const CarouselProduct = () => {
    const [carousels, setCarousels] = useState([]);
    
    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const data = await carouselService.getCarousel();
                setCarousels(data.carousels); // Assurez-vous que le backend renvoie un objet contenant un tableau de carousels avec la clé "carousels"
            } catch (error) {
                console.error('Erreur lors de la récupération des carousels :', error);
            }
        };

        fetchCarousels();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {carousels.map(carousel => (
                <div key={carousel._id}>
                    {/* Affichez les détails du carousel ici */}
                    <h3>{carousel.title}</h3>
                    <p>{carousel.description}</p>
                    {/* Affichez les images du carousel ici */}
                    {carousel.images.map((image, index) => (
                        <img key={index} src={`http://localhost:4000/uploads/${image[0]}`} alt={carousel.title} />
                    ))}
                </div>
            ))}
        </Slider>
    );
};

export default CarouselProduct;




const Mapest = ()=>{


    return (
        <div>
            {products.map( product=>(
                <div key={product_.id}>
                    <p> {product} </p>
                </div>
            ))}
        </div>
    )
}


import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './productDetails.css';
import ReactImageMagnify from 'react-image-magnify'; // Importez le composant ReactImageMagnify

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [highlightedImage, setHighlightedImage] = useState(null);
  const { productId } = useParams();
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId);
        setProduct(productData.product);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit:', error);
        setError('Veuillez-vous connecter pour ajouter un produit dans le panier');
      }
    };
  
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) {
      console.error('Erreur: le produit est null.');
      setError('Veuillez-vous connecter pour ajouter un produit dans le panier');
      return;
    }

    const quantity = 1; // Définissez la quantité à ajouter au panier

    addToCart(product._id, quantity); // Appelez addToCart avec l'ID du produit et la quantité
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product-details-container'>
      <div className='product-additional-images'>
        {product.images.map(image => (
          <img
            key={image}
            src={`http://localhost:4000/uploads/${image}`}
            alt={product.title}
            className={`product-additional-image ${highlightedImage === image ? 'highlighted' : ''}`}
            onClick={() => setHighlightedImage(image)}
          />
        ))}
      </div>
      {/* Utilisez le composant ReactImageMagnify avec l'image principale */}
      {/* {highlightedImage && (
        <div className='product-highlighted-image-container'>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.title,
                isFluidWidth: true,
                src: `http://localhost:4000/uploads/${highlightedImage}`,
              },
              largeImage: {
                src: `http://localhost:4000/uploads/${highlightedImage}`,
                width: 400,
                height: 400,
              },
              lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
            }}
          />
        </div>
      )} */}
      <div className='product-items'>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Couleur: {product.color}</p>
        <p>{product.price} €</p>
        <p>{product.type}</p>
        <button className='buttonClass' onClick={handleAddToCart}>Ajouter au panier</button>
      </div>
      {error && <div>{error} </div>}
    </div>
  );
};

export default ProductDetails;






import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import './productDetails.css';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [highlightedImage, setHighlightedImage] = useState(null);
  const { productId } = useParams();
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.getProductById(productId);
        setProduct(productData.product);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit:', error);
        setError('Veuillez-vous connecter pour ajouter un produit dans le panier');
      }
    };
  
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) {
      console.error('Erreur: le produit est null.');
      setError('Veuillez-vous connecter pour ajouter un produit dans le panier');
      return;
    }

    const quantity = 1; // Définissez la quantité à ajouter au panier

    addToCart(product._id, quantity); // Appelez addToCart avec l'ID du produit et la quantité
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
            width={350}
            height={350}
          />
        </div>
      )}
      <div className='product-items'>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Couleur: {product.color}</p>
        <p>{product.price} €</p>
        <p>{product.type}</p>
        <button className='buttonClass' onClick={handleAddToCart}>Ajouter au panier</button>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default ProductDetails;




--pink: #db0680;
--black: #010101;
--green: #3baf35;
--greenHovered: #21b21a;
--greenBuyback: #91ba44;
--purplePixeasy: #7b79d1;
--bluePixcare: #4dada6;
--lightGrey6x: #fafafa;
--lightGrey5x: #f5f5f5;
--lightGrey4x: #f0f0f0;
--lightGrey3x: #e0e0e0;
--lightGrey2x: silver;
--lightGrey: #a0a0a0;
--grey: gray;
--darkGrey: #606060;
--darkGrey2x: #404040;
--darkGrey3x: #202020;
--yellow: #F6C032;
--green-boost: #5AC633;


"#F5F6F6", "#3B556D", "#8FB43A", "#7F5056"