/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineMenu, AiOutlineUserAdd } from 'react-icons/ai';
import { FaChevronDown, FaXmark } from 'react-icons/fa6';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { ICartSlice, setItem } from '../../slices/cartSlice';
import { RiBillLine } from 'react-icons/ri';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { MdOutlineLockReset } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useClearTokenMutation } from '../../services/auth.service';
import { IAuth, deleteTokenAndUser } from '../../slices/authSlice';
import { Badge, Popover, Tooltip, notification } from 'antd';
import { logoUrl } from '../../constants/imageUrl';
import { useEffect, useState } from 'react';
import { BsBell } from 'react-icons/bs';
import { PiPackageLight, PiUserListBold } from 'react-icons/pi';
import { useGetAllCateQuery } from '../../services/cate.service';
import { clientSocket } from '../../config/socket';
import {
   useDeleteNotificationMutation,
   useGetClientNotificationQuery,
   useUpdateNotificationMutation
} from '../../services/notification';
import { INotification } from '../../interfaces/notification';
import { formatStringToDate } from '../../helper';
import { useGetCartQuery } from '../../services/cart.service';

const Header = () => {
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const [showfetch, setShowFetch] = useState(false);
   const { data: cartdb } = useGetCartQuery(undefined, { skip: !showfetch });
   useEffect(() => {
      if (auth.user._id) {
         setShowFetch(true);
      }
   }, [auth.user._id]);
   const [clearToken] = useClearTokenMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const onHandleLogout = () => {
      dispatch(deleteTokenAndUser());
      dispatch(setItem());
      clearToken();
      navigate('/');
   };
   const { data: clientNotification, refetch } = useGetClientNotificationQuery(auth?.user?._id);
   const [updateNotification] = useUpdateNotificationMutation();
   const [deleteNotification] = useDeleteNotificationMutation();
   const { data } = useGetAllCateQuery();
   const localCartLength = useSelector((state: { cart: ICartSlice }) => state?.cart?.products.length);

   const totalProductInCart = auth.user._id ? cartdb?.body.data.products.length : localCartLength;
   function scrollFunction() {
      const btn_totop = document.querySelector('.section-icon-to-top');
      if (document.documentElement.scrollTop > 400) {
         btn_totop?.classList.add('!visible');
         btn_totop?.classList.add('!opacity-100');
      } else {
         btn_totop?.classList.remove('!visible');
         btn_totop?.classList.remove('!opacity-100');
      }
   }
   useEffect(() => {
      const handleScroll = () => {
         scrollFunction();
         fixedMenu();
      };
      window.addEventListener('scroll', () => handleScroll());
      return window.removeEventListener('scroll', () => handleScroll());
   });
   useEffect(() => {
      clientSocket.open();
      const handlePurchaseNotification = (data: any) => {
         refetch();
         notification.info({
            message: 'Bạn có thông báo mới',
            description: data.data.message
         });
      };
      if (auth?.user?._id) {
         clientSocket.emit('joinClientRoom', JSON.stringify(auth?.user?._id));
         clientSocket.on('purchaseNotification', handlePurchaseNotification);
         clientSocket.on('statusNotification', handlePurchaseNotification);
      }

      return () => {
         clientSocket.off('purchaseNotification', handlePurchaseNotification);
         clientSocket.off('statusNotification', handlePurchaseNotification);
         clientSocket.disconnect();
      };
   }, [auth]);
   const showMiniCart = () => {
      const mini_cart_overlay = document.querySelector('.mini-cart-overlay');
      mini_cart_overlay?.classList.toggle('hidden');
      const wrap_mini_cart = document.querySelector('.wrap-mini-cart');
      wrap_mini_cart?.classList.toggle('!translate-x-[0%]');
   };
   const showMenuReponsive = () => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');
      const overlay_menu_homepage = document.querySelector('.overlay-menu-homepage');
      overlay_menu_homepage?.classList.toggle('!opacity-[0.15]');
      overlay_menu_homepage?.classList.toggle('!visible');

      const header_menu = document.querySelector('.header-menu');
      header_menu?.classList.toggle('max-xl:translate-x-[0%]');
   };
   const showCategoriesMenu = () => {
      const cate_menu = document.querySelector('.cate-menu');
      cate_menu?.classList.toggle('max-xl:max-h-[41px]');
   };
   const showModalSearch = () => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');
      const section_search_modal = document.querySelector('.section-search-modal');
      const section_overlay_search = document.querySelector('.section-overlay-search');
      setTimeout(() => {
         section_overlay_search?.classList.toggle('hidden');
      }, 300);
      setTimeout(() => {
         section_search_modal?.classList.toggle('hidden');
      }, 500);
      setTimeout(() => {
         section_search_modal?.classList.toggle('!translate-y-[0%]');
      }, 600);
   };
   let oldScrollY = window.scrollY;
   const fixedMenu = () => {
      const header = document.querySelector('.header');
      const wrap_header = document.querySelector('.main-header');

      if (oldScrollY < window.scrollY) {
         if (document.documentElement.scrollTop > 99) {
            header?.classList.add('translate-y-[-100%]');
         }
      } else {
         if (document.documentElement.scrollTop < 99) {
            header?.classList.remove('fixed');
            wrap_header?.classList.remove('xl:pt-[106px]');
            wrap_header?.classList.remove('max-xl:pt-[76px]');
            header?.classList.remove('translate-y-[-100%]');
         } else {
            header?.classList.add('fixed');
            wrap_header?.classList.add('xl:pt-[106px]');
            wrap_header?.classList.add('max-xl:pt-[76px]');
            header?.classList.remove('translate-y-[-100%]');
         }
      }
      oldScrollY = window.scrollY;
   };

   return (
      <div className='main-header'>
         <header className='header  top-0 right-0 left-0 z-[5] transition-all duration-500 border-b-[1px] bg-white border-[#e2e2e2]  shadow-[0px_0px_10px_rgba(51,51,51,0.15)]'>
            <section className='mx-auto px-[30px] w-full relative max-w-[1520px] m-auto'>
               <div className='header-content flex items-center max-xl:justify-between max-xl:py-[15px] '>
                  <div className='header-logo xl:w-[15%] max-xl:[w-auto]'>
                     <Link to='/'>
                        <img className='logo-img max-w-[120px]' src={logoUrl} alt='' />
                     </Link>
                  </div>
                  <div
                     onClick={showMenuReponsive}
                     className='overlay-menu-homepage xl:hidden fixed w-[100%] top-0 bottom-0 left-0 right-0 z-[7] opacity-0 bg-[#333333]   invisible'
                  ></div>
                  <div className='header-menu xl:w-[60%] max-xl:fixed  max-xl:transition-all max-xl:duration-500 max-xl:translate-x-[-100%]  max-xl:bottom-0 top-0 left-0 w-[320px] max-xl:z-[8] max-xl:bg-white'>
                     <ul className='main-menu flex max-xl:flex  max-xl:flex-col'>
                        <li className='cursor-pointer main-menu-item text-[20px] flex justify-end xl:hidden  xl:py-[40px] xl:px-[15px] font-extrabold group  max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[10px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2]'>
                           <span onClick={showMenuReponsive} className='cursor-pointer'>
                              <FaXmark className='text-[20px]'></FaXmark>
                           </span>
                        </li>
                        <li className=' cursor-pointer main-menu-item group/menu-item text-[17px] xl:py-[40px] xl:px-[15px] font-bold group  max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative'>
                           <Link
                              to='/'
                              className='group-hover:text-[#51A55C] after:content-[""] after:w-[0] after:h-[2px] after:bg-[#51A55C] after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px] '
                           >
                              Trang chủ
                           </Link>
                        </li>
                        <li className='cursor-pointer  main-menu-item text-[17px] xl:py-[40px] xl:px-[15px] font-bold group max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative group/menu-item'>
                           <a
                              href=''
                              className='group-hover:text-[#51A55C] after:content-[""] after:w-[0] after:h-[2px] after:bg-[#51A55C] after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px]'
                           >
                              Giới thiệu
                           </a>
                        </li>
                        <li className='cursor-pointer  main-menu-item   group/categories-menu cate-menu max-xl:overflow-hidden max-xl:max-h-[41px] text-[17px] xl:py-[40px] xl:px-[15px] font-bold group  max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative group/menu-item'>
                           <div onClick={showCategoriesMenu} className='w-full h-full xl:hidden absolute'></div>
                           <div className='flex items-center group-hover:text-[#51A55C] max-xl:justify-between'>
                              <span className='after:content-[""] xl:hidden after:w-[0] after:h-[2px] after:bg-[#51A55C] after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px]'>
                                 Danh mục
                              </span>
                              <Link to='/collections'>
                                 <span className='after:content-[""] max-xl:hidden after:w-[0] after:h-[2px] after:bg-[#51A55C] after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px]'>
                                    Danh mục
                                 </span>
                              </Link>

                              <span className='text-[11px] ml-[5px]'>
                                 <FaChevronDown></FaChevronDown>
                              </span>
                           </div>
                           <ul className='sub-menu xl:min-w-[175px] xl:absolute  xl:top-[100%]  xl:shadow-[0px_0px_10px_rgba(51,51,51,0.15)] xl:invisible bg-white xl:translate-y-[20%] xl:transition-all xl:duration-500 xl:opacity-0 xl:group-hover/categories-menu:translate-y-[0%] xl:z-[-1] xl:group-hover/categories-menu:z-[3] xl:group-hover/categories-menu:visible xl:group-hover/categories-menu:opacity-100 max-xl:w-full max-xl:mt-[9px]  '>
                              {data?.body.data.map((item) => {
                                 return (
                                    <>
                                       <li className='group/sub-menu sub-menu-item py-[10px] px-[15px]  cursor-pointer'>
                                          <Link
                                             to={'/collections?cate_id=' + item._id}
                                             className='group-hover/sub-menu:text-[#51A55C] text-[#6f6f6f] font-medium '
                                          >
                                             {item.cateName}
                                          </Link>
                                       </li>
                                    </>
                                 );
                              })}
                           </ul>
                        </li>
                        <li className='cursor-pointer  main-menu-item text-[17px] xl:py-[40px] xl:px-[15px] font-bold group max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative group/menu-item'>
                           <a
                              href=''
                              className='group-hover:text-[#51A55C] after:content-[""] after:w-[0] after:h-[2px] after:bg-[#51A55C] after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px]'
                           >
                              Liên hệ
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div className='header-icon xl:w-[25%]'>
                     <ul className='list-header-icon flex justify-end items-center'>
                        <li
                           onClick={showMenuReponsive}
                           className='header-icon-item header-search-icon text-[20px] ml-[30px] hidden max-xl:block transition-colors duration-300 cursor-pointer hover:text-[#d2401e]'
                        >
                           <AiOutlineMenu></AiOutlineMenu>
                        </li>
                        <li
                           onClick={showModalSearch}
                           className='max-sm:hidden header-icon-item header-search-icon text-[20px] ml-[30px] transition-colors duration-300 cursor-pointer hover:text-[#d2401e]'
                        >
                           <SearchOutlined></SearchOutlined>
                        </li>
                        {!auth?.accessToken && (
                           <li className='ml-[30px]'>
                              <Link to='/orders'>
                                 <Tooltip title={<span className='text-white font-thin'>Tra cứu đơn hàng</span>}>
                                    {' '}
                                    <PiPackageLight className='w-6 h-6 hover:text-[#d2401e] text-[#6f6f6f]' />
                                 </Tooltip>
                              </Link>
                           </li>
                        )}
                        {!auth?.accessToken ? (
                           <li className='max-sm:hidden header-icon-item header-search-icon text-[20px] ml-[30px] transition-colors duration-300 cursor-pointer hover:text-[#d2401e]'>
                              <Popover
                                 placement='bottom'
                                 content={
                                    <>
                                       <Link to={'/login'} className='flex items-center gap-[5px] py-[5px]'>
                                          <FiLogIn></FiLogIn>Đăng nhập
                                       </Link>
                                       <Link to={'/signup'} className='flex items-center gap-[5px] py-[5px]'>
                                          <AiOutlineUserAdd></AiOutlineUserAdd> Đăng ký
                                       </Link>

                                       <Link to='' className='flex items-center gap-[5px] py-[5px]'>
                                          <MdOutlineLockReset></MdOutlineLockReset> Quên mật khẩu
                                       </Link>
                                    </>
                                 }
                                 trigger='hover'
                              >
                                 <span>
                                    <AiOutlineUser></AiOutlineUser>
                                 </span>
                              </Popover>
                           </li>
                        ) : (
                           <>
                              <li className='max-sm:hidden header-icon-item header-search-icon text-[20px] ml-[30px] transition-colors duration-300 cursor-pointer hover:text-[#d2401e]'>
                                 <Popover
                                    placement='bottom'
                                    content={
                                       <>
                                          <div>
                                             <Link to='' className='flex items-center gap-[5px] py-[5px]'>
                                                <PiUserListBold></PiUserListBold> Hồ sơ của bạn
                                             </Link>
                                          </div>

                                          <div>
                                             <Link to='/orders' className='flex items-center gap-[5px] py-[5px]'>
                                                <RiBillLine></RiBillLine> Lịch sử mua hàng
                                             </Link>
                                          </div>
                                          <div>
                                             <button
                                                className='flex items-center gap-[5px] py-[5px]'
                                                onClick={() => onHandleLogout()}
                                             >
                                                <FiLogOut></FiLogOut>Đăng xuất
                                             </button>
                                          </div>
                                       </>
                                    }
                                    trigger='hover'
                                 >
                                    <img
                                       src={auth?.user?.avatar}
                                       className='w-7  aspect-square m-0 rounded-full cursor-pointer'
                                    />
                                 </Popover>
                              </li>
                              <Popover
                                 placement='bottom'
                                 content={
                                    <div className='max-h-[450px] overflow-scroll '>
                                       {clientNotification?.body?.data?.map((noti: INotification, index: number) => (
                                          <div
                                             key={index}
                                             className='relative border-b-[1px] border-gray-400  p-2 hover:bg-gray-200 '
                                          >
                                             <Link
                                                onClick={async () => {
                                                   await updateNotification({ id: noti._id, isRead: true });
                                                }}
                                                to={noti.link}
                                                className='w-[100%] block'
                                             >
                                                {!noti.isRead && (
                                                   <span className='absolute top-2 right-2 w-[15px] h-[15px] bg-red-500 rounded-full text-center text-white text-[9px]'>
                                                      !
                                                   </span>
                                                )}
                                                <h1 className='font-bold break-words w-[270px]'>{noti.title}</h1>
                                                <p
                                                   className='text-gray-400 '
                                                   style={{
                                                      width: '280px',
                                                      WebkitLineClamp: '1',
                                                      wordBreak: 'break-word',
                                                      overflowWrap: 'break-word',
                                                      textOverflow: 'ellipsis',
                                                      overflow: 'hidden',
                                                      display: '-webkit-box',
                                                      WebkitBoxOrient: 'vertical'
                                                   }}
                                                >
                                                   {noti.message}
                                                </p>
                                                <span className='text-gray-400'>
                                                   {formatStringToDate(noti.createdAt)}
                                                </span>
                                             </Link>
                                             <p className='text-right mt-2 absolute bottom-0 right-2 bg-red-300 px-3 py-1 mb-2 text-white hover:bg-red-400 duration-300'>
                                                <button
                                                   onClick={async () => {
                                                      await deleteNotification(noti._id);
                                                   }}
                                                   className='text-black-300 hover:underline'
                                                >
                                                   Xóa
                                                </button>
                                             </p>
                                          </div>
                                       ))}
                                    </div>
                                 }
                                 trigger='click'
                              >
                                 {auth.accessToken && (
                                    <Badge
                                       color='red'
                                       count={
                                          clientNotification?.body?.data?.filter((noti: any) => noti.isRead == false)
                                             .length
                                       }
                                       showZero={false}
                                    >
                                       <li className='max-sm:hidden header-icon-item header-search-icon text-[20px] ml-[30px] relative transition-colors duration-300 cursor-pointer hover:text-[#d2401e]   '>
                                          <BsBell></BsBell>
                                       </li>
                                    </Badge>
                                 )}
                              </Popover>
                           </>
                        )}
                        <Badge count={totalProductInCart} showZero={false}>
                           <li
                              onClick={showMiniCart}
                              className='max-sm:hidden header-icon-item header-search-icon text-[20px] ml-[30px] relative transition-colors duration-300 cursor-pointer hover:text-[#d2401e]   '
                           >
                              {' '}
                              <HiOutlineShoppingBag></HiOutlineShoppingBag>
                           </li>
                        </Badge>{' '}
                     </ul>
                  </div>
               </div>
            </section>
         </header>
      </div>
   );
};

export default Header;
