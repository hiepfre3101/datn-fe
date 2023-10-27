import Header from '../components/layout/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice';
import { products } from '../productData';
const DefaultLayout = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(addItem(products));
   }, []);
   return (
      <>
         <Header />
         <div className='max-lg:mt-[70px] lg:mt-[100px]'>
            <Outlet />
         </div>
         <Footer />
      </>
   );
};

export default DefaultLayout;
