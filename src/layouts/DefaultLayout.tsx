import Header from '../components/layout/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const DefaultLayout = () => {
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
