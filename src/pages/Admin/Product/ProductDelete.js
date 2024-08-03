import React from 'react';
import { productService } from '../../../_services/product.service';
import { useParams, useNavigate } from 'react-router-dom';
import './productDelete.css';

const ProductDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await productService.deleteProduct(id);
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
           
        }
    };

    const confirmDelete = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            handleDelete();
        }
    };

    return (
        <div className="delete-product-container">
            <h2>Supprimer un produit</h2>
            <button className="delete-product-button" onClick={confirmDelete}>Supprimer le produit</button>
        </div>
    );
};

export default ProductDelete;
