import ProductThumbsGallery from './components/ProductThumbsGallery';
import '../../../css/productdetailpage.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { ConfigProvider, Rate, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import SlideBestProduct from '../HomePage/components/SlideBestProduct';
import RelatedProductSlide from './components/RelatedProductSlide';

import ProductDescribe from './components/productDescribe';
import ProductInformation from './components/ProductInformation';
import ProductOtherContent from './components/ProductOtherContent';
import ProductEvaluate from './components/ProductEvaluate'
const ProductDetail = () => {
   const handleChange = (value: string) => {
      console.log(`selected ${value}`);
   };
   const [stateNav, setStateNav] = useState<string>('des');

   useEffect(() => {
      console.log(stateNav);
   }, [stateNav]);

   return (
      <>
         <div className='main'>
            <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2] '>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <span>
                     <a href='/'>Trang chủ </a> / Dâu tây đột biến
                  </span>
               </div>
            </section>
            <section className='section-product-detail-page lg:py-[100px] md:py-[80px] max-md:py-[60px] border-b-[1px] border-[#e2e2e2]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <div className='pro-detail flex max-lg:flex-wrap mt-[-30px]'>
                     <div className='pro-detail-header xl:w-[42%] lg:w-[50%] max-lg:w-full '>
                        <ProductThumbsGallery></ProductThumbsGallery>
                     </div>
                     <div className='pro-detail-content xl:pl-[60px] lg:pl-[30px] xl:w-[58%] lg:w-[50%] max-lg:w-full '>
                        <div className='rate flex items-center'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                              <span className='text-[#bbb] before:content-["("] after:content-[")"] ml-[5px] after:absolute before:absolute after:right-0 before:left-0 relative px-[10px]'>
                                 3 đánh giá
                              </span>
                           </ConfigProvider>
                        </div>
                        <div className='product-info-wrap'>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px]'>
                              <div className='product-name  lg:text-[28px] max-lg:text-[24px] text-[#333333] font-bold'>
                                 Dâu tây đột biến
                              </div>
                           </div>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px]'>
                              <div className='product-price text-[20px] font-bold'>80.000</div>
                           </div>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px] flex items-center'>
                              <div className='stock-qty-title text-[20px] text-[#333333] font-bold'>Trạng thái:</div>
                              <div className='stock-qty-value text-[16px] ml-[15px] text-[#198754] font-bold'>
                                 Còn hàng
                              </div>
                           </div>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px] flex items-center'>
                              <div className='stock-qty-title text-[20px]  text-[#333333] font-bold'>Size:</div>
                              <ConfigProvider
                                 theme={{
                                    components: {
                                       Select: {
                                          colorPrimaryHover: '#51A55C',
                                          optionSelectedBg: '#51A55C',
                                          optionSelectedColor: '#FFFFFF'
                                       }
                                    }
                                 }}
                              >
                                 <Space wrap className='w-full ml-[15px]'>
                                    <Select
                                       defaultValue='1kg'
                                       className='w-[200px]'
                                       onChange={handleChange}
                                       options={[
                                          { value: '1', label: '1kg' },
                                          { value: '2', label: '2kg' },
                                          { value: '3', label: '3kg' }
                                       ]}
                                    />
                                 </Space>
                              </ConfigProvider>
                           </div>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px] flex items-center'>
                              <div className='stock-qty-title text-[20px] text-[#333333] font-bold'>Số lượng:</div>
                              <div className='stock-qty-value text-[16px] ml-[15px] text-[#198754] font-bold'>
                                 <div className='product-quantity-action flex lg:justify-center'>
                                    <div className='product-quantity flex  '>
                                       <input
                                          type='number'
                                          defaultValue={1}
                                          className='input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]'
                                       />
                                       <div className='flex flex-col'>
                                          <button
                                             type='button'
                                             className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                          >
                                             +
                                          </button>
                                          <button
                                             type='button'
                                             className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                          >
                                             -
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='product-btn md:mt-[30px] max-md:mt-[20px]  flex sm:gap-[30px] max-sm:flex-wrap max-sm:gap-y-[15px]'>
                           <div className='btn-add-card-wrap group/btn-add-cart max-sm:w-full'>
                              <button
                                 type='button'
                                 className=' btn-add-cart py-[12px] text-[#333333] w-full transition-colors duration-300 z-[3] before:z-[-1] px-[30px] text-center rounded-[5px] group-hover/btn-add-cart:text-white font-bold bg-[#333333] border-[2px] border-[#333333] before-content-[""] before:absolute relative before:w-full before:h-full overflow-hidden before:bg-white before:transition-all before:duration-300 before:group-hover/btn-add-cart:scale-y-[0] before:origin-right   before:right-0 before:left-[0px] before:top-0'
                              >
                                 THÊM VÀO GIỎ HÀNG
                              </button>
                           </div>
                           <div className='btn-checkout-wrap group/btn-add-cart max-sm:w-full border-[2px] border-[#333333] transition-colors duration-300 hover:border-[#d2401e] rounded-[5px] overflow-hidden'>
                              <button
                                 type='button'
                                 className=' btn-checkout py-[12px] text-white w-full transition-colors duration-300 z-[3] before:z-[-1] sm:px-[71px] text-center   font-bold bg-[#d2401e]  before-content-[""] before:absolute relative before:w-full before:h-full overflow-hidden before:bg-[#333333] before:transition-all  before:duration-300 before:group-hover/btn-add-cart:scale-x-[0]    before:right-0 before:left-[0px] before:top-0'
                              >
                                 MUA NGAY
                              </button>
                           </div>
                        </div>
                        <div className='product-info md:mt-[30px] max-md:mt-[20px] flex items-center'>
                           <button className='btn-love text-[18px]  font-bold flex items-center hover:text-[#333333]'>
                              <AiOutlineHeart className='text-[20px] mr-[5px]'></AiOutlineHeart>YÊU THÍCH
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className='section-description  lg:py-[100px] md:py-[80px] max-md:py-[60px]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <ul className='pro-nav flex flex-wrap max-sm:flex-col max-sm:justify-center max-sm:items-center'>
                     <li className='des md:pr-[28px]  '>
                        <button
                           onClick={() => {
                              setStateNav('des');
                           }}
                           type='button'
                           style={ stateNav == 'des' ? { color:'#333333'} : {color:'#6f6f6f'}}
                           className=' font-bold py-[15px] p transition-all duration-300 hover:text-[#333333]'
                        >
                           MIÊU TẢ
                        </button>
                     </li>
                     <li className='pr-info px-[28px] sm:border-l-[1px] '>
                        <button
                           onClick={() => {
                              setStateNav('pr-info');
                           }}
                           style={ stateNav == 'pr-info' ? { color:'#333333'} : {color:'#6f6f6f'}}
                           type='button'
                           className=' font-bold py-[15px] transition-all duration-300 hover:text-[#333333]'
                        >
                           THÔNG TIN SẢN PHẨM
                        </button>
                     </li>
                     <li className='other-content px-[28px] sm:border-l-[1px] '>
                        <button
                           type='button'
                           onClick={() => {
                              setStateNav('other-content');
                           }}
                           style={ stateNav == 'other-content' ? { color:'#333333'} : {color:'#6f6f6f'}}
                           className=' font-bold py-[15px] transition-all duration-300 hover:text-[#333333]'
                        >
                           NỘI DUNG KHÁC
                        </button>
                     </li>
                     <li className='review-btn px-[28px] sm:border-l-[1px] '>
                        <button
                           type='button'
                           onClick={() => {
                              setStateNav('review-btn');
                           }}
                           style={ stateNav == 'review-btn' ? { color:'#333333'} : {color:'#6f6f6f'}}
                           className=' font-bold py-[15px] transition-all duration-300 hover:text-[#333333]'
                        >
                           ĐÁNH GIÁ
                        </button>
                     </li>
                  </ul>
                  {stateNav == 'des' && (
                     <div className='product-des-content mt-[30px]'>
                       <ProductDescribe></ProductDescribe>
                     </div>
                  )}
                  {stateNav == 'pr-info' && (
                     <div className='product-additional-info mt-[30px]'>

                        <ProductInformation></ProductInformation>
                       
                     </div>
                  )}

                  {stateNav == 'other-content' && (
                     <div className='product-other-content mt-[30px]'>
                   <ProductOtherContent></ProductOtherContent>
                     </div>
                  )}
                  {stateNav == 'review-btn' && (
                     <div className='review mt-[30px]'>
                        
                        <ProductEvaluate></ProductEvaluate>
                       
                     </div>
                  )}
               </div>
            </section>
            <section className='section-related-product bg-[#f8f8f8] xl:py-[100px] lg:py-[80px] max-lg:py-[60px] border-b'>
               <div className='related-product-header text-center xl:mb-[70px] lg:mb-[40px] max-lg:mb-[30px]'>
                  <p className=' text-[#333333] font-bold  lg:text-[28px] md:text-[23px]  max-md:text-[20px]'>
                     Sản phẩm liên quan
                  </p>
               </div>
               <div className='related-product-content'>
                  <div className='slide-related-product  mt-[40px]'>
                  <RelatedProductSlide></RelatedProductSlide>
                  </div>
                
               </div>
            </section>
         </div>
      </>
   );
};
export default ProductDetail;
