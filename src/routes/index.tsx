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
import OrderDetail from '../pages/UserPages/OderPage/OrderDetail'
import OrderPage from '../pages/UserPages/OderPage/OrderPage';
const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: '/',
            element: <HomePage />,
            errorElement: <NotFoundPage />
         },
         {
            path: '/products',
            element: <ProductPage />,
            errorElement: <NotFoundPage />
         },
         {
            path: '/login',
            element: <LoginPage />,
            errorElement: <NotFoundPage />
         },
         {
            path: '/signup',
            element: <SignUpPage />,
            errorElement: <NotFoundPage />
         },
         {
            path: '/cart',
            element: <CartPage />,
            errorElement: <NotFoundPage />
         },
         {
            path: '/orders',
            element: <OrderPage />
         },
         {
            path: '/products/:id',
            element: <ProductDetail />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'my-order/:id',
            element: <OrderDetail />,
            errorElement: <NotFoundPage />
         }
      ]
   },
   {
      path: '*',
      element: <NotFoundPage />,
      errorElement: <NotFoundPage />
   },
   {
      path: '/manage',
      element: <AdminLayout />,
      errorElement: <NotFoundPage />,
      children: [
         {
            path: 'dashboard',
            element: <Dashboard />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'products',
            element: <ProductAdmin />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'add-product',
            element: <AddProduct />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'categories',
            element: <CategoryAdmin />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'add-category',
            element: <AddCategory />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'update-category/:id',
            element: <UpdateCategory />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'products/:id',
            element: <UpdateProduct />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'shipments',
            element: <ShipmentPage />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'add-shipment',
            element: <AddShipment />,
            errorElement: <NotFoundPage />
         },
         {
            path: 'shipments/:id',
            element: <UpdateShipment />,
            errorElement: <NotFoundPage />
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
