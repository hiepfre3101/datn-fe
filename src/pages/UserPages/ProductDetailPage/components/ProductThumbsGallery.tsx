import {  useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Swiperz from 'swiper';

export default function ProductThumbsGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiperz | null>(null);

  return (
    <>
      <Swiper
        // style={{
        //   '--swiper-navigation-color': '#fff',
        //   '--swiper-pagination-color': '#fff',
        // }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{swiper: thumbsSwiper && !thumbsSwiper['destroyed'] ? thumbsSwiper : null}}
        modules={[FreeMode, Navigation, Thumbs]}
        watchSlidesProgress={true}
        className="mySwiper2 product-detail-slide border-[1px] border-[#e2e2e2] overflow-hidden rounded-[5px]"
      >
        <SwiperSlide >
          <img src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg" />
        </SwiperSlide>
        <SwiperSlide >
          <img src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-4.jpg" />
        </SwiperSlide>
        <SwiperSlide >
          <img src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg" />
        </SwiperSlide>
        <SwiperSlide >
          <img src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg" />
        </SwiperSlide>
      
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        breakpoints={{

          480:{
            slidesPerView:4,
          },
          478:{
            slidesPerView:3,
          },
          0:{
            slidesPerView:3,
          }
        }}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper product-sub-img mx-[35px] sm:mt-[30px] max-sm:mt-[15px]"
      >
        <SwiperSlide className='cursor-pointer'>
          <img className='border-[1px] border-[#e2e2e2] rounded-[5px]' src="	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg" />
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer'>
          <img className='border-[1px] border-[#e2e2e2] rounded-[5px]' src="	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-4.jpg" />
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer'>
          <img className='border-[1px] border-[#e2e2e2] rounded-[5px]' src="	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg" />
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer'>
          <img className='border-[1px] border-[#e2e2e2] rounded-[5px]' src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg" />
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer'>
          <img className='border-[1px] border-[#e2e2e2] rounded-[5px]' src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
