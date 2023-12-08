import BannerHomePage from './components/BannerHomePage';
import SlideCateHomePage from './components/SlideCategoriesHomePage';
import '../../../css/hompage.css';
import SlideProductHomepage from './components/SlideProductHomePage';
import MyService from './components/MyService';
import BannerSales from './components/BannerSales';
import BestSellerProducts from './components/BestSellerProducts';
import HappyClient from './components/HappyClient';
import { useGetAllLiquidationProductQuery, useGetNewProductInStorageQuery, useGetProductSoldDescLimitQuery } from '../../../services/product.service';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const HomePage = () => {
   const { data: liquidationProducts } = useGetAllLiquidationProductQuery()
   const { data: ProductSoldBest } = useGetProductSoldDescLimitQuery()
   const { data: NewProduct } = useGetNewProductInStorageQuery()
   const [error, setError] = useState(false)

   const navigate = useNavigate()
   const location = useLocation();

   useEffect(() => {
      if(error) {
         message.error('Email này đã bị vô hiệu hóa')
      }
   }, [error])

   useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.toString()) {
         if (searchParams.has('err')) {
            setError(true)
            navigate('/')
         } else {
            const queryString = [...searchParams.entries()]
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
            
            // Kết quả
            const result = `?${queryString}`;
            navigate('/vnpay_return' + result)
         }
      }
   }, [location, navigate]);
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
                     <SlideProductHomepage data={liquidationProducts?.body.data} slideName="Sản phẩm đang hạ giá"></SlideProductHomepage>
                     <SlideProductHomepage data={ProductSoldBest?.body.data} slideName="Top 9 sản phẩm bán chạy nhất"></SlideProductHomepage>
                     <SlideProductHomepage data={NewProduct?.body.data} slideName="Top 9 sản phẩm mới"></SlideProductHomepage>
                  </div>
               </div>
            </section>
            <section className='space lg:mt-[100px] md:mt-[80px] max-md:mt-[60px]'></section>
         </div>
      </>
   );
};

export default HomePage;
