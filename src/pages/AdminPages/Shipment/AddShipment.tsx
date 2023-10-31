import { Helmet } from 'react-helmet';
import HeadForm from '../../../components/HeadForm/HeadForm';
import BlockForm from '../Product/BlockForm';
import PlusIcon from '../../../components/Icons/PlusIcon';
import { useGetAllWithoutExpandQuery } from '../../../services/product.service';
import FormProduct from './components/FormProduct';
import { InputShipment } from '../../../interfaces/shipment';
import { message } from 'antd';
import { useAddShipmentMutation } from '../../../services/shipment.service';
import Loading from '../../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import useFormProductInShipment from '../../../hooks/useFormProductInShipment';

const AddShipment = () => {
   const { data } = useGetAllWithoutExpandQuery({ limit: 3000 });
   const [handleSubmit, { isLoading, isError }] = useAddShipmentMutation();
   const navigate = useNavigate();
   const { productData, dataSubmitFactory, removeProduct } = useFormProductInShipment({});
   const handleSubmitForm = async () => {
      if (productData.length === 0 || productData.find((item) => item.idProduct === '')) {
         message.error('Hãy hoàn thành sản phẩm ');
         return;
      }
      const totalMoney = productData.reduce((money, product) => {
         const originPrice: number = Number(product.originPrice);
         return money + originPrice;
      }, 0);
      const dataForm: InputShipment = { totalMoney, products: productData };
      try {
         await handleSubmit(dataForm);
         if (isError) return;
         navigate('/manage/shipments');
      } catch (error) {
         console.log(error);
      }
   };
   if (isLoading) return <Loading sreenSize='lg' />;
   return (
      <>
         <Helmet>Tạo lô hàng</Helmet>
         <div className='w-full flex justify-center '>
            <div className='w-[80%] mt-20 pb-2'>
               <HeadForm
                  placeHolder='Tạo lô hàng'
                  linkBack='/manage/shipments'
                  hasName={false}
                  onSubmit={handleSubmitForm}
               />
               <BlockForm title='Sản phẩm lô hàng' className='mt-[50px] relative mb-[50px]'>
                  <div className='mt-[20px] min-h-[100px] relative '>
                     {productData?.length > 0 &&
                        productData.map((item) => (
                           <FormProduct
                              key={item.idProduct}
                              products={data ? data.body.data! : []}
                              submitProduct={(data) => dataSubmitFactory(data)}
                              removeProduct={(idProduct) => removeProduct(idProduct)}
                              data={item}
                              productData={productData}
                           />
                        ))}
                     <button
                        onClick={() =>
                           dataSubmitFactory({
                              idProduct: '',
                              date: '',
                              originPrice: '',
                              price: '',
                              weight: ''
                           })
                        }
                        className=' flex justify-start py-2 rounded-md px-5 items-center gap-5 bg-greenbbf7d0 hover:bg-greenP500 duration-300 '
                     >
                        <PlusIcon />
                        <span className='text-greenP800'>Thêm sản phẩm</span>
                     </button>
                  </div>
               </BlockForm>
               <HeadForm
                  placeHolder='Tạo lô hàng'
                  linkBack='/manage/shipments'
                  hasName={false}
                  onSubmit={handleSubmitForm}
               />
            </div>
         </div>
      </>
   );
};

export default AddShipment;
