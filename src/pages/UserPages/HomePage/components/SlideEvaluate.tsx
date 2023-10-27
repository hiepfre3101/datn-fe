// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { BiSolidQuoteAltRight } from 'react-icons/bi';
import { Navigation, Autoplay } from 'swiper/modules';

export default function SlideEvaluate() {
   return (
      <>
         <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
            <Swiper
               slidesPerView={2}
               spaceBetween={30}
               navigation={true}
               rewind={true}
               autoplay={{
                  delay: 4000,
                  disableOnInteraction: false
               }}
               breakpoints={{
                  1200: {
                     slidesPerView: 2
                  },
                  1: {
                     slidesPerView: 1
                  }
               }}
               modules={[Navigation, Autoplay]}
               className='mySwiper py-[30px] max-sm:py-[70px] h-[295px] max-sm:h-auto'
            >
               <SwiperSlide>
                  <div className='evaluate-wrap group'>
                     <div className='evaluate-item flex items-center max-sm:flex-wrap max-sm:justify-center max-sm:px-[10px]'>
                        <span className='customer-img rounded-[50%]  sm:mr-[30px] flex justify-center items-center   relative pb-[20px] '>
                           <img
                              className='min-w-[155px] max-h-[155px] max-w-[155px] min-h-[155px] max-sm:w-[155px] max-sm:h-[155px] rounded-[50%]'
                              src='https://scontent.xx.fbcdn.net/v/t1.15752-9/370302818_285558951052531_304895224891944816_n.png?stp=dst-png_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=510075&_nc_ohc=yqVW1ySaBmQAX_4gq3q&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTry6_BTiZ0pV517Yg84-NB2aY1ZuaVt4CP71QJEjrhPA&oe=6551DB15'
                              alt=''
                           />
                           <span className='evaluate-icon absolute w-[40px] h-[40px] flex items-center justify-center text-white rounded-[50%] bg-[#51A55C] bottom-0'>
                              <BiSolidQuoteAltRight></BiSolidQuoteAltRight>
                           </span>
                        </span>
                        <div className='evaluate-content text-left max-md:w-full'>
                           <p className='customer-name text-[#6f6f6f] leading-[30px] pt-[5px] text-[18px] max-sm:text-center  transition-colors duration-300'>
                              Năm nay tôi 20 tuổi rồi mà chưa gặp shop nào bán hàng uy tín thế này!
                           </p>
                           <p className='evaluate-title font-bold text-[#51A55C] sm:mt-[30px] max-sm:mt-[10px] text-[16px] max-sm:text-center'>
                              Nguyễn Quang Đăng
                           </p>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='evaluate-wrap group'>
                     <div className='evaluate-item flex items-center max-sm:flex-wrap max-sm:justify-center max-sm:px-[10px]'>
                        <span className='customer-img rounded-[50%]  sm:mr-[30px] flex justify-center items-center   relative pb-[20px] '>
                           <img
                              className='min-w-[155px] max-w-[155px] max-h-[155px] min-h-[155px] max-sm:w-[155px] max-sm:h-[155px] rounded-[50%]'
                              src='https://f10-zpc.zdn.vn/3830913784216089022/02c85a27594a8e14d75b.jpg'
                              alt=''
                           />
                           <span className='evaluate-icon absolute w-[40px] h-[40px] flex items-center justify-center text-white rounded-[50%] bg-[#51A55C] bottom-0'>
                              <BiSolidQuoteAltRight></BiSolidQuoteAltRight>
                           </span>
                        </span>
                        <div className='evaluate-content text-left max-md:w-full'>
                           <p className='customer-name text-[#6f6f6f] leading-[30px] pt-[5px] text-[18px] max-sm:text-center  transition-colors duration-300'>
                              Năm nay tôi 20 tuổi rồi mà chưa gặp shop nào bán hàng uy tín thế này!
                           </p>
                           <p className='evaluate-title font-bold text-[#51A55C] sm:mt-[30px] max-sm:mt-[10px] text-[16px] max-sm:text-center'>
                              Vừa đi tù về
                           </p>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='evaluate-wrap group'>
                     <div className='evaluate-item flex items-center max-sm:flex-wrap max-sm:justify-center max-sm:px-[10px]'>
                        <span className='customer-img rounded-[50%]  sm:mr-[30px] flex justify-center items-center   relative pb-[20px] '>
                           <img
                              className='min-w-[155px] max-h-[155px] max-w-[155px] min-h-[155px] max-sm:w-[155px] max-sm:h-[155px] rounded-[50%]'
                              src='https://scontent.xx.fbcdn.net/v/t1.15752-9/370302818_285558951052531_304895224891944816_n.png?stp=dst-png_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=510075&_nc_ohc=yqVW1ySaBmQAX_4gq3q&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTry6_BTiZ0pV517Yg84-NB2aY1ZuaVt4CP71QJEjrhPA&oe=6551DB15'
                              alt=''
                           />
                           <span className='evaluate-icon absolute w-[40px] h-[40px] flex items-center justify-center text-white rounded-[50%] bg-[#51A55C] bottom-0'>
                              <BiSolidQuoteAltRight></BiSolidQuoteAltRight>
                           </span>
                        </span>
                        <div className='evaluate-content text-left max-md:w-full'>
                           <p className='customer-name text-[#6f6f6f] leading-[30px] pt-[5px] text-[18px] max-sm:text-center  transition-colors duration-300'>
                              Năm nay tôi 20 tuổi rồi mà chưa gặp shop nào bán hàng uy tín thế này!
                           </p>
                           <p className='evaluate-title font-bold text-[#51A55C] sm:mt-[30px] max-sm:mt-[10px] text-[16px] max-sm:text-center'>
                              Nguyễn Quang Đăng
                           </p>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='evaluate-wrap group'>
                     <div className='evaluate-item flex items-center max-sm:flex-wrap max-sm:justify-center max-sm:px-[10px]'>
                        <span className='customer-img rounded-[50%]  sm:mr-[30px] flex justify-center items-center   relative pb-[20px] '>
                           <img
                              className='min-w-[155px] max-w-[155px] max-h-[155px] min-h-[155px] max-sm:w-[155px] max-sm:h-[155px] rounded-[50%]'
                              src='https://scontent.xx.fbcdn.net/v/t1.15752-9/370225932_326221670056819_7206820702909315237_n.png?_nc_cat=108&ccb=1-7&_nc_sid=510075&_nc_ohc=euOrGi3LLz8AX-koY-9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSM61_mUGEvr7RtjF78nmtsSoESC3uDSebNPVr8ZEFbzQ&oe=6551F434'
                              alt=''
                           />
                           <span className='evaluate-icon absolute w-[40px] h-[40px] flex items-center justify-center text-white rounded-[50%] bg-[#51A55C] bottom-0'>
                              <BiSolidQuoteAltRight></BiSolidQuoteAltRight>
                           </span>
                        </span>
                        <div className='evaluate-content text-left max-md:w-full'>
                           <p className='customer-name text-[#6f6f6f] leading-[30px] pt-[5px] text-[18px] max-sm:text-center  transition-colors duration-300'>
                              Năm nay tôi 20 tuổi rồi mà chưa gặp shop nào bán hàng uy tín thế này!
                           </p>
                           <p className='evaluate-title font-bold text-[#51A55C] sm:mt-[30px] max-sm:mt-[10px] text-[16px] max-sm:text-center'>
                              Vừa đi tù về
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
