import { useState, useEffect } from 'react';
import { Drawer, Input, Button, Spin, Image, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IProduct } from '../../../../interfaces/product';
import { AiOutlineClose } from 'react-icons/ai';
import { useSearchProductMutation } from '../../../../services/product.service';
import { Link } from 'react-router-dom';

const SearchFilter = ({ children }: any) => {
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const [searchValue, setSearchValue] = useState<string>('');
   const [search, { data, isLoading }] = useSearchProductMutation();
   const [items, setItems] = useState<IProduct[]>([]);
   const [searchHistory, setSearchHistory] = useState<string[]>([]);
   console.log(data?.body?.data);

   useEffect(() => {
      const savedSearchHistory = localStorage.getItem('searchHistory');
      if (savedSearchHistory) {
         setSearchHistory(JSON.parse(savedSearchHistory));
      }
   }, []);

   useEffect(() => {
      if (!isLoading && data?.body?.data) {
         setItems(data?.body?.data);
      }
   }, [data, isLoading]);

   // useEffect(() => {
   //    setSearchHistory()
   //    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
   // }, [searchHistory]);

   const showDrawer = () => {
      setIsDrawerOpen(true);
   };

   const onClose = () => {
      setItems([]);
      setSearchValue('');
      setIsDrawerOpen(false);
   };

   const handleSearch = () => {
      if (searchValue === '') {
         setItems([]);
         search('');
      } else {
         const newSearchHistory = [searchValue, ...searchHistory];
         const histories = newSearchHistory.filter((_, index) => index < 5);
         setSearchHistory(histories);
         localStorage.setItem('searchHistory', JSON.stringify(histories));
         search(`${searchValue}`);
      }
   };

   const handleRemoveKeyword = (keyword: string) => {
      const newSearchHistory = searchHistory.filter((item) => item !== keyword);
      setSearchHistory(newSearchHistory);
   };

   const handleKeywordClick = (keyword: string) => {
      setSearchValue(keyword);
   };

   return (
      <>
         <span onClick={showDrawer}>{children}</span>
         <Drawer title='Search Products' placement='top' closable={true} onClose={onClose} visible={isDrawerOpen}>
            <div className='form-search relative'>
               <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder='Tìm kiếm sản phẩm...'
                  className='w-full outline-none border-b-[1px] border-[#e2e2e2] py-[10px] text-[#6f6f6f]'
               />
               <Button className='border-none absolute right-0 translate-y-[50%] bottom-[50%]' onClick={handleSearch}>
                  <SearchOutlined className='text-[20px] text-black'></SearchOutlined>
               </Button>
            </div>
            <div className='items-center flex justify-center my-5 gap-5'>
               <h2 className='text-xl text-black font-bold '>Search History:</h2>
               <div className='flex justify-center gap-5'>
                  {searchHistory.map((keyword, index) => (
                     <div
                        key={index}
                        className='search-history flex justify-center items-center'
                        onClick={() => handleKeywordClick(keyword)}
                     >
                        {/* <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'>
                           <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                              {keyword}
                           </span>
                        </button> */}
                        <Tag color='green' className='px-5 py-1'>
                           <span className=' transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0'>
                              {keyword}
                           </span>
                        </Tag>
                        <span className='text-red-400' onClick={() => handleRemoveKeyword(keyword)}>
                           <AiOutlineClose />
                        </span>
                     </div>
                  ))}
               </div>
            </div>
            <div className='grid grid-cols-2 w-[50%] mx-auto items-center '>
               {isLoading ? (
                  <div className='flex justify-center'>
                     <Spin />
                  </div>
               ) : (
                  items.map((item: IProduct, index: number) => (
                     <div className='items-center flex justify-center gap-2 mx-auto' key={index}>
                        <Image src={item.images[0].url} width={120} />
                        <div className='flex-1 '>
                           <Link to={`/products/${item._id}`}>
                              <h2 className='text-base font-bold text-black'>{item.productName}</h2>
                           </Link>
                           <h1>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h1>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </Drawer>
      </>
   );
};

export default SearchFilter;
