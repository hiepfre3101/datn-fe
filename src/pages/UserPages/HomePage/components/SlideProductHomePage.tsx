import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

// import required modules
import { Grid, Autoplay } from 'swiper/modules';
import { ConfigProvider, Rate } from 'antd';

export default function SlideProductHomepage() {
   return (
      <>
         <div className='featured-product-item lg:w-[calc(33%-10px)] max-lg:w-full    pt-[50px]'>
            <div className='fetured-title '>
               <p className='text-[#333333] text-[18px]  font-bold xl:mb-[50px]'>HOA QUẢ TƯƠI</p>
            </div>
            <Swiper
               slidesPerView={1}
               grid={{
                  rows: 2
               }}
               autoplay={{
                   delay: 2000,
                   disableOnInteraction: false,
                 }}
               breakpoints={{
                1201: {
                   slidesPerView: 1,
                   grid:{
                    rows: 2
                 }
                },
                1200: {
                    slidesPerView: 1,
                    grid:{
                        rows: 1
                     }
                  
                },
                991 : {
                    slidesPerView: 1,
                    grid:{
                        rows: 1
                     }
                  
                },
                990: {
                    slidesPerView: 2,
                    grid:{
                        rows: 1
                     }
                },
                641: {
                   slidesPerView: 2,
                   grid:{
                    rows: 1
                 }
                },
                1: {
                    grid:{
                        rows: 1
                     },
                   slidesPerView: 1
                }
             }}
               spaceBetween={30}
               modules={[Grid, Autoplay]}
               className='mySwiper xl:h-[510px]   featured-product'
            >
               <SwiperSlide className='h-[29%] bg-white !mt-[20px] '>
                  <div className='featured-product-item-slide flex items-center '>
                     <div className='silde-img min-w-[149px] min-h-[149px] max-w-[149px] max-h-[149px]'>
                        <img src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product-2/p-5.jpg' alt='' />
                     </div>
                     <div className='slide-content flex flex-col w-[calc(100%-150px)] text-left'>
                        <div className='product-name text-[#333333] mb-[10px] font-bold xl:text-[18px] max-xl:text-[16px]'>Hạnh nhân Ả Rập</div>
                        <div className='rate'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <div className='price-box'>
                           <p className='price mt-[9px] flex items-center  font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                              300.000{' '}
                              <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                                 500.000
                              </span>
                           </p>
                        </div>
                     </div>
                     
                  </div>
               </SwiperSlide>
               <SwiperSlide className='h-[29%] bg-white !mt-[20px] '>
                  <div className='featured-product-item-slide flex items-center '>
                     <div className='silde-img min-w-[149px] min-h-[149px] max-w-[149px] max-h-[149px]'>
                        <img src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product-2/p-5.jpg' alt='' />
                     </div>
                     <div className='slide-content flex flex-col w-[calc(100%-150px)] text-left'>
                        <div className='product-name text-[#333333] mb-[10px] font-bold xl:text-[18px] max-xl:text-[16px]'>Hạnh nhân Ả Rập</div>
                        <div className='rate'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <div className='price-box'>
                           <p className='price mt-[9px] flex items-center  font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                              300.000{' '}
                              <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                                 500.000
                              </span>
                           </p>
                        </div>
                     </div>
                     
                  </div>
               </SwiperSlide>
               <SwiperSlide className='h-[29%] bg-white !mt-[20px] '>
                  <div className='featured-product-item-slide flex items-center '>
                     <div className='silde-img min-w-[149px] min-h-[149px] max-w-[149px] max-h-[149px]'>
                        <img src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product-2/p-5.jpg' alt='' />
                     </div>
                     <div className='slide-content flex flex-col w-[calc(100%-150px)] text-left'>
                        <div className='product-name text-[#333333] mb-[10px] font-bold xl:text-[18px] max-xl:text-[16px]'>Hạnh nhân Ả Rập</div>
                        <div className='rate'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <div className='price-box'>
                           <p className='price mt-[9px] flex items-center  font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                              300.000{' '}
                              <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                                 500.000
                              </span>
                           </p>
                        </div>
                     </div>
                     
                  </div>
               </SwiperSlide>
               <SwiperSlide className='h-[29%] bg-white !mt-[20px] '>
                  <div className='featured-product-item-slide flex items-center '>
                     <div className='silde-img min-w-[149px] min-h-[149px] max-w-[149px] max-h-[149px]'>
                        <img src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product-2/p-5.jpg' alt='' />
                     </div>
                     <div className='slide-content flex flex-col w-[calc(100%-150px)] text-left'>
                        <div className='product-name text-[#333333] mb-[10px] font-bold xl:text-[18px] max-xl:text-[16px]'>Hạnh nhân Ả Rập</div>
                        <div className='rate'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <div className='price-box'>
                           <p className='price mt-[9px] flex items-center  font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                              300.000{' '}
                              <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                                 500.000
                              </span>
                           </p>
                        </div>
                     </div>
                     
                  </div>
               </SwiperSlide>
            </Swiper>
         </div>
      </>
   );
}