import { IProduct } from '../../../../interfaces/product';
import { Input, Select, Form, Space, DatePicker, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { ProductInput } from '../../../../interfaces/shipment';
import ConfirmIcon from '../../../../components/Icons/ConfirmIcon';
import { IOrigin } from '../../../../interfaces/origin';
import { useState, useEffect } from 'react';
import { getOriginData } from '../../../../api/origin';
type Props = {
   products: IProduct[];
   submitProduct: (data: ProductInput) => void;
   data: ProductInput;
};

const FormProduct = ({ products, submitProduct, data }: Props) => {
   const { Option } = Select;
   const [originData, setOriginData] = useState<IOrigin[]>();
   const [formProduct] = useForm<ProductInput>();
   const handleAddProduct = (data: ProductInput) => {
      submitProduct(data);
   };
   useEffect(() => {
      (async () => {
         try {
            const { data } = await getOriginData();
            setOriginData(data.body.data);
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);
   useEffect(() => {
      formProduct.setFieldsValue({ ...data });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);
   return (
      <Form
         form={formProduct}
         onFinish={handleAddProduct}
         className='relative rounded-md border-[1px] border-[rgba(0,0,0,0.1)] p-3 flex justify-start items-center gap-10 flex-wrap w-full mb-[50px]'
      >
         <Form.Item
            className='w-[30%]'
            label='Chọn sản phẩm'
            name='idProduct'
            hasFeedback
            rules={[{ required: true, message: 'Trường này là bắt buộc ' }]}
         >
            <Select defaultValue={{ value: '', label: 'Sản phẩm' }}>
               {products.map((product) => (
                  <Option key={product._id} value={product._id}>
                     {product.productName}
                  </Option>
               ))}
            </Select>
         </Form.Item>
         <Form.Item
            label='Giá gốc'
            name='originPrice'
            hasFeedback
            rules={[{ required: true, message: 'Trường này là bắt buộc ' }]}
         >
            <Input type='number' prefix='vnd' />
         </Form.Item>
         <Form.Item
            label='Giá bán'
            name='price'
            hasFeedback
            rules={[{ required: true, message: 'Trường này là bắt buộc ' }]}
         >
            <Input type='number' prefix='vnd' />
         </Form.Item>
         <Form.Item
            label='Hạn sử dụng'
            name='date'
            hasFeedback
            rules={[{ required: true, message: 'Trường này là bắt buộc ' }]}
         >
            <DatePicker showTime={false} direction='ltr' />
         </Form.Item>
         <Form.Item
            label='Cân nặng'
            name='weight'
            hasFeedback
            rules={[{ required: true, message: 'Trường này là bắt buộc ' }]}
         >
            <Input type='number' prefix='kg' />
         </Form.Item>
         <Form.Item
            className='min-w-[200px]'
            label='Xuất sứ'
            name='origin'
            hasFeedback
            rules={[{ required: true, message: 'Trường này là bắt buộc ' }]}
         >
            <Select defaultValue={{ value: '', label: 'Quốc gia' }}>
               {originData?.map((item) => (
                  <Option value={item._id} key={item._id}>
                     {item.name}
                  </Option>
               ))}
            </Select>
         </Form.Item>
         <Space size={'large'} direction='horizontal' className='mb-[24px]'>
            <Tooltip placement='top' title='Hủy'>
               <button className='p-2 rounded-full bg-white w-10 h-10 shadow-md hover:w-11 hover:h-11 duration-100 '>
                  <span className='text-greenPrimary w-4 font-bold'>x</span>
               </button>
            </Tooltip>
            <Form.Item className='mb-0'>
               <Tooltip placement='top' title='Lưu'>
                  <button
                     type='submit'
                     className='flex justify-center items-center p-2 rounded-full bg-greenPrimary w-10 h-10 shadow-md hover:w-11 hover:h-11 duration-100 '
                  >
                     <ConfirmIcon className='text-greenPrimary w-4 fill-white' />
                  </button>
               </Tooltip>
            </Form.Item>
         </Space>
      </Form>
   );
};

export default FormProduct;
