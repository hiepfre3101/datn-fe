
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation,Pagination } from 'swiper/modules';
import { IImageResponse } from '../../../../interfaces/image';
import { useState } from 'react';

export default function ModalProductSlide({ body }: IImageResponse) {
  console.log("slide rerender");
  const [number,setNumber ] = useState(0)
  
  return (
    <>
      <Swiper
      initialSlide={number}
      pagination={
        {clickable: true,}}
        navigation={true} 
        modules={[Navigation,Pagination]} 
        loop={true}  
        className="mySwiper quickview h-[397px]">
        {body?.map(item=>{
          return<>
                  <SwiperSlide><img className=' w-[298px] object-fill m-auto' src={item.url} alt="" /></SwiperSlide>
          </>
        })}
      </Swiper>
    </>
  );
}