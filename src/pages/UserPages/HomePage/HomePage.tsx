import BannerHomePage from './components/BannerHomePage';
import SlideCateHomePage from './components/SlideCategoriesHomePage';
import '../../../css/hompage.css';
import SlideProductHomepage from './components/SlideProductHomePage';
import MyService from './components/MyService';
import BannerSales from './components/BannerSales';
import BestSellerProducts from './components/BestSellerProducts';
import HappyClient from './components/HappyClient';

const HomePage = () => {
 

   return (
   
      <>
         <div className='main '>
            <SlideCateHomePage></SlideCateHomePage>
            <BannerHomePage></BannerHomePage>
            <MyService />
            <BannerSales />
            <BestSellerProducts />
            <HappyClient />
            <section className='section-featured-product flex bg-[#f8f8f8] pb-[20px]'>
               <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] w-full'>
                  <div className='featured-product-content flex  gap-[15px] max-lg:flex-wrap'>
                     <SlideProductHomepage></SlideProductHomepage>
                     <SlideProductHomepage></SlideProductHomepage>
                     <SlideProductHomepage></SlideProductHomepage>
                  </div>
               </div>
            </section>
            <section className='space lg:mt-[100px] md:mt-[80px] max-md:mt-[60px]'></section>
         </div>
      </>
   );
};

export default HomePage;
