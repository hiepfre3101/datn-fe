import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/AdminPages/Dashboard';
import ProductAdmin from '../pages/AdminPages/Product/ProductAdmin';
import AddProduct from '../pages/AdminPages/Product/AddProduct';
import CategoryAdmin from '../pages/AdminPages/Category/CategoryAdmin';
import AddCategory from '../pages/AdminPages/Category/AddCategory';
import UpdateCategory from '../pages/AdminPages/Category/UpdateCategory';

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
            path: 'update-category',
            element: <UpdateCategory />
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
