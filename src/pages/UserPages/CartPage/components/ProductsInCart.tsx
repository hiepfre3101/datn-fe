import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICartSlice, addItem } from '../../../../slices/cartSlice';
import { removeFromCart, updateItem, removeAllProductFromCart } from '../../../../slices/cartSlice';
import { products } from '../../../../productData';
import { Button } from 'antd';
const ProductsInCart = () => {
   const dispatch = useDispatch();
   const addItems = () => {
      products.map((product: any) => dispatch(addItem({ data: product, email: 'ducbede@gmail.com' })));
   };
   const cart = useSelector((state: { cart: ICartSlice }) => state?.cart);
   // console.log(cart);
   const totalProductInCart = useSelector((state: { cart: ICartSlice }) => state?.cart?.items.length);
   return (
      <div>
         <Button onClick={() => addItems()} className='text-black'>
            ADD
         </Button>
         {cart?.items?.length === 0 ? (
            <div className='cart-emty'>
               <p className='cart-title xl:text-[30px]  border-[#e2e2e2] max-xl:text-[18px] text-[red] font-bold items-center text-center pb-[12px]'>
                  Không có sản phẩm trong giỏ hàng
               </p>
               <div className='start-shopping cart-title xl:text-[17px]  border-[#e2e2e2] max-xl:text-[18px] text-[#51A55C] font-bold flex justify-center items-center text-center pb-[12px]'>
                  <Link to={'/products'}>
                     <button
                        type='button'
                        className=' bg-[#51A55C]  text-white py-[10px] px-[15px] rounded-[5px] mt-[25px]'
                     >
                        Tiếp tục mua hàng
                     </button>
                  </Link>
               </div>
            </div>
         ) : (
            <div className='cart-item-wrap md:px-[20px] md:pt-[20px] md:pb-[7px] max-md:px-[12px] max-md:py-[30px] border-[#e2e2e2] border-[1px] '>
               <div className='cart-title xl:text-[20px] border-b-[1px] border-[#e2e2e2] max-xl:text-[18px] text-[#333333] font-bold flex justify-between pb-[12px]'>
                  <span>Giỏ hàng:</span>

                  <span className='cart-count font-bold border-b-[2px] border-[#6f6f6f] text-[#6f6f6f]'>
                     {totalProductInCart} sản phẩm
                  </span>
               </div>
               <div className='list-cart-item text-[#333333]'>
                  {cart?.items?.map((item: any, index: number) => (
                     <div
                        key={index}
                        className='cart-item py-[30px] flex max-lg:flex-wrap items-center border-b-[1px] border-[#e2e2e2]'
                     >
                        <div className='cart-item-info lg:w-[60%] max-lg:w-full flex items-center h-auto'>
                           <div className='item-img w-[100px]'>
                              <a
                                 href='#'
                                 className=' border-[1px] border-[#e2e2e2] block overflow-hidden rounded-[5px]'
                              >
                                 <img src={item.images} className='max-w-[100%]' alt='' />
                              </a>
                           </div>
                           <div className='item-title px-[15px]'>
                              <a href='' className='product-name ư font-bold'>
                                 {item.name}
                              </a>
                              <div className='origin flex'>
                                 <span className='origin-title  font-bold'>Xuất sứ:</span>
                                 <span className='origin-name ml-[5px]'>Cuba</span>
                              </div>
                              <span className='price'>
                                 {' '}
                                 {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                              </span>
                           </div>
                        </div>
                        <div className='cart-item-qty lg:w-[20%] md:w-[50%] max-lg:pt-[15px] max-lg:flex max-lg:gap-[15px] max-sm:w-full '>
                           <div className='product-quantity-action flex lg:justify-center'>
                              <div className='product-quantity flex  '>
                                 <input
                                    type='text'
                                    value={item.quantity}
                                    className='input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]'
                                 />
                                 <div className='flex flex-col'>
                                    <button
                                       onClick={() =>
                                          dispatch(
                                             updateItem({
                                                id: item._id,
                                                quantity: item.quantity + 1,
                                                email: 'ducbede@gmail.com'
                                             })
                                          )
                                       }
                                       type='button'
                                       className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                    >
                                       +
                                    </button>
                                    <button
                                       onClick={() =>
                                          dispatch(
                                             updateItem({
                                                id: item._id,
                                                quantity: item.quantity - 1,
                                                email: 'ducbede@gmail.com'
                                             })
                                          )
                                       }
                                       type='button'
                                       className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                    >
                                       -
                                    </button>
                                 </div>
                              </div>
                           </div>
                           <div className='product-quanitity-remove flex justify-center lg:mt-[15px] '>
                              <button
                                 className='text-[#dc3545] transition-all duration-300 hover:text-[#ffc107] underline'
                                 type='button'
                                 onClick={() => dispatch(removeFromCart({ id: item._id, email: 'ducbede@gmail.com' }))}
                              >
                                 Remove
                              </button>
                           </div>
                        </div>
                        <div className='cart-item-price sm:text-right max-sm:mt-[10px] w-[20%] max-lg:w-[50%]'>
                           <span className='full-price font-bold'>
                              {(item.price * item.quantity).toLocaleString('vi-VN', {
                                 style: 'currency',
                                 currency: 'VND'
                              })}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
               <div className='cart-footer flex justify-between py-[13px] flex-wrap gap-[15px]'>
                  <a
                     href='/products'
                     className='link-to-homepage px-[30px] py-[10px] bg-[#51A55C] text-white rounded-[5px] transition-colors duration-300 hover:bg-[#333333]'
                  >
                     TIẾP TỤC MUA HÀNG
                  </a>
                  <button
                     onClick={() => dispatch(removeAllProductFromCart({ email: 'ducbede@gmail.com' }))}
                     className='link-to-homepage px-[30px] py-[10px] bg-[#51A55C] text-white rounded-[5px] transition-colors duration-300 hover:bg-[#333333]'
                  >
                     XOÁ GIỎ HÀNG
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProductsInCart;
