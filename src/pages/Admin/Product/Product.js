import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service';
import { Link, useNavigate } from 'react-router-dom';
import './product.css'; // Importez votre fichier de style CSS

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await productService.getProducts();
                setProducts(productsData.products);
            } catch (error) {
                setError('Erreur lors de la récupération des produits');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (id) => {
        navigate(`../edit/${id}`);
    };

    const handleDelete = (id) => {
        navigate(`../delete/${id}`);
    };

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <div>
            <h2>Liste de produits</h2>
            <table className="product-table"> 
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Prix</th>
                        {/* <th>Likes</th>
                        <th>Commentaires</th> */}
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.type}</td>
                            <td>{product.price} €</td>
                            {/* <td>{product.likes.length}</td>
                            <td>{product.comments.length}</td> */}
                            <td> <img className='image-admin' src={`http://localhost:4000/uploads/${product.images[0]}`} alt={product.title} /></td>
                            <td className="button-cell"> {/* Ajoutez une classe pour le style */}
                                <button className='btn-voir' >Voir</button>
                                <button className='btn-edit' onClick={() => handleEdit(product._id)}>Modifier</button>
                                <button className='btn-delete' onClick={() => handleDelete(product._id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;
