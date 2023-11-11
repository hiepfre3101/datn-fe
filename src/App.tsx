import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import router from './routes';
import { setCartName, setItem } from './slices/cartSlice';
import { setwhishListName, setwhishList } from './slices/whishListSlice';
import { useDispatch } from 'react-redux';
import { useGetTokenQuery } from './services/auth.service';
import { saveTokenAndUser } from './slices/authSlice';
function App() {
   const dispatch = useDispatch();
   const { data, isLoading } = useGetTokenQuery();
   useEffect(() => {
      if (!isLoading && data) {
         dispatch(saveTokenAndUser({ accessToken: data.body.data.accessToken, user: data.body.data.data }));
         dispatch(setCartName(data.body.data.data.email || 'cart'));
         dispatch(setwhishListName(data.body.data.data.userName || 'whishList'));
      }
      dispatch(setItem());
      dispatch(setwhishList());
   }, [data, isLoading]);

   return <RouterProvider router={router} />;
}

export default App;
