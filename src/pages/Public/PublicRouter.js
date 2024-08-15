// PublicRouter.js (ou le fichier où vous gérez les routes)

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  { StripeWrapper, PaymentPage} from '../Public/Payment'
import { Layout} from '../Public';
import { Login , SignInForm} from '../Auth'
import {Homepage, Contact, Service, Home} from '../Public/Home'
import { ProductList, ProductDetails, ProductByCategory, ShoppingCart, CartSummary} from '../Public/Product'
import { CarouselComponent, CarouselProduct } from '../Public/Carousel';
import { Profile, ProfileUpdate} from '../Public/User'
import { CategoryPage, SubcategoryPage, CategoriesList } from '../Public/Category';
import { SearchResults } from '../Public/search';
import Error from '../../_Utiles/Error';

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productlist" element={<Home />} />
        <Route path="service" element={<Service />} />
        <Route path="contact" element={<Contact />} />
        <Route path="shoppingcart" element={<ShoppingCart />} />
        <Route path="searchresults" element={<SearchResults />} />
        <Route path="login" element={<Login />} />
        <Route path="signinform" element={<SignInForm />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="products/category/:categoryId" element={<ProductByCategory />} />
        <Route path="categorieslist" element={<CategoriesList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/update" element={<ProfileUpdate />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
        <Route path="subcategory/:subcategoryId" element={<SubcategoryPage />} />
        <Route path="carouselcomponent" element={<CarouselComponent />} />
        <Route path="payment" element={<StripeWrapper />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default PublicRouter;
