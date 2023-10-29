import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { BiStore } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import { HiOutlineShoppingBag, HiOutlineTrash } from 'react-icons/hi2';
import { FaXmark } from 'react-icons/fa6';
import { FaArrowUp, FaPlus, FaWindowMinimize, FaInstagram } from 'react-icons/fa';
import { FiHeadphones } from 'react-icons/fi';
import { ConfigProvider, InputNumber, Space } from 'antd';
import ModalProductSlide from '../../pages/UserPages/ProductPage/components/ModalProductSlide';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ICartSlice, removeFromCart } from '../../slices/cartSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
const Footer = () => {
   const closeModalSearch = () => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');
      const section_search_modal = document.querySelector('.section-search-modal');
      const section_overlay_search = document.querySelector('.section-overlay-search');
      setTimeout(() => {
         section_search_modal?.classList.toggle('!translate-y-[0%]');
      }, 300);
      setTimeout(() => {
         section_search_modal?.classList.toggle('hidden');
      }, 400);
      setTimeout(() => {
         section_overlay_search?.classList.toggle('hidden');
      }, 600);
   };
   const showModalSearch = () => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');

      const section_search_modal = document.querySelector('.section-search-modal');
      const section_overlay_search = document.querySelector('.section-overlay-search');
      setTimeout(() => {
         section_overlay_search?.classList.toggle('hidden');
      }, 100);
      setTimeout(() => {
         section_search_modal?.classList.toggle('hidden');
      }, 200);
      setTimeout(() => {
         section_search_modal?.classList.toggle('!translate-y-[0%]');
      }, 400);
   };
   const showMiniCart = () => {
      const mini_cart_overlay = document.querySelector('.mini-cart-overlay');
      mini_cart_overlay?.classList.toggle('hidden');
      const wrap_mini_cart = document.querySelector('.wrap-mini-cart');
      wrap_mini_cart?.classList.toggle('!translate-x-[0%]');
   };

   const toTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };
   const showSudMenuFooter = (selecter: string, afterSelecter: string, beforeSelecter: string) => {
      const ft_cate = document.querySelector(selecter);
      ft_cate?.classList.toggle('max-lg:!h-[247px]');
      const afterSelecterElement = document.querySelector(afterSelecter);
      afterSelecterElement?.classList.toggle('hidden');
      const beforeSelecterElement = document.querySelector(beforeSelecter);
      beforeSelecterElement?.classList.toggle('hidden');
   };
   const closeQuickViewModal = () => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');
      const modal_product = document.querySelector('.modal-product');
      setTimeout(() => {
         const modal_product_content = document.querySelector('.modal-product-content');
         modal_product_content?.classList.toggle('lg:!scale-[1]');
         modal_product_content?.classList.toggle('lg:opacity-100');
         modal_product_content?.classList.toggle('max-lg:!translate-y-[0%]');
      }, 200);
      setTimeout(() => {
         modal_product?.classList.toggle('hidden');
         modal_product?.classList.toggle('!z-[20]');
      }, 600);
   };
   const totalProductInCart = useSelector((state: { cart: ICartSlice }) => state?.cart?.items.length);
   const cart = useSelector((state: { cart: ICartSlice }) => state?.cart);
   const dispatch = useDispatch();
   const data = useSelector((state: RootState) => state.productSlice);
   return (
      <>
         <footer className='bg-[#f8f8f8] '>
            <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
               <ul className='footer-list flex py-[60px] flex-wrap ml-[-30px]'>
                  <li className='footer-if  w-full lg:w-[calc(35%-30px)] ml-[30px]'>
                     <div className='logo-ft '>
                        <img
                           className='max-w-[120px]'
                           src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/logo/logo.png'
                           alt=''
                        />
                     </div>
                     <div className='footer-if-text leading-7 '>
                        <p>
                           <br />
                           <span>
                              Địa chỉ: Lô A2, CN5, Cụm Công nghiệp Từ Liêm, Phường Phương Canh, Quận Nam Từ Liêm, Thành
                              phố Hà Nội, Việt Nam.
                           </span>
                        </p>
                     </div>
                     <div className='call-line mt-[30px] flex items-center'>
                        <div className='call-icon mr-[15px] text-[50px] text-[#51A55C]'>
                           <FiHeadphones></FiHeadphones>
                        </div>
                        <div className='call-if'>
                           <p className='call-title text-[#333333] text-[20px] font-bold'>Số HOTLINE:</p>
                           <span className='call-phonenumber text-[16px]'>0888 888 888</span>
                        </div>
                     </div>
                  </li>
                  <li className='footer-if ft-cate list-link ml-[30px] transition-all duration-500  lg:w-[calc(21%-30px)] w-full max-lg:mt-[15px] max-lg:h-[51px]  overflow-hidden max-lg:pb-[10px]'>
                     <div className='ft-title  font-bold text-[#6F6F6F] text-[18px] relative max-lg:mb-[30px] '>
                        Danh mục
                        <button
                           onClick={() => showSudMenuFooter('.ft-cate', '.icon-1-ft-cate', '.icon-2-ft-cate')}
                           className='lg:hidden border-b-[1px]  border-[#e2e2e2] w-full h-full pb-[40px] absolute top-0 left-0  cursor-pointer'
                           type='button'
                        >
                           <FaPlus className=' icon-1-ft-cate absolute right-0 top-[8px] text-[12px] '></FaPlus>
                           <FaWindowMinimize className='hidden icon-2-ft-cate absolute right-0 top-[4px] text-[12px]'></FaWindowMinimize>
                        </button>
                     </div>

                     <ul className='ft-sublist'>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Xoài nhập khẩu Ấn Độ</a>
                        </li>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Táo nhập khẩu Liên Xô</a>
                        </li>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Dưa lưới nhập khẩu Liên Xô</a>
                        </li>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Hồng nhập khẩu Liên Xô</a>
                        </li>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Xoài nhập khẩu Liên Xô</a>
                        </li>
                     </ul>
                  </li>
                  <li className='footer-if list-link ft-policy ml-[30px] transition-all duration-500  lg:w-[calc(21%-30px)] w-full max-lg:mt-[15px] max-lg:h-[45px]  overflow-hidden max-lg:pb-[10px]'>
                     <div className='ft-title font-bold text-[#6F6F6F] text-[18px] relative'>
                        Chính sách và dịch vụ
                        <button
                           onClick={() => showSudMenuFooter('.ft-policy', '.icon-1-ft-policy', '.icon-2-ft-policy')}
                           className='lg:hidden border-b-[1px]  border-[#e2e2e2] w-full h-full pb-[40px] absolute top-0 left-0  cursor-pointer'
                           type='button'
                        >
                           <FaPlus className=' icon-1-ft-policy absolute right-0 top-[8px] text-[12px] '></FaPlus>
                           <FaWindowMinimize className='hidden icon-2-ft-policy absolute right-0 top-[4px] text-[12px]'></FaWindowMinimize>
                        </button>
                     </div>

                     <ul className='ft-sublist'>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Chính sách bảo mật</a>
                        </li>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Chính sách hoàn trả</a>
                        </li>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Điều khoản & Điều kiện</a>
                        </li>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Chăm sóc khách hàng</a>
                        </li>
                        <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                           <a href='#'>Danh sách yêu thích</a>
                        </li>
                     </ul>
                  </li>
                  <li className='footer-if list-link-instar ml-[30px] w-full lg:w-[calc(23%-30px)] max-lg:mt-[20px] '>
                     <div className='ft-title font-bold text-[#6F6F6F] text-[18px] mb-[5px] relative'>
                        Theo dõi trên instagram
                     </div>
                     <div className='list-img flex flex-wrap'>
                        <div className='list-img-item relative mr-[15px] mt-[15px] h-[calc(50%-15px)] w-[calc(33%-15px)]  object-cover '>
                           <a
                              href='#'
                              className='ft-img-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[5px] bg-[#00000033] h-full absolute top-0 left-0 right-0 flex items-center justify-center'
                           >
                              <FaInstagram className='text-white text-[18px]'></FaInstagram>
                           </a>
                           <img
                              className='w-full h-full rounded-[5px]'
                              src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/footer/f-1.jpg'
                              alt=''
                           />
                        </div>
                        <div className='list-img-item relative mr-[15px] mt-[15px] h-[calc(50%-15px)]  w-[calc(33%-15px)] object-cover '>
                           <a
                              href='#'
                              className='ft-img-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[5px] bg-[#00000033] h-full absolute top-0 left-0 right-0 flex items-center justify-center'
                           >
                              <FaInstagram className='text-white text-[18px]'></FaInstagram>
                           </a>
                           <img
                              className='w-full h-full rounded-[5px]'
                              src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/footer/f-2.jpg'
                              alt=''
                           />
                        </div>
                        <div className='list-img-item relative mr-[15px] mt-[15px] h-[calc(50%-15px)] w-[calc(33%-15px)] object-cover '>
                           <a
                              href='#'
                              className='ft-img-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[5px] bg-[#00000033] h-full absolute top-0 left-0 right-0 flex items-center justify-center'
                           >
                              <FaInstagram className='text-white text-[18px]'></FaInstagram>
                           </a>
                           <img
                              className='w-full h-full rounded-[5px]'
                              src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/footer/f-3.jpg'
                              alt=''
                           />
                        </div>
                        <div className='list-img-item relative mr-[15px] mt-[15px] h-[calc(50%-15px)] w-[calc(33%-15px)]  object-cover '>
                           <a
                              href='#'
                              className='ft-img-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[5px] bg-[#00000033] h-full absolute top-0 left-0 right-0 flex items-center justify-center'
                           >
                              <FaInstagram className='text-white text-[18px]'></FaInstagram>
                           </a>
                           <img
                              className='w-full h-full rounded-[5px]'
                              src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/footer/f-4.jpg'
                              alt=''
                           />
                        </div>
                        <div className='list-img-item relative mr-[15px] mt-[15px] h-[calc(50%-15px)]  w-[calc(33%-15px)] object-cover '>
                           <a
                              href='#'
                              className='ft-img-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[5px] bg-[#00000033] h-full absolute top-0 left-0 right-0 flex items-center justify-center'
                           >
                              <FaInstagram className='text-white text-[18px]'></FaInstagram>
                           </a>
                           <img
                              className='w-full h-full rounded-[5px]'
                              src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/footer/f-5.jpg'
                              alt=''
                           />
                        </div>
                        <div className='list-img-item relative mr-[15px] mt-[15px] h-[calc(50%-15px)] w-[calc(33%-15px)] object-cover '>
                           <a
                              href='#'
                              className='ft-img-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[5px] bg-[#00000033] h-full absolute top-0 left-0 right-0 flex items-center justify-center'
                           >
                              <FaInstagram className='text-white text-[18px]'></FaInstagram>
                           </a>
                           <img
                              className='w-full h-full rounded-[5px]'
                              src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/footer/f-6.jpg'
                              alt=''
                           />
                        </div>
                     </div>
                  </li>
               </ul>
            </div>
         </footer>

         <section className=' modal-product fixed  top-0 left-0 w-full  h-full hidden  bg-[rgba(3,17,27,0.3)] z-[-2]    outline-none'>
            <div className='modal-product-content delay-500 overflow-y-auto max-lg:h-[90%] max-lg:flex-wrap max-lg:fixed max-lg:bottom-0 max-lg:w-[100%] lg:opacity-0  max-lg:max-w-full transition-all opacity-100 duration-700 lg:scale-[0.8] max-lg:translate-y-[100%]  relative flex w-[80%] lg:my-[28px] lg:max-h-[615px] gap-[20px] lg:mx-auto lg:px-[20px] lg:py-[25px] p-[10px]  bg-white rounded-[3px] overflow-hidden border-[1px] outline-none border-[rgba(0,0,0,.2)]  max-w-[840px]'>
               <div className='product-slide text-[14px] relative max-w-[calc(50%-10px)] z-[-1]  text-center max-lg:max-w-full max-lg:w-full'>
                  <ModalProductSlide body={data?.products[0]?.images} ></ModalProductSlide>
                  <div className='product-discount absolute text-[14px] text-white bg-red-500 px-[10px] py-[5px] rounded-br-[10px] w-[46px] z-[3] rounded-bl-[10px] left-0 top-0'>
                     <p>-{data.products[0]?.discount}%</p>
                     <p>OFF</p>
                  </div>
               </div>
               <div className='product-detail w-[calc(50%-10px)] lg:pt-[30px] max-lg:max-w-full max-lg:w-full'>
                  <div className='product-name'>
                     <div className='product-name-content  text-[18px] mb-[5px] font-[700]'>
                        {data.products[0]?.productName}
                     </div>
                     <span className='product-origin text-[14px]'>
                        Thương hiệu:{' '}
                        <strong className='text-[#51A55C]'>{data.products[0]?.shipments[0]?.origin}</strong>
                     </span>
                  </div>
                  <div className='product-price flex w-full items-center'>
                     <div className='product-price-title min-w-[28%] text-[14px] font-[600]'>Giá:</div>
                     <div className='product-price-content text-[22px] text-red-500 pr-[10px] font-bold'>
                        {data.products[0]?.shipments[0]?.price}
                     </div>
                  </div>
                  <div className='product-select mt-[20px] flex  w-full items-center'>
                     <div className='product-size-title min-w-[28%] text-[14px] font-[600]'>Size:</div>
                     <div className='product-size w-[72%]'>
                        <ConfigProvider
                           theme={{
                              components: {
                                 InputNumber: {
                                    colorPrimaryHover: '#51A55C'
                                 }
                              }
                           }}
                        >
                           <Space wrap className='w-full ml-[15px]'>
                              <InputNumber className='w-[200px]'   step={0.5} min={0.5} defaultValue={1} />
                           </Space>
                        </ConfigProvider>
                     </div>
                  </div>
                  <form className='product-form' action=''>
                     <div className='form-product-content '>
                        <div className='product-input-number mt-[20px] flex  w-full items-center '>
                           <div className='product-input-number-title min-w-[28%] font-[600] text-[14px]'>
                              Số lượng:
                           </div>
                           <div className='product-input-number-content text-[14px] flex w-[72%] max-lg:w-[140px] max-lg:h-[40px] max-lg:z-[11]'>
                              <button
                                 type='button'
                                 className='btn-pro hover:text-[#333] h-[40px] w-[40px] leading-[20px] text-center bg-[#f3f4f4] border-[1px] text-[20px] text-[#a4aaaf]  border-[#f3f4f4]'
                              >
                                 -
                              </button>
                              <input
                                 className='text-center w-[40px] h-[40px] font-bold outline-none  border-[1px] border-[#f3f4f4]'
                                 type='text'
                                 defaultValue={1}                           
                                 min='1'
                              />
                              <button
                                 type='button'
                                 className='btn-pro hover:text-[#333] h-[40px] w-[40px] leading-[20px] text-center bg-[#f3f4f4] border-[1px] text-[20px] text-[#a4aaaf]  border-[#f3f4f4]'
                              >
                                 +
                              </button>
                           </div>
                        </div>

                        <button className='max-lg:w-full  btn-product-form bg-[#ff0000] rounded-[4px] text-white text-center w-full h-[40px] leading-[40px] border-[1px] border-[#ff0000] mt-[15px] text-[14px]'>
                           THÊM VÀO GIỎ
                        </button>
                     </div>
                  </form>
                  <div className='link-product-detail mt-[10px]'>
                     <Link to={`/products/` + data.products[0]?._id}>
                     <span className='decoration-1 underline text-[14px]'>Xem chi tiết sản phẩm</span>
                     </Link>
                  </div>
               </div>

               <button
                  onClick={closeQuickViewModal}
                  type='button'
                  className='group/close-modal absolute right-4 z-[10] max-lg:top-0 max-lg:right-[10px]'
               >
                  <AiOutlineCloseCircle className=' text-[30px] max-lg:text-[40px]  group-hover/close-modal:fill-[#51A55C]'></AiOutlineCloseCircle>
               </button>
            </div>
         </section>
         <section className='section-search-modal translate-y-[-100%] transition-all duration-300  hidden fixed top-0 left-0 right-0  py-[30px] bg-white z-[7] '>
            <div className='container mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
               <div className='search-modal-content '>
                  <div className='text-right'>
                     <button
                        onClick={closeModalSearch}
                        type='button'
                        className='close-modal-search text-[20px] text-[#6f6f6f]'
                     >
                        <FaXmark></FaXmark>
                     </button>
                  </div>
                  <form className='form-search relative' action=''>
                     <input
                        className='w-full outline-none border-b-[1px] border-[#e2e2e2] py-[10px] text-[#6f6f6f]'
                        type='text'
                        placeholder='Tìm kiếm sản phẩm...'
                     />
                     <button className='absolute right-0 translate-y-[50%] bottom-[50%]'>
                        <SearchOutlined className='text-[20px] text-[#6f6f6f]'></SearchOutlined>
                     </button>
                  </form>
               </div>
            </div>
         </section>
         <section
            className='section-overlay-search fixed transition-opacity duration-150 top-0 left-0 right-0 h-full hidden w-full bg-[#000] opacity-[0.5] z-[5]'
            onClick={closeModalSearch}
         ></section>
         <section className='section-mobile-menu max-sm:block hidden  '>
            <div className='mobile-menu-content  pt-[10px] z-[4] flex justify-between fixed bottom-0 left-0 right-0 rounded-t-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]  bg-white'>
               <div className='mobile-menu-item text-[#939596] p-[5px] text-center w-[20%]'>
                  <BiStore className='m-auto' style={{ fontSize: '24px' }} />
                  <p className='  text-[10px] sm:text-[12px]'>Trang chủ</p>
               </div>

               <div onClick={showModalSearch} className='mobile-menu-item text-[#939596] p-[5px] text-center w-[20%] '>
                  <SearchOutlined style={{ fontSize: '24px' }} />
                  <p className='  text-[10px]  sm:text-[12px]'>Tìm kiếm</p>
               </div>
               <div onClick={showMiniCart} className='mobile-menu-item text-[#939596] p-[5px] text-center w-[20%]'>
                  <div className='test relative w-[24px] h-[24px] m-auto '>
                     <HiOutlineShoppingBag style={{ fontSize: '24px' }} />

                     <p className='custom-badge w-[16px] h-[16px] leading-[16px] rounded-[50%] text-[9px]  right-[-6px] top-[-1px] bg-[#d2401e] absolute text-white'>
                        0
                     </p>
                  </div>
                  <p className='   text-[10px] mt-[2px] sm:text-[12px]'>Giỏ hàng</p>
               </div>
               <div className='mobile-menu-item text-[#939596] p-[5px] text-center w-[20%]'>
                  <div className='test relative w-[24px] h-[24px] m-auto '>
                     <BsBell style={{ fontSize: '24px' }} />

                     <p className='custom-badge w-[16px] h-[16px] leading-[16px] rounded-[50%] text-[9px]  right-[-6px] top-[-1px] bg-[#d2401e] absolute text-white'>
                        0
                     </p>
                  </div>
                  <p className=' text-[10px] sm:text-[12px] mt-[2px]'>Thông báo</p>
               </div>
               <div className='mobile-menu-item text-[#939596] p-[5px] text-center w-[20%]'>
                  <UserOutlined style={{ fontSize: '24px' }} />
                  <p className='  text-[10px] sm:text-[12px]'>Tài khoản</p>
               </div>
            </div>
         </section>
         {cart?.items?.length === 0 ? (
            <div className='cart-emty'>
               <p>Cart is empty</p>
               <div className='start-shopping'>
                  <Link to={'/product'}>
                     <span>Start shopping</span>
                  </Link>
               </div>
            </div>
         ) : (
            <section className='section-mini-cart '>
               <div className='container mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <div
                     onClick={showMiniCart}
                     className='mini-cart-overlay hidden overlay-menu-homepage  fixed w-[110%] top-0 bottom-0 left-0 right-0 z-[6] opacity-[0.5] bg-[#333333]  '
                  ></div>
               </div>
               <div className='wrap-mini-cart transition-all duration-300 translate-x-[100%] w-[320px] flex h-full fixed  top-0 right-0 flex-col bg-white text-[#6f6f6f]  z-[8]'>
                  <div className='mini-cart-header flex border-b-[#e2e2e2] border-[1px]    '>
                     <p className='cart-header-text w-full gap-[10px] py-[10px] px-[15px] flex items-center  text-[14px]'>
                        <span className='cart-count px-[8px] text-[14px] py-[4px] text-white bg-[#d2401e]'>
                           {totalProductInCart}
                        </span>{' '}
                        sản phẩm trong giỏ hàng
                     </p>
                     <button
                        onClick={showMiniCart}
                        className='close-mini-cart text-[#333333] text-[20px] mt-[5px] cursor-pointer hover:opacity-100 mr-[15px]  opacity-[0.5]'
                        type='button'
                     >
                        <FaXmark></FaXmark>
                     </button>
                  </div>
                  <div className='mini-cart-content overflow-auto m-h-[100%-269px]'>
                     <ul className='cart-item relative'>
                        {cart?.items?.map((item: any, index: number) => (
                           <li
                              key={index}
                              className='cart-product p-[15px] flex border-[#e2e2e2] border-t-[1px] relative first:border-none '
                           >
                              <div className='cart-img w-[65px]'>
                                 <a href=''>
                                    <img
                                       className='m-w-full h-[69px]  border-[#e2e2e2] border-[1px]'
                                       src={item.images}
                                       alt=''
                                    />
                                 </a>
                              </div>
                              <div className='cart-content w-[calc(100%-65px)] pl-[15px] flex flex-col justify-center'>
                                 <a
                                    href=''
                                    className='product-name font-bold text-[16px] text-[#6f6f6f] overflow-ellipsis whitespace-nowrap'
                                 >
                                    {item.name}{' '}
                                 </a>
                                 <div className='product-info mt-[9px] flex'>
                                    <span className='product-qt text-[16px]'>{item.quantity} ×</span>
                                    <span className='product-price text-[#d2401e] text-[16px] ml-[5px]'>
                                       {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </span>
                                 </div>
                                 <div className='delete-cart'>
                                    <button
                                       onClick={() => dispatch(removeFromCart({ id: item._id }))}
                                       type='button'
                                       className='absolute right-[15px] bottom-[15px] text-[20px] opacity-[0.6] text-[#dc3545] hover:opacity-100'
                                    >
                                       <HiOutlineTrash></HiOutlineTrash>
                                    </button>
                                 </div>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className='mini-cart-footer'>
                     <div className='subtotal flex justify-between px-[15px] py-[10px] border-t-[#e2e2e2] border-[1px]'>
                        <span className='subtotal-title text-[16px] '>Subtotal:</span>
                        <span className='subtotal-price text-[#d2401e] font-bold text-[16px]'>
                           {cart.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                     </div>
                     <div className='cart-btn px-[15px] pb-[15px] pt-[10px] w-full'>
                        <Link
                           to={'/cart'}
                           className='block  text-[14px] view-cart w-[100%] transition-all duration-300 hover:bg-[#333333] rounded-[50px] py-[12px] px-[30px] bg-[#d2401e] text-white text-center mb-[20px]'
                        >
                           GIỎ HÀNG
                        </Link>
                        <a
                           href='/cart'
                           className='block text-[14px]  view-cart w-[100%] transition-all duration-300 hover:bg-[#333333] rounded-[50px] py-[12px] px-[30px] bg-[#d2401e] text-white text-center'
                        >
                           THANH TOÁN
                        </a>
                     </div>
                  </div>
               </div>
            </section>
         )}
         <section className=' section-icon-contact fixed bottom-[105px] right-[24px] cursor-pointer z-[4]'>
            <div className="icon-contact-item w-[48px] h-[48px] rounded-[50%] border-[1px] text-center border-white shadow-[0_4px_8px_rgba(0,0,0,0.15)] bg-[#0090E4] animate-pulse_icon_contact after:[''] relative after:absolute after:z-[-1] after:w-[48px] after:h-[48px] after:left-0 after:top-0 before:rounded-[50%] before:bg-[#0090E4]  before:animate-euiBeaconPulseSmall2            before:absolute before:z-[-1] before:w-[48px] before:h-[48px] before:left-0 before:top-0 after:rounded-[50%] after:bg-[#0090E4]  after:animate-euiBeaconPulseSmall">
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='text-white w-[30px] text-center m-auto h-[45px] animate-skew_icon_contact transition-all duration-300 ease-in-out'
                  viewBox='0 0 1249 439'
               >
                  <style></style>
                  <path
                     className='shp0 fill-white'
                     d='m649.69 129.68v-23.37h70.02v328.67h-40.06c-16.49 0-29.87-13.32-29.96-29.78-0.01 0.01-0.02 0.01-0.03 0.02-28.2 20.62-63.06 32.87-100.71 32.87-94.3 0-170.76-76.41-170.76-170.65s76.46-170.64 170.76-170.64c37.65 0 72.51 12.24 100.71 32.86 0.01 0.01 0.02 0.01 0.03 0.02zm-289.64-129.06v10.65c0 19.88-2.66 36.1-15.57 55.14l-1.56 1.78c-2.82 3.2-9.44 10.71-12.59 14.78l-224.76 282.11h254.48v39.94c0 16.55-13.43 29.96-29.98 29.96h-329.73v-18.83c0-23.07 5.73-33.35 12.97-44.07l239.61-296.57h-242.59v-74.89h349.72zm444.58 434.36c-13.77 0-24.97-11.19-24.97-24.94v-409.42h74.94v434.36h-49.97zm271.56-340.24c94.95 0 171.91 76.98 171.91 171.79 0 94.9-76.96 171.88-171.91 171.88-94.96 0-171.91-76.98-171.91-171.88 0-94.81 76.95-171.79 171.91-171.79zm-527.24 273.1c55.49 0 100.46-44.94 100.46-100.4 0-55.37-44.97-100.32-100.46-100.32s-100.47 44.95-100.47 100.32c0 55.46 44.98 100.4 100.47 100.4zm527.24-0.17c55.82 0 101.12-45.27 101.12-101.14 0-55.78-45.3-101.05-101.12-101.05-55.91 0-101.13 45.27-101.13 101.05 0 55.87 45.22 101.14 101.13 101.14z'
                     fill-rule='evenodd'
                  />
               </svg>
            </div>
         </section>
         <section className=' section-icon-to-top transition-all duration-300 fixed bottom-[180px] right-[30px] cursor-pointer z-[4] invisible opacity-0'>
            <div
               onClick={toTop}
               className='to-top-content  transition-all duration-300 hover:bg-white hover:text-[#d2401e] text-white text-[16px] h-[40px] w-[40px] bg-[#d2401e] rounded-[5px] flex items-center justify-center shadow-[0px_0px_10px_rgba(51,51,51,0.15)]'
            >
               <FaArrowUp></FaArrowUp>
            </div>
         </section>
      </>
   );
};

export default Footer;
