/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import OrderDetail from './components/orderDetail';
import OrderNote from './components/orderNote';
import OrderCheckOut from './components/orderCheckOut';
import { Button, ConfigProvider, Steps, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
   ICartItems,
   ICartSlice,
   removeAllProductFromCart,
   removeFromCart,
   updatePrice
} from '../../../slices/cartSlice';
import { useAddOrderMutation } from '../../../services/order.service';
import { IOrder } from '../../../interfaces/order';
import { clientSocket } from '../../../config/socket';
import { useCheckCartMutation, useGetCartQuery } from '../../../services/cart.service';
import { IAuth } from '../../../slices/authSlice';
import { formatCharacterWithoutUTF8 } from '../../../helper';
const CheckOutPage = () => {
   // const [checkOutState, setCheckOutState] = useState<string>('order-detail');
   const navigate = useNavigate();
   // const handleChangeCheckOutState = (state:string) => {
   //    setCheckOutState(state)
   // }
   const methods = useForm<IOrder>();
   const [handleAddOrder] = useAddOrderMutation();
   const [checkCartdb] = useCheckCartMutation();
   const [current, setCurrent] = useState(0);
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const [showfetch, setShowFetch] = useState(false);
   const { data: cartdb } = useGetCartQuery(undefined, { skip: !showfetch });
   useEffect(() => {
      if (auth.user._id) {
         setShowFetch(true);
      }
   }, [auth.user._id]);
   const CartLocal = useSelector((state: { cart: ICartSlice }) => state?.cart);
   const cart = auth.user._id ? cartdb?.body.data : CartLocal;
   const [loadingState, setLoadingState] = useState<boolean>(false);
   const dispatch = useDispatch();
   const onSubmit = async (data: IOrder) => {
      if (current < 2) {
         next();
      }
      if (current == 2) {
         setLoadingState(!loadingState);
         if (data.note == '') {
            delete data.note;
         }
         data.note = formatCharacterWithoutUTF8(data.note || '');
         data.products = cart.items;
         data.totalPayment = cart.totalPrice;
         try {
            // if(auth.user._id){
            //    const { data: checkCartdb } = useGetCartQuery();
            //    console.log(checkCartdb);
            //    error=true
            // }
            // else{
            //    checkCartdb(cart).then((res) => {
            //       console.log(res);
            //    })
            //    console.log(cart);

            // }
            data.products = cart?.products.map((product: ICartItems) => {
               return {
                  productName: product.productId.productName,
                  price:
                     product.productId.discount && product.productId.discount > 0
                        ? product.productId.price - (product.productId.price * product.productId.discount) / 100
                        : product.productId.price,
                  productId: product.productId._id,
                  images: product.productId?.images[0].url,
                  weight: product.weight,
                  originId: product.productId?.originId?._id
               };
            });
            data.totalPayment = auth.user._id
               ? cart?.products.reduce(
                    (accumulator: number, product: any) =>
                       accumulator +
                       (product.productId.price - (product.productId.price * product.productId.discount) / 100) *
                          product.weight,
                    0
                 )
               : cart?.totalPrice;
            await handleAddOrder(data)
               .then((res) => {
                  if ('error' in res && res.error && 'data' in res.error) {
                     const errorData = res.error.data as any;
                     if (errorData.message == 'Product not exist') {
                        errorData.body.data.map((item: ICartItems) => {
                           dispatch(removeFromCart({ id: item.productId._id }));
                        });
                        notification.info({
                           message: 'Cập nhật sản phẩm trong giỏ hàng',
                           description:
                              'Trong giỏ hàng của bạn có tồn tại sản phẩm không có trên hệ thống và đã được cập nhật lại.'
                        });
                     } else if (errorData.message == 'Price is not valid') {
                        errorData.body.data.map((item: ICartItems) => {
                           dispatch(updatePrice(item));
                        });
                        notification.info({
                           message: 'Cập nhật sản phẩm trong giỏ hàng',
                           description:
                              'Thông tin sản phẩm trong giỏ hàng của bạn không thống nhất với hệ thống và đã được cập nhật lại.'
                        });
                     } else {
                        notification.error({
                           message: 'Mua hàng thất bại',
                           description: 'Lỗi hệ thống'
                        });
                     }
                  } else {
                     if ('data' in res && 'status' in res.data) {
                        message.success('Mua hàng thành công');
                        dispatch(removeAllProductFromCart());
                        const value = JSON.stringify({
                           userId: auth?.user?._id,
                           orderId: res.data?.body?.data._id
                        });
                        clientSocket.emit('purchase', value);
                        if (res.data.body.data.url === '') {
                           navigate('/ordercomplete');
                        } else {
                           window.location.href = res.data.body.data.url;
                        }
                     }
                  }
               })
               .finally(() => {
                  setLoadingState(false);
               });
         } catch (error) {
            console.log(error);
         }
      }
   };
   const next = () => {
      setCurrent(current + 1);
   };

   const prev = () => {
      setCurrent(current - 1);
   };
   const steps = [
      {
         title: 'Thông tin người nhận',
         content: <OrderDetail></OrderDetail>
      },
      {
         title: 'Ghi chú',
         content: <OrderNote></OrderNote>
      },
      {
         title: 'Thanh toán',
         content: <OrderCheckOut loadingState={loadingState} methods={methods} onSubmit={onSubmit}></OrderCheckOut>
      }
   ];
   const items = steps.map((item) => ({ key: item.title, title: item.title }));
   return (
      <>
         <div className='main'>
            <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <span>
                     <Link to='/'>Trang chủ </Link> / Thanh toán
                  </span>
               </div>
            </section>

            <FormProvider {...methods}>
               <section className='section-chekout lg:my-[100px] md:my-[80px] max-md:my-[60px]'>
                  <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                     <div className='checkout-header mb-[40px]'>
                        <div className='checkout-tab'>
                           <ConfigProvider
                              theme={{
                                 components: {
                                    Steps: {
                                       colorPrimary: '#51A55C'
                                    }
                                 }
                              }}
                           >
                              <Steps current={current} items={items} />
                           </ConfigProvider>
                        </div>
                     </div>

                     <div className='checkout-content'>
                        <div>{steps[current].content}</div>
                        <div style={{ marginTop: 24 }}>
                           {current < steps.length - 1 && (
                              <Button
                                 className='bg-[#51A55C] text-white hover:bg-[#51A55C] hover:!border-[#51A55C] hover:!text-black'
                                 type='text'
                                 onClick={methods.handleSubmit(onSubmit)}
                              >
                                 Next
                              </Button>
                           )}
                           {current > 0 && (
                              <Button
                                 className=' hover:!border-[#51A55C] hover:!text-[#51A55C] '
                                 style={{ margin: '0 8px' }}
                                 onClick={() => prev()}
                              >
                                 Previous
                              </Button>
                           )}
                        </div>
                     </div>
                  </div>
               </section>
            </FormProvider>
         </div>
      </>
   );
};
export default CheckOutPage;
