const CheckOutPage = () => {
   return (
      <>
         <div className='main'>
            <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <span>
                     <a href=''>Trang chủ </a> / Thanh toán
                  </span>
               </div>
            </section>
            <section className='section-chekout lg:my-[100px] md:my-[80px] max-md:my-[60px]'>
               <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
                  <div className='checkout-header'>
                     <div className='checkout-tab'>
                        <ul className='flex items-center justify-center mb-[24px] gap-[40px]'>
                           <li className='text-[#51A55C] text-[20px] w-[40px] h-[40px] flex items-center justify-center font-bold shadow-[0px_0px_10px_rgba(51,51,51,0.15)] rounded-[100%]'>
                              1
                           </li>
                           <li className='text-[#51A55C] text-[20px] w-[40px] h-[40px] flex items-center justify-center font-bold shadow-[0px_0px_10px_rgba(51,51,51,0.15)] rounded-[100%]'>
                              2
                           </li>
                           <li className='text-[#51A55C] text-[20px] w-[40px] h-[40px] flex items-center justify-center font-bold shadow-[0px_0px_10px_rgba(51,51,51,0.15)] rounded-[100%]'>
                              3
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className='checkout-content'>
                     <div className='order-detail'>
                        <form action=''>
                           <h2 className='form-title text-[26px] text-[#333333] font-bold'>Thông tin đơn hàng</h2>
                           <div className='order-form mt-[24px]'>
                              <div className='order-form-item mt-[15px]'>
                                 <label>
                                    Họ và tên
                                    <input
                                       type='text'
                                       className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                                       placeholder='Họ và tên'
                                    />
                                 </label>
                              </div>
                              <div className="order-form-item  double-input flex justify-between">
                              <div className='form-item mt-[15px] w-[calc(50%-7px)]'>
                                 <label>
                                    Email
                                    <input
                                       type='text'
                                       className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                                       placeholder='Email'
                                    />
                                 </label>
                              </div>
                              <div className='form-item mt-[15px] w-[calc(50%-7px)]'>
                                 <label>
                                    Số điện thoại
                                    <input
                                       type='text'
                                       className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                                       placeholder='Số điện thoại'
                                    />
                                 </label>
                              </div>
                              </div>
                              <div className='order-form-item mt-[15px]'>
                                 <label>
                                    Địa chỉ
                                    <input
                                       type='text'
                                       className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                                       placeholder='Địa chỉ'
                                    />
                                 </label>
                              </div>
                           </div>
                           <button className="order-detail-btn transition bg-[#d2401e] text-white px-[20px] py-[15px] rounded-[20px]">Xác nhận</button>
                        </form>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
};
export default CheckOutPage;
