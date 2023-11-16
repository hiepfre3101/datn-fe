import { useState, useEffect, createContext } from 'react';
import { ConfigProvider, Pagination } from 'antd';
import FillterProducts from './components/FillterProducts';
import SorterProduct from './components/SorterProduct';
import ShowProducts from './components/ShowProducts';
import { useGetAllExpandQuery } from '../../../services/product.service';
import { IProductExpanded } from '../../../interfaces/product';
import { IResponseHasPaginate } from '../../../interfaces/base';
import { Link, useParams } from 'react-router-dom';
export interface IFilterFieldProductPage {
   field: {
      page: number;
      minPrice?: number;
      maxPrice?: number;
      category?: string;
      origin?: string;
      maxPriceOfAllProducts?: number;
      minPriceOfAllProducts?: number;
   };
   setfield?: (value: IFilterFieldProductPage) => void;
}

export const FilterFieldContext = createContext<IFilterFieldProductPage>({
   field: { page: 1 }
});

const ProductPage = () => {
   const {cate_id} = useParams()
   let [filter, setFilter] = useState<IFilterFieldProductPage>({
      field: { page: 1,category:cate_id },
      setfield: (value: IFilterFieldProductPage) => {
         setFilter(value);
      }
   });
   const [products, setProduct] = useState<IResponseHasPaginate<IProductExpanded>>();
   const [SortState, setSortState] = useState<string>('');
   const { data } = useGetAllExpandQuery({
      expand: true,
      limit: 9,
      page: filter.field.page,
      minPrice: filter.field.minPrice,
      maxPrice: filter.field.maxPrice,
      categoryId: filter.field.category,
      originId: filter.field.origin
   });

   useEffect(() => {
      let sortedData;
      let temp = data?.body.data ? [...data.body.data] : [];
      if (SortState == 'priceAsc') {
         sortedData = temp.sort((a, b) => a?.shipments[0]?.price - b?.shipments[0]?.price);
      } else if (SortState == 'priceDesc') {
         sortedData = temp.sort((a, b) => b?.shipments[0]?.price - a?.shipments[0]?.price);
      } 
       else if (SortState == 'NameAsc') {
         sortedData = temp.sort((a, b) =>a.productName.localeCompare(b.productName));
      } 
      else if (SortState == 'NameDesc') {
         sortedData = temp.sort((a, b) =>b.productName.localeCompare(a.productName));
      } 
      else if (SortState == 'dayAsc') {
         sortedData = temp.sort((a, b) =>  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } 
      else if (SortState == 'dayDesc') {
         sortedData = temp.sort((a, b) =>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } 
      else {
         sortedData = data?.body.data;
      }

      const newData: IResponseHasPaginate<IProductExpanded> = {
         message: data?.message || '',
         status: data?data.status:1,
         body: {
            data: sortedData?sortedData:[],
            pagination: data?.body?.pagination || { currentPage: 0, totalPages: 0, totalItems: 0 },
            maxPrice: data?.body?.maxPrice
         }
      };
      setProduct(newData);
      setFilter((prevFilter) => ({
         ...prevFilter,
         field: {
            ...prevFilter.field,
            maxPriceOfAllProducts: data?.body.maxPrice,
            minPriceOfAllProducts: data?.body.minPrice
         }
      }));
   }, [data, SortState]);

   const handleChangeSortState = (state: string) => {
      console.log(state);

      setSortState(state);
   };
   const handlePageChange = (pageNumber: number) => {
      setFilter({
         ...filter,
         field: {
            ...filter.field,
            page: pageNumber
         }
      });
   };

   return (
      <FilterFieldContext.Provider value={filter}>
         <>
            <div className='main bg-[#f8f8f8]'>
               <section className='section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]'>
                  <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                     <span>
                        <Link to="/">Trang chủ</Link> / Sản phẩm
                     </span>
                  </div>
               </section>
               <section className='section-main lg:pb-[100px] md:pb-[80px] max-md:pb-[60px] border-b-[1px] border-[#e2e2e2]'>
                  <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
                     <div className='main-header-overlay lg:!hidden fixed hidden z-[10] left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)]'></div>

                     <FillterProducts />

                     <div className=' px-[20px] max-md:px-0 main-content max-border-l-2 border-[#cccccc]   w-[75%] max-lg:w-[100%] '>
                        <div className='product-item mb-[30px]'>
                           <SorterProduct setSortState={handleChangeSortState} />
                           {products?.body?.data?.length ? (
                              <ShowProducts data={products} />
                           ) : (
                              <div className='text-center text-red-500 text-[20px] font-bold'>
                                 Không có sản phẩm nào phù hợp
                              </div>
                           )}
                        </div>
                        {products?.body?.data?.length ? (
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
                                 <Pagination
                                    onChange={(current) => handlePageChange(current)}
                                    responsive={true}
                                    showSizeChanger={false}
                                    defaultCurrent={1}
                                    total={data?.body.pagination.totalItems}
                                 />
                              </ConfigProvider>
                           </div>
                        ) : (
                           ''
                        )}
                     </div>
                  </div>
               </section>
            </div>
         </>
      </FilterFieldContext.Provider>
   );
};
export default ProductPage;
