import ProductThumbsGallery from './components/ProductThumbsGallery';
import '../../../css/productdetailpage.css';
import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useGetOneProductQuery, useGetRelatedProductsQuery } from '../../../services/product.service';
import ProductDescriptionTab from './components/ProductDescriptionTab';
import { ConfigProvider, Rate } from 'antd';
import { AiOutlineHeart } from 'react-icons/ai';

import SlideBestProduct from '../HomePage/components/SlideBestProduct';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../slices/cartSlice';

const ProductDetail = () => {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [inputSize, setinputSize] = useState<any>(0.5);
   const [inputQuantity, setinputQuantity] = useState<number>(1);
   const { id } = useParams();
   const { data: oneProductData } = useGetOneProductQuery(id!, { skip: !id });

   const objId = {
      idCategory: oneProductData?.body.data.categoryId._id,
      idProduct: id
   };
   const { data: relatedProductsData } = useGetRelatedProductsQuery(objId!, {
      skip: !objId.idCategory || !objId.idProduct
   });
   // const onChangeInputNumber = (value: any) => {};
   const handleInputSize = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (/^[\d.]+$/.test(e.target.value)) {
         const value = e.target.value;
         console.log(value);
         if (value.endsWith('.') && !/\.\d+$/.test(value)) {
            setinputSize(value);
         } else {
            const rounded = Math.floor(Number(e.target.value));
            const result = Number(e.target.value) - rounded;
            // console.log(rounded);
            if (result >= 0.5) {
               setinputSize(rounded + 0.5);
            } else {
               setinputSize(rounded);
            }
         }
      } else {
         setinputSize('');
      }
   };
   const dispatch = useDispatch();
   const add_to_cart = () => {
      const product = {
         _id: oneProductData?.body.data._id,
         name: oneProductData?.body.data.productName,
         images: oneProductData?.body.data.images[0].url,
         price: oneProductData?.body.data.shipments[0].price,
         quantity: inputQuantity,
         size: inputSize
      };
      // console.log(product);

      dispatch(addItem(product));
   };
   const dec = () => {
      setinputQuantity(inputQuantity + 1);
   };
   const inc = () => {
      if (inputQuantity > 1) {
         setinputQuantity(inputQuantity - 1);
      }
   };
   return (
      <>
         <div className='main'>
            <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2] '>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <span>
                     <a href='/'>Trang chủ </a> / {oneProductData?.body.data.productName}
                  </span>
               </div>
            </section>
            <section className='section-product-detail-page lg:relative lg:py-[100px] md:py-[80px] max-md:py-[60px] border-b-[1px] border-[#e2e2e2]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <div className='pro-detail flex max-lg:flex-wrap lg:items-start mt-[-30px]'>
                     <div className='pro-detail-header xl:w-[42%] lg:w-[50%] max-lg:w-full '>
                        <ProductThumbsGallery body={oneProductData?.body.data.images}></ProductThumbsGallery>
                     </div>
                     <div className='pro-detail-content lg:sticky lg:top-[10px] xl:pl-[60px] lg:pl-[30px] xl:w-[58%] lg:w-[50%] max-lg:w-full '>
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
                                 {oneProductData?.body.data.productName}
                              </div>
                           </div>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px]'>
                              <div className='product-price text-[20px] font-bold'>
                                 {oneProductData?.body?.data.shipments[0]?.price}
                              </div>
                           </div>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px] flex items-center'>
                              <div className='stock-qty-title text-[20px] text-[#333333] font-bold'>Trạng thái:</div>
                              <div className='stock-qty-value text-[16px] ml-[15px] text-[#198754] font-bold'>
                                 Còn hàng
                              </div>
                           </div>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px] flex items-center'>
                              <div className='stock-qty-title text-[20px]  text-[#333333] font-bold'>Size:</div>
                              <input
                                 className='outline-none border border-[#e2e2e2] rounded-[5px] pl-[10px] ml-[10px]'
                                 type='text'
                                 value={inputSize}
                                 onChange={handleInputSize}
                              />
                           </div>
                           <div className='product-info md:mt-[30px] max-md:mt-[20px] flex items-center'>
                              <div className='stock-qty-title text-[20px] text-[#333333] font-bold'>Số lượng:</div>

                              <div className='stock-qty-value text-[16px] ml-[15px] text-[#198754] font-bold'>
                                 <div className='product-quantity-action flex lg:justify-center'>
                                    <div className='product-quantity flex  '>
                                       <input
                                          type='number'
                                          defaultValue={1}
                                          value={inputQuantity}
                                          className='input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]'
                                       />
                                       <div className='flex flex-col'>
                                          <button
                                             onClick={dec}
                                             type='button'
                                             className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                          >
                                             +
                                          </button>
                                          <button
                                             onClick={inc}
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
                                 onClick={add_to_cart}
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
               <ProductDescriptionTab desc={oneProductData?.body.data.desc}></ProductDescriptionTab>
            </section>
            <section className='section-related-product bg-[#f8f8f8] xl:py-[100px] lg:py-[80px] max-lg:py-[60px] border-b'>
               <div className='related-product-header text-center xl:mb-[70px] lg:mb-[40px] max-lg:mb-[30px]'>
                  <p className=' text-[#333333] font-bold  lg:text-[28px] md:text-[23px]  max-md:text-[20px]'>
                     Sản phẩm liên quan
                  </p>
               </div>
               <div className='related-product-content'>
                  {/* <div className='slide-related-product  mt-[40px]'>
                     <SlideBestProduct productImgs={relatedProductsData?.body.data}></SlideBestProduct>
                  </div> */}
               </div>
            </section>
         </div>
      </>
   );
};
export default ProductDetail;
