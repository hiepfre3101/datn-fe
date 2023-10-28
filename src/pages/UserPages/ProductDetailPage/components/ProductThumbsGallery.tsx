import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../../../../css/productdetailpage.css'
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Swiperz from 'swiper';
import { IImageResponse } from '../../../../interfaces/image';

export default function ProductThumbsGallery({ body }: IImageResponse) {
   const [thumbsSwiper, setThumbsSwiper] = useState<Swiperz | null>(null);
   const [test,setTest] = useState(true)
   useEffect(()=>{
      setTest(!test)
      
   },[body])
   return (
      <>

<Swiper
            loop={true}

            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper['destroyed'] ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}

        className="mySwiper2 product-detail-slide "
      >
               {body?.map((item) => {
               return (
                  <>
                     <SwiperSlide  className='border border-[#e2e2e2] overflow-hidden' >
                        <img src={item.url} />
                     </SwiperSlide>
                  </>
               );
            })}
      </Swiper>


      <Swiper
       onSwiper={setThumbsSwiper}
       slidesPerView={4}
       spaceBetween={10}
       breakpoints={{
          480: {
             slidesPerView: 4
          },
          478: {
             slidesPerView: 3
          },
          0: {
             slidesPerView: 3
          }
       }}
       freeMode={true}
       watchSlidesProgress={true}
       modules={[FreeMode, Navigation, Thumbs]}
       className='mySwiper product-sub-img mx-[35px] sm:mt-[30px] max-sm:mt-[15px]'
      >
        {body?.map((item) => {
               return (
                  <>
                      <SwiperSlide  className='cursor-pointer'>
               <img
                  className='border-[1px] border-[#e2e2e2] rounded-[5px]'
                  src={item.url}
               />
            </SwiperSlide>
                  </>
               );
            })}
      </Swiper>
      </>
   );
}
