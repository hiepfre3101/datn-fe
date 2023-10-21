const CartPage = () => {
   return (
      <>
         <div className='main'>
            <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <span>
                     <a href=''>Trang chủ </a> / Giỏ hàng
                  </span>
               </div>
            </section>
            <section className='section-cart lg:py-[100px] md:py-[80px] max-md:py-[60px] relative '>
               <div className='cont cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <div className='cart-page-wrap mx-[-15px] flex max-lg:flex-wrap items-start  '>
                     <div className='cart-content  xl:w-[75%] lg:w-[66.67%] max-lg:w-full px-[15px]'>
                        <div className='cart-item-wrap md:px-[20px] md:pt-[20px] md:pb-[7px] max-md:px-[12px] max-md:py-[30px] border-[#e2e2e2] border-[1px] '>
                           <div className='cart-title xl:text-[20px] border-b-[1px] border-[#e2e2e2] max-xl:text-[18px] text-[#333333] font-bold flex justify-between pb-[12px]'>
                              <span>Giỏ hàng:</span>
                              <span className='cart-count font-bold border-b-[2px] border-[#6f6f6f] text-[#6f6f6f]'>
                                 10 sản phẩm
                              </span>
                           </div>
                           <div className='list-cart-item text-[#333333]'>
                              <div className='cart-item py-[30px] flex max-lg:flex-wrap items-center border-b-[1px] border-[#e2e2e2]'>
                                 <div className='cart-item-info lg:w-[60%] max-lg:w-full flex items-center h-auto'>
                                    <div className='item-img w-[100px]'>
                                       <a
                                          href='#'
                                          className=' border-[1px] border-[#e2e2e2] block overflow-hidden rounded-[5px]'
                                       >
                                          <img
                                             src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/cart/cart-1.jpg'
                                             className='max-w-[100%]'
                                             alt=''
                                          />
                                       </a>
                                    </div>
                                    <div className='item-title px-[15px]'>
                                       <a href='' className='product-name ư font-bold'>
                                          Dâu Tây đột biến
                                       </a>
                                       <div className='origin flex'>
                                          <span className='origin-title  font-bold'>Xuất sứ:</span>
                                          <span className='origin-name ml-[5px]'>Cuba</span>
                                       </div>
                                       <span className='price'>888.000.000</span>
                                    </div>
                                 </div>
                                 <div className='cart-item-qty lg:w-[20%] md:w-[50%] max-lg:pt-[15px] max-lg:flex max-lg:gap-[15px] max-sm:w-full '>
                                    <div className='product-quantity-action flex lg:justify-center'>
                                       <div className='product-quantity flex  '>
                                          <input
                                             type='text'
                                             value={1}
                                             className='input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]'
                                          />
                                          <div className='flex flex-col'>
                                             <button
                                                type='button'
                                                className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                             >
                                                +
                                             </button>
                                             <button
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
                                       >
                                          Remove
                                       </button>
                                    </div>
                                 </div>
                                 <div className='cart-item-price sm:text-right max-sm:mt-[10px] w-[20%] max-lg:w-[50%]'>
                                    <span className='full-price font-bold'>88.000</span>
                                 </div>
                              </div>
                              <div className='cart-item py-[30px] flex max-lg:flex-wrap items-center border-b-[1px] border-[#e2e2e2]'>
                                 <div className='cart-item-info lg:w-[60%] max-lg:w-full flex items-center h-auto'>
                                    <div className='item-img w-[100px]'>
                                       <a
                                          href='#'
                                          className=' border-[1px] border-[#e2e2e2] block overflow-hidden rounded-[5px]'
                                       >
                                          <img
                                             src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/cart/cart-1.jpg'
                                             className='max-w-[100%]'
                                             alt=''
                                          />
                                       </a>
                                    </div>
                                    <div className='item-title px-[15px]'>
                                       <a href='' className='product-name ư font-bold'>
                                          Dâu Tây đột biến
                                       </a>
                                       <div className='origin flex'>
                                          <span className='origin-title  font-bold'>Xuất sứ:</span>
                                          <span className='origin-name ml-[5px]'>Cuba</span>
                                       </div>
                                       <span className='price'>888.000.000</span>
                                    </div>
                                 </div>
                                 <div className='cart-item-qty lg:w-[20%] md:w-[50%] max-lg:pt-[15px] max-lg:flex max-lg:gap-[15px] max-sm:w-full '>
                                    <div className='product-quantity-action flex lg:justify-center'>
                                       <div className='product-quantity flex  '>
                                          <input
                                             type='text'
                                             value={1}
                                             className='input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]'
                                          />
                                          <div className='flex flex-col'>
                                             <button
                                                type='button'
                                                className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                             >
                                                +
                                             </button>
                                             <button
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
                                       >
                                          Remove
                                       </button>
                                    </div>
                                 </div>
                                 <div className='cart-item-price sm:text-right max-sm:mt-[10px] w-[20%] max-lg:w-[50%]'>
                                    <span className='full-price font-bold'>88.000</span>
                                 </div>
                              </div>
                              <div className='cart-item py-[30px] flex max-lg:flex-wrap items-center border-b-[1px] border-[#e2e2e2]'>
                                 <div className='cart-item-info lg:w-[60%] max-lg:w-full flex items-center h-auto'>
                                    <div className='item-img w-[100px]'>
                                       <a
                                          href='#'
                                          className=' border-[1px] border-[#e2e2e2] block overflow-hidden rounded-[5px]'
                                       >
                                          <img
                                             src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/cart/cart-1.jpg'
                                             className='max-w-[100%]'
                                             alt=''
                                          />
                                       </a>
                                    </div>
                                    <div className='item-title px-[15px]'>
                                       <a href='' className='product-name ư font-bold'>
                                          Dâu Tây đột biến
                                       </a>
                                       <div className='origin flex'>
                                          <span className='origin-title  font-bold'>Xuất sứ:</span>
                                          <span className='origin-name ml-[5px]'>Cuba</span>
                                       </div>
                                       <span className='price'>888.000.000</span>
                                    </div>
                                 </div>
                                 <div className='cart-item-qty lg:w-[20%] md:w-[50%] max-lg:pt-[15px] max-lg:flex max-lg:gap-[15px] max-sm:w-full '>
                                    <div className='product-quantity-action flex lg:justify-center'>
                                       <div className='product-quantity flex  '>
                                          <input
                                             type='text'
                                             value={1}
                                             className='input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]'
                                          />
                                          <div className='flex flex-col'>
                                             <button
                                                type='button'
                                                className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                             >
                                                +
                                             </button>
                                             <button
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
                                       >
                                          Remove
                                       </button>
                                    </div>
                                 </div>
                                 <div className='cart-item-price sm:text-right max-sm:mt-[10px] w-[20%] max-lg:w-[50%]'>
                                    <span className='full-price font-bold'>88.000</span>
                                 </div>
                              </div>
                              <div className='cart-item py-[30px] flex max-lg:flex-wrap items-center border-b-[1px] border-[#e2e2e2]'>
                                 <div className='cart-item-info lg:w-[60%] max-lg:w-full flex items-center h-auto'>
                                    <div className='item-img w-[100px]'>
                                       <a
                                          href='#'
                                          className=' border-[1px] border-[#e2e2e2] block overflow-hidden rounded-[5px]'
                                       >
                                          <img
                                             src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/cart/cart-1.jpg'
                                             className='max-w-[100%]'
                                             alt=''
                                          />
                                       </a>
                                    </div>
                                    <div className='item-title px-[15px]'>
                                       <a href='' className='product-name ư font-bold'>
                                          Dâu Tây đột biến
                                       </a>
                                       <div className='origin flex'>
                                          <span className='origin-title  font-bold'>Xuất sứ:</span>
                                          <span className='origin-name ml-[5px]'>Cuba</span>
                                       </div>
                                       <span className='price'>888.000.000</span>
                                    </div>
                                 </div>
                                 <div className='cart-item-qty lg:w-[20%] md:w-[50%] max-lg:pt-[15px] max-lg:flex max-lg:gap-[15px] max-sm:w-full '>
                                    <div className='product-quantity-action flex lg:justify-center'>
                                       <div className='product-quantity flex  '>
                                          <input
                                             type='text'
                                             value={1}
                                             className='input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]'
                                          />
                                          <div className='flex flex-col'>
                                             <button
                                                type='button'
                                                className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                             >
                                                +
                                             </button>
                                             <button
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
                                       >
                                          Remove
                                       </button>
                                    </div>
                                 </div>
                                 <div className='cart-item-price sm:text-right max-sm:mt-[10px] w-[20%] max-lg:w-[50%]'>
                                    <span className='full-price font-bold'>88.000</span>
                                 </div>
                              </div>
                           </div>
                           <div className='cart-footer flex justify-between py-[13px] flex-wrap gap-[15px]'>
                              <a
                                 href=''
                                 className='link-to-homepage px-[30px] py-[10px] bg-[#51A55C] text-white rounded-[5px] transition-colors duration-300 hover:bg-[#333333]'
                              >
                                 TIẾP TỤC MUA HÀNG
                              </a>
                              <button className='link-to-homepage px-[30px] py-[10px] bg-[#51A55C] text-white rounded-[5px] transition-colors duration-300 hover:bg-[#333333]'>
                                 XOÁ GIỎ HÀNG
                              </button>
                           </div>
                        </div>
                        <div className='note mt-[30px] px-[12px] py-[30px] border-[#e2e2e2] border-[1px]'>
                           <label
                              htmlFor=''
                              className='xl:text-[20px] max-xl:text-[18px] pb-[12px] mb-[30px] text-[#333333] font-bold border-[#e2e2e2] block border-b-[1px]'
                           >
                              Hướng dẫn đặc biệt cho người bán
                           </label>
                           <textarea
                              className='w-full outline-none border-[#e2e2e2] border-[1px] rounded-[5px] resize-none px-[15px] py-[10px]'
                              name=''
                              id=''
                              cols={30}
                              rows={10}
                           ></textarea>
                        </div>
                     </div>
                     <div className='cart-header lg:sticky xl:top-[110px] max-xl:top-[80px] px-[15px] xl:w-[25%] lg:w-[33.33%] max-lg:w-full max-lg:mt-[30px]'>
                        <div className='cart-total-wrap p-[20px] border-[1px] border-[#e2e2e2]'>
                           <div className='cart-total'>
                              <div className='temporary items-center flex justify-between pb-[17px] border-b-[1px] border-[#e2e2e2]'>
                                 <span className='temporary-title font-bold'>Tính tạm</span>
                                 <span className='temporary font-bold text-[#333333] '>80.000</span>
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
                              <div className='total flex justify-between pb-[17px] border-b-[1px] border-[#e2e2e2] mt-[10px]'>
                                 <span className='total-title font-bold items-center'>Tổng</span>
                                 <span className='total font-bold  text-[20px] text-red-500'>70.000</span>
                              </div>
                              <div className='discount-action mt-[30px] text-center'>
                                 <input
                                    type='text'
                                    className='outline-none border-[1px] rounded-[5px] px-[15px] py-[10px] border-[#e2e2e2] w-full'
                                    placeholder='Mã Giảm giá'
                                 />
                                 <button
                                    type='button'
                                    className=' bg-[#51A55C]  text-white py-[10px] px-[15px] rounded-[5px] mt-[25px]'
                                 >
                                    Sử dụng
                                 </button>
                              </div>
                              <div className='btn-checkout'>
                                 <button
                                    type='button'
                                    className=' bg-[#51A55C] w-full  text-white py-[10px] px-[15px] rounded-[5px] mt-[25px]'
                                 >
                                    Thanh toán
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
};
export default CartPage;
