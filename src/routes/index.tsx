import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/AdminPages/Dashboard';
import ProductAdmin from '../pages/AdminPages/Product/ProductAdmin';
import AddProduct from '../pages/AdminPages/Product/AddProduct';
import CategoryAdmin from '../pages/AdminPages/Category/CategoryAdmin';
import AddCategory from '../pages/AdminPages/Category/AddCategory';
import UpdateCategory from '../pages/AdminPages/Category/UpdateCategory';
import HomePage from '../pages/UserPages/HomePage/HomePage';
import ProductPage from '../pages/UserPages/ProductPage/ProductPage';
import UpdateProduct from '../pages/AdminPages/Product/UpdateProduct';
import LoginPage from '../pages/UserPages/LoginPage/LoginPage';
import SignUpPage from '../pages/UserPages/SignUpPage/SignUpPage';
import CartPage from '../pages/UserPages/CartPage/CartPage';
import ProductDetail from '../pages/UserPages/ProductDetailPage/ProductDetailPage';
import NotFoundPage from '../pages/UserPages/NotFoundPage/NotFoundPage';
import ShipmentPage from '../pages/AdminPages/Shipment/ShipmentPage';
import AddShipment from '../pages/AdminPages/Shipment/AddShipment';
import UpdateShipment from '../pages/AdminPages/Shipment/UpdateShipment';
const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: '/',
            element: <HomePage />
         },
         {
            path: '/products',
            element: <ProductPage />
         },
         {
            path: '/login',
            element: <LoginPage />
         },
         {
            path: '/signup',
            element: <SignUpPage />
         },
         {
            path: '/cart',
            element: <CartPage />
         },
         {
            path: '/products/:id',
            element: <ProductDetail />
         }
      ]
   },
   {
      path: '*',
      element: <NotFoundPage/>
   },
   {
      path: '/manage',
      element: <AdminLayout />,
      children: [
         {
            path: 'dashboard',
            element: <Dashboard />
         },
         {
            path: 'products',
            element: <ProductAdmin />
         },
         {
            path: 'add-product',
            element: <AddProduct />
         },
         {
            path: 'categories',
            element: <CategoryAdmin />
         },
         {
            path: 'add-category',
            element: <AddCategory />
         },
         {
            path: 'update-category/:id',
            element: <UpdateCategory />
         },
         {
            path: 'products/:id',
            element: <UpdateProduct />
         },
         {
            path: 'shipments',
            element: <ShipmentPage />
         },
         {
            path: 'add-shipment',
            element: <AddShipment />
         },
         {
            path: 'shipments/:id',
            element: <UpdateShipment />
         }

         // {
         //    path: 'accounts',
         //    element: <AccountManager />
         // },
         // {
         //    path: 'accounts/:id/view',
         //    element: <AccountDetail />
         // }
      ]
   }
]);

export default router;
