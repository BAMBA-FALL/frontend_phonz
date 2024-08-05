import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service';
import { categoryService } from '../../../_services/category.service';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Importez l'icône FaSearch
import './product.css'; // Importez votre fichier de style CSS

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategories = await categoryService.getAllCategoriesWithSubcategories();
                setCategories(allCategories);
            } catch (error) {
                setError('Erreur lors de la récupération des catégories');
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await productService.getProducts({
                    search: searchText,
                    category: selectedCategory,
                    subcategory: selectedSubcategory
                });
                setProducts(productsData.products);
            } catch (error) {
                setError('Erreur lors de la récupération des produits');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchText, selectedCategory, selectedSubcategory]);

    useEffect(() => {
        setFilteredProducts(products.filter(product =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
        ));
    }, [products, searchText]);

    const handleEdit = (id) => {
        navigate(`../edit/${id}`);
    };

    const handleDelete = (id) => {
        navigate(`../delete/${id}`);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleCategoryChange = async (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        setSelectedSubcategory(''); // Réinitialiser la sous-catégorie
        try {
            if (categoryId) {
                const subcategoriesData = await categoryService.getSubCategories(categoryId);
                setSubcategories(subcategoriesData);
            } else {
                setSubcategories([]);
            }
        } catch (error) {
            setError('Erreur lors de la récupération des sous-catégories');
        }
    };

    const handleSubcategoryChange = (e) => {
        setSelectedSubcategory(e.target.value);
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
            <div className="filters">
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchText}
                    onChange={handleSearchChange}
                />
                <button type="submit">
                    <FaSearch />
                </button>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Toutes les catégories</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
                    <option value="">Toutes les sous-catégories</option>
                    {subcategories.map(subcategory => (
                        <option key={subcategory._id} value={subcategory._id}>
                            {subcategory.name}
                        </option>
                    ))}
                </select>
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Description</th>
                        {/* <th>Type</th> */}
                        <th>Prix</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            {/* <td>{product.type}</td> */}
                            <td>{product.price} €</td>
                            <td>
                                <img className='image-admin' src={`http://localhost:4000/uploads/${product.images[0]}`} alt={product.title} />
                            </td>
                            <td className="button-cell">
                                <button className='btn-voir'>Voir</button>
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
