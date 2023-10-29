import { BsTruck, BsCurrencyDollar } from 'react-icons/bs';
import { FaHeadphones, FaArrowRotateRight } from 'react-icons/fa6';
const MyService = () => {
   return (
      <div className=''>
         <section className='section-services lg:my-[100px] md:my-[80px] max-md:my-[60px]'>
            <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
               <div className='list-service flex flex-wrap lg:justify-between md:justify-around md:gap-y-[30px] max-md:gap-[12px]'>
                  <div className='service-item max-md:w-full p-[20px] border-[1px] border-[rgba(0,0,0,10%)] lg:w-[calc(25%-30px)]  md:w-[calc(50%-30px)] rounded-[5px] flex items-center'>
                     <div className='service-icon text-[#51A55C] text-[30px]'>
                        <BsTruck></BsTruck>
                     </div>
                     <div className='service-text ml-[20px]'>
                        <p className='service-title text-[#333333] font-bold text-[18px]'>Miễn phí ship</p>
                        <p className='text-[16px]'>Cho đơn hàng trên 1 triệu</p>
                     </div>
                  </div>
                  <div className='service-item max-md:w-full p-[20px] border-[1px] border-[rgba(0,0,0,10%)] lg:w-[calc(25%-30px)]  md:w-[calc(50%-30px)] rounded-[5px] flex items-center'>
                     <div className='service-icon text-[#51A55C] text-[30px]'>
                        <BsCurrencyDollar></BsCurrencyDollar>
                     </div>
                     <div className='service-text ml-[20px]'>
                        <p className='service-title text-[#333333] font-bold text-[18px]'>Đảm bảo trở lại</p>
                        <p className='text-[16px]'>Đảm bảo lại tiền.</p>
                     </div>
                  </div>
                  <div className='service-item max-md:w-full p-[20px] border-[1px] border-[rgba(0,0,0,10%)] lg:w-[calc(25%-30px)]  md:w-[calc(50%-30px)] rounded-[5px] flex items-center'>
                     <div className='service-icon text-[#51A55C] text-[30px]'>
                        <FaHeadphones></FaHeadphones>
                     </div>
                     <div className='service-text ml-[20px]'>
                        <p className='service-title text-[#333333] font-bold text-[18px]'>Hỗ trợ trực tuyến 24/7</p>
                        <p className='text-[16px]'>Hỗ trợ khách hàng tinh tế</p>
                     </div>
                  </div>
                  <div className='service-item max-md:w-full p-[20px] border-[1px] border-[rgba(0,0,0,10%)] lg:w-[calc(25%-30px)]  md:w-[calc(50%-30px)] rounded-[5px] flex items-center'>
                     <div className='service-icon text-[#51A55C] text-[30px]'>
                        <FaArrowRotateRight></FaArrowRotateRight>
                     </div>
                     <div className='service-text ml-[20px]'>
                        <p className='service-title text-[#333333] font-bold text-[18px]'>Hoàn trả 2 ngày</p>
                        <p className='text-[16px]'>Nếu hàng hóa có vấn đề</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default MyService;
