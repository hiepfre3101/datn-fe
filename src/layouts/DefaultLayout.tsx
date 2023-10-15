import Header from '../components/layout/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const DefaultLayout = () => {
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
};

export default DefaultLayout;
