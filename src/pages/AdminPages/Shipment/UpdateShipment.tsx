import { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeadForm from '../../../components/HeadForm/HeadForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneShipmentQuery, useUpdateShipmentMutation } from '../../../services/shipment.service';
import useFormProductInShipment from '../../../hooks/useFormProductInShipment';
import FormProduct from './components/FormProduct';
import { useGetAllWithoutExpandQuery } from '../../../services/product.service';
import BlockForm from '../Product/BlockForm';
import PlusIcon from '../../../components/Icons/PlusIcon';
import Loading from '../../../components/Loading/Loading';
import { ConfigProvider, Switch, message } from 'antd';
import { InputShipment } from '../../../interfaces/shipment';

const UpdateShipment = () => {
   const { id } = useParams();
   const { data: products, isLoading } = useGetAllWithoutExpandQuery({ limit: 3000 });
   const { data } = useGetOneShipmentQuery(id!, { skip: !id });
   const [handleUpdateShipment, { isError, isLoading: loadUpdate }] = useUpdateShipmentMutation();
   const [disable, setDisable] = useState<boolean>(false);
   const navigate = useNavigate();
   useEffect(() => {
      if (!data) return;
      setDisable(data?.body.data.isDisable);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data?.body.data]);
   const defaultProduct = useMemo(
      () =>
         data?.body.data.products.map((product) => ({
            idProduct: product.idProduct._id,
            date: product.date,
            weight: product.weight,
            price: product.price,
            originPrice: product.originPrice
         })),
      [data]
   );
   const { productData, dataSubmitFactory, removeProduct } = useFormProductInShipment({
      defaultProductData: defaultProduct
   });
   const handleSubmitForm = async () => {
      if (productData.length === 0 || productData.find((item) => item.idProduct === '')) {
         message.error('Hãy hoàn thành sản phẩm ');
         return;
      }
      try {
         const totalMoney = productData.reduce((money, product) => {
            const originPrice: number = Number(product.originPrice);
            return money + originPrice;
         }, 0);
         const dataForm: InputShipment = {
            totalMoney: totalMoney,
            products: productData,
            isDisable: disable
         };
         await handleUpdateShipment({ idShipment: id!, ...dataForm });
         if (isError) {
            message.error('Lỗi hệ thống vui lòng thử lại sau');
         }
         navigate('/manage/shipments');
      } catch (error) {
         message.error('Lỗi hệ thống vui lòng thử lại sau');
         console.log(error);
      }
   };
   if (isLoading || loadUpdate) return <Loading sreenSize='lg' />;
   return (
      <>
         <Helmet>Chi tiết lô hàng</Helmet>
         <div className='w-[80%] mt-20 pb-2'>
            <HeadForm
               placeHolder='Chi tiết lô hàng'
               linkBack='/manage/shipments'
               hasName={false}
               onSubmit={handleSubmitForm}
            />
            <ConfigProvider
               theme={{
                  components: {
                     Switch: {
                        handleBg: '#fff',
                        innerMaxMargin: 30,
                        colorPrimary: '#6ada92',
                        colorPrimaryHover: '#0db946'
                     }
                  }
               }}
            >
               <Switch
                  checkedChildren='Sử dụng'
                  unCheckedChildren='Tạm dừng'
                  checked={!disable}
                  onChange={() => setDisable((prev) => !prev)}
               />
            </ConfigProvider>
            <BlockForm title='Sản phẩm lô hàng' className='mt-[50px] relative mb-[50px]'>
               <div className='mt-[20px] min-h-[100px] relative '>
                  {productData?.length > 0 &&
                     productData.map((item) => (
                        <FormProduct
                           key={item.idProduct}
                           products={products ? products.body.data! : []}
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
         </div>
      </>
   );
};

export default UpdateShipment;
