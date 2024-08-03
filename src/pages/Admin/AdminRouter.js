import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout, Dashboard, HomepageAdminEdit, HomepageAddSection } from '../Admin/';
import { User, AddUserRole, PermissionForm, AdminForm } from '../Admin/User';
import { Product, ProductAdd, ProductEdit, ProductDelete, AddAccessoryForm } from '../Admin/Product';
import { Carousel, Addcarousel, DeleteCarousel, EditCarousel } from '../Admin/Carousels';
import { CategoryForm, EditCategory, DeleteCategory, Category } from '../Admin/Category';
import HomepageAdmin from '../Admin/HomepageAdmin'; // Importer le composant HomepageAdmin
import Error from '../../_Utiles/Error';

const AdminRouter = () => {
    return (
        <div className='grid-container'>
            <Routes>
                <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='dashboard' element={<Dashboard />} />

                    <Route path='user'>
                        <Route path='index' element={<User />} />
                        <Route path='adduserrole' element={<AddUserRole />} />
                        <Route path='permission' element={<PermissionForm />} />
                        <Route path='adminform' element={<AdminForm />} />
                    </Route>

                    <Route path='product'>
                        <Route path='index' element={<Product />} />
                        <Route path='add' element={<ProductAdd />} />
                        <Route path='/product/addaccessoryform' element={<AddAccessoryForm />} />
                        <Route path='/product/edit/:id' element={<ProductEdit />} />
                        <Route path='/product/delete/:id' element={<ProductDelete />} />
                    </Route>

                    <Route path='carousel'>
                        <Route path='index' element={<Carousel />} />
                        <Route path='carousels/add' element={<Addcarousel />} />
                        <Route path='carousels/edit/:id' element={<EditCarousel />} />
                        <Route path='carousels/delete/:id' element={<DeleteCarousel />} />
                    </Route>

                    <Route path='category'>
                        <Route path='index' element={<CategoryForm />} />
                        <Route path='category/add' element={<CategoryForm />} />
                        <Route path='category/edit/:id' element={<EditCategory />} />
                        <Route path='category/delete/:id' element={<DeleteCategory />} />
                    </Route>

                    <Route path='homepage'>
                        <Route path='admin' element={<HomepageAdmin />} /> {/* Route pour la page d'accueil */}
                        <Route path='edit/:id' element={<HomepageAdminEdit />} /> {/* Route pour modifier une section */}
                        <Route path='add-section' element={<HomepageAddSection />} /> {/* Route pour ajouter une nouvelle section */}
                    </Route>

                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </div>
    );
};

export default AdminRouter;
