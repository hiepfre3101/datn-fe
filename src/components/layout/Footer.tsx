/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { BiStore } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import { HiOutlineShoppingBag, HiOutlineTrash } from 'react-icons/hi2';
import { FaXmark } from 'react-icons/fa6';
import { FaArrowUp, FaPlus, FaWindowMinimize, FaInstagram } from 'react-icons/fa';
import { FiHeadphones, FiLogOut, FiLogIn } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { ICartItems, ICartSlice, removeFromCart } from '../../slices/cartSlice';
import { Link } from 'react-router-dom';

import { PiUserListBold } from 'react-icons/pi';
import { RiBillLine } from 'react-icons/ri';
import { MdOutlineLockReset } from 'react-icons/md';
import { logoUrl } from '../../constants/imageUrl';
import { useGetAllCateQuery } from '../../services/cate.service';
import { useDeleteProductInCartMutation, useGetCartQuery } from '../../services/cart.service';
import { IAuth } from '../../slices/authSlice';
import { ICartDataBaseItem } from '../../interfaces/cart';
import { message } from 'antd';
import { useState, useEffect } from 'react';

const Footer = () => {
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const [showfetch, setShowFetch] = useState(false);
   const { data: cartdb } = useGetCartQuery(undefined, { skip: !showfetch });
   useEffect(() => {
      if (auth.user._id) {
         setShowFetch(true);
      }
   }, [auth.user._id]);
   const CartLocal = useSelector((state: { cart: ICartSlice }) => state?.cart.products);
   const cart = auth.user._id ? cartdb?.body.data.products : CartLocal;

   const [deleteProductInCartDB] = useDeleteProductInCartMutation();

   const dispatch = useDispatch();
   const { data } = useGetAllCateQuery();
   const closeModalSearch = () => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');

      const section_search_modal = document.querySelector('.section-search-modal');
      const section_overlay_search = document.querySelector('.section-overlay-search');
      setTimeout(() => {
         section_search_modal?.classList.toggle('!translate-y-[0%]');
      }, 100);
      setTimeout(() => {
         section_search_modal?.classList.toggle('hidden');
      }, 200);
      setTimeout(() => {
         section_overlay_search?.classList.toggle('hidden');
      }, 400);
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

   const showUserTag = () => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');
      const overlay_user_tag_mobile = document.querySelector('.overlay-user-tag-mobile');
      overlay_user_tag_mobile?.classList.toggle('!opacity-[0.15]');
      overlay_user_tag_mobile?.classList.toggle('!visible');
      const user_tag_mobile_content = document.querySelector('.user-tag-mobile-content');
      user_tag_mobile_content?.classList.toggle('max-xl:translate-x-[0%]');
   };
   const handleRemoveProductInCart = (item: ICartDataBaseItem | ICartItems) => {
      if (auth.user._id) {
         deleteProductInCartDB(item?.productId?._id).then((res) => {
            res;
            message.success('Xoá sản phẩm khỏi giỏ hàng thành công');
         });
      } else {
         dispatch(removeFromCart({ id: item.productId._id }));
      }
   };
   return (
      <>
         <footer className='bg-[#f8f8f8] '>
            <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
               <ul className='footer-list flex py-[60px] flex-wrap ml-[-30px]'>
                  <li className='footer-if  w-full lg:w-[calc(35%-30px)] ml-[30px]'>
                     <div className='logo-ft '>
                        <img className='max-w-[120px]' src={logoUrl} alt='logo' />
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
                        {data?.body.data.slice(0, 5).map((item) => {
                           return (
                              <>
                                 <li className='text-[16px] mt-[15px] hover:text-[#51A55C] transition-colors duration-300'>
                                    <Link to='dfa'>{item.cateName}</Link>
                                 </li>
                              </>
                           );
                        })}
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
                  <Link to='/'>
                     <BiStore className='m-auto' style={{ fontSize: '24px' }} />
                     <p className='  text-[10px] sm:text-[12px]'>Trang chủ</p>
                  </Link>
               </div>

               <div onClick={showModalSearch} className='mobile-menu-item text-[#939596] p-[5px] text-center w-[20%] '>
                  <SearchOutlined style={{ fontSize: '24px' }} />
                  <p className='  text-[10px]  sm:text-[12px]'>Tìm kiếm</p>
               </div>
               <div onClick={showMiniCart} className='mobile-menu-item text-[#939596] p-[5px] text-center w-[20%]'>
                  <div className='test relative w-[24px] h-[24px] m-auto '>
                     <HiOutlineShoppingBag style={{ fontSize: '24px' }} />

                     <p className='custom-badge w-[16px] h-[16px] leading-[16px] rounded-[50%] text-[9px]  right-[-6px] top-[-1px] bg-[#d2401e] absolute text-white'>
                        {cart?.length}
                     </p>
                  </div>
                  <p className=' text-[10px] mt-[2px] sm:text-[12px]'>Giỏ hàng</p>
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
               <div onClick={showUserTag} className='mobile-menu-item text-[#939596] p-[5px] text-center w-[20%]'>
                  <UserOutlined style={{ fontSize: '24px' }} />
                  <p className='  text-[10px] sm:text-[12px]'>Tài khoản</p>
               </div>
            </div>
         </section>
         <section className='section-mini-cart '>
            {cart?.length === 0 ? (
               <div className='cart-emty'>
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
                              {cart?.length}
                           </span>
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
                           <li className='cart-product border-[#e2e2e2] items-center text-center mt-[50] border-t-[1px] relative first:border-none '>
                              <p className='cart-title xl:text-[20px] border-[#e2e2e2] max-xl:text-[20px] text-[red] font-bold pb-[12px]'>
                                 Không có sản phẩm trong giỏ hàng
                              </p>
                              <div className='start-shopping cart-title  border-[#e2e2e2] gap-2 text-[#51A55C] font-bold flex justify-center items-center text-center pb-[12px]'>
                                 <Link
                                    to={'/collections'}
                                    onClick={showMiniCart}
                                    className='block  xl:text-[14px] max-xl:text-[14px] view-cart w-[40%] transition-all duration-300 hover:bg-[#333333] rounded-[50px] py-[10px] px-[30px] bg-[#d2401e] text-white text-center mb-[20px]'
                                 >
                                    Mua hàng
                                 </Link>
                                 <Link
                                    to={'/cart'}
                                    onClick={showMiniCart}
                                    className='block  xl:text-[14px] max-xl:text-[14px] view-cart w-[40%] transition-all duration-300 hover:bg-[#333333] rounded-[50px] py-[10px] px-[30px] bg-[#d2401e] text-white text-center mb-[20px]'
                                 >
                                    Giỏ hàng
                                 </Link>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            ) : (
               <div>
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
                              {cart?.length}
                           </span>
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
                           {cart?.map((item: any, index: number) => (
                              <li
                                 key={index}
                                 className='cart-product p-[15px] flex border-[#e2e2e2] border-t-[1px] relative first:border-none '
                              >
                                 <div className='cart-img w-[65px]'>
                                    <a href=''>
                                       <img
                                          className='m-w-full h-[69px]  border-[#e2e2e2] border-[1px]'
                                          src={item.productId?.images[0]?.url}
                                          alt=''
                                       />
                                    </a>
                                 </div>
                                 <div className='cart-content w-[calc(100%-65px)] pl-[15px] flex flex-col justify-center'>
                                    <a
                                       href=''
                                       className='product-name font-bold text-[16px] text-[#6f6f6f] overflow-ellipsis whitespace-nowrap'
                                    >
                                       {item.productId?.productName}
                                    </a>
                                    <div className='product-info mt-[9px] flex'>
                                       <span className='product-qt text-[16px]'>{item?.weight}kg ×</span>
                                       <span className='product-price text-[#d2401e] text-[16px] ml-[5px]'>
                                          {item.productId?.discount
                                             ? (
                                                  item?.productId?.price -
                                                  (item?.productId?.price * item?.productId?.discount) / 100
                                               ).toLocaleString('vi-VN', {
                                                  style: 'currency',
                                                  currency: 'VND'
                                               })
                                             : item.productId?.price}
                                       </span>
                                    </div>
                                    <div className='delete-cart'>
                                       <button
                                          onClick={() => handleRemoveProductInCart(item)}
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
                              {auth.user._id
                                 ? cart
                                      ?.reduce(
                                         (accumulator: number, product: any) =>
                                            accumulator +
                                            (product.productId.price -
                                               (product.productId.price * product.productId.discount) / 100) *
                                               product.weight,
                                         0
                                      )
                                      .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                 : cart?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                           </span>
                        </div>
                        <div className='cart-btn px-[15px] pb-[15px] pt-[10px] w-full'>
                           <Link
                              to={'/cart'}
                              onClick={showMiniCart}
                              className='block  text-[14px] view-cart w-[100%] transition-all duration-300 hover:bg-[#333333] rounded-[50px] py-[12px] px-[30px] bg-[#d2401e] text-white text-center mb-[20px]'
                           >
                              GIỎ HÀNG
                           </Link>
                           <Link
                              to={'/checkout'}
                              onClick={showMiniCart}
                              className='block text-[14px]  view-cart w-[100%] transition-all duration-300 hover:bg-[#333333] rounded-[50px] py-[12px] px-[30px] bg-[#d2401e] text-white text-center'
                           >
                              THANH TOÁN
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </section>
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
         <section className='user-tag-moble'>
            <div
               onClick={showUserTag}
               className='overlay-user-tag-mobile xl:hidden fixed w-[100%] top-0 bottom-0 left-0 right-0 z-[7] opacity-0 bg-[#333333]   invisible'
            ></div>
            <div className='user-tag-mobile-content transition duration-300 fixed top-0 left-0 h-full bg-white z-[8] min-w-[320px] translate-x-[-100%]'>
               <ul>
                  <li className='px-[15px] py-[10px] flex justify-end'>
                     <span onClick={showUserTag} className='cursor-pointer text-center'>
                        <FaXmark className='text-[20px]'></FaXmark>
                     </span>
                  </li>
                  <li className='px-[15px] py-[10px] hover:bg-[#51A55C] hover:text-white'>
                     <Link to='' className='flex items-center gap-[5px] py-[5px]'>
                        <PiUserListBold></PiUserListBold> Hồ sơ của bạn
                     </Link>
                  </li>
                  <li className='px-[15px] py-[10px] hover:bg-[#51A55C] hover:text-white'>
                     <Link to='' className='flex items-center gap-[5px] py-[5px]'>
                        <RiBillLine></RiBillLine> Lịch sử mua hàng
                     </Link>
                  </li>
                  <li className='px-[15px] py-[10px] hover:bg-[#51A55C] hover:text-white'>
                     <Link to='' className='flex items-center gap-[5px] py-[5px]'>
                        <FiLogIn></FiLogIn> Đăng nhập
                     </Link>
                  </li>
                  <li className='px-[15px] py-[10px] hover:bg-[#51A55C] hover:text-white'>
                     <Link to='' className='flex items-center gap-[5px] py-[5px]'>
                        <AiOutlineUserAdd></AiOutlineUserAdd> Đăng ký
                     </Link>
                  </li>
                  <li className='px-[15px] py-[10px] hover:bg-[#51A55C] hover:text-white'>
                     <Link to='' className='flex items-center gap-[5px] py-[5px]'>
                        <FiLogOut></FiLogOut> Đăng xuất
                     </Link>
                  </li>
                  <li className='px-[15px] py-[10px] hover:bg-[#51A55C] hover:text-white'>
                     <Link to='' className='flex items-center gap-[5px] py-[5px]'>
                        <MdOutlineLockReset></MdOutlineLockReset> Quên mật khẩu
                     </Link>
                  </li>
               </ul>
            </div>
         </section>
      </>
   );
};

export default Footer;
