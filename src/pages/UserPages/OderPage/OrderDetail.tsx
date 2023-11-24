import { Link, useParams } from 'react-router-dom';
import { BiChevronLeft } from 'react-icons/bi';
import { ConfigProvider, Divider, Steps, message } from 'antd';
import style from './OrderDetail.module.css';
import { useEffect, useState } from 'react';
import { getDetailOrder } from '../../../api/order';
import Loading from '../../../components/Loading/Loading';
import { IOrderFull } from '../../../interfaces/order';
import { formatStringToDate, transformCurrency, uppercaseFirstLetter } from '../../../helper';
import { ORDER_OF_STATUS, PENDING_ORDER, SHIPPING_ORDER, SUCCESS_ORDER } from '../../../constants/orderStatus';
import ProductInOrder from './Component/ProductInOrder';
import { IAuth } from '../../../slices/authSlice';
import { useSelector } from 'react-redux';
import { clientSocket } from '../../../config/socket';
import { useUpdateOrderMutation } from '../../../services/order.service';
const OrderDetail = () => {
   const { id } = useParams();
   const [order, setOrder] = useState<IOrderFull>();
   const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [changeStatusOrder, { isLoading }] = useUpdateOrderMutation();
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
   }, [id]);
   useEffect(() => {
      clientSocket.on('statusNotification', (data) => {
         if (data.status === SUCCESS_ORDER.toLowerCase()) {
            setIsShowConfirm(true);
         }
      });
   }, [auth]);
   const getStatusOfOrder = () => {
      return ORDER_OF_STATUS.indexOf(
         ORDER_OF_STATUS.find(
            (status) => status.status === uppercaseFirstLetter(order ? order.status : 'chờ xác nhận')
         )!
      );
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
                  <button onClick={()=>changeStatusOrder()} className='py-2 px-3 absolute right-10 rounded-lg hover:bg-orange-400 duration-300 bg-orange-300 text-[#d2401e] top-10'>
                     Đã nhận được hàng
                  </button>
               ))}
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
                        className={`mt-10 ${style['ant-steps-item-finish']}`}
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
                           }
                        ]}
                     />
                  </ConfigProvider>
               </div>
               <Divider type='vertical' className='h-[200px]' />
               <div className='w-[50%]'>
                  <div className=' flex flex-col items-start gap-4 max-h-[350px] overflow-auto px-10'>
                     {order && order.products.map((product) => <ProductInOrder product={product} />)}
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
            </div>
         </div>
      </div>
   );
};

export default OrderDetail;
