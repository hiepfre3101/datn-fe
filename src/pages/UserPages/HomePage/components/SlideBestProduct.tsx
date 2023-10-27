import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { ConfigProvider, Rate } from 'antd';
import { AiOutlineHeart, AiOutlineEye } from 'react-icons/ai';
import { IProduct, IProductExpanded } from '../../../../interfaces/product';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../../../../slices/productSlice';
interface IRelatedProduct {
   productImgs: IProductExpanded[] | undefined;
}
export default function SlideBestProduct({ productImgs }: IRelatedProduct) {
   const dispatch = useDispatch()
   const openQuickViewModal = (data:IProduct) => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');
      const modal_product = document.querySelector('.modal-product');
      setTimeout(() => {
         modal_product?.classList.toggle('hidden');
         modal_product?.classList.toggle('!z-[20]');
      }, 200);
      setTimeout(() => {
         const modal_product_content = document.querySelector('.modal-product-content');
         modal_product_content?.classList.toggle('lg:!scale-[1]');
         modal_product_content?.classList.toggle('lg:opacity-100');
         modal_product_content?.classList.toggle('max-lg:!translate-y-[0%]');
      }, 300);
      dispatch(saveProduct(data))
   };

   
   return (
      <>
         <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
            <Swiper
               slidesPerView={4}
               spaceBetween={30}
               navigation={true}
               rewind={true}
               autoplay={{
                  delay: 3000,
                  disableOnInteraction: false
               }}
               breakpoints={{
                  1201: {
                     slidesPerView: 4
                  },
                  1200: {
                     slidesPerView: 3
                  },
                  767: {
                     slidesPerView: 3
                  },
                  766: {
                     slidesPerView: 2
                  },
                  400: {
                     slidesPerView: 2
                  },
                  1: {
                     slidesPerView: 1
                  }
               }}
               modules={[Navigation, Autoplay]}
               className='mySwiper slide-best-pr pb-[75px]'
            >
               {productImgs?.map((item) => {
                  return (
                     <>
                        <SwiperSlide>
                           <div className=' product-item md:p-[10px]  max-xl:mb-[18px]'>
                              <div className='product-wrap overflow-hidden group/product-wrap rounded-[5px] relative flex flex-col justify-between max-xl:pb-[40px]'>
                                 <span className='discount transition-all duration-300 group-hover/product-wrap:translate-x-[-120%] bg-red-500 min-w-[40px] z-[4] text-center absolute rounded-[3px] py-[5px] px-[10px] text-[12px] text-white left-[7px] top-[7px]'>
                                    -{item.discount}%
                                 </span>
                                 <div className='wrap-product-img overflow-hidden xl:relative max-xl:text-center '>
                                    <Link to={'/productdetail/'+item._id}>
                                    <div
                                       className='xl:relative product-img   after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 bg-[#ffffff] after:opacity-0 after:invisible transition-all duration-300 group-hover/product-wrap:visible xl:group-hover/product-wrap:opacity-[0.4] max-xl:group-hover/product-wrap:opacity-[0.5] '
                                    >
                                       <img
                                          className='product-main-img  xl:group-hover/product-wrap:invisible  visible transition-all duration-300 opacity-100 object-cover object-left-bottom'
                                          src={item.images[0].url}
                                          alt=''
                                       />
                                       <img
                                          className='product-sub-img max-xl:hidden absolute group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible transition-all duration-300 top-0 left-0 invisible opacity-0  object-cover object-left-bottom'
                                          src={item.images[1].url}
                                          alt=''
                                       />
                                    </div>
                                    </Link>
                                    <div className='product-action max-xl:w-full max-xl:justify-center  transition-all duration-300 xl:invisible xl:opacity-0 flex absolute xl:bottom-[50%] bottom-0 xl:right-[50%] xl:translate-x-[50%] xl:gap-[15px]  max-xl:gap-[10px] group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible'>
                                       <button className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                          <HiOutlineShoppingBag></HiOutlineShoppingBag>
                                       </button>
                                       <button
                                          onClick={()=>openQuickViewModal(item)}
                                          className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'
                                       >
                                          <AiOutlineEye></AiOutlineEye>
                                       </button>
                                       <button className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                          <AiOutlineHeart></AiOutlineHeart>
                                       </button>
                                    </div>
                                 </div>
                                 <Link to={`/productdetail/`+item._id}>
                                    <p className='product-name font-bold md:mt-[10px] text-center md:text-[18px] max-md:text-[16px] line-clamp-2 break-words hover:text-[#51A55C]'>
                                      
                                      {item.productName}
                                    </p>
                                 </Link>
                                 <div className='rate text-center'>
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
                                 <p className='price mt-[9px] flex items-center justify-center  text-center font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                                    {/* {item.shipments[0].price} */}
                                    <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                                       {item?.shipments[0]?.price}
                                    </span>
                                 </p>
                              </div>
                           </div>
                        </SwiperSlide>
                     </>
                  );
               })}
            </Swiper>
         </div>
      </>
   );
}
