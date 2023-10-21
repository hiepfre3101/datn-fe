import { FilterOutlined } from '@ant-design/icons';
import '../../../css/productpage.css';
import { Checkbox, ConfigProvider, Pagination, Rate, Space } from 'antd';
import { DecimalStep, IntegerStep } from './components/PriceInput';
import { AiOutlineCloseCircle, AiOutlineHeart,AiOutlineEye, AiOutlineSortAscending } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const ProductPage = () => {
   const showSub = (name: string, afterName: string) => {
      const cate_title = document.querySelector(afterName);
      cate_title?.classList.toggle('after:!rotate-[225deg]');
      cate_title?.classList.toggle('after:bottom-[-8px]');

      const categories = document.querySelector(name);

      categories?.classList.toggle(`lg:!h-[53px]`);
      categories?.classList.toggle(`max-lg:!h-[47px]`);
   };

   const showFilter = () => {
      const main_header = document.querySelector('.main-header');
      main_header?.classList.toggle('max-lg:!translate-y-[0%]');
      const main_header_overlay = document.querySelector('.main-header-overlay');
      main_header_overlay?.classList.toggle('hidden');
   };

   const showSuccessSort = (index: number) => {
      const sortby_option_item = document.querySelectorAll('.collection-sortby-option-item');
      for (let i = 0; i < sortby_option_item.length; i++) {
         sortby_option_item[i].classList.remove('before:scale-1');
         sortby_option_item[i].classList.add('before:scale-0');
      }
      sortby_option_item[index].classList.remove('before:scale-0');
      sortby_option_item[index].classList.add('before:scale-1');
   };
   const openQuickViewModal = () => {
      const bodyElement = document.querySelector('body');
      bodyElement?.classList.toggle('overflow-hidden');

      const modal_product = document.querySelector('.modal-product');
      setTimeout(() => {
         modal_product?.classList.toggle('hidden');
         modal_product?.classList.toggle('!z-[20]');
      }, 200);
      setTimeout(() => {
         const modal_product_content = document.querySelector('.modal-product-content');
         modal_product_content?.classList.toggle('lg:!scale-[1]');
         modal_product_content?.classList.toggle('lg:!opacity-100');
         modal_product_content?.classList.toggle('max-lg:!translate-y-[0%]');
      }, 300);
   };

   return (
      <>
         <div className='main bg-[#f8f8f8]'>
            <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
            <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                <span><a href="">Trang chủ </a> / Sản phẩm</span> 
            </div>
            </section>
            <section className='section-main lg:pb-[100px] md:pb-[80px] max-md:pb-[60px] border-b-[1px] border-[#e2e2e2]'>
               <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                  <div className='main-header-overlay lg:!hidden fixed hidden z-[10] left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)]'></div>
                  <div className='main-header lg:mt-[20px] lg:bg-[#f8f8f8] max-lg:!mt-[-120px] max-lg:flex max-lg:flex-col  overflow-y-auto max-lg:bottom-0 max-lg:translate-y-[130%] transition-transform duration-500 max-lg:right-0 max-lg:left-0  lg:mx-[-15px] lg:sticky w-[25%] top-[120px]  max-lg:w-[100%] max-lg:fixed max-lg:z-[13] bg-white  max-md:p-0 '>
                     <div className='main-header-title  lg:hidden px-[10px] py-[5px] bg-red-500 flex justify-between items-center'>
                        <div>
                           <FilterOutlined className='text-white' />
                           <span className='font-bold text-white ml-[10px]'>Bộ lọc</span>
                        </div>

                        <AiOutlineCloseCircle
                           onClick={showFilter}
                           className='text-white text-[28px]'
                        ></AiOutlineCloseCircle>
                     </div>

                     <div className='max-lg:overflow-y-auto max-lg:px-[10px] max-lg:pt-[10px] lg:px-[5px]'>
                        <div
                           className={`categories lg:h-[${60 * 8}px]   max-lg:h-[${
                              60 * (8 / 2)
                           }px]  overflow-hidden   transition-all duration-200 ease-linear   pb-[30px] mb-[30px] shadow-[0_0_3px_rgba(0,0,0,0.08)] rounded-[4px]`}
                        >
                           <div
                              className='group'
                              onClick={() => {
                                 showSub('.categories', '.cate-title');
                              }}
                           >
                              <h1 className=' cursor-pointer cate-title max-lg:text-[14px]   after:transition-transform after:duration-200  font-bold text-[18px] px-[10px] py-[13px] after:content-[""] relative after:top-[-15px] after:bottom-0 after:right-[13px] after:m-auto after:border-[#666] after:border-t-[0px] after:border-r-[1px] after:border-b-[1px] after:border-l-[0px] after:w-[8px] after:h-[8px] after:absolute after:translate-y-[50%] after:rotate-[45deg]'>
                                 Danh mục
                              </h1>
                           </div>
                           <div className='list-categories p-[10px]  border-t-[1px] border-[#eae4e8] gap-y-[20px] flex max-lg:gap-y-[15px] flex-col max-lg:flex-wrap max-lg:flex-row  '>
                              <a
                                 href=''
                                 className='max-lg:w-[25%] max-lg:flex max-lg:flex-col max-lg:items-center  hover:text-[#51A55C]'
                              >
                                 <img
                                    className='w-[48px] h-[48px] cate-img hidden max-lg:block'
                                    src='https://hcm.fstorage.vn/images/2023/06/artboard-16-20230608080047.gif'
                                    alt=''
                                 />
                                 <span className='max-lg:text-[12px] text-center '> Cherry</span>
                              </a>
                              <a
                                 href=''
                                 className='max-lg:w-[25%] max-lg:flex max-lg:flex-col max-lg:items-center  hover:text-[#51A55C]'
                              >
                                 <img
                                    className='w-[48px] h-[48px] cate-img hidden max-lg:block'
                                    src='https://hcm.fstorage.vn/images/2023/06/artboard-10-20230608075857.gif'
                                    alt=''
                                 />
                                 <span className='max-lg:text-[12px] text-center '> Táo</span>
                              </a>
                              <a
                                 href=''
                                 className='max-lg:w-[25%] max-lg:flex max-lg:flex-col max-lg:items-center  hover:text-[#51A55C]'
                              >
                                 <img
                                    className='w-[48px] h-[48px] cate-img hidden max-lg:block'
                                    src='https://hcm.fstorage.vn/images/2023/06/artboard-16-20230608080047.gif'
                                    alt=''
                                 />
                                 <span className='max-lg:text-[12px] text-center '> Nho</span>
                              </a>
                              <a
                                 href=''
                                 className='max-lg:w-[25%] max-lg:flex max-lg:flex-col max-lg:items-center  hover:text-[#51A55C]'
                              >
                                 <img
                                    className='w-[48px] h-[48px] cate-img hidden max-lg:block'
                                    src='https://hcm.fstorage.vn/images/2023/06/artboard-10-20230608075857.gif'
                                    alt=''
                                 />
                                 <span className='max-lg:text-[12px] text-center '>Lê</span>
                              </a>

                              <a
                                 href=''
                                 className='max-lg:w-[25%] max-lg:flex max-lg:flex-col max-lg:items-center  hover:text-[#51A55C]'
                              >
                                 <img
                                    className='w-[48px] h-[48px] cate-img hidden max-lg:block'
                                    src='https://hcm.fstorage.vn/images/2023/06/artboard-16-20230608080047.gif'
                                    alt=''
                                 />
                                 <span className='max-lg:text-[12px] text-center '>Ổi</span>
                              </a>
                              <a
                                 href=''
                                 className='max-lg:w-[25%] max-lg:flex max-lg:flex-col max-lg:items-center  hover:text-[#51A55C]'
                              >
                                 <img
                                    className='w-[48px] h-[48px] cate-img hidden max-lg:block'
                                    src='https://hcm.fstorage.vn/images/2023/06/artboard-10-20230608075857.gif'
                                    alt=''
                                 />
                                 <span className='max-lg:text-[12px] text-center '>Dâu</span>
                              </a>
                              <a
                                 href=''
                                 className='max-lg:w-[25%] max-lg:flex max-lg:flex-col max-lg:items-center  hover:text-[#51A55C]'
                              >
                                 <img
                                    className='w-[48px] h-[48px] cate-img hidden max-lg:block'
                                    src='https://hcm.fstorage.vn/images/2023/06/artboard-16-20230608080047.gif'
                                    alt=''
                                 />
                                 <span className='max-lg:text-[12px] text-center '> Cherry</span>
                              </a>
                              <a
                                 href=''
                                 className='max-lg:w-[25%] max-lg:flex max-lg:flex-col max-lg:items-center  hover:text-[#51A55C]'
                              >
                                 <img
                                    className='w-[48px] h-[48px] cate-img hidden max-lg:block'
                                    src='https://hcm.fstorage.vn/images/2023/06/artboard-16-20230608080047.gif'
                                    alt=''
                                 />
                                 <span className='max-lg:text-[12px] text-center '> Cherry</span>
                              </a>
                           </div>
                        </div>
                        <div
                           className={`origin h-[${
                              32 * 6
                           }px]   overflow-hidden    transition-all duration-200 ease-linear   pb-[30px] mb-[30px] shadow-[0_0_3px_rgba(0,0,0,0.08)] rounded-[4px]`}
                        >
                           <div className='group' onClick={() => showSub('.origin', '.origin-title')}>
                              <h1 className=' cursor-pointer origin-title  max-lg:text-[14px]   after:transition-transform after:duration-200  font-bold text-[18px] px-[10px] py-[13px] after:content-[""] relative after:top-[-15px] after:bottom-0 after:right-[13px] after:m-auto after:border-[#666] after:border-t-[0px] after:border-r-[1px] after:border-b-[1px] after:border-l-[0px] after:w-[8px] after:h-[8px] after:absolute after:translate-y-[50%] after:rotate-[45deg]'>
                                 Xuất xứ
                              </h1>
                           </div>

                           <div className='list-origin p-[10px] border-t-[1px] border-[#eae4e8] gap-y-[20px] flex max-lg:gap-y-[20px] flex-col max-lg:flex-wrap max-lg:flex-row  '>
                              <form action='' className='origin-form flex flex-col gap-y-[10px]'>
                                 <ConfigProvider
                                    theme={{
                                       token: {
                                          colorPrimary: '#51A55C'
                                       }
                                    }}
                                 >
                                    <Checkbox className='font-[500] font-Quicksand'>Mỹ</Checkbox>
                                    <Checkbox className='font-[500] font-Quicksand'>Việt Nam</Checkbox>
                                    <Checkbox className='font-[500] font-Quicksand'>Liên Xô</Checkbox>
                                    <Checkbox className='font-[500] font-Quicksand'>Tây Đức</Checkbox>
                                    <Checkbox className='font-[500] font-Quicksand'>Đông Đức</Checkbox>
                                    <Checkbox className='font-[500] font-Quicksand'>Long Biên</Checkbox>
                                 </ConfigProvider>
                              </form>
                           </div>
                        </div>
                        <div className={` pb-[30px] mb-[30px] shadow-[0_0_3px_rgba(0,0,0,0.08)] rounded-[4px]`}>
                           <div className='group'>
                              <h1 className=' cursor-pointer origin-title  max-lg:text-[14px]    font-bold text-[18px] px-[10px] py-[13px] after:content-[""] relative after:top-[-15px] '>
                                 Lọc theo giá
                              </h1>
                           </div>

                           <div className='filter-price p-[10px] border-t-[1px] border-[#eae4e8] gap-y-[20px] flex max-lg:gap-y-[20px] flex-col max-lg:flex-wrap max-lg:flex-row  '>
                              <ConfigProvider
                                 theme={{
                                    token: {
                                       // Seed Token
                                       colorPrimary: '#00b96b',
                                       borderRadius: 5
                                    }
                                 }}
                              >
                                 <Space style={{ width: '100%' }} direction='vertical'>
                                    max
                                    <IntegerStep />
                                    min
                                    <DecimalStep />
                                 </Space>
                              </ConfigProvider>
                           </div>
                        </div>
                     </div>
                     <div className='main-header-bottom flex justify-between lg:hidden bg-white fixed bottom-0 px-[5px] pt-[10px] py-[12px] border-t-[1px] border-[#eae4e8] w-full'>
                        <button
                           onClick={showFilter}
                           className='text-[13px] font-[500] bg-[#f3f4f6] border-[1px] border-[#e5e7eb] text-center py-[10px] px-[15px] cursor-pointer block rounded-[2px] outline-none w-[calc(50%-12px)] bg-[] '
                        >
                           HUỶ
                        </button>
                        <button className='text-[13px] text-white font-[500] bg-[#51A55C]  border-[1px] border-[#e5e7eb] text-center py-[10px] px-[15px] cursor-pointer block rounded-[2px] outline-none w-[calc(50%-12px)] bg-[] '>
                           ÁP DỤNG
                        </button>
                     </div>
                  </div>
                  <div className=' px-[20px] max-md:px-0 main-content max-border-l-2 border-[#cccccc]   w-[75%] max-lg:w-[100%] '>
                     <div className='product-item mb-[30px]'>
                        <div className='product-item-title max-sm:gap-y-[10px] flex flex-wrap justify-between items-center max-lg:pb-[30px] max-lg:border-b-[1px] max-lg:border-[#e2e2e2]'>
                           <h1 className='cate-name font-bold text-[20px] sm:my-[20px] max-sm:mt-[20px] lg:pl-[10px] max-lg:w-full '>
                              Sản phẩm
                           </h1>
                           <div className='cursor-pointer  w-[100px]  '>
                              <button
                                 onClick={showFilter}
                                 className='lg:hidden bg-white border-[1px] py-[3px] px-[12px] gap-[5px]  h-[35px] border-[#eae4e8] flex justify-center items-center cursor-pointer rounded-[30px]'
                              >
                                 <span className='text-[14px] '>Bộ lọc</span>
                                 <FilterOutlined />
                              </button>
                           </div>
                           <div className='sort-alpha  group/sort  border-[1px] relative  h-[38px] min-w-[220px] bg-white z-[3]  border-[#eae4e8]  pl-[10px] pr-[40px] cursor-pointer'>
                              <div className="sort-alpha-content flex gap-[5px] relative after:absolute after:content:[''] items-center h-full after:top-[40%] after:right-[-30px] after:bg-transparent after:border-x-[6px] after:border-t-[7px] after:border-b-[0px] after:border-t-[#bababa] after:border-x-transparent after:block after:w-0 after:h-0">
                                 <AiOutlineSortAscending className='sort-alpha-icon text-[25px]'></AiOutlineSortAscending>
                                 <span className='sort-alpha-text font-bold text-[13px]'>Sắp xếp</span>
                              </div>
                              <div className='collection-sortby-option  group-hover/sort:visible invisible  group-hover/sort:top-[100%] group-hover/sort:opacity-[1] bg-white  absolute top-[calc(100%+10px)] opacity-0 left-0 right-0 border-[1px] border-[#eae4e8] transition-all duration-300'>
                                 <ul className='collection-sortby-option-list py-[5px] px-[10px]'>
                                    <li
                                       onClick={() => showSuccessSort(0)}
                                       className='collection-sortby-option-item relative cursor-pointer py-[4px] pr-[10px] pl-[25px] before:absolute before:left-[5px] before:top-[10px] before:w-[12px] before:h-[6px] before:border-[1.5px] before:border-[#51A55C] before:border-t-0 before:border-r-0 before:transition-all before:duration-300 before:scale-1  before:rotate-[-45deg]'
                                    >
                                       <span className='text-[14px] hover:text-[#51A55C]'>Sản phẩm nổi bật</span>
                                    </li>
                                    <li
                                       onClick={() => showSuccessSort(1)}
                                       className='collection-sortby-option-item relative cursor-pointer py-[4px] pr-[10px] pl-[25px] before:absolute before:left-[5px] before:top-[10px] before:w-[12px] before:h-[6px] before:border-[1.5px] before:border-[#51A55C] before:border-t-0 before:border-r-0 before:transition-all before:duration-300 before:scale-0  before:rotate-[-45deg]'
                                    >
                                       <span className='text-[14px] hover:text-[#51A55C]'>Giá: Tăng dần</span>
                                    </li>
                                    <li
                                       onClick={() => showSuccessSort(2)}
                                       className='collection-sortby-option-item relative cursor-pointer py-[4px] pr-[10px] pl-[25px] before:absolute before:left-[5px] before:top-[10px] before:w-[12px] before:h-[6px] before:border-[1.5px] before:border-[#51A55C] before:border-t-0 before:border-r-0 before:transition-all before:duration-300 before:scale-0  before:rotate-[-45deg]'
                                    >
                                       <span className='text-[14px] hover:text-[#51A55C]'>Giá: Giảm dần</span>
                                    </li>
                                    <li
                                       onClick={() => showSuccessSort(3)}
                                       className='collection-sortby-option-item relative cursor-pointer py-[4px] pr-[10px] pl-[25px] before:absolute before:left-[5px] before:top-[10px] before:w-[12px] before:h-[6px] before:border-[1.5px] before:border-[#51A55C] before:border-t-0 before:border-r-0 before:transition-all before:duration-300 before:scale-0  before:rotate-[-45deg]'
                                    >
                                       <span className='text-[14px] hover:text-[#51A55C]'>Tên: A-Z</span>
                                    </li>
                                    <li
                                       onClick={() => showSuccessSort(4)}
                                       className='collection-sortby-option-item relative cursor-pointer py-[4px] pr-[10px] pl-[25px] before:absolute before:left-[5px] before:top-[10px] before:w-[12px] before:h-[6px] before:border-[1.5px] before:border-[#51A55C] before:border-t-0 before:border-r-0 before:transition-all before:duration-300 before:scale-0  before:rotate-[-45deg]'
                                    >
                                       <span className='text-[14px] hover:text-[#51A55C]'>Tên: Z-A</span>
                                    </li>
                                    <li
                                       onClick={() => showSuccessSort(4)}
                                       className='collection-sortby-option-item relative cursor-pointer py-[4px] pr-[10px] pl-[25px] before:absolute before:left-[5px] before:top-[10px] before:w-[12px] before:h-[6px] before:border-[1.5px] before:border-[#51A55C] before:border-t-0 before:border-r-0 before:transition-all before:duration-300 before:scale-0  before:rotate-[-45deg]'
                                    >
                                       <span className='text-[14px] hover:text-[#51A55C]'>Cũ nhất</span>
                                    </li>
                                    <li
                                       onClick={() => showSuccessSort(4)}
                                       className='collection-sortby-option-item relative cursor-pointer py-[4px] pr-[10px] pl-[25px] before:absolute before:left-[5px] before:top-[10px] before:w-[12px] before:h-[6px] before:border-[1.5px] before:border-[#51A55C] before:border-t-0 before:border-r-0 before:transition-all before:duration-300 before:scale-0  before:rotate-[-45deg]'
                                    >
                                       <span className='text-[14px] hover:text-[#51A55C]'>Mới nhất</span>
                                    </li>
                                    <li
                                       onClick={() => showSuccessSort(4)}
                                       className='collection-sortby-option-item relative cursor-pointer py-[4px] pr-[10px] pl-[25px] before:absolute before:left-[5px] before:top-[10px] before:w-[12px] before:h-[6px] before:border-[1.5px] before:border-[#51A55C] before:border-t-0 before:border-r-0 before:transition-all before:duration-300 before:scale-0  before:rotate-[-45deg]'
                                    >
                                       <span className='text-[14px] hover:text-[#51A55C]'>Bán chạy nhất</span>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>

                        <div className='list-products grid xl:grid-cols-3 pt-[30px] lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-2  md:gap-[25px] max-md:gap-[12px]'>
                        <div className=' product-item md:p-[10px]  max-xl:mb-[18px]'>
                     <div className='product-wrap overflow-hidden group/product-wrap rounded-[5px] relative flex flex-col justify-between max-xl:pb-[40px]'>
                        <span className='discount transition-all duration-300 group-hover/product-wrap:translate-x-[-115%] bg-red-500 min-w-[40px] z-[4] text-center absolute rounded-[3px] py-[5px] px-[10px] text-[12px] text-white left-[7px] top-[7px]'>
                           -20%
                        </span>
                        <div className='wrap-product-img overflow-hidden xl:relative max-xl:text-center '>
                           <a
                              href=''
                              className='xl:relative product-img   after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 bg-[#ffffff] after:opacity-0 after:invisible transition-all duration-300 group-hover/product-wrap:visible xl:group-hover/product-wrap:opacity-[0.4] max-xl:group-hover/product-wrap:opacity-[0.5] '
                           >
                              <img
                                 className='product-main-img  xl:group-hover/product-wrap:invisible  visible transition-all duration-300 opacity-100 object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg'
                                 alt=''
                              />
                              <img
                                 className='product-sub-img max-xl:hidden absolute group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible transition-all duration-300 top-0 left-0 invisible opacity-0  object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg'
                                 alt=''
                              />
                           </a>
                           <div className='product-action max-xl:w-full max-xl:justify-center  transition-all duration-300 xl:invisible xl:opacity-0 flex absolute xl:bottom-[50%] bottom-0 xl:right-[50%] xl:translate-x-[50%] xl:gap-[15px]  max-xl:gap-[10px] group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible'>
                              <button
                           
                                 className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'
                              >
                                 <HiOutlineShoppingBag></HiOutlineShoppingBag>
                              </button>
                              <button       onClick={openQuickViewModal} className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineEye></AiOutlineEye>
                              </button>
                              <button className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineHeart></AiOutlineHeart>
                              </button>
                           </div>
                        </div>
                        <a href=''>
                           <p className='product-name font-bold md:mt-[10px] text-center md:text-[18px] max-md:text-[16px] line-clamp-2 break-words hover:text-[#51A55C]'>
                              Nho Hàn Shine Muscat - Hộp Vip
                           </p>
                        </a>
                        <div className='rate text-center'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <p className='price mt-[9px] flex items-center justify-center  text-center font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                           300.000{' '}
                           <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                              500.000
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className=' product-item md:p-[10px]  max-xl:mb-[18px]'>
                     <div className='product-wrap overflow-hidden group/product-wrap rounded-[5px] relative flex flex-col justify-between max-xl:pb-[40px]'>
                        <span className='discount transition-all duration-300 group-hover/product-wrap:translate-x-[-115%] bg-red-500 min-w-[40px] z-[4] text-center absolute rounded-[3px] py-[5px] px-[10px] text-[12px] text-white left-[7px] top-[7px]'>
                           -20%
                        </span>
                        <div className='wrap-product-img overflow-hidden xl:relative max-xl:text-center '>
                           <a
                              href=''
                              className='xl:relative product-img   after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 bg-[#ffffff] after:opacity-0 after:invisible transition-all duration-300 group-hover/product-wrap:visible xl:group-hover/product-wrap:opacity-[0.4] max-xl:group-hover/product-wrap:opacity-[0.5] '
                           >
                              <img
                                 className='product-main-img  xl:group-hover/product-wrap:invisible  visible transition-all duration-300 opacity-100 object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg'
                                 alt=''
                              />
                              <img
                                 className='product-sub-img max-xl:hidden absolute group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible transition-all duration-300 top-0 left-0 invisible opacity-0  object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg'
                                 alt=''
                              />
                           </a>
                           <div className='product-action max-xl:w-full max-xl:justify-center  transition-all duration-300 xl:invisible xl:opacity-0 flex absolute xl:bottom-[50%] bottom-0 xl:right-[50%] xl:translate-x-[50%] xl:gap-[15px]  max-xl:gap-[10px] group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible'>
                              <button
                           
                                 className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'
                              >
                                 <HiOutlineShoppingBag></HiOutlineShoppingBag>
                              </button>
                              <button       onClick={openQuickViewModal} className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineEye></AiOutlineEye>
                              </button>
                              <button className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineHeart></AiOutlineHeart>
                              </button>
                           </div>
                        </div>
                        <a href=''>
                           <p className='product-name font-bold md:mt-[10px] text-center md:text-[18px] max-md:text-[16px] line-clamp-2 break-words hover:text-[#51A55C]'>
                              Nho Hàn Shine Muscat - Hộp Vip
                           </p>
                        </a>
                        <div className='rate text-center'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <p className='price mt-[9px] flex items-center justify-center  text-center font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                           300.000{' '}
                           <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                              500.000
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className=' product-item md:p-[10px]  max-xl:mb-[18px]'>
                     <div className='product-wrap overflow-hidden group/product-wrap rounded-[5px] relative flex flex-col justify-between max-xl:pb-[40px]'>
                        <span className='discount transition-all duration-300 group-hover/product-wrap:translate-x-[-115%] bg-red-500 min-w-[40px] z-[4] text-center absolute rounded-[3px] py-[5px] px-[10px] text-[12px] text-white left-[7px] top-[7px]'>
                           -20%
                        </span>
                        <div className='wrap-product-img overflow-hidden xl:relative max-xl:text-center '>
                           <a
                              href=''
                              className='xl:relative product-img   after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 bg-[#ffffff] after:opacity-0 after:invisible transition-all duration-300 group-hover/product-wrap:visible xl:group-hover/product-wrap:opacity-[0.4] max-xl:group-hover/product-wrap:opacity-[0.5] '
                           >
                              <img
                                 className='product-main-img  xl:group-hover/product-wrap:invisible  visible transition-all duration-300 opacity-100 object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg'
                                 alt=''
                              />
                              <img
                                 className='product-sub-img max-xl:hidden absolute group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible transition-all duration-300 top-0 left-0 invisible opacity-0  object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg'
                                 alt=''
                              />
                           </a>
                           <div className='product-action max-xl:w-full max-xl:justify-center  transition-all duration-300 xl:invisible xl:opacity-0 flex absolute xl:bottom-[50%] bottom-0 xl:right-[50%] xl:translate-x-[50%] xl:gap-[15px]  max-xl:gap-[10px] group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible'>
                              <button
                           
                                 className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'
                              >
                                 <HiOutlineShoppingBag></HiOutlineShoppingBag>
                              </button>
                              <button       onClick={openQuickViewModal} className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineEye></AiOutlineEye>
                              </button>
                              <button className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineHeart></AiOutlineHeart>
                              </button>
                           </div>
                        </div>
                        <a href=''>
                           <p className='product-name font-bold md:mt-[10px] text-center md:text-[18px] max-md:text-[16px] line-clamp-2 break-words hover:text-[#51A55C]'>
                              Nho Hàn Shine Muscat - Hộp Vip
                           </p>
                        </a>
                        <div className='rate text-center'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <p className='price mt-[9px] flex items-center justify-center  text-center font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                           300.000{' '}
                           <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                              500.000
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className=' product-item md:p-[10px]  max-xl:mb-[18px]'>
                     <div className='product-wrap overflow-hidden group/product-wrap rounded-[5px] relative flex flex-col justify-between max-xl:pb-[40px]'>
                        <span className='discount transition-all duration-300 group-hover/product-wrap:translate-x-[-115%] bg-red-500 min-w-[40px] z-[4] text-center absolute rounded-[3px] py-[5px] px-[10px] text-[12px] text-white left-[7px] top-[7px]'>
                           -20%
                        </span>
                        <div className='wrap-product-img overflow-hidden xl:relative max-xl:text-center '>
                           <a
                              href=''
                              className='xl:relative product-img   after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 bg-[#ffffff] after:opacity-0 after:invisible transition-all duration-300 group-hover/product-wrap:visible xl:group-hover/product-wrap:opacity-[0.4] max-xl:group-hover/product-wrap:opacity-[0.5] '
                           >
                              <img
                                 className='product-main-img  xl:group-hover/product-wrap:invisible  visible transition-all duration-300 opacity-100 object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg'
                                 alt=''
                              />
                              <img
                                 className='product-sub-img max-xl:hidden absolute group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible transition-all duration-300 top-0 left-0 invisible opacity-0  object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg'
                                 alt=''
                              />
                           </a>
                           <div className='product-action max-xl:w-full max-xl:justify-center  transition-all duration-300 xl:invisible xl:opacity-0 flex absolute xl:bottom-[50%] bottom-0 xl:right-[50%] xl:translate-x-[50%] xl:gap-[15px]  max-xl:gap-[10px] group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible'>
                              <button
                           
                                 className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'
                              >
                                 <HiOutlineShoppingBag></HiOutlineShoppingBag>
                              </button>
                              <button       onClick={openQuickViewModal} className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineEye></AiOutlineEye>
                              </button>
                              <button className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineHeart></AiOutlineHeart>
                              </button>
                           </div>
                        </div>
                        <a href=''>
                           <p className='product-name font-bold md:mt-[10px] text-center md:text-[18px] max-md:text-[16px] line-clamp-2 break-words hover:text-[#51A55C]'>
                              Nho Hàn Shine Muscat - Hộp Vip
                           </p>
                        </a>
                        <div className='rate text-center'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <p className='price mt-[9px] flex items-center justify-center  text-center font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                           300.000{' '}
                           <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                              500.000
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className=' product-item md:p-[10px]  max-xl:mb-[18px]'>
                     <div className='product-wrap overflow-hidden group/product-wrap rounded-[5px] relative flex flex-col justify-between max-xl:pb-[40px]'>
                        <span className='discount transition-all duration-300 group-hover/product-wrap:translate-x-[-115%] bg-red-500 min-w-[40px] z-[4] text-center absolute rounded-[3px] py-[5px] px-[10px] text-[12px] text-white left-[7px] top-[7px]'>
                           -20%
                        </span>
                        <div className='wrap-product-img overflow-hidden xl:relative max-xl:text-center '>
                           <a
                              href=''
                              className='xl:relative product-img   after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 bg-[#ffffff] after:opacity-0 after:invisible transition-all duration-300 group-hover/product-wrap:visible xl:group-hover/product-wrap:opacity-[0.4] max-xl:group-hover/product-wrap:opacity-[0.5] '
                           >
                              <img
                                 className='product-main-img  xl:group-hover/product-wrap:invisible  visible transition-all duration-300 opacity-100 object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg'
                                 alt=''
                              />
                              <img
                                 className='product-sub-img max-xl:hidden absolute group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible transition-all duration-300 top-0 left-0 invisible opacity-0  object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg'
                                 alt=''
                              />
                           </a>
                           <div className='product-action max-xl:w-full max-xl:justify-center  transition-all duration-300 xl:invisible xl:opacity-0 flex absolute xl:bottom-[50%] bottom-0 xl:right-[50%] xl:translate-x-[50%] xl:gap-[15px]  max-xl:gap-[10px] group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible'>
                              <button
                           
                                 className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'
                              >
                                 <HiOutlineShoppingBag></HiOutlineShoppingBag>
                              </button>
                              <button       onClick={openQuickViewModal} className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineEye></AiOutlineEye>
                              </button>
                              <button className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineHeart></AiOutlineHeart>
                              </button>
                           </div>
                        </div>
                        <a href=''>
                           <p className='product-name font-bold md:mt-[10px] text-center md:text-[18px] max-md:text-[16px] line-clamp-2 break-words hover:text-[#51A55C]'>
                              Nho Hàn Shine Muscat - Hộp Vip
                           </p>
                        </a>
                        <div className='rate text-center'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <p className='price mt-[9px] flex items-center justify-center  text-center font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                           300.000{' '}
                           <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                              500.000
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className=' product-item md:p-[10px]  max-xl:mb-[18px]'>
                     <div className='product-wrap overflow-hidden group/product-wrap rounded-[5px] relative flex flex-col justify-between max-xl:pb-[40px]'>
                        <span className='discount transition-all duration-300 group-hover/product-wrap:translate-x-[-115%] bg-red-500 min-w-[40px] z-[4] text-center absolute rounded-[3px] py-[5px] px-[10px] text-[12px] text-white left-[7px] top-[7px]'>
                           -20%
                        </span>
                        <div className='wrap-product-img overflow-hidden xl:relative max-xl:text-center '>
                           <a
                              href=''
                              className='xl:relative product-img   after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 bg-[#ffffff] after:opacity-0 after:invisible transition-all duration-300 group-hover/product-wrap:visible xl:group-hover/product-wrap:opacity-[0.4] max-xl:group-hover/product-wrap:opacity-[0.5] '
                           >
                              <img
                                 className='product-main-img  xl:group-hover/product-wrap:invisible  visible transition-all duration-300 opacity-100 object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-1.jpg'
                                 alt=''
                              />
                              <img
                                 className='product-sub-img max-xl:hidden absolute group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible transition-all duration-300 top-0 left-0 invisible opacity-0  object-cover object-left-bottom'
                                 src='	https://spacingtech.com/html/tm/freozy/freezy-ltr/image/product/p-2.jpg'
                                 alt=''
                              />
                           </a>
                           <div className='product-action max-xl:w-full max-xl:justify-center  transition-all duration-300 xl:invisible xl:opacity-0 flex absolute xl:bottom-[50%] bottom-0 xl:right-[50%] xl:translate-x-[50%] xl:gap-[15px]  max-xl:gap-[10px] group-hover/product-wrap:opacity-100 group-hover/product-wrap:visible'>
                              <button
                           
                                 className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'
                              >
                                 <HiOutlineShoppingBag></HiOutlineShoppingBag>
                              </button>
                              <button       onClick={openQuickViewModal} className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineEye></AiOutlineEye>
                              </button>
                              <button className='add-to-card flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#51A55C] w-[40px] h-[40px] text-[20px] rounded-[100%] text-white bg-[#7aa32a]'>
                                 <AiOutlineHeart></AiOutlineHeart>
                              </button>
                           </div>
                        </div>
                        <a href=''>
                           <p className='product-name font-bold md:mt-[10px] text-center md:text-[18px] max-md:text-[16px] line-clamp-2 break-words hover:text-[#51A55C]'>
                              Nho Hàn Shine Muscat - Hộp Vip
                           </p>
                        </a>
                        <div className='rate text-center'>
                           <ConfigProvider
                              theme={{
                                 token: {
                                    controlHeightLG: 34
                                 }
                              }}
                           >
                              <Rate allowHalf disabled defaultValue={4.5} />
                           </ConfigProvider>
                        </div>
                        <p className='price mt-[9px] flex items-center justify-center  text-center font-bold md:mb-[20px] max-md:mb-[10px] md:text-[18px]  text-[#7aa32a]'>
                           300.000{' '}
                           <span className='old-price text-[#878c8f] line-through text-[13px] ml-[10px] font-normal'>
                              500.000
                           </span>
                        </p>
                     </div>
                  </div>
                        </div>
                     </div>
                     <div className='pagination flex justify-center max-sm:!mb-[10px] mb-[35px]'>
                        <ConfigProvider
                           theme={{
                              components: {
                                 Pagination: {
                                    itemBg:"#51A55C",
                                    itemSize:40,
                              
                                    itemActiveBg:"#51A55C",
                                    colorTextPlaceholder:'rgb(255, 99, 71)',
                                    colorPrimary:'#FFFFFF',
                                    colorPrimaryHover:"#FFFFFF",
                                 },
                               },
                           }}
                        >
                           <Pagination responsive={true} showSizeChanger={false} defaultCurrent={1}  total={80} />{' '}
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