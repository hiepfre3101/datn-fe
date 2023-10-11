import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/AdminPages/Dashboard';

const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         // {
         //    path: '/',
         //    element: <HomePage />
         // },
         // {
         //    path: '/products',
         //    element: <ProductPage />
         // },
         // {
         //    path: '/login',
         //    element: <LoginPage />
         // },
         // {
         //    path: '/signup',
         //    element: <SignupPage />
         // }
      ]
   },
   {
      path: '/manage',
      element: <AdminLayout />,
      children: [
         {
            path: 'dashboard',
            element: <Dashboard />
         }
         // {
         //    path: 'products',
         //    element: <ProductAdmin />
         // },
         // {
         //    path: 'add-product',
         //    element: <AddProduct />
         // },
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
