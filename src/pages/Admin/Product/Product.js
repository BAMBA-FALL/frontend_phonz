import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { productService } from '../../../_services/product.service';
import { categoryService } from '../../../_services/category.service';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import de l'icône FaSearch
import './product.css'; // Import de votre fichier de style CSS

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

    const columns = [
        {
            title: 'Titre',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Prix',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `${text} €`,
        },
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: images => (
                <img
                    className='image-admin'
                    src={`http://localhost:4000/uploads/${images[0]}`}
                    alt='Product'
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="button-cell">
                    <Button className='btn-voir' onClick={() => navigate(`../view/${record._id}`)}>Voir</Button>
                    <Button className='btn-edit' onClick={() => handleEdit(record._id)}>Modifier</Button>
                    <Button className='btn-delete' onClick={() => handleDelete(record._id)}>Supprimer</Button>
                </div>
            ),
        },
    ];

    if (loading) {
        return <div className="loading-container">Chargement en cours...</div>;
    }

    if (error) {
        return <div className="error-message">Erreur : {error}</div>;
    }

    return (
        <div className="product-table-container">
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
            <Table
                dataSource={filteredProducts}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default Product;
