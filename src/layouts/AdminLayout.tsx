/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import {
   PieChartOutlined,
   UserOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   NotificationOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, message, theme } from 'antd';
import { Outlet } from 'react-router';
import { logoUrl } from '../constants/imageUrl';
import ProductIcon from '../components/Icons/ProductIcon';
import { Link } from 'react-router-dom';
import TicketIcon from '../components/Icons/TicketIcon';
import OrderIcon from '../components/Icons/OrderIcon';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import { useNavigate } from 'react-router-dom';
import { FaTruckRampBox } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { saveTokenAndUser } from '../slices/authSlice';
import NotificationSound from '../assets/notification-sound.mp3';
import { useGetTokenQuery } from '../services/auth.service';
import ReSizePage from '../pages/ReSizePage';
import Loading from '../components/Loading/Loading';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
   return {
      key,
      icon,
      children,
      label
   } as MenuItem;
}

const items: MenuItem[] = [
   getItem(<Link to='/manage/dashboard'>Trang chủ</Link>, '1', <PieChartOutlined />),
   getItem('Sản phẩm cửa hàng', '2', <ProductIcon />, [
      getItem(<Link to='/manage/products'>Sản phẩm</Link>, '3'),
      getItem(<Link to='/manage/categories'>Danh mục</Link>, '4'),
      getItem(<Link to='/manage/shipments'>Lô hàng</Link>, '5'),
      getItem(<Link to='/manage/origin'>Nguồn gốc</Link>, '6')
   ]),
   getItem(<Link to='/manage/orders'>Đơn hàng</Link>, 'sub1', <OrderIcon />),
   getItem(<Link to='/manage/vouchers'>Mã khuyễn mãi</Link>, 'sub2', <TicketIcon />),
   getItem(<Link to='/manage/evaluation'>Quản lý đánh giá</Link>, 'sub3', <UserOutlined />),
   getItem(<Link to='/manage/unsoldproduct'>Sản phẩm thất thoát</Link>, 'sub4', <FaTruckRampBox />),
   getItem(<Link to='/manage/chat'>Tư vấn mua hàng</Link>, 'sub5', <NotificationOutlined />)
];

const AdminLayout = () => {
   const [collapsed, setCollapsed] = useState(false);
   const [checking, setChecking] = useState(true);
   const [open, setOpen] = useState(false);
   const { data, isLoading } = useGetTokenQuery();
   const auth = useSelector((state: any) => state.userReducer);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const audioPlayer = useRef(null);

   const ButtonTrigger = (
      <button className='bg-greenPrimary text-white w-full font-semibold'>{collapsed ? 'Hiện' : 'Ẩn'}</button>
   );
   const {
      token: { colorBgContainer }
   } = theme.useToken();
   useEffect(() => {
      setChecking(true);
      if (!isLoading && data?.body?.data && Object.keys(auth.user).length == 0) {
         if (Object.keys(data.body.data.data).length > 0) {
            dispatch(saveTokenAndUser({ accessToken: data.body.data.accessToken, user: data.body.data.data }));
         } else {
            message.warning('You are not logged in');
            navigate('/');
         }
         setChecking(false);
      } else if (Object.keys(auth.user).length > 0) {
         if (auth.user.role !== 'admin') {
            message.warning('You are not allowed to arrive this');
            navigate('/');
         }
         setChecking(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, isLoading, auth.user]);
   if (checking) {
      return (
         <div className='h-screen flex items-center justify-center'>
            <Loading sreenSize='lg' />
         </div>
      );
   }
   return (
      <>
         <div className='w-full md:hidden'>
            <ReSizePage />
         </div>
         <Layout>
            <Sider
               width={250}
               collapsible
               collapsed={collapsed}
               onCollapse={(value) => setCollapsed(value)}
               style={{ background: colorBgContainer, position: 'fixed' }}
               className={
                  ' z-[999] transition-all ' +
                  (open ? '-translate-x-0' : '-translate-x-full') +
                  ' md:-translate-x-0 h-screen overflow-y-auto overflow-x-hidden'
               }
               trigger={ButtonTrigger}
            >
               <div className='w-full max-h-[95%] pb-5 overflow-y-auto'>
                  <div className='max-h-[150px] flex justify-center items-center'>
                     <img src={logoUrl} alt='logo' className='max-w-[50%]' />
                  </div>
                  <Menu theme='light' defaultSelectedKeys={['1']} mode='inline' items={items} />
               </div>
               <Button
                  className='bg-greenP300  border-none absolute right-[-30px] top-[70px] z-[999] md:hidden md:opacity-0 md:invisible'
                  onClick={() => setOpen((prev) => !prev)}
                  icon={open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                  style={{ color: 'green' }}
               ></Button>
            </Sider>
            {open ? (
               <div
                  onClick={() => setOpen(false)}
                  className='fixed top-0 right-0 z-[101] w-screen h-full bg-[rgba(0,0,0,0.1)] md:hidden md:opacity-0 md:invisible'
               ></div>
            ) : (
               ''
            )}
            <Layout
               className={
                  'transition-all ' +
                  (!collapsed ? 'md:pl-[250px]' : 'md:pl-[80px] ') +
                  ' max-w-screen-[100%] overflow-x-hidden'
               }
            >
               <HeaderAdmin />
               <audio ref={audioPlayer} src={NotificationSound} />
               <Content className=' w-full px-6  pt-[50px] pb-[50px] flex justify-center '>
                  <Outlet />
               </Content>
            </Layout>
         </Layout>
      </>
   );
};

export default AdminLayout;
