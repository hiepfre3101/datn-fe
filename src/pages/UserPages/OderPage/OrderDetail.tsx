import { Link, useParams } from 'react-router-dom';
import { BiChevronLeft } from 'react-icons/bi';
import { ConfigProvider, Divider, Steps, message, Button, Tag } from 'antd';
import style from './OrderDetail.module.css';
import { useEffect, useState } from 'react';
import { getDetailOrder } from '../../../api/order';
import Loading from '../../../components/Loading/Loading';
import { IOrderFull } from '../../../interfaces/order';
import { formatStringToDate, transformCurrency, uppercaseFirstLetter } from '../../../helper';
import {
   DONE_ORDER,
   FAIL_ORDER,
   ORDER_STATUS_FULL,
   PENDING_ORDER,
   SHIPPING_ORDER,
   SUCCESS_ORDER
} from '../../../constants/orderStatus';
import ProductInOrder from './Component/ProductInOrder';
import { IAuth } from '../../../slices/authSlice';
import { useSelector } from 'react-redux';
import { adminSocket, clientSocket } from '../../../config/socket';
import { useUpdateOrderMutation } from '../../../services/order.service';
const OrderDetail = () => {
   const { id } = useParams();
   const [order, setOrder] = useState<IOrderFull>();
   const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [changeStatusOrder, { isLoading }] = useUpdateOrderMutation();
   const [recall, setRecall] = useState<boolean>(false);
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   useEffect(() => {
      (async () => {
         try {
            setLoading(true);
            const {
               data: { body }
            } = await getDetailOrder(id!);
            setOrder(body.data);
            setLoading(false);
         } catch (error) {
            setLoading(false);
            message.error('Loi he thong!');
            console.log(error);
         }
      })();
   }, [id, recall]);
   useEffect(() => {
      clientSocket.on('statusNotification', (data) => {
         if (data.status === SUCCESS_ORDER.toLowerCase()) {
            setIsShowConfirm(true);
         }
      });
   }, [auth]);
   const getStatusOfOrder = () => {
      return ORDER_STATUS_FULL.indexOf(
         ORDER_STATUS_FULL.find(
            (status) => status.status === uppercaseFirstLetter(order ? order.status : 'chờ xác nhận')
         )!
      );
   };
   const handleChangeStatusOrder = async () => {
      if (!order) return;
      const dataSubmit = {
         idOrder: order?._id,
         customerName: order.customerName!,
         email: order.email!,
         note: order.note!,
         paymentMethod: order.paymentMethod!,
         userId: order.userId!,
         shippingAddress: order.shippingAddress!,
         products: order.products!,
         phoneNumber: order.phoneNumber!,
         totalPayment: order.totalPayment!,
         status: DONE_ORDER.toLowerCase()
      };
      try {
         await changeStatusOrder(dataSubmit);
         adminSocket.emit('confirmOrder', JSON.stringify(dataSubmit));
         message.success('Xác nhận đơn hàng thành công!');
         setRecall((prev) => !prev);
      } catch (error) {
         message.error('Lỗi hệ thống!');
         console.log(error);
      }
   };
   if (loading) return <Loading sreenSize='lg' />;
   return (
      <div className=' flex flex-col items-start gap-[30px] max-w-[1520px] m-auto p-10'>
         <Link to='/orders' className='flex justify-start items-center gap-[10px] text-black'>
            <BiChevronLeft className='text-[1.5rem]' />
            <span className='text-lg hover:font-semibold duration-200'>Tất cả đơn hàng</span>
         </Link>
         <div className='bg-[rgba(182,180,180,0.1)] w-full min-h-[300px] rounded-2xl p-10 relative'>
            <span className='text-xl font-semibold text-black'>
               Cảm ơn quý khách, <span className='text-greenPrimary'>{order?.customerName}!</span>
            </span>
            <p className='mt-2 text-black font-bold text-lg'>Đơn hàng (#) {order?.invoiceId}</p>
            {isShowConfirm ||
               (order?.status === SUCCESS_ORDER.toLowerCase() && (
                  <Button
                     loading={isLoading}
                     disabled={isLoading}
                     onClick={() => handleChangeStatusOrder()}
                     className='font-semibold hover:!text-[#d2401e] hover:!border-none  px-3 absolute right-10 rounded-lg hover:bg-orange-400 duration-300 bg-orange-300 text-[#d2401e] top-10'
                  >
                     Đã nhận được hàng
                  </Button>
               ))}
            {order?.status === FAIL_ORDER.toLowerCase() && (
               <Tag className='py-2 px-5 absolute right-10 top-10' color='red'>
                  {FAIL_ORDER}
               </Tag>
            )}{' '}
            {order?.status !== FAIL_ORDER.toLowerCase() && (
               <ConfigProvider
                  theme={{
                     components: {
                        Steps: {
                           colorPrimary: '#d2401e',
                           controlItemBgActive: '#ffc7ba'
                        }
                     }
                  }}
               >
                  <Steps
                     className={`mt-10 ${style['ant-steps-item-finish']} max-w-[80%]`}
                     current={getStatusOfOrder()}
                     items={[
                        {
                           title: PENDING_ORDER
                        },
                        {
                           title: SHIPPING_ORDER
                        },
                        {
                           title: SUCCESS_ORDER
                        },
                        {
                           title: DONE_ORDER
                        }
                     ]}
                  />
               </ConfigProvider>
            )}
            <Divider />
            <div className='w-full flex justify-start gap-5 flex-wrap'>
               <div className='w-[40%]'>
                  <div className='flex justify-between w-[60%]'>
                     <div className='flex flex-col items-start'>
                        <span className='text-md'>Ngày đặt hàng</span>
                        <strong className='text-md text-black'>
                           {formatStringToDate(order ? order?.createdAt : '')}
                        </strong>
                     </div>
                     <div className='flex flex-col items-start'>
                        <span className='text-md'>Phương thức thanh toán</span>
                        <strong className='text-md text-black'>Khi nhận hàng</strong>
                     </div>
                  </div>
                  <div className='flex flex-col items-start mt-5'>
                     <span className='text-md'>Địa chỉ nhận hàng</span>
                     <strong className='text-md text-black'>{order?.shippingAddress}</strong>
                  </div>
                  <div className='flex flex-col items-start mt-5'>
                     <span className='text-md'>Ghi chú</span>
                     <strong className='text-md text-black'>{order?.note}</strong>
                  </div>
               </div>
               <Divider type='vertical' className='h-[200px]' />
               <div className='w-[50%]'>
                  <div className=' flex flex-col items-start gap-4 max-h-[350px] overflow-auto px-10'>
                     {order &&
                        order.products.map((product) => (
                           <ProductInOrder product={product} statusOrder={order.status} />
                        ))}
                  </div>
                  <Divider />
                  <div className='flex justify-between items-center text-black px-10'>
                     <strong>Tổng sản phẩm</strong>
                     <span className='font-semibold'>{transformCurrency(order ? order?.totalPayment : 0)}</span>
                  </div>
                  <div className='mt-3 flex justify-between items-center text-black px-10'>
                     <strong>Khuyến mãi</strong>
                     <span className='font-semibold'>0 vnd</span>
                  </div>
                  <div className='mt-3 flex justify-between items-center text-black px-10 text-xl '>
                     <strong className='font-bold'>Tổng tiền</strong>
                     <span className='font-bold'>{transformCurrency(order ? order?.totalPayment : 0)} vnd</span>
                  </div>
               </div>
            </div>{' '}
         </div>
      </div>
   );
};

export default OrderDetail;
