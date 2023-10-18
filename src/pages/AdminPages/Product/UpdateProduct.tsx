import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Form, Space, Input, Radio, Divider, UploadFile, Descriptions, Select } from 'antd';
import HeadForm from '../../../components/HeadForm/HeadForm';
import { InputProduct } from '../../../interfaces/product';
import UploadButton from '../../../components/UploadButton/UploadButton';
import BlockForm from './BlockForm';
import TextQuill from '../../../components/TextQuill/TextQuill';
import { Link, useParams } from 'react-router-dom';
import { useGetOneProductQuery } from '../../../services/product.service';
import { useGetAllCateQuery } from '../../../services/cate.service';
import { getShipmentData } from '../../../constants/configDescriptionAntd';
import { IShipmentOfProduct } from '../../../interfaces/shipment';
import { uploadImages } from '../../../api/upload';

const UpdateProduct = () => {
   const [form] = Form.useForm<InputProduct>();
   const { id } = useParams();
   const [files, setFiles] = useState<File[]>([]);
   const [defaultImages, setDefaultImages] = useState<UploadFile[]>([]);
   const [defaultDesc, setDefaultDesc] = useState<string>('');
   const [categoryId, setCategoryId] = useState<string>();
   const [productName, setProductName] = useState<string>('');
   const [shipments, setShipments] = useState<IShipmentOfProduct[]>([]);
   const [currentShipment, setCurrentShipment] = useState<IShipmentOfProduct>();
   const handleGetFiles = (files: File[], public_id: string | undefined) => {
      if (!public_id) {
         form.setFieldValue('images', files);
         setFiles(files);
      } else {
         setDefaultImages(() => defaultImages.filter((img) => img.uid !== public_id));
         form.setFieldValue('images', files);
         setFiles(files);
      }
   };
   const { data } = useGetOneProductQuery(id!, { skip: !id });
   const { data: categories } = useGetAllCateQuery();
   useEffect(() => {
      const formatedFiles: UploadFile[] = [] as UploadFile[];
      data?.body.images.forEach((img) => {
         const file: UploadFile = { uid: img.public_id, url: img.url, name: 'images', status: 'done' };
         formatedFiles.push(file);
      });
      setDefaultImages(formatedFiles);
      const formatedCategories = data?.body.categoryId._id;
      setCategoryId(formatedCategories);
      setProductName(data?.body.productName as string);
      setDefaultDesc(data?.body.desc as string);
      setCurrentShipment(data?.body.shipments[0]);
      setShipments(data ? data.body.shipments! : []);
      form.setFieldsValue({ ...data?.body, categoryId: formatedCategories });
   }, [categories, data, form]);
   const displayShipment = () => {
      if (data?.body.shipments.length === 0 || !currentShipment) {
         return <h2>Chưa có lô hàng sử dụng</h2>;
      }
      const dataShipment = getShipmentData(currentShipment);
      return <Descriptions title='Thông tin lô hàng' items={dataShipment} bordered />;
   };
   const handleChangeShipment = (value: { value: string; label: string }) => {
      const selectedShipment = shipments.find((shipment) => shipment.idShipment === value.value);
      setCurrentShipment(selectedShipment);
   };
   const handleSubmit = async () => {
      try {
         const filesToUpload: File[] = files.filter((file) => file !== undefined);
         if (filesToUpload.length > 0) {
            const {
               data: { body }
            } = await uploadImages(filesToUpload);
            form.setFieldValue('images', [...defaultImages, body]);
         }
         const newFormData = form.getFieldsValue(true);
         console.log(newFormData);
         return;
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Helmet>
            <title>Cập nhật sản phẩm</title>
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
                        <UploadButton
                           maxCount={3}
                           multiple
                           listStyle='picture-card'
                           getListFiles={handleGetFiles}
                           defaultFiles={defaultImages}
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
                        </Space>
                        <Form.Item
                           name={'desc'}
                           label={<p className='text-lg font-semibold'>Mô tả</p>}
                           rules={[{ required: true, message: 'Vui lòng điền mô tả sản phẩm !' }]}
                        >
                           <TextQuill
                              defaultValue={defaultDesc}
                              getValue={(value) => form.setFieldValue('desc', value)}
                           />
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
               <Space direction='vertical'>
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
                           {categories?.body.map((cate) => (
                              <Radio name='categoryId' value={cate._id} className='!text-lg' key={cate._id}>
                                 {cate.cateName}
                              </Radio>
                           ))}
                        </Radio.Group>
                     </Form.Item>
                  </BlockForm>
                  <BlockForm title='Lô hàng' className='min-w-[500px]'>
                     <Form.Item
                        name='shipments'
                        hasFeedback
                        rules={[{ required: true, message: 'Hãy chọn lô hàng !' }]}
                     >
                        <Select
                           labelInValue
                           value={
                              shipments.map((shipment) => ({
                                 value: shipment.idShipment,
                                 label: 'Lô hàng ngày: ' + shipment.date
                              }))[0]
                           }
                           style={{ width: '100%', marginBottom: '30px' }}
                           onChange={handleChangeShipment}
                           options={shipments.map((shipment) => ({
                              value: shipment.idShipment,
                              label: 'Lô hàng ngày: ' + shipment.date
                           }))}
                        />
                        {displayShipment()}
                     </Form.Item>
                  </BlockForm>
               </Space>
            </Space>
            <Divider />
            <div className='flex justify-end items-center gap-5 pb-[50px]'>
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

export default UpdateProduct;
