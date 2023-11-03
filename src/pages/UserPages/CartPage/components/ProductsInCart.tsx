import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICartSlice } from '../../../../slices/cartSlice';
import { removeFromCart, updateItem, removeAllProductFromCart } from '../../../../slices/cartSlice';
import { message } from 'antd';
const ProductsInCart = () => {
   const dispatch = useDispatch();
   const cart = useSelector((state: { cart: ICartSlice }) => state?.cart);
   const totalProductInCart = useSelector((state: { cart: ICartSlice }) => state?.cart?.items.length);
   const handleInputSize = (e: React.ChangeEvent<HTMLInputElement>, id: string, maxWeight: number) => {
      if (e.target.value === '') {
         return dispatch(updateItem({ id: id, weight: '' }));
      }
      if (/^[\d.]+$/.test(e.target.value)) {
         const value = e.target.value;
         if (Number(value) <= maxWeight) {
            if (value.endsWith('.') && !/\.\d+$/.test(value)) {
               dispatch(updateItem({ id: id, weight: value }));
            } else {
               const rounded = Math.floor(Number(e.target.value));
               const result = Number(e.target.value) - rounded;
               if (result >= 0.5) {
                  dispatch(updateItem({ id: id, weight: rounded + 0.5 }));
               } else {
                  dispatch(updateItem({ id: id, weight: rounded }));
               }
            }
         }
      } else {
         dispatch(updateItem({ id: id, weight: Number(e.target.value.replace(/\./g, ',')) }));
      }
   };
   return (
      <div>
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
                                 {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                              </span>
                           </div>
                        </div>
                        <div className='cart-item-qty lg:w-[20%] md:w-[50%] max-lg:pt-[15px] max-lg:flex-wrap md:mt-[30px] max-md:mt-[20px] max-lg:flex max-lg:items-center max-lg:gap-[15px] max-sm:w-full '>
                           <div className='product-size-action flex lg:justify-center '>
                              <div className='product-info  flex items-center'>
                                 <div className='stock-qty-title text-[20px] text-[#333333] font-bold'>Kg:</div>

                                 <div className='stock-qty-value text-[16px] xl:ml-[15px] text-[#198754] font-bold'>
                                    <div className='product-quantity-action flex lg:justify-center'>
                                       <div className='product-quantity flex  '>
                                          <input
                                             type='text'
                                             value={item?.weight?.toString()}
                                             onChange={(e) => handleInputSize(e, item._id, item.totalWeight)}
                                             className={`outline-none border ${
                                                item.weight == '' ? 'border-red-500' : ''
                                             } border-[#e2e2e2] rounded-[5px]  ml-[10px] input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none max-w-[50px] h-[50px]  border-[1px] `}
                                          />
                                          <div className='flex flex-col'>
                                             <button
                                                onClick={() => item.weight>=item.totalWeight?message.error('số lượng đã quá số lượng hiện có'):dispatch(
                                                   updateItem({
                                                      id: item._id,
                                                      weight:
                                                         item.weight == item.totalWeight &&
                                                         item.weight + 0.5 >= item.totalWeight
                                                            ? item.weight
                                                            : item.weight + 0.5
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
                                                         weight:
                                                            item.weight == 0 && item.weight - 0.5 <= 0
                                                               ? item.weight
                                                               : item.weight - 0.5
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
                                 </div>
                              </div>
                           </div>
                           <p className='text-red-500 max-lg:text-[14px] max-sm:order-3'>{item.weight == '' ? 'Bạn phải nhập số lượng' : ''}</p>
                           <div className='product-quanitity-remove flex justify-center lg:mt-[15px] max-sm:order-2'>
                              <button
                                 className='text-[#dc3545] transition-all duration-300 hover:text-[#ffc107] underline'
                                 type='button'
                                 onClick={() => dispatch(removeFromCart({ id: item._id }))}
                              >
                                 Remove
                              </button>
                           </div>
                        </div>
                        <div className='cart-item-price sm:text-right max-sm:mt-[10px] w-[20%] max-lg:w-[50%]'>
                           <span className='full-price font-bold'>
                              {(item.price * item.weight).toLocaleString('vi-VN', {
                                 style: 'currency',
                                 currency: 'VND'
                              })}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
               <div className='cart-footer flex justify-between py-[13px] flex-wrap gap-[15px]'>
                  <Link to="/products"  className='link-to-homepage px-[30px] py-[10px] bg-[#51A55C] text-white rounded-[5px] transition-colors duration-300 hover:bg-[#333333]'>
                  TIẾP TỤC MUA HÀNG
                  </Link>
                  <button
                     onClick={() =>{
                        dispatch(removeAllProductFromCart())
                        message.success('Xóa toàn bộ sản phẩm khỏi giỏ hàng thành công');
                     } }
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
