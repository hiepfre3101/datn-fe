/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import OrderDetail from './components/orderDetail';
import OrderNote from './components/orderNote';
import OrderCheckOut from './components/orderCheckOut';
import { Button, ConfigProvider, Modal, Steps } from 'antd';
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
// import { clientSocket } from '../../../config/socket';
import { useCheckCartMutation, useDeleteAllProductInCartMutation, useGetCartQuery } from '../../../services/cart.service';
import { IAuth } from '../../../slices/authSlice';
import { formatCharacterWithoutUTF8 } from '../../../helper';
const CheckOutPage = () => {
   const navigate = useNavigate();
   const methods = useForm<IOrder>();
   const [handleAddOrder] = useAddOrderMutation();
   const [deleteAllProductInCartDB]= useDeleteAllProductInCartMutation()
   const [current, setCurrent] = useState(0);
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const [showfetch, setShowFetch] = useState(false);
   const { data: cartdb,refetch } = useGetCartQuery(undefined, { skip: showfetch==false });
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [error,setError] = useState<string[]>([])
   useEffect(() => {
      if (auth.user._id) {
         setShowFetch(true);
      }
   }, [auth.user._id]);
   const [checkCartLocal] = useCheckCartMutation()
   const CartLocal = useSelector((state: { cart: ICartSlice }) => state?.cart);
   const cart = auth.user._id ? cartdb?.body.data : CartLocal;
   const [loadingState, setLoadingState] = useState<boolean>(false);
   const dispatch = useDispatch();
   const handleOk = () => {
      setIsModalOpen(false);

   };
   const onSubmit = async (data: IOrder) => {
      if (current < 2) {
         next();
      }
      if (current == 2) {
         setLoadingState(!loadingState);
         if(data.note !== '') {
            data.note = formatCharacterWithoutUTF8(data.note || '');
         } else {
            data.note = undefined
         }
         data.products = cart.items;
         data.totalPayment = cart.totalPrice;
         setError([]);
         try {
            if(auth.user._id){
               refetch().then((res)=>{
                  if(res.data.body.errors){
                     setIsModalOpen(true)
                     res.data.body.errors.map(item=>{
                        if(item.message=="The remaining quantity is not enough!"){
                           setError((prevError: string[]) => [...prevError, "- Số lượng trong kho của sản phẩm" + item.productName + " không đủ đáp ứng nhu cầu của bạn và đã được cập nhật lại số lượng"]);
                        }
                        else if(item.message=="Product is currently out of stock!"){
                           setError((prevError: string[]) => [...prevError, "- Sản phẩm" + item.productName + " đã hết hàng"]);
                        }
                        else if(item.message=="Product is no longer available!"){
                           setError((prevError: string[]) => [...prevError, "- Sản phẩm" + item.productName + " đã  bị xoá khỏi hệ thống"]);
                        }
                     })
                  }
              
               })
            }    else{
               const cartLocal={
                    products: cart["products"].map((product:any) => {
                      const { totalWeight, productId: { originId: { name, ...originIdRest } = {}, ...productIdRest } = {}, ...rest } = product;
                      return { totalWeight, productId: { originId: originIdRest, ...productIdRest }, ...rest };
                    })
               }
               checkCartLocal(cartLocal).then((res:any) => {
               
                 if(res.error){
                    setIsModalOpen(true)
                    res.error.data.body?.error.map(item=>{ 
                       if(item.message=="Product is not exsit!"){
                          dispatch(removeFromCart({ id: item.productId }))
                          setError((prevError: string[]) => [...prevError, "- Sản phẩm " + item.productName + " đã bị xoá khỏi hệ thống"]);
                       }
                       else if(item.message=="Invalid product origin!"){
                          setError((prevError: string[]) => [...prevError, "- Xuất sứ của sản phẩm "+ item.productName + " đã được cập nhật"]);
                       } 
                       else if(item.message=="Invalid product name!"){
                          dispatch(updateNameProductInCartLocal({ id: item.productId,name:item.productName }))
                          setError((prevError: string[]) => [...prevError, "- Tên của sản phẩm "+ item.productName + " đã được cập nhật thành " + item.productName]);
                       }
                       else if(item.message=="Invalid price for product!"){
                          dispatch(updatePriceProductInCartLocal({ id: item.productId,price:item.price }))
                          setError((prevError: string[]) => [...prevError, "- Giá của sản phẩm "+ item.productName + " không đồng nhất với dữ liệu trên hệ thống và đã được cập nhật"]);
                       } 
                       else if(item.message=="Invalid product image!"){
                          dispatch(updateImgProductInCartLocal({ id: item.productId,img:item?.image[0]?.url }))
                          setError((prevError: string[]) => [...prevError, "- Ảnh của sản phẩm "+ item.productName + " không đồng nhất với dữ liệu trên hệ thống và đã được cập nhật"]);
                       }           
                       else if(item.message=="Insufficient quantity of the product in stock!"){
                          dispatch(updateItem({ id: item.productId,weight: item.maxWeight}))
                          setError((prevError: string[]) => [...prevError, "- Số lượng sản phẩm "+ item.productName + " trong kho không đủ đáp ứng nhu cầu của bạn và đã được cập nhật về " + item.maxWeight]);
                       }  
                       else if(item.message=="The product is currently out of stock!"){
                          dispatch(removeFromCart({ id: item.productId}))
                          setError((prevError: string[]) => [...prevError, "- Sản phẩm "+ item.productName + " đã hết hàng và đã được xoá khỏi giỏ hàng"]);
                       } 
                       else if(item.message=="Invalid totalPayment!"){
                          dispatch(updateTotalPrice({ total: item.true}))
                          setError((prevError: string[]) => [...prevError, "- Tổng tiền của bạn đang bị sai và đã được cập nhật lại"]);
                       }     
                    })   
                 }
              })
           }
           if(error.length==0){
            console.log(error.length);
                            
            // data.products = cart?.products.map((product: ICartItems) => {
            //    return {
            //       productName: product.productId.productName,
            //       price:
            //          product.productId.discount && product.productId.discount > 0
            //             ? product.productId.price - (product.productId.price * product.productId.discount) / 100
            //             : product.productId.price,
            //       productId: product.productId._id,
            //       images: product.productId?.images[0].url,
            //       weight: product.weight,
            //       originId: product.productId?.originId?._id
            //    };
            // });
            // data.totalPayment = auth.user._id
            //    ? cart?.products.reduce(
            //         (accumulator: number, product: any) =>
            //            accumulator +
            //            (product.productId.price - (product.productId.price * product.productId.discount) / 100) *
            //               product.weight,
            //         0
            //      )
            //    : cart?.totalPrice;
            // await handleAddOrder(data)
            //    .then( async (res) => {
            //       res
            //       if(auth.user._id){
            //         await deleteAllProductInCartDB(auth.user._id)
            //       }
            //       else{
            //          dispatch(removeAllProductFromCart())
            //       }   
            //       navigate("/orderComplete")
            //    })
            //    .finally(() => {
                  setLoadingState(false);
               // });
           }

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
