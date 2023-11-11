import { ConfigProvider, Pagination } from 'antd';
import FillterProducts from './components/FillterProducts';
import SorterProduct from './components/SorterProduct';
import ShowProducts from './components/ShowProducts';

const ProductPage = () => {
   return (
      <>
         <div className='main bg-[#f8f8f8]'>
            <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
               <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <span>
                     <a href=''>Trang chủ </a> / Sản phẩm
                  </span>
               </div>
            </section>
            <section className='section-main lg:pb-[100px] md:pb-[80px] max-md:pb-[60px] border-b-[1px] border-[#e2e2e2]'>
               <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <div className='main-header-overlay lg:!hidden fixed hidden z-[10] left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)]'></div>
                  <div className='main-header lg:bg-[#f8f8f8] max-lg:!mt-[-120px] max-lg:flex max-lg:flex-col  overflow-y-auto max-lg:bottom-0 max-lg:translate-y-[130%] transition-transform duration-500 max-lg:right-0 max-lg:left-0  lg:mx-[-15px] lg:sticky w-[25%] top-[120px]  max-lg:w-[100%] max-lg:fixed max-lg:z-[13] bg-white  max-md:p-0 '>
                     <FillterProducts />
                  </div>
                  <div className=' px-[20px] max-md:px-0 main-content max-border-l-2 border-[#cccccc]   w-[75%] max-lg:w-[100%] '>
                     <div className='product-item mb-[30px]'>
                        <SorterProduct />
                        <ShowProducts />
                     </div>
                     <div className='pagination flex justify-center max-sm:!mb-[10px] mb-[35px]'>
                        <ConfigProvider
                           theme={{
                              components: {
                                 Pagination: {
                                    itemBg: '#51A55C',
                                    itemSize: 40,

                                    itemActiveBg: '#51A55C',
                                    colorTextPlaceholder: 'rgb(255, 99, 71)',
                                    colorPrimary: '#FFFFFF',
                                    colorPrimaryHover: '#FFFFFF'
                                 }
                              }
                           }}
                        >
                           <Pagination responsive={true} showSizeChanger={false} defaultCurrent={1} total={80} />{' '}
                        </ConfigProvider>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
};
export default ProductPage;
