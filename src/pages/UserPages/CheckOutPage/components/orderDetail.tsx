const OrderDetail = () => {
   return (
      <>
         <div className='order-detail'>
            <form action=''>
               <h2 className='form-title text-[26px] text-[#333333] font-bold max-sm:text-[22px]'>
                  Thông tin đơn hàng
               </h2>
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
                  <div className='order-form-item  double-input flex justify-between max-sm:flex-wrap'>
                     <div className='form-item mt-[15px] sm:w-[calc(50%-7px)] max-sm:w-full'>
                        <label>
                           Email
                           <input
                              type='text'
                              className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                              placeholder='Email'
                           />
                        </label>
                     </div>
                     <div className='form-item mt-[15px] sm:w-[calc(50%-7px)] max-sm:w-full'>
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
            </form>
         </div>
      </>
   );
};
export default OrderDetail;
