import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Home, Service, Contact, SearchResults, Homepage } from '../Public';
import Error from '../../_Utiles/Error';
import { ProductList, ProductByCategory, ProductDetails, CategoriesList, ShoppingCart } from '../Public/Product';
import Profile from '../Public/User/Profile';
import ProfileUpdate from './User/ProfileUpdate';
import Login from '../Auth/Login';
import SignInForm from '../Auth/SignInForm';
import SubcategoryPage from '../../pages/Public/SubcategoryPage'; // Assurez-vous que ce chemin est correct
import CategoryPage from '../../pages/Public/CategoryPage'; // Assurez-vous que ce chemin est correct

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="homepage" element={<Homepage />} />
                <Route path="service" element={<Service />} />
                <Route path="contact" element={<Contact />} />
                <Route path="shoppingcart" element={<ShoppingCart />} />
                <Route path="searchresults" element={<SearchResults />} />
                <Route path="signinform" element={<SignInForm />} />
                <Route path="productlist" element={<ProductList />} />
                <Route path="products/:productId" element={<ProductDetails />} />
                <Route path="products/category/:categoryId" element={<ProductByCategory />} />
                <Route path="categorieslist" element={<CategoriesList />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/update" element={<ProfileUpdate />} />
                <Route path="category/:categoryId" element={<CategoryPage />} /> {/* Route pour CategoryPage */}
                <Route path="subcategory/:subcategoryId" element={<SubcategoryPage />} /> {/* Route pour SubcategoryPage */}
            </Route>
            <Route path="*" element={<Error />} />
            <Route path="login" element={<Login />} />
        </Routes>
    );
};

export default PublicRouter;
