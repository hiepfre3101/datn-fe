import { FilterOutlined } from '@ant-design/icons';
import { AiOutlineSortAscending } from 'react-icons/ai';
const SorterProduct = () => {
   const showSuccessSort = (index: number) => {
      const sortby_option_item = document.querySelectorAll('.collection-sortby-option-item');
      for (let i = 0; i < sortby_option_item.length; i++) {
         sortby_option_item[i].classList.remove('before:scale-1');
         sortby_option_item[i].classList.add('before:scale-0');
      }
      sortby_option_item[index].classList.remove('before:scale-0');
      sortby_option_item[index].classList.add('before:scale-1');
   };
   const showFilter = () => {
      const main_header = document.querySelector('.main-header');
      main_header?.classList.toggle('max-lg:!translate-y-[0%]');
      const main_header_overlay = document.querySelector('.main-header-overlay');
      main_header_overlay?.classList.toggle('hidden');
   };
   return (
      <div>
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
                  <ul className='collection-sortby-option-list py-[5px] px-[10px] z-[10]'>
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
      </div>
   );
};

export default SorterProduct;
