import BannerHomePage from './components/BannerHomePage';
import SlideCateHomePage from './components/SlideCategoriesHomePage';
import { BsTruck, BsCurrencyDollar } from 'react-icons/bs';
import { FaHeadphones, FaArrowRotateRight } from 'react-icons/fa6';
import '../../../css/hompage.css';
import SlideBestProduct from './components/SlideBestProduct';
import SlideEvaluate from './components/SlideEvaluate';
import SlideProductHomepage from './components/SlideProductHomePage';
const HomePage = () => {
   return (
      <>
         <div className='main '>
            <SlideCateHomePage></SlideCateHomePage>
            <BannerHomePage></BannerHomePage>
            <section className='section-services lg:my-[100px] md:my-[80px] max-md:my-[60px]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <div className='list-service flex flex-wrap lg:justify-between md:justify-around md:gap-y-[30px] max-md:gap-[12px]'>
                     <div className='service-item max-md:w-full p-[20px] border-[1px] border-[rgba(0,0,0,10%)] lg:w-[calc(25%-30px)]  md:w-[calc(50%-30px)] rounded-[5px] flex items-center'>
                        <div className='service-icon text-[#51A55C] text-[30px]'>
                           <BsTruck></BsTruck>
                        </div>
                        <div className='service-text ml-[20px]'>
                           <p className='service-title text-[#333333] font-bold text-[18px]'>Miễn phí ship</p>
                           <p className='text-[16px]'>Cho đơn hàng trên 1 triệu</p>
                        </div>
                     </div>
                     <div className='service-item max-md:w-full p-[20px] border-[1px] border-[rgba(0,0,0,10%)] lg:w-[calc(25%-30px)]  md:w-[calc(50%-30px)] rounded-[5px] flex items-center'>
                        <div className='service-icon text-[#51A55C] text-[30px]'>
                           <BsCurrencyDollar></BsCurrencyDollar>
                        </div>
                        <div className='service-text ml-[20px]'>
                           <p className='service-title text-[#333333] font-bold text-[18px]'>Đảm bảo trở lại</p>
                           <p className='text-[16px]'>Đảm bảo lại tiền.</p>
                        </div>
                     </div>
                     <div className='service-item max-md:w-full p-[20px] border-[1px] border-[rgba(0,0,0,10%)] lg:w-[calc(25%-30px)]  md:w-[calc(50%-30px)] rounded-[5px] flex items-center'>
                        <div className='service-icon text-[#51A55C] text-[30px]'>
                           <FaHeadphones></FaHeadphones>
                        </div>
                        <div className='service-text ml-[20px]'>
                           <p className='service-title text-[#333333] font-bold text-[18px]'>Hỗ trợ trực tuyến 24/7</p>
                           <p className='text-[16px]'>Hỗ trợ khách hàng tinh tế</p>
                        </div>
                     </div>
                     <div className='service-item max-md:w-full p-[20px] border-[1px] border-[rgba(0,0,0,10%)] lg:w-[calc(25%-30px)]  md:w-[calc(50%-30px)] rounded-[5px] flex items-center'>
                        <div className='service-icon text-[#51A55C] text-[30px]'>
                           <FaArrowRotateRight></FaArrowRotateRight>
                        </div>
                        <div className='service-text ml-[20px]'>
                           <p className='service-title text-[#333333] font-bold text-[18px]'>Hoàn trả 2 ngày</p>
                           <p className='text-[16px]'>Nếu hàng hóa có vấn đề</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className='section-banner xl:py-[80px] lg:py-[80px] max-lg:py-[60px]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <div className='banner-content flex flex-wrap  md:gap-[30px] max-md:gap-[12px] justify-between'>
                     <div className='banner-item md:w-[calc(50%-15px)] max-md:w-[100%] '>
                        <a href='#' className='banner-img flex items-center relative'>
                           <img
                              className='w-full rounded-[5px]'
                              src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/banner/banner-1.png'
                              alt=''
                           />
                           <div className='banner-text absolute m-w-[35%] max-lg:left-[15px] max-lg:max-w-full lg:left-[30px] '>
                              <span className='banner-title text-[#51A55C] relative uppercase font-bold text-[16px]'>
                                 Giảm giá 80%
                              </span>
                              <p className='banner-sub-title  lg:text-[28px] md:text-[23px] sm:text-[28px] max-sm:text-[20px] font-bold text-[#333333] mt-[10px] '>
                                 Hoa quả tươi
                              </p>
                              <p className=' inline-block hover:text-white xl:mt-[20px] max-xl:mt-[15px] text-[#51A55C] bg-white rounded-[50px] py-[10px] hover:bg-[#7aa32a] transition-colors duration-500   px-[30px] font-bold text-[16px] '>
                                 MUA NGAY
                              </p>
                           </div>
                        </a>
                     </div>
                     <div className='banner-item md:w-[calc(50%-15px)] max-md:w-[100%]   '>
                        <a href='#' className='banner-img flex items-center relative'>
                           <img
                              className='w-full rounded-[5px]'
                              src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/banner/banner-2.png'
                              alt=''
                           />
                           <div className='banner-text absolute m-w-[35%] max-lg:left-[15px] max-lg:max-w-full lg:left-[30px] '>
                              <span className='banner-title text-[#51A55C] relative uppercase font-bold text-[16px]'>
                                 Giảm giá 80%
                              </span>
                              <p className='banner-sub-title   lg:text-[28px] md:text-[23px] sm:text-[28px] max-sm:text-[20px] font-bold text-[#333333] mt-[10px] '>
                                 Hoa quả tươi
                              </p>
                              <p className=' inline-block hover:text-white xl:mt-[20px] max-xl:mt-[15px] text-[#51A55C] bg-white rounded-[50px] py-[10px] hover:bg-[#7aa32a] transition-colors duration-500   px-[30px] font-bold text-[16px] '>
                                 MUA NGAY
                              </p>
                           </div>
                        </a>
                     </div>
                  </div>
               </div>
            </section>
            <section className='section-best-product bg-[#f8f8f8] xl:py-[100px] lg:py-[80px] max-lg:py-[60px]'>
               <div className='best-product-header text-center xl:mb-[70px] lg:mb-[40px] max-lg:mb-[30px]'>
                  <p className='best-product-title text-[#51A55C] font-bold mb-[10px]'>BỘ SƯU TẬP TỐT NHẤT</p>
                  <p className=' text-[#333333] font-bold  lg:text-[28px] md:text-[23px]  max-md:text-[20px]'>
                     Top sản phẩm bán chạy
                  </p>
               </div>
               <div className='best-product-content'>
                  <div className='slide-best-pr'>
                     <SlideBestProduct></SlideBestProduct>
                  </div>
                  <div className='link-to-product-page text-center mt-[40px] '>
                     <a
                        className='text-white px-[40px] py-[18px] bg-[#51A55C] hover:bg-[#7aa32a] transition-colors duration-500 rounded-[50px] text-center'
                        href='/products'
                     >
                        XEM TẤT CẢ SẢN PHẨM
                     </a>
                  </div>
               </div>
            </section>
            <section className='section-evaluate  xl:py-[100px] lg:py-[80px] max-lg:py-[60px]'>
               <div className='evaluate -header text-center xl:mb-[70px] lg:mb-[40px] max-lg:mb-[30px]'>
                  <p className='evaluate -title text-[#51A55C] font-bold mb-[10px]'>1200+ KHÁC HÀNG ĐÁNH GIÁ</p>
                  <p className=' text-[#333333] font-bold  lg:text-[28px] md:text-[23px]  max-md:text-[20px]'>
                     Khách hàng hạnh phúc nhận xét
                  </p>
               </div>
               <div className='evaluate -content'>
                  <div className='slide-evaluate'>
                     <SlideEvaluate></SlideEvaluate>
                  </div>
               </div>
            </section>
            <section className='section-featured-product flex bg-[#f8f8f8] pb-[20px]'>
               <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] w-full'>
                  <div className='featured-product-content flex  gap-[15px] max-lg:flex-wrap'>
                  <SlideProductHomepage></SlideProductHomepage>
                  <SlideProductHomepage></SlideProductHomepage>
                  <SlideProductHomepage></SlideProductHomepage>
                  </div>
               </div>
            </section>
            <section className="space lg:mt-[100px] md:mt-[80px] max-md:mt-[60px]"></section>
         </div>
      </>
   );
};

export default HomePage;