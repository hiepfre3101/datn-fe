/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Input, Layout, MenuProps, Popover, notification } from 'antd';
import BellIcon from '../Icons/BellIcon';
import { useEffect, useState } from 'react';
import { IAuth } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { useClearTokenMutation } from '../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
const { Header } = Layout;
import { deleteTokenAndUser } from '../../slices/authSlice';
import { adminSocket } from '../../config/socket';
import {
   useDeleteNotificationMutation,
   useGetAdminNotificationQuery,
   useUpdateNotificationMutation
} from '../../services/notification';
import { INotification } from '../../interfaces/notification';
import { formatStringToDate } from '../../helper';
import { setItem } from '../../slices/cartSlice';
const pagePaths = [
   {
      title: 'Sản phẩm',
      link: 'products'
   },
   {
      title: 'Danh mục',
      link: 'categories'
   },
   {
      title: 'Lô hàng',
      link: 'shipments'
   },
   {
      title: 'Đơn hàng',
      link: 'orders'
   },
   {
      title: 'Thêm sản phẩm',
      link: 'add-product'
   },
   {
      title: 'Thêm danh mục',
      link: 'add-category'
   },
   {
      title: 'Thêm lô hàng',
      link: 'add-shipment'
   }
];
const HeaderAdmin = () => {
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const [triggerDrop, setTriggerDrop] = useState(false);
   const [clearToken] = useClearTokenMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [keyword, setKeyword] = useState('');
   const [path, setPath] = useState<any[]>([]);

   const { data: adminNotification, refetch } = useGetAdminNotificationQuery(auth?.user?._id);
   const [updateNotification] = useUpdateNotificationMutation();
   const [deleteNotification] = useDeleteNotificationMutation();
   const onHandleLogout = () => {
      dispatch(deleteTokenAndUser());
      dispatch(setItem());
      clearToken();
      navigate('/');
   };
   useEffect(() => {
      adminSocket.open();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handlePurchaseNotification = (data: any) => {
         refetch();
         notification.info({
            message: 'Bạn có thông báo mới',
            description: data?.data?.message || 'Kiểm tra ngay'
         });
      };

      adminSocket.on('purchaseNotification', handlePurchaseNotification);
      adminSocket.on('expireProduct', handlePurchaseNotification);
      adminSocket.on('adminStatusNotification', handlePurchaseNotification);
      return () => {
         adminSocket.off('purchaseNotification', handlePurchaseNotification);
         adminSocket.off('adminStatusNotification', handlePurchaseNotification);
         adminSocket.off('expireProduct', handlePurchaseNotification);
         adminSocket.disconnect();
      };
   }, [auth]);
   useEffect(() => {
      if (keyword != '') {
         const array: any[] = [];
         pagePaths.map((data: any) => {
            if (data.title.toLowerCase().match(keyword.toLowerCase())) {
               array.push(data);
            }
         });
         setPath(array);
      } else {
         setPath([]);
      }
   }, [keyword]);
   const items: MenuProps['items'] = [
      {
         label: <a href='https://www.antgroup.com'>1st menu item</a>,
         key: '0'
      },
      {
         label: <a href='https://www.aliyun.com'>2nd menu item</a>,
         key: '1'
      },
      {
         type: 'divider'
      },
      {
         label: (
            <button className='flex items-center gap-[5px] py-[5px]' onClick={() => onHandleLogout()}>
               <FiLogOut></FiLogOut>Đăng xuất
            </button>
         ),
         key: '3'
      }
   ];
   return (
      <Header
         style={{
            paddingLeft: 10,
            paddingRight: 30,
            background: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: '100',
            boxShadow: ' 0 3px 4px -2px rgba(0, 0, 0, 0.123)'
         }}
      >
         <div className='w-[40%] flex justify-start items-center gap-2 rounded-lg border-[1px] border-[rgba(0,0,0,0.1)] px-3 py-2'>
            <SearchOutlined width={'1.5rem'} height={'1.5rem'} color='rgba(0,0,0,0.2)' />
            <Popover
               placement='bottomLeft'
               arrow={false}
               open={path.length > 0 ? true : false}
               content={() =>
                  path.map((data, index) => (
                     <Link to={'/manage/' + data.link} key={index} className='p-1 w-[995px] block'>
                        <h1 className='text-lg font-bold'>{data.title}</h1>
                     </Link>
                  ))
               }
            >
               <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className='outline-none border-none'
                  placeholder='Tìm kiếm'
               />
            </Popover>
         </div>
         <div className='3xl:max-w-[15%] max-w-[25%] flex justify-end items-center gap-3'>
            <div className='flex justify-start items-center gap-2 border-[1px] border-[rgba(0,0,0,0.1)] p-2 rounded-lg overflow-hidden h-[3rem] w-[100%]'>
               <img src={auth.user.avatar} alt='avatar' className='rounded-md object-cover w-[20%] aspect-square' />
               <Dropdown
                  menu={{ items }}
                  trigger={['click']}
                  onOpenChange={(open) => {
                     setTriggerDrop(open);
                  }}
               >
                  <div className='flex-1 flex justify-start gap-2 items-center cursor-pointer p-1 text-center '>
                     <span className='font-medium text-sm text-[#6b6765] '>{auth.user.userName}</span>
                     <div className={triggerDrop ? 'round-up' : 'round-down'}>
                        {' '}
                        <DownOutlined color='#6b6765' size={1} />
                     </div>
                  </div>
               </Dropdown>
            </div>
            <Popover
               placement='bottom'
               content={
                  <div className='max-h-[450px] overflow-scroll pr-3'>
                     {adminNotification?.body?.data?.map((noti: INotification, index: number) => (
                        <div key={index} className='relative border-b-[1px] border-gray-400  p-2 hover:bg-gray-200'>
                           <Link
                              className='w-[90%] pb-4 block'
                              onClick={async () => {
                                 await updateNotification({ id: noti._id, isRead: true });
                              }}
                              to={noti.link}
                           >
                              {!noti.isRead && (
                                 <span className='absolute top-2 right-2 w-[15px] h-[15px] bg-red-500 rounded-full text-center text-white text-[9px]'>
                                    !
                                 </span>
                              )}
                              <h1 className='font-bold break-words'>{noti.title}</h1>
                              <p className='text-gray-400 '>{noti.message}</p>
                              <span className='text-gray-400'>{formatStringToDate(noti.createdAt)}</span>
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
               <Badge
                  color='red'
                  count={adminNotification?.body?.data?.filter((noti: any) => noti.isRead == false).length}
                  showZero={false}
                  offset={[2, 5]}
               >
                  <div className='relative w-[3rem] h-[3rem] flex justify-center items-center rounded-xl p-2 bg-[#dfdede] cursor-pointer'>
                     <BellIcon />
                  </div>
               </Badge>
            </Popover>
         </div>
      </Header>
   );
};

export default HeaderAdmin;
