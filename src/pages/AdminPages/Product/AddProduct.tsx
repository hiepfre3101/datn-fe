import { Divider, Form, Input, Radio, Space } from 'antd';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { InputProduct } from '../../../interfaces/product';
import UploadButton from '../../../components/UploadButton/UploadButton';
import React, { useState } from 'react';
import { uploadImages } from '../../../api/upload';
import BlockForm from './BlockForm';
import TextQuill from '../../../components/TextQuill/TextQuill';
import { useAddProductMutation } from '../../../services/product.service';
import { useGetAllCateQuery } from '../../../services/cate.service';
import Loading from '../../../components/Loading/Loading';
import HeadForm from '../../../components/HeadForm/HeadForm';

const AddProduct = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [files, setFiles] = useState<File[]>([]);
   const [categoryId, setCategoryId] = useState<string>();
   const [productName, setProductName] = useState<string>('');
   const [form] = Form.useForm<InputProduct>();
   const navigate = useNavigate();
   const handleGetFiles = (files: File[]) => {
      form.setFieldValue('images', files);
      setFiles(files);
   };
   const { data: categories } = useGetAllCateQuery();
   const [handleAddProduct, { error }] = useAddProductMutation();
   const handleSubmit = async () => {
      try {
         setLoading(true);
         const {
            data: { data }
         } = await uploadImages(files);
         form.setFieldValue('images', data);
         const newFormData = form.getFieldsValue(true);
         await handleAddProduct(newFormData);
         if (error) {
            console.log(error);
            return;
         }
         setLoading(false);
         navigate('/manage/products');
      } catch (error) {
         setLoading(false);
         console.log(error);
      }
   };
   if (loading) return <Loading sreenSize='lg' />;
   //BlockForm là component tạo nên một khối có title ở trên và background màu trắng tại giao diện
   return (
      <>
         <Helmet>
            <title>Thêm sản phẩm</title>
         </Helmet>
         <Form className='w-[80%] mt-20 pb-10' form={form} onFinish={handleSubmit} layout='vertical'>
            <HeadForm
               placeHolder='Sản phẩm không tên'
               linkBack='/manage/products'
               changeValue={(value) => setProductName(value)}
               initValue={productName}
            />
            <Space size={'large'} className='w-full !items-start mt-5'>
               <Space direction='vertical' size={'middle'} className='min-w-[800px]'>
                  <BlockForm title='Hình ảnh sản phẩm'>
                     <Form.Item<InputProduct>
                        name='images'
                        hasFeedback
                        rules={[{ required: true, message: 'Vui lòng tải ảnh lên !' }]}
                     >
                        <UploadButton maxCount={3} multiple listStyle='picture-card' getListFiles={handleGetFiles} />
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
                        </Space>
                        <Form.Item
                           name={'desc'}
                           label={<p className='text-lg font-semibold'>Mô tả</p>}
                           rules={[{ required: true, message: 'Vui lòng điền mô tả sản phẩm !' }]}
                        >
                           <TextQuill getValue={(value) => form.setFieldValue('desc', value)} />
                        </Form.Item>
                     </Space>
                  </BlockForm>
                  <BlockForm title='Chính sách giá'>
                     <Space direction='vertical' className='w-full'>
                        <Form.Item
                           name={'discount'}
                           label={<p className='text-lg font-semibold'>Khuyến mãi</p>}
                           hasFeedback
                        >
                           <Input
                              type='number'
                              placeholder='Thêm khuyến mãi sản phẩm'
                              className='w-1/2 p-2'
                              max={100}
                              min={0}
                              prefix={<span className='decoration-black underline absolute right-10 z-10'>%</span>}
                           />
                        </Form.Item>
                     </Space>
                  </BlockForm>
               </Space>
               <BlockForm title='Danh mục' className='min-w-[500px]'>
                  <Form.Item<InputProduct>
                     name='categoryId'
                     hasFeedback
                     rules={[{ required: true, message: 'Hãy chọn danh mục !' }]}
                  >
                     <Radio.Group
                        onChange={(e) => {
                           setCategoryId(e.target.value);
                           form.setFieldValue('categoryId', e.target.value);
                        }}
                        value={categoryId}
                        className='flex flex-col gap-2 items-start'
                     >
                        {categories?.data.map((cate) => (
                           <Radio name='categoryId' value={cate._id} className='!text-lg' key={cate._id}>
                              {/* {cate.cateName} */}
                              {cate.cateName}
                           </Radio>
                        ))}
                     </Radio.Group>
                  </Form.Item>
               </BlockForm>
            </Space>
            <Divider />
            <div className='flex justify-end items-center gap-5'>
               <Link to={'/manage/products'}>
                  <button
                     type='button'
                     className='border-[1px] border-[#80b235] text-greenPrimary py-2 px-5 rounded-xl font-semibold text-[1rem] hover:bg-greenPrimary duration-200 hover:text-white'
                  >
                     Hủy
                  </button>
               </Link>
               <Form.Item className='flex flex-col items-center !mb-0'>
                  <button
                     className='!bg-greenPrimary !text-white py-2 px-5 rounded-xl font-semibold text-[1rem]'
                     type='submit'
                  >
                     Lưu
                  </button>
               </Form.Item>
            </div>
         </Form>
      </>
   );
};

export default AddProduct;
