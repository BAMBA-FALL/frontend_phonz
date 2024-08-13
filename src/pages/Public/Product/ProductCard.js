import React from 'react';
import { Link } from 'react-router-dom';
import './productCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.image} alt={product.name} className="product-image" />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{product.price} €</p>
            </Link>
        </div>
    );
};

export default ProductCard;
