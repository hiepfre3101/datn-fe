
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation,Pagination } from 'swiper/modules';

export default function ModalProductSlide() {
  return (
    <>
      <Swiper pagination={{clickable: true,}}navigation={true} modules={[Navigation,Pagination]}   className="mySwiper quickview h-[397px]">
        <SwiperSlide><img className=' w-[298px] object-fill m-auto' src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className=' w-[298px] object-fill m-auto' src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className=' w-[298px] object-fill m-auto' src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className=' w-[298px] object-fill m-auto' src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className=' w-[298px] object-fill m-auto' src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}