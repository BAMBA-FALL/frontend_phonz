import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service';
import { useParams, useNavigate } from 'react-router-dom';
import './productEdit.css';

const ProductEdit = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        price: 0,
        image: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await productService.getProductById(id);
                setFormData({
                    title: productData.product.title || '',
                    description: productData.product.description || '',
                    type: productData.product.type || '',
                    price: productData.product.price || 0,
                    image: productData.product.image || ''
                });
            } catch (error) {
                setError('Erreur lors de la récupération du produit');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await productService.updateProduct(id, formData);
            navigate('/admin')
        } catch (error) {
            console.error('Erreur lors de la modification du produit :', error);
        }
    };

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <div className="edit-product-container"> 
            <h2>Modifier un produit</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" value={formData.type} onChange={handleChange} />
                </label>
                <label>
                    Prix:
                    <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </label>

                <label className="edit-image-label">
                    Image actuelle:
                    {formData.image && <img src={`http://localhost:4000/uploads/${formData.image}`} alt="Product" className="current-edit-image" />}
                </label>
                <label className="edit-image-label">
                    Nouvelle image:
                    <input type="file" name="image" onChange={handleChange} className="edit-file-input" />
                </label>
                <button type="submit" className="edit-submit-button">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default ProductEdit;
