/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';
import OrderDetail from './components/orderDetail';
import OrderNote from './components/orderNote';
import OrderCheckOut from './components/orderCheckOut';
import { Button, ConfigProvider, Modal, Steps, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
   ICartItems,
   ICartSlice,
   removeAllProductFromCart,
   removeFromCart,
   updateImgProductInCartLocal,
   updateItem,
   updateNameProductInCartLocal,
   updatePriceProductInCartLocal,
   updateTotalPrice
} from '../../../slices/cartSlice';
import { useAddOrderMutation } from '../../../services/order.service';
import { IOrder } from '../../../interfaces/order';
import { clientSocket } from '../../../config/socket';
import { useCheckCartMutation, useGetCartQuery } from '../../../services/cart.service';
import { IAuth } from '../../../slices/authSlice';
import { formatCharacterWithoutUTF8 } from '../../../helper';
import { IVoucher, remoteVoucher } from '../../../slices/voucherSlice';
import { useCheckVoucherMutation } from '../../../services/voucher.service';
const CheckOutPage = () => {
   const navigate = useNavigate();
   const methods = useForm<IOrder>();
   const [handleAddOrder] = useAddOrderMutation();
   const [checkCartLocal] = useCheckCartMutation();
   const [current, setCurrent] = useState(0);
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const [showfetch, setShowFetch] = useState(false);
   const { data: cartdb, refetch } = useGetCartQuery(undefined, { skip: showfetch == false });
   useEffect(() => {
      if (auth.user._id) {
         setShowFetch(true);
      }
   }, [auth.user._id]);
   const handleOk = () => {
      setIsModalOpen(false);
      refetch()
      setError([]);
   };
   const CartLocal = useSelector((state: { cart: ICartSlice }) => state?.cart);
   const cart = auth.user._id ? cartdb?.body.data : CartLocal;
   const [loadingState, setLoadingState] = useState<boolean>(false);
   const dispatch = useDispatch();
   const [addVoucher] = useCheckVoucherMutation();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [error, setError] = useState<string[]>([]);
   const voucher = useSelector((state: { vouchersReducer: IVoucher }) => state.vouchersReducer);


   const CheckCart = async () => {
      let temp = false;
      if (auth.user._id) {
         let status = true;
         if (voucher._id) {
            const total = cartdb?.body.data.products?.reduce(
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               (accumulator: number, product: any) => accumulator + product.productId.price * product.weight,
               0
            );
            const object = {
               code: voucher.code,
               userId: auth.user._id,
               miniMumOrder: total
            };
            await addVoucher(object)
               .unwrap()
               .catch((error) => {
                  status = false;
                  setIsModalOpen(true);
                  if (error.data.message == 'Voucher does not exist!') {
                     setError((prevError: string[]) => [...prevError, 'Mã giảm giá không tồn tại']);
                     dispatch(remoteVoucher());
                  } else if (error.data.message == 'Voucher does not work!') {
                     setError((prevError: string[]) => [...prevError, 'Mã giảm giá này hiện không còn hoạt động']);
                     dispatch(remoteVoucher());
                  } 
                   else if (error.data.message == 'Voucher is out of quantity!') {
                     setError((prevError: string[]) => [...prevError, 'Mã giảm giá đã hết']);
                     dispatch(remoteVoucher());
                  } else if (error.data.message == 'Voucher is out of date') {
                     setError((prevError: string[]) => [...prevError, 'Mã giảm giá đã hết hạn']);
                     dispatch(remoteVoucher());
                  } else if (error.data.message == 'Orders are not satisfactory!') {
                     setError((prevError: string[]) => [
                        ...prevError,
                        'Đơn hàng của bạn phải có tổng giá trị trên ' +
                           error.data.miniMumOrder.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                     ]);
                     dispatch(remoteVoucher());
                  }
               });
         }
      
         await refetch().unwrap().then((res) => {
            res

            temp = status == true?true:false
       
         }).catch(err => {
            setIsModalOpen(true);
            if (err?.data?.body?.errors as any) {
               err.data.body.errors.map((item: any) => {
      
                  if (item.message == 'The remaining quantity is not enough!') {
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Số lượng trong kho của sản phẩm ' +
                           item.productName +
                           ' không đủ đáp ứng nhu cầu của bạn và đã được cập nhật lại số lượng.'
                     ]);
                  } else if (item.message == 'Product is currently out of stock!') {
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Sản phẩm ' + item.productName + ' đã hết hàng'
                     ]);
                  } else if (item.message == 'Product is no longer available!') {
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Sản phẩm' + item.productName + ' đã  bị xoá khỏi hệ thống'
                     ]);
                  }
               });
            
         }
         temp =  false;  
         });
      } else {
         const cartLocal = {
            products: cart['products'].map((product: any) => {
               let {
                  totalWeight,
                  productId: { originId: { name = undefined, ...originIdRest } = {}, ...productIdRest } = {},
                  ...rest
               } = product;
               return { totalWeight, productId: { originId: originIdRest, ...productIdRest }, ...rest };
            })
         };
         await checkCartLocal(cartLocal).unwrap().then(res=>{
            res  
            temp = true;
         }).catch((err: any) => {
            temp = false;
               setIsModalOpen(true);
               err.data.body?.error.map((item: any) => {
                  if (item.message == 'Product is not exsit!') {
                     dispatch(removeFromCart({ id: item.productId }));
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Sản phẩm ' + item.productName + ' đã bị xoá khỏi hệ thống'
                     ]);
                  } else if (item.message == 'Invalid product origin!') {
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Xuất sứ của sản phẩm ' + item.productName + ' đã được cập nhật'
                     ]);
                  } else if (item.message == 'Invalid product name!') {
                     dispatch(updateNameProductInCartLocal({ id: item.productId, name: item.productName }));
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Tên của sản phẩm ' + item.invalid + ' đã được cập nhật thành ' + item.productName
                     ]);
                  } else if (item.message == 'Invalid price for product!') {
                     dispatch(updatePriceProductInCartLocal({ id: item.productId, price: item.price }));
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Giá của sản phẩm ' +
                           item.productName +
                           ' không đồng nhất với dữ liệu trên hệ thống và đã được cập nhật'
                     ]);
                  } else if (item.message == 'Invalid product image!') {
                     dispatch(updateImgProductInCartLocal({ id: item.productId, img: item?.image }));
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Ảnh của sản phẩm ' +
                           item.productName +
                           ' không đồng nhất với dữ liệu trên hệ thống và đã được cập nhật'
                     ]);
                  } else if (item.message == 'Insufficient quantity of the product in stock!') {
                     dispatch(updateItem({ id: item.productId, weight: item.maxWeight }));
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Số lượng sản phẩm ' +
                           item.productName +
                           ' trong kho không đủ đáp ứng nhu cầu của bạn và đã được cập nhật về ' +
                           item.maxWeight
                     ]);
                  } else if (item.message == 'The product is currently out of stock!') {
                     dispatch(removeFromCart({ id: item.productId }));
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Sản phẩm ' + item.productName + ' đã hết hàng và đã được xoá khỏi giỏ hàng'
                     ]);
                  } else if (item.message == 'Invalid totalPayment!') {
                     dispatch(updateTotalPrice({ total: item.true }));
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Tổng tiền của bạn đang bị sai và đã được cập nhật lại'
                     ]);
                  }
               });
           
         });
      }
      return temp;
   };
   const onSubmit = async (data: IOrder) => {
      if (current < 2) {
         next();
      }
      if (current == 2) {
         setLoadingState(!loadingState);
         if (data.note !== '') {
            data.note = formatCharacterWithoutUTF8(data.note || '');
         } else {
            //dung dong vao cho nay
            data.note = ' ';
         }
         data.shippingAddress = "Thành phố Hà Nội"+", "+data.districtName+", "+data.ward+", "+data.shippingAddress
         delete data.districtCode;
         delete data.ward;
         delete data.districtName;
         data.products = cart.items;
         data.totalPayment = cart.totalPrice;
         try {
            const status = await CheckCart();
            if (status) {
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
                  : cart.totalPrice;

               if (voucher._id) {
                  if (voucher.maxReduce) {
                     data.totalPayment =
                        data.totalPayment > voucher.maxReduce
                           ? data.totalPayment - voucher.maxReduce
                           : data.totalPayment - (data.totalPayment * voucher.percent) / 100;
                     console.log(data.totalPayment - voucher.maxReduce);
                  } else {
                     data.totalPayment = data.totalPayment - (data.totalPayment * voucher.percent) / 100;
                  }
               }
               if (voucher._id) {
                  data.code = voucher.code;
               }  
               await handleAddOrder(data)
                  .unwrap()
                  .then((res) => {
                     message.success('Mua hàng thành công');
                     dispatch(removeAllProductFromCart());
                     dispatch(remoteVoucher());
                     const value = JSON.stringify({
                        userId: auth?.user?._id,
                        orderId: res?.body?.data._id
                     });
                     clientSocket.emit('purchase', value);
                     if (res.body.data.url === '') {
                        navigate('/ordercomplete');
                     } else {
                        window.location.href = res.body.data.url;
                     }
                  })
                  .finally(() => {
                     setLoadingState(false);
                  });
            }
            setLoadingState(false);
         } catch (error) {
            setLoadingState(false);
            notification.error({
               message: 'Mua hàng thất bại',
               description: 'Lỗi hệ thống'
            });
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
         content: <OrderCheckOut loadingState={loadingState} methods={methods}  onSubmit={onSubmit}></OrderCheckOut>
      }
   ];
   const items = steps.map((item) => ({ key: item.title, title: item.title }));
   return (
      <>
      {cart?.products?.length>0? <div>
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
                                 Tiếp
                              </Button>
                           )}
                           {current > 0 && (
                              <Button
                                 className=' hover:!border-[#51A55C] hover:!text-[#51A55C] '
                                 style={{ margin: '0 8px' }}
                                 onClick={() => prev()}
                              >
                                 Trước đó
                              </Button>
                           )}
                        </div>
                     </div>
                  </div>
               </section>
            </FormProvider>
         </div>
        
     </div>: <section className='section-chekout lg:my-[100px] md:my-[80px] max-md:my-[60px] '>
               <div className='cont  mx-auto flex-col px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <h1 className='text-red-500 text-[20px] max-sm:text-[16px] max-sm:text-center font-bold m-auto block mb-[10px]'>Bạn chưa có sản phẩm nào trong giỏ hàng</h1>
                  <Link to={"/collections"} className='block bg-[#51A55C] text-white p-[10px] rounded-md m-auto'>
                     <p>Tiếp  tục mua hàng</p>
                  </Link>
                  </div>  
      </section>}
      <div>
            <Modal
               title='Cập nhật lại giỏ hàng'
               open={isModalOpen}
               onOk={handleOk}
               closeIcon={false}
               cancelButtonProps={{ style: { display: 'none' } }}
            >
               {error?.map((item) => {
                  return (
                     <>
                        <div>{item}</div>
                     </>
                  );
               })}
            </Modal>
         </div>
      </>
      
   );
};
export default CheckOutPage;
