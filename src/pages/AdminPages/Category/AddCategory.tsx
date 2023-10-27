
import { Form, Input, Radio, Space, Button, Layout, ConfigProvider, Select, Divider, Checkbox, Card } from 'antd';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';

import UploadButton from '../../../components/UploadButton/UploadButton';
import React, { useState } from 'react';
import { uploadImages } from '../../../api/upload';
import BlockForm from '../Product/BlockForm';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useAddCategoryMutation } from '../../../services/cate.service'
import { useGetAllExpandQuery } from '../../../services/product.service'
import HeadForm from '../../../components/HeadForm/HeadForm';
import { ICategories, InputCategories } from '../../../interfaces/category';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Loading from '../../../components/Loading/Loading';
import { IProduct } from '../../../interfaces/product';

const AddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [form] = Form.useForm<InputCategories>();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSeclectedProduct] = useState<any>([])

  const { data: products } = useGetAllExpandQuery({ expand: true })
  // console.log(data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hanldeSubmitProducts = (productsInput: any[]) => {
    if (!products?.body.products) return;
    setSeclectedProduct([...products.body.products, ...selectedProduct])
  }
  const handleGetFiles = (files: File[]) => {
    form.setFieldValue('image', files);
    setFiles(files);
  };
  const [handleAddCategory, { error }] = useAddCategoryMutation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const {
        data: { body }
      } = await uploadImages(files);
      form.setFieldValue('image', body[0]);
      form.setFieldValue('cateName', categoryName)
      const newProducts = selectedProduct.map((item: IProduct) => (item._id))
      form.setFieldValue('products', newProducts);
      const newFormData = form.getFieldsValue(true);

      await handleAddCategory(newFormData);
      if (error) {
        console.log(error);
        return;
      }
      setLoading(false);
      navigate('/manage/categories');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (loading) return <Loading sreenSize='lg' />;
  return (
    <>
      <Helmet>
        <title>Thêm danh mục</title>
      </Helmet>

      <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '90%', padding: "20px 30px" }}>
                {/* <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%] '> */}

                <Form form={form} onFinish={handleSubmit} className='w-full' >
                    <div className=' flex justify-between  w-[100%] '>
                        <HeadForm
                            placeHolder='Danh mục không tên'
                            linkBack='/manage/categories'
                            changeValue={(value) => setCategoryName(value)}
                            initValue={categoryName}
                        />
                    </div>
                    <Space direction='horizontal' className='w-full' align='start'>
                        <Space direction='vertical' size={"large"} className='w-full'>
                            <BlockForm title='Sản phẩm trong danh mục' >
                                <div className="  grid grid-cols-3 gap-3 " >
                                    {

                                        selectedProduct && selectedProduct.length > 0 && selectedProduct.map((item, index) => {
                                            return <Card key={index} title={item.productName} className="w-[100%] bg-greena0d911 " key={index}>
                                                {/* <img src={data?.body.products} alt="" /> */}
                                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xóa</button>
                                            </Card>
                                        })
                                    }

                                    <button
                                        type='button'
                                        onClick={() => setOpenModal(prev => !prev)}
                                        className=' duration-100 text-lg p-2 font-semibold rounded-lg flex justify-start items-center gap-2'
                                    >

                                        
                                        {openModal ? "Đóng" : " Thêm sản phẩm"}
                                    </button>
                                </div>
                            </BlockForm>

                            {openModal && <BlockForm title='Chon san pham' className='w-[100%]'>
                                <Checkbox.Group className='grid grid-cols-1 gap-1' onChange={(checkedValues) => setSeclectedProduct(checkedValues)}>
                                    {
                                        products?.body.products.map((item: IProduct) => {
                                            return <div className="flex justify-between  m-4 " >
                                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.productName}</label>
                                                <Checkbox value={item} key={item._id} checked={selectedProduct && selectedProduct.includes(item)}></Checkbox>

                                            </div>
                                        })
                                    }

                                </Checkbox.Group>
                            </BlockForm>}

                        </Space>

                        <Space direction='vertical' className='w-full' align='end'>
                            <BlockForm title='Thông tin danh mục' className='w-[100%]'>
                                <>
                                    <Form.Item>
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                            Tên danh mục
                                        </label>
                                        <Input
                                            placeholder='Thêm tên danh mục'
                                            value={categoryName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}></Input>
                                    </Form.Item>
                                    <Form.Item
                                        name='image'
                                        hasFeedback
                                        rules={[{ required: true, message: 'Vui lòng tải ảnh lên !' }]}
                                    >
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                            Hình ảnh
                                        </label>

                                        <UploadButton
                                            maxCount={1}
                                            multiple
                                            listStyle='picture-card'
                                            getListFiles={handleGetFiles}
                                           

                                        />
                                    </Form.Item>
                                </>
                            </BlockForm>
                        </Space>


                    </Space>



                    <Divider />
                    <div className='flex justify-end  gap-5 w-[100%]'>
                        <Link to={'/manage/categories'}>
                            <button
                                type='button'
                                className='border-[1px] border-[#80b235] text-greenPrimary py-2 px-5 rounded-xl font-semibold text-[1rem] hover:bg-greenPrimary duration-200 hover:text-white'
                            >
                                Hủy
                            </button>
                        </Link>
                        <Form.Item className='flex flex-col  !mb-0'>
                            <button
                                className='!bg-greenPrimary !text-white py-2 px-5 rounded-xl font-semibold text-[1rem]'
                                type='submit'
                            >
                                Lưu
                            </button>
                        </Form.Item>
                    </div>

                </Form>
                {/* </div> */}
            </Layout>
    </>
  )
}

export default AddCategory