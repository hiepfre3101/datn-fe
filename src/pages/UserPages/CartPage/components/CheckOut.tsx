const CheckOut = () => {
   return (
      <div>
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
               <button type='button' className=' bg-[#51A55C]  text-white py-[10px] px-[15px] rounded-[5px] mt-[25px]'>
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
   );
};

export default CheckOut;