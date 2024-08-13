import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout, Dashboard } from '../Admin/';
import { User, AddUserRole, PermissionForm, AdminForm } from '../Admin/User';
import { Product, ProductAdd, ProductEdit, ProductDelete, AddAccessoryForm } from '../Admin/Product';
import { CategoryForm, EditCategory, DeleteCategory, Category } from '../Admin/Category';
import { Addcarousel, Carousel, DeleteCarousel, EditCarousel } from '../Admin/Carousels';
import Error from '../../_Utiles/Error';
import { OrderPending, OrderHistory, ReturnsManagement } from '../Admin/Orders';
import { CustomersList, CustomerSegments, Reviews } from '../Admin/Customers';
import { Coupons, Banners, EmailMarketing } from '../Admin/Marketing';
import { StockList, ReplenishMent } from '../Admin/Stock';
import { SuppliersList, SupplierOrders } from '../Admin/Suppliers';
import { SupportTickets, ComplaintsHistory } from '../Admin/Complaints';
import { Page, Blog } from '../Admin/CMS';
import { GeneralSettings, UsersPermissions, Integrations } from '../Admin/Settings';
import { DeliveryMethods, DeliveryTracking } from '../Admin/Deliveries';
import { AdminLogs, OrderLogs } from '../Admin/Logs';
import { Transactions, PaymentSettings } from '../Admin/Payments';
import { Documentation, ContactSupport } from '../Admin/Support';
import { Themes } from '../Admin/Customization';

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
                        <Route path="/product/addaccessoryform" element={<AddAccessoryForm />} />
                        <Route path="/product/edit/:id" element={<ProductEdit />} />
                        <Route path="/product/delete/:id" element={<ProductDelete />} />
                    </Route>

                    <Route path='carousel'>
                        <Route path='index' element={<Carousel />} />
                        <Route path='carousels/add' element={<Addcarousel />} />
                        <Route path='carousels/edit/:id' element={<EditCarousel />} />
                        <Route path='carousels/delete/:id' element={<DeleteCarousel />} />
                    </Route>

                    <Route path='category'>
                        <Route path='index' element={<Category />} />
                        <Route path='category/add' element={<CategoryForm />} />
                        <Route path='category/edit/:id' element={<EditCategory />} />
                        <Route path='category/delete/:id' element={<DeleteCategory />} />
                    </Route>

                    {/* Adding missing routes for Admin functionalities */}
                    <Route path='orders'>
                        <Route path='pending' element={<OrderPending />} />
                        <Route path='history' element={<OrderHistory />} />
                        <Route path='returns' element={<ReturnsManagement />} />
                    </Route>

                    <Route path='customers'>
                        <Route path='list' element={<CustomersList />} />
                        <Route path='segments' element={<CustomerSegments />} />
                        <Route path='reviews' element={<Reviews />} />
                    </Route>

                    <Route path='marketing'>
                        <Route path='coupons' element={<Coupons />} />
                        <Route path='banners' element={<Banners />} />
                        <Route path='email-marketing' element={<EmailMarketing />} />
                    </Route>

                    <Route path='stock'>
                        <Route path='list' element={<StockList />} />
                        <Route path='replenishment' element={<ReplenishMent />} />
                    </Route>

                    <Route path='suppliers'>
                        <Route path='list' element={<SuppliersList />} />
                        <Route path='orders' element={<SupplierOrders />} />
                    </Route>

                    <Route path='support'>
                        <Route path='tickets' element={<SupportTickets />} />
                        <Route path='history' element={<ComplaintsHistory />} />
                    </Route>

                    <Route path='cms'>
                        <Route path='page' element={<Page />} />
                        <Route path='blog' element={<Blog />} />
                    </Route>

                    <Route path='settings'>
                        <Route path='general' element={<GeneralSettings />} />
                        <Route path='users' element={<UsersPermissions />} />
                        <Route path='integrations' element={<Integrations />} />
                    </Route>

                    <Route path='delivery'>
                        <Route path='methods' element={<DeliveryMethods />} />
                        <Route path='tracking' element={<DeliveryTracking />} />
                    </Route>

                    <Route path='logs'>
                        <Route path='admin-logs' element={<AdminLogs />} />
                        <Route path='order-history' element={<OrderLogs />} />
                    </Route>

                    <Route path='payments'>
                        <Route path='transactions' element={<Transactions />} />
                        <Route path='settings' element={<PaymentSettings />} />
                    </Route>

                    <Route path='support'>
                        <Route path='documentation' element={<Documentation />} />
                        <Route path='contact' element={<ContactSupport />} />
                    </Route>

                    <Route path='customization'>
                        <Route path='themes' element={<Themes />} />
                    </Route>

                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </div>
    );
};

export default AdminRouter;
