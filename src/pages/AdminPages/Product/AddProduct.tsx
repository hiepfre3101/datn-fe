import { Form, Input, Radio, Space } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { InputProduct } from '../../../interfaces/product';
import UploadButton from '../../../components/UploadButton/UploadButton';
import React, { useState } from 'react';
import { uploadImages } from '../../../api/upload';
import BlockForm from './BlockForm';
import TextArea from 'antd/es/input/TextArea';

const fakeCategory = [
   {
      name: 'Thuc pham tuoi song',
      value: '1'
   },
   {
      name: 'Thuc pham tuoi song',
      value: '2'
   },
   {
      name: 'Thuc pham tuoi song',
      value: '3'
   },
   {
      name: 'Thuc pham tuoi song',
      value: '4'
   }
];

const AddProduct = () => {
   const [files, setFiles] = useState<File[]>([]);
   const [categoryId, setCategoryId] = useState<string>();
   const [productName, setProductName] = useState<string>('');
   const [form] = Form.useForm();
   const handleGetFiles = (files: File[]) => {
      form.setFieldValue('images', files);
      setFiles(files);
   };
   const handleSubmit = async () => {
      try {
         const {
            data: { data }
         } = await uploadImages(files);
         const imagesUploaded = data.map((image) => image.url);
         form.setFieldValue('images', imagesUploaded);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Helmet>
            <title>Thêm sản phẩm</title>
         </Helmet>
         <Form className='w-[80%] mt-20' form={form} onFinish={handleSubmit} layout='vertical'>
            <div className='flex justify-between items-center'>
               <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
                  value={productName}
                  type='text'
                  placeholder='Sản phẩm không tên'
                  className='underline-offset-[11px] font-semibold text-[rgba(0,0,0,0.5)] text-[3rem] outline-none border-none bg-transparent decoration-greenPri600 hover:underline hover:decoration-dashed decoration-1 focus:underline focus:decoration-solid max-w-[50%]'
               />
               <div className='flex justify-end items-center gap-5'>
                  <Link to={'/manage/products'}>
                     <button className='border-[1px] border-[#80b235] text-greenPrimary py-3 px-5 rounded-2xl font-semibold text-[1rem]'>
                        Hủy
                     </button>
                  </Link>
                  <Form.Item className='flex flex-col items-center !mb-0'>
                     <button
                        className='!bg-greenPrimary !text-white py-3 px-5 rounded-2xl font-semibold text-[1rem]'
                        type='submit'
                     >
                        Lưu
                     </button>
                  </Form.Item>
               </div>
            </div>
            <Space size={'large'} className='w-full !items-start mt-5'>
               <Space direction='vertical' size={'middle'} className='min-w-[800px]'>
                  <BlockForm title='Hình ảnh sản phẩm'>
                     <Form.Item<InputProduct>
                        name='images'
                        hasFeedback
                        rules={[{ required: true, message: 'Vui lòng tải ảnh lên !' }]}
                     >
                        <UploadButton
                           maxCount={3}
                           multiple
                           listStyle='picture-card'
                           getListFiles={handleGetFiles}
                           name='images'
                        />
                     </Form.Item>
                  </BlockForm>
                  <BlockForm title='Thông tin sản phẩm'>
                     <Space size={'middle'} direction='vertical' className='w-full'>
                        <p className='text-xl font-thin tracking-wider'>Thông tin cơ bản</p>
                        <Space direction='horizontal' className='w-full'>
                           <Form.Item
                              className='w-[500px]'
                              name={'productName'}
                              label={<p className='text-lg font-semibold'>Tên sản phẩm</p>}
                              rules={[{ required: true, message: 'Vui lòng điền tên sản phẩm !' }]}
                              hasFeedback
                           >
                              <Input
                                 placeholder='Thêm tên sản phẩm'
                                 className='w-full p-2'
                                 value={productName}
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
                              />
                           </Form.Item>
                           <Form.Item
                              name={'amount'}
                              label={<p className='text-lg font-semibold'>Số lượng</p>}
                              rules={[{ required: true, message: 'Vui lòng điền số lượng sản phẩm!' }]}
                              hasFeedback
                           >
                              <Input type='number' placeholder='Thêm số lượng sản phẩm' className='w-full p-2' />
                           </Form.Item>
                        </Space>
                        <Form.Item label={<p className='text-lg font-semibold'>Mô tả</p>}>
                           <TextArea rows={4} className='focus:border-[1px] focus:border-[#4096ff]' />
                        </Form.Item>
                     </Space>
                  </BlockForm>
                  <BlockForm title='Chính sách giá'>
                     <Space direction='vertical' className='w-full'>
                        <Form.Item
                           name={'price'}
                           label={<p className='text-lg font-semibold'>Giá</p>}
                           rules={[{ required: true, message: 'Vui lòng điền giá sản phẩm!' }]}
                           hasFeedback
                        >
                           <Input
                              type='number'
                              placeholder='Thêm giá sản phẩm'
                              className='w-1/2 p-2'
                              prefix={<span className='decoration-black underline absolute right-2 z-10'>đ</span>}
                           />
                        </Form.Item>
                        <Space direction='horizontal' className='w-full' size={"large"}>
                           <Form.Item
                              name={'originPrice'}
                              label={<p className='text-lg font-semibold'>Giá gốc</p>}
                              rules={[{ required: true, message: 'Vui lòng điền giá gốc sản phẩm!' }]}
                              hasFeedback
                           >
                              <Input
                                 type='number'
                                 placeholder='Thêm giá gốc sản phẩm'
                                 className='w-full p-2'
                                 prefix={<span className='decoration-black underline absolute right-2 z-10'>đ</span>}
                              />
                           </Form.Item>
                           <Form.Item
                              name={'profit'}
                              label={<p className='text-lg font-semibold'>Lợi nhuận</p>}
                              rules={[{ required: true, message: 'Vui lòng điền lợi nhuận sản phẩm!' }]}
                              hasFeedback
                           >
                              <Input
                                 type='number'
                                 placeholder='Thêm giá lợi nhuận sản phẩm'
                                 className='w-full p-2'
                                 prefix={<span className='decoration-black underline absolute right-2 z-10'>đ</span>}
                              />
                           </Form.Item>
                        </Space>
                     </Space>
                  </BlockForm>
               </Space>
               <BlockForm title='Danh mục' className='min-w-[500px]'>
                  <Form.Item<InputProduct>
                     name='images'
                     hasFeedback
                     rules={[{ required: true, message: 'Hay chon danh muc' }]}
                  >
                     <Radio.Group
                        onChange={(e) => {
                           setCategoryId(e.target.value);
                           form.setFieldValue('categoryId', e.target.value);
                        }}
                        value={categoryId}
                        className='flex flex-col gap-2 items-start'
                     >
                        {fakeCategory.map((cate) => (
                           <Radio name='categoryId' value={cate.value} className='!text-lg  '>
                              {cate.name}
                           </Radio>
                        ))}
                     </Radio.Group>
                  </Form.Item>
               </BlockForm>
            </Space>
         </Form>
      </>
   );
};

export default AddProduct;
