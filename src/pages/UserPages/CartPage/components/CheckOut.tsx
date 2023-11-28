import { useDispatch, useSelector } from 'react-redux';
import {
   ICartSlice,
   removeFromCart,
   updateImgProductInCartLocal,
   updateItem,
   updateNameProductInCartLocal,
   updatePriceProductInCartLocal,
   updateTotalPrice
} from '../../../../slices/cartSlice';
import { IAuth } from '../../../../slices/authSlice';
import { useCheckCartMutation, useGetCartQuery } from '../../../../services/cart.service';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const CheckOut = () => {
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   const [showfetch, setShowFetch] = useState(false);
   const { data: cartdb, refetch } = useGetCartQuery(undefined, { skip: showfetch == false });
   const [checkCartLocal] = useCheckCartMutation();
   const [isModalOpen, setIsModalOpen] = useState(false);
   useEffect(() => {
      if (auth.user._id) {
         setShowFetch(true);
      } else {
         setShowFetch(false);
      }
   }, [auth]);
   const CartLocal = useSelector((state: { cart: ICartSlice }) => state?.cart);
   const cart = auth.user._id ? cartdb?.body.data.products : CartLocal;
   const [total, setTotal] = useState<number>();
   const [error, setError] = useState<string[]>([]);
   useEffect(() => {
      const temp = auth.user._id
         ? cart?.reduce(
              (accumulator: number, product: any) => accumulator + product.productId.price * product.weight,
              0
           )
         : cart?.totalPrice;
      setTotal(temp);
   }, [cartdb, cart]);
   const navigate = useNavigate();
   const handleOk = () => {
      setIsModalOpen(false);
      setError([]);
   };
   const dispatch = useDispatch();
   const goCheckOut = async () => {
      if (auth.user._id) {
       await  refetch().then((res) => {
            if (res.data.body.errors) {
               setIsModalOpen(true);
               res.data.body.errors.map((item) => {
                  if (item.message == 'The remaining quantity is not enough!') {
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Số lượng trong kho của sản phẩm' +
                           item.productName +
                           ' không đủ đáp ứng nhu cầu của bạn và đã được cập nhật lại số lượng'
                     ]);
                  } else if (item.message == 'Product is currently out of stock!') {
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Sản phẩm' + item.productName + ' đã hết hàng'
                     ]);
                  } else if (item.message == 'Product is no longer available!') {
                     setError((prevError: string[]) => [
                        ...prevError,
                        '- Sản phẩm' + item.productName + ' đã  bị xoá khỏi hệ thống'
                     ]);
                  }
               });
            } else {
               navigate('/checkout')
            }
         });
      } else {
         const cartLocal = {
            products: cart['products'].map((product: any) => {
               const {
                  totalWeight,
                  productId: { originId: { name, ...originIdRest } = {}, ...productIdRest } = {},
                  ...rest
               } = product;
               return { totalWeight, productId: { originId: originIdRest, ...productIdRest }, ...rest };
            })
         };
        await checkCartLocal(cartLocal).then((res: any) => {
            if (res.error) {
               setIsModalOpen(true);
               res.error.data.body?.error.map((item) => {
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
                        '- Tên của sản phẩm ' + item.productName + ' đã được cập nhật thành ' + item.productName
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
                     dispatch(updateImgProductInCartLocal({ id: item.productId, img: item?.image}));
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
            } else {
               navigate('/checkout')
            }
         });
      }
   };

   return (
      <div>
         <div className='cart-total'>
            <div className='temporary items-center flex justify-between pb-[17px] border-b-[1px] border-[#e2e2e2]'>
               <span className='temporary-title font-bold'>Tính tạm</span>
               <span className='temporary font-bold text-[#333333] '>
                  {auth.user._id
                     ? total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                     : cart?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
               </span>
            </div>
            <div className='discount flex justify-between items-center pb-[17px] border-b-[1px] border-[#e2e2e2] mt-[10px]'>
               <span className="before:content-[''] before:block before:w-[10px] relative before:h-[10px] before:border-[#51A55C] before:border-[1px] overflow-hidden  before:bg-white  before:absolute  before:rounded-[50%]  before:translate-y-[-50%]  before:left-[-5px]  before:top-[50%] before:z-[2] after:content-[''] after:block after:w-[10px] after:h-[10px] after:border-[#51A55C] after:border-[1px] after:bg-white  after:absolute  after:rounded-[50%]  after:translate-y-[-50%]  after:right-[-5px]  after:top-[50%] after:z-[2]">
                  <div className='px-[10px] py-[5px] border-[1px] border-[#51A55C] text-[#51A55C]  font-bold  '>
                     quangdz
                  </div>
               </span>

               <div className='discount-value'>
                  <span className='temporary font-bold  text-[14px] '>-10.000</span>
                  <button type='button' className='text-black text-[14px] ml-[10px]'>
                     [Xoá]
                  </button>
               </div>
            </div>
            <div className='total flex justify-between pb-[17px] border-b-[1px] border-[#e2e2e2] mt-[17px]'>
               <span className='total-title font-bold items-center'>Tổng</span>
               <span className='total font-bold  text-[20px] text-red-500'>
                  {auth.user._id
                     ? total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                     : cart?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
               </span>
            </div>
            <div className='discount-action mt-[30px] text-center'>
               <input
                  type='text'
                  className='outline-none border-[1px] rounded-[5px] px-[15px] py-[10px] border-[#e2e2e2] w-full'
                  placeholder='Mã Giảm giá'
               />
               <button
                  type='button'
                  className=' bg-[#51A55C]  text-white py-[10px] px-[15px] rounded-[5px] mt-[25px] transition-color duration-300 hover:bg-black'
               >
                  Sử dụng
               </button>
            </div>
            <div className='btn-checkout'>
               <button
                  onClick={goCheckOut}
                  type='button'
                  className=' bg-[#51A55C] w-full  text-white py-[10px] px-[15px] rounded-[5px] mt-[25px] transition-color duration-300 hover:bg-black'
               >
                  Thanh toán
               </button>
            </div>
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
      </div>
   );
};

export default CheckOut;
