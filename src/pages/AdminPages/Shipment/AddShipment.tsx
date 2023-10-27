import { Helmet } from 'react-helmet';
import HeadForm from '../../../components/HeadForm/HeadForm';
import BlockForm from '../Product/BlockForm';
import PlusIcon from '../../../components/Icons/PlusIcon';
import { useGetAllWithoutExpandQuery } from '../../../services/product.service';
import { useState } from 'react';
import FormProduct from './components/FormProduct';
import { ProductInput } from '../../../interfaces/shipment';
import { message } from 'antd';

const AddShipment = () => {
   const { data } = useGetAllWithoutExpandQuery({ limit: 3000 });
   const [productData, setProductData] = useState<ProductInput[]>([]);
   console.log(productData);
   const checkItemInArray = (idProduct: string) => {
      return productData.filter((item) => item.idProduct === idProduct);
   };
   const dataSubmitFactory = (data: ProductInput) => {
      fillEmptyData(data);
   };
   const fillEmptyData = (data: ProductInput) => {
      const UNIQE_ITEM = 1;
      if (data.idProduct === '' && checkItemInArray(data.idProduct).length === UNIQE_ITEM) {
         message.warning('Hãy hoàn thành sản phẩm hiện tại ');
         return;
      }
      if (checkItemInArray(data.idProduct).length > UNIQE_ITEM) {
         message.warning('Bạn đã lưu sản phẩm');
         return;
      }
      const emptyData = productData.filter((item) => item.idProduct !== '');
      setProductData([...emptyData, data]);
      if (data.idProduct !== '') {
         message.success('Lưu sản phẩm thành công');
      }
   };
   return (
      <>
         <Helmet>Tạo lô hàng</Helmet>
         <div className='w-full flex justify-center'>
            <div className='w-[80%] mt-20 pb-10'>
               <HeadForm placeHolder='Tạo lô hàng' linkBack='/manage/shipments' hasName={false} />
               <BlockForm title='Sản phẩm lô hàng' className='mt-[50px] relative'>
                  <>
                     {productData.length > 0 &&
                        productData.map((item) => (
                           <FormProduct
                              key={item.idProduct}
                              products={data ? data.body.data! : []}
                              submitProduct={(data) => dataSubmitFactory(data)}
                              data={item}
                           />
                        ))}
                     <button
                        onClick={() =>
                           fillEmptyData({
                              idProduct: '',
                              date: '',
                              origin: '',
                              originPrice: 0,
                              price: 0,
                              weight: 0
                           })
                        }
                        className='absolute bottom-1 flex justify-start py-2 rounded-md px-5 items-center gap-5 bg-greenbbf7d0 hover:bg-greenP500 duration-300 '
                     >
                        <PlusIcon />
                        <span className='text-greenP800'>Thêm sản phẩm</span>
                     </button>
                  </>
               </BlockForm>
            </div>
         </div>
      </>
   );
};

export default AddShipment;
