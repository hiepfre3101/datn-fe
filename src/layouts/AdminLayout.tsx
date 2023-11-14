import React, { useState, useEffect, useRef } from 'react';
import {
   PieChartOutlined,
   NotificationOutlined,
   UserOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import { logoUrl } from '../constants/imageUrl';
import ProductIcon from '../components/Icons/ProductIcon';
import { Link } from 'react-router-dom';
import TicketIcon from '../components/Icons/TicketIcon';
import OrderIcon from '../components/Icons/OrderIcon';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { IAuth } from '../slices/authSlice';
import { useGetTokenQuery } from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { saveTokenAndUser } from '../slices/authSlice';
import { setCartName } from '../slices/cartSlice';
import { Socket, io } from 'socket.io-client';
import NotificationSound from '../assets/notification-sound.mp3';

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
      getItem(<Link to='/manage/shipments'>Lô hàng</Link>, '5')
   ]),
   getItem(<Link to='/manage/orders'>Đơn hàng</Link>, 'sub1', <OrderIcon />),
   getItem(<Link to='/manage/vouchers'>Mã khuyễn mãi</Link>, 'sub2', <TicketIcon />),
   getItem(<Link to='/manage/accounts'>Tài khoản</Link>, 'sub3', <UserOutlined />),
   getItem(<Link to='/manage/notifications'>Thông báo người dùng</Link>, 'sub4', <NotificationOutlined />)
];

const AdminLayout = () => {
   const [socket, setSocket] = useState<unknown | Socket | null>(null);
   const [collapsed, setCollapsed] = useState(false);
   const [open, setOpen] = useState(false);
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
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
      if (auth.user.role !== 'admin') {
         navigate('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      const newSocket = io('http://localhost:8080');
      setSocket(newSocket);
      return () => {
         newSocket.disconnect();
      };
   }, []);
   useEffect(() => {
      if (socket != null) {
         console.log(socket);

         (socket as Socket).on('alert', () => {
            // message.warning(res);
            // playAudio();
         });
      }
   }, [socket]);
   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Sider
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{ background: colorBgContainer, position: 'fixed' }}
            className={
               ' z-[999] transition-all ' +
               (open ? '-translate-x-0' : '-translate-x-full') +
               ' md:-translate-x-0 h-screen'
            }
            trigger={ButtonTrigger}
         >
            <div className='max-h-[150px] flex justify-center items-center'>
               <img src={logoUrl} alt='logo' className='object-cover' />
            </div>
            <Menu theme='light' defaultSelectedKeys={['1']} mode='inline' items={items} />
            <Button
               className='bg-[rgb(0,0,0,0.5)] absolute right-[-30px] top-[70px] z-[999] md:hidden md:opacity-0 md:invisible'
               onClick={() => setOpen((prev) => !prev)}
               icon={open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
               style={{ color: 'white' }}
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
         <Layout className={'transition-all ' + (!collapsed ? 'md:pl-[250px]' : 'md:pl-[80px] ')}>
            <HeaderAdmin />
            <audio ref={audioPlayer} src={NotificationSound} />
            <Content className=' w-full px-6  pt-[50px] pb-[50px] flex justify-center '>
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};

export default AdminLayout;
