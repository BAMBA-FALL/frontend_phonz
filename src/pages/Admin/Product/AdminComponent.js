import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import ProductAdd from './ProductAdd';
import ProductDelete from './ProductDelete';
import ProductEdit from './ProductEdit';
import AddAccessoryForm from './AddAccessoryForm';

const AdminComponent = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/admin/products">Liste des produits</Link></li>
                    <li><Link to="/admin/products/add">Ajouter un produit</Link></li>
                    <li><Link to="/admin/products/delete">Supprimer un produit</Link></li>
                    <li><Link to="/admin/products/edit">Modifier un produit</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="products" element={<ProductList />} />
                <Route path="products/add" element={<ProductAdd />} />
                <Route path="products/addaccessoryform" element={<AddAccessoryForm />} />
                <Route path="products/delete" element={<ProductDelete />} />
                <Route path="products/edit" element={<ProductEdit />} />
            </Routes>
        </div>
    );
};

export default AdminComponent;
