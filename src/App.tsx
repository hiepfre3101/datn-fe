import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import router from './routes';
import { setItem } from './slices/cartSlice';
import { useDispatch } from 'react-redux';
function App() {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setItem());
   }, []);

   return <RouterProvider router={router} />;
}

export default App;
