import { ConfigProvider, Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { ICartSlice } from '../../../../slices/cartSlice';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
const OrderCheckOut = ({ onSubmit }) => {
   const [PayValue, setPayValue] = useState(1);
   const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setPayValue(e.target.value);
   };
   const {handleSubmit} = useForm()
   const cart = useSelector((state: { cart: ICartSlice }) => state?.cart);   
   return (
      <>
         <div className='order-checkout'>
            <div className='order-checkout-content  flex max-md:flex-wrap  ml-[-30px]'>
               <div className='check-pro ml-[30px] md:w-[calc(50%-30px)] max-md:w-full '>
                  <span className='text-[26px] text-[#333333] font-bold'>Giỏ hàng của bạn (8)</span>
                  <ul className='list-check-pro mt-[20px] md:max-h-[650px] overflow-scroll'>
                     {cart.items.map(item=>{
                        return<>
                        <li className='check-pro-item flex items-center mb-[20px] pb-[20px] border-b border-[#e2e2e2]'>
                        <div className='check-pro-img w-[112px] h-[122px]  '>
                           <img
                              className='w-full h-full rounded-[5px] border border-[#e2e2e2]'
                              src={item.images}
                              alt=''
                           />
                        </div>
                        <div className='check-pro-content ml-[15px]'>
                           <a href='#' className='block font-bold text-[#333333]'>
                              {item.name}
                           </a>
                           <span className='block font-bold mt-[2px]'>
                              Xuất sứ: <span className='font-[500]'>Trung Quốc</span>
                           </span>
                           <span className='mt-[5px] font-bold'>{item.weight} X </span>
                           <span className='mt-[5px] font-bold'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        </div>
                     </li>
                        </>
                     })}
       
                  </ul>
               </div>
               <div className='order-detail md:w-[calc(50%-30px)] max-md:w-full  ml-[30px]'>
                  <span className='text-[20px] text-[#333333] font-bold'>Đơn hàng của bạn</span>
                  <div className='order-info mt-[23px]'>
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-[500]'>Sản phẩm</span>
                        <span className='text-[18px] font-[500]'>Tổng</span>
                     </div>
                   {cart.items.map(item=>{
                     return<>
                       <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-[500]'>{item.name}</span>
                        <span className='text-[18px] font-[500]'>{(item.price*item.weight).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                     </div>
                     </>
                   })}
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-[500]'>Tính tạm:</span>
                        <span className='text-[18px] font-[500]'>{cart.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                     </div>
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-[500]'>Mã giảm giá:</span>
                        <span className='text-[18px] font-[500]'>1000</span>
                     </div>
                     <div className='order-details pt-[13px] mt-[13px] flex items-center justify-between border-t border-[#e2e2e2]'>
                        <span className='text-[18px] font-extrabold'>Tổng:</span>
                        <span className='text-[18px] font-bold'>{cart.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
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
                                 <Radio value={1}>
                                    <img
                                       className='w-[60px]'
                                       src='https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/vnpay-logo.png'
                                       alt=''
                                    />
                                 </Radio>
                                 <Radio value={2}>
                                    <img
                                       className='w-[60px]'
                                       src='https://cdn2.cellphones.com.vn/x/media/wysiwyg/momo_1.png'
                                       alt=''
                                    />
                                 </Radio>
                                 <Radio value={3}>
                                    <img
                                       className='w-[60px]'
                                       src='https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/zalopay-logo.png'
                                       alt=''
                                    />
                                 </Radio>
                              </Radio.Group>
                           </ConfigProvider>
                        </form>
                     </div>
                  </div>
                  <div className='wrap-btn-order-detail  mt-[28px] text-center text-[18px] font-bold transition-colors duration-300 hover:bg-black text-white bg-[#d2401e] rounded-[50px] '>
                     <button onClick={handleSubmit(onSubmit)} className='w-full h-full py-[12px] px-[30px] '>MUA HÀNG</button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default OrderCheckOut;
