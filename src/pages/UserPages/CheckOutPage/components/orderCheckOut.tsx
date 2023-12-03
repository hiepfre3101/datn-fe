/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Radio, RadioChangeEvent, Button } from 'antd';
import { useEffect, useState } from 'react';
import { ICartSlice } from '../../../../slices/cartSlice';
import { useSelector } from 'react-redux';
import { UseFormReturn } from 'react-hook-form';
import { IOrder } from '../../../../interfaces/order';
import { Link } from 'react-router-dom';
import { useGetCartQuery } from '../../../../services/cart.service';
import { IAuth } from '../../../../slices/authSlice';
import { vnpayUrl } from '../../../../constants/imageUrl';
import { IVoucher } from '../../../../slices/voucherSlice';
interface Iprops {
   onSubmit: (data: IOrder) => void;
   methods: UseFormReturn<IOrder, any, undefined>;
   loadingState: boolean;
}
export type paymentMethod = {
   name: string;
   value: 'cod' | 'momo' | 'vnpay';
   type: 'text' | 'logo';
   srcLogo?: string;
};
const PAYMENT_METHODS: paymentMethod[] = [
   { name: 'Thanh toán khi nhận hàng', value: 'cod', type: 'text' },
   { name: 'VNpay', value: 'vnpay', type: 'logo', srcLogo: vnpayUrl }
];
const OrderCheckOut = ({ onSubmit, methods, loadingState }: Iprops) => {
   const [PayValue, setPayValue] = useState<'cod' | 'momo'>('cod');
   const onChange = (e: RadioChangeEvent) => {
      setPayValue(e.target.value);
   };
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const [showfetch, setShowFetch] = useState(false);
   const { data: cartdb } = useGetCartQuery(undefined, { skip: showfetch == false });
   const voucher = useSelector((state: { vouchersReducer: IVoucher }) => state.vouchersReducer);
   useEffect(() => {
      if (auth.user._id) {
         setShowFetch(true);
      }
   }, [auth.user._id]);
   const CartLocal = useSelector((state: { cart: ICartSlice }) => state?.cart);
   const cart = auth.user._id ? cartdb?.body.data : CartLocal;
   const [total, setTotal] = useState<number>();
   const [subtotal, setSubtotal] = useState<number>(0);
   useEffect(() => {
      const temp =
         auth.user._id && cart?.products
            ? cart?.products.reduce(
                 (accumulator: number, product: any) =>
                    accumulator +
                    (product.productId.price - (product.productId.price * product.productId.discount) / 100) *
                       product.weight,
                 0
              )
            : cart?.totalPrice;
      setSubtotal(temp);
   }, [cart]);
   useEffect(() => {
      if (voucher._id) {
         if (voucher.maxReduce) {
            const temp =
               subtotal > voucher.maxReduce
                  ? subtotal - voucher.maxReduce
                  : subtotal - (subtotal * voucher.percent) / 100;
            setTotal(temp);
         } else {
            const temp = subtotal - (subtotal * voucher.percent) / 100;
            setTotal(temp);
         }
      } else {
         const temp =
            auth.user._id && cart?.products
               ? cart?.products.reduce(
                    (accumulator: number, product: any) => accumulator + product.productId.price * product.weight,
                    0
                 )
               : cart?.totalPrice;
         setTotal(temp);
      }
   }, [cart, voucher, subtotal]);

   return (
      <>
         <div className='order-checkout'>
            <div className='order-checkout-content  flex max-md:flex-wrap  ml-[-30px]'>
               <div className='check-pro ml-[30px] md:w-[calc(50%-30px)] max-md:w-full '>
                  <span className='text-[26px] text-[#333333] font-bold'>
                     Giỏ hàng của bạn ({cart?.products ? cart?.products.length : 0})
                  </span>
                  <ul className='list-check-pro mt-[20px] md:max-h-[650px] overflow-scroll'>
                     {cart?.products ? (
                        cart?.products?.map((item: any) => {
                           return (
                              <>
                                 <li className='check-pro-item flex items-center mb-[20px] pb-[20px] border-b border-[#e2e2e2]'>
                                    <div className='check-pro-img w-[112px] h-[122px]  '>
                                       <img
                                          className='w-full h-full rounded-[5px] border border-[#e2e2e2]'
                                          src={item.productId.images[0].url}
                                          alt=''
                                       />
                                    </div>
                                    <div className='check-pro-content ml-[15px]'>
                                       <Link
                                          to={'/products/' + item.productId._id}
                                          className='block font-bold text-[#333333]'
                                       >
                                          {item.productId?.productName}
                                       </Link>
                                       <span className='block font-bold mt-[2px]'>
                                          Xuất sứ: <span className='font-[500]'>{item.productId?.origin?.name}</span>
                                       </span>
                                       <span className='mt-[5px] font-bold'>{item.weight} X </span>
                                       <span className='mt-[5px] font-bold'>
                                          {item.productId.discount
                                             ? (
                                                  item.productId.price -
                                                  (item.productId.price * item.productId.discount) / 100
                                               ).toLocaleString('vi-VN', {
                                                  style: 'currency',
                                                  currency: 'VND'
                                               })
                                             : item.productId.price.toLocaleString('vi-VN', {
                                                  style: 'currency',
                                                  currency: 'VND'
                                               })}
                                       </span>
                                    </div>
                                 </li>
                              </>
                           );
                        })
                     ) : (
                        <p>Giỏ hàng trống</p>
                     )}
                  </ul>
               </div>
               <div className='order-detail md:w-[calc(50%-30px)] max-md:w-full  ml-[30px]'>
                  <span className='text-[20px] text-[#333333] font-bold'>Đơn hàng của bạn</span>
                  <div className='order-info mt-[23px]'>
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-[500]'>Sản phẩm</span>
                        <span className='text-[18px] font-[500]'>Tổng</span>
                     </div>
                     {cart?.products &&
                        cart?.products.map((item: any) => {
                           return (
                              <>
                                 <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                                    <span className='text-[18px] font-[500]'>{item.productId.productName}</span>
                                    <span className='text-[18px] font-[500]'>
                                       {item.productId.discount
                                          ? (
                                               (item.productId?.price -
                                                  (item.productId?.price * item.productId?.discount) / 100) *
                                               item.weight
                                            ).toLocaleString('vi-VN', {
                                               style: 'currency',
                                               currency: 'VND'
                                            })
                                          : (item?.weight * item.productId?.price).toLocaleString('vi-VN', {
                                               style: 'currency',
                                               currency: 'VND'
                                            })}
                                    </span>
                                 </div>
                              </>
                           );
                        })}
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-[500]'>Tính tạm:</span>
                        <span className='text-[18px] font-[500]'>
                           {subtotal?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                     </div>
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-[500]'>Mã giảm giá: {voucher._id ? voucher.code : ''}</span>

                        <span className='temporary font-bold  text-[14px] '>
                           {!voucher.maxReduce
                              ? '- ' +
                                ((subtotal * voucher.percent) / 100).toLocaleString('vi-VN', {
                                   style: 'currency',
                                   currency: 'VND'
                                })
                              : ''}
                        </span>
                        {voucher.maxReduce && (
                           <span className='text-[18px] font-[500]'>
                              {voucher.maxReduce && subtotal > voucher?.maxReduce
                                 ? '- ' +
                                   voucher.maxReduce.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                 : '- ' +
                                   ((subtotal * voucher.percent) / 100).toLocaleString('vi-VN', {
                                      style: 'currency',
                                      currency: 'VND'
                                   })}
                           </span>
                        )}
                     </div>
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-extrabold'>Tổng:</span>
                        <span className='text-[18px] font-bold'>
                           {total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                     </div>
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <form action='' className=' flex flex-col gap-y-[10px]'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    colorPrimary: '#51A55C'
                                 }
                              }}
                           >
                              <Radio.Group
                                 className='flex flex-col justify-center-center'
                                 onChange={onChange}
                                 value={PayValue}
                              >
                                 {PAYMENT_METHODS.map((method) => (
                                    <Radio value={method.value}>
                                       {method.type === 'logo' ? (
                                          <img className='w-[60px]' src={method?.srcLogo} alt='' />
                                       ) : (
                                          <span className='text-greenPrimary font-semibold'>{method.name}</span>
                                       )}
                                    </Radio>
                                 ))}
                              </Radio.Group>
                           </ConfigProvider>
                        </form>
                     </div>
                  </div>
                  <div className='wrap-btn-order-detail  mt-[28px] text-center text-[18px]  transition-colors duration-300 hover:bg-black  bg-[#d2401e] rounded-[50px] '>
                     <Button
                        disabled={cart == undefined ? true : false}
                        onClick={methods.handleSubmit((data) => {
                           console.log(data);
                           onSubmit({ ...data, paymentMethod: PayValue, note: data.note ? data.note : '' });
                        })}
                        className='w-full h-full py-[12px] border-none hover:!text-white px-[30px] font-bold text-white'
                        loading={loadingState}
                     >
                        MUA HÀNG
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default OrderCheckOut;
