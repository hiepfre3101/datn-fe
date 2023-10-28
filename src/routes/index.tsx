import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/AdminPages/Dashboard';
import ProductAdmin from '../pages/AdminPages/Product/ProductAdmin';
import AddProduct from '../pages/AdminPages/Product/AddProduct';
import HomePage from '../pages/UserPages/HomePage/HomePage';
import ProductPage from '../pages/UserPages/ProductPage/ProductPage';
import LoginPage from '../pages/UserPages/LoginPage/LoginPage';
import SignUpPage from '../pages/UserPages/SignUpPage/SignUpPage';
import CartPage from '../pages/UserPages/CartPage/CartPage';
import ProductDetail from '../pages/UserPages/ProductDetailPage/ProductDetailPage';
import CheckOutPage from '../pages/UserPages/CheckOutPage/CheckOutPage';

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
            element: <CartPage/>
         },
         {
            path: '/productdetail',
            element: <ProductDetail/>
         },
         {
            path: '/checkout',
            element: <CheckOutPage/>
         }
      ]
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
