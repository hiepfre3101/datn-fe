import Header from '../components/layout/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import { useEffect } from 'react';
import { setItem } from '../slices/cartSlice';
import { setWishListName, setWishList } from '../slices/wishListSlice';
import { useDispatch } from 'react-redux';
import { useGetTokenQuery } from '../services/auth.service';
import { saveTokenAndUser } from '../slices/authSlice';

const DefaultLayout = () => {
   const dispatch = useDispatch();
   const { data, isLoading } = useGetTokenQuery();
   useEffect(() => {
      if (!isLoading && data) {
         dispatch(saveTokenAndUser({ accessToken: data.body.data.accessToken, user: data.body.data.data }));
         dispatch(setWishListName(data.body.data.data.userName || 'wishList'));
      }
      dispatch(setItem());
      dispatch(setWishList());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, isLoading]);

   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
};

export default DefaultLayout;
