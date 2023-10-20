
import { Form, Input, Radio, Space, Button, Layout, ConfigProvider, Select } from 'antd';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';

import UploadButton from '../../../components/UploadButton/UploadButton';
import React, { useState } from 'react';
import { uploadImages } from '../../../api/upload';
import BlockForm from '../Product/BlockForm';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAddCategoryMutation } from '../../../services/cate.service'
import { useGetAllExpandQuery } from '../../../services/product.service'
import HeadForm from '../../../components/HeadForm/HeadForm';
import { ICategories } from '../../../interfaces/category';
import { AiOutlineCloseCircle, AiOutlineEye } from 'react-icons/ai';

const AddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [form] = Form.useForm<ICategories>();
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
  };
  const openQuickViewModal = () => {
    const bodyElement = document.querySelector('body');
    bodyElement?.classList.toggle('overflow-hidden');

    const modal_category = document.querySelector('.modal-category');
    setTimeout(() => {
      modal_category?.classList.toggle('hidden');
      modal_category?.classList.toggle('!z-[20]');
    }, 200);
    setTimeout(() => {
      const modal_category_content = document.querySelector('.modal-category-content');
      modal_category_content?.classList.toggle('lg:!scale-[1]');
      modal_category_content?.classList.toggle('lg:!opacity-100');
      modal_category_content?.classList.toggle('max-lg:!translate-y-[0%]');
    }, 300);
  };

  const closeQuickViewModal = () => {
    const bodyElement = document.querySelector('body');
    bodyElement?.classList.toggle('overflow-hidden');

    const modal_category = document.querySelector('.modal-category');
    setTimeout(() => {
      const modal_category_content = document.querySelector('.modal-category-content');
      modal_category_content?.classList.toggle('lg:!scale-[1]');
      modal_category_content?.classList.toggle('lg:opacity-100');
      modal_category_content?.classList.toggle('max-lg:!translate-y-[0%]');
    }, 200);
    setTimeout(() => {
      modal_category?.classList.toggle('hidden');
      modal_category?.classList.toggle('!z-[20]');
    }, 600);
  };


  const { data, isLoading } = useGetAllExpandQuery({ expand: true })
  console.log(data);

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


  return (
    <>
      <Helmet>
        <title>Thêm danh mục</title>
      </Helmet>

      <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '90%' }}>
        {/* <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%] '> */}

        <Form form={form} onFinish={handleSubmit} className='mt-10 flex justify-center items-center flex-col w-[100%] ' >
          <div className=' flex justify-between  w-[90%] '>
            <HeadForm
              placeHolder='Danh mục không tên'
              linkBack='/manage/categories'
              changeValue={(value) => setCategoryName(value)}
              initValue={categoryName}
            />

          </div>



          <div className='w-[90%]   flex justify-between   mt-10'  >


            <div className="col-span-2 w-[67%]">

              <BlockForm title='Sản phẩm trong danh mục' >
                <Form.Item

                >
                  <button
                    type='button'
                    onClick={openQuickViewModal} 
                    className='bg-greenPrimary duration-100 hover:bg-greenPri600 text-white text-lg p-2 font-semibold rounded-lg flex justify-start items-center gap-2'
                    >
                    <PlusCircleOutlined></PlusCircleOutlined>
                    Thêm sản phẩm
                  </button>


                </Form.Item>
              </BlockForm>
            </div>

            <section className=' modal-category fixed p-10   top-0 left-0 w-full  h-full hidden  bg-[rgba(3,17,27,0.3)] z-[-2]    outline-none'>
              <div className='modal-category-content  delay-500 overflow-y-auto max-lg:h-[90%] max-lg:flex-wrap max-lg:fixed max-lg:bottom-0 max-lg:w-[100%] lg:opacity-0  max-lg:max-w-full transition-all opacity-100 duration-700 lg:scale-[0.8] max-lg:translate-y-[100%]  relative flex w-[80%] lg:my-[28px] lg:max-h-[615px] gap-[20px] lg:mx-auto lg:px-[20px] lg:py-[25px] p-[10px]  bg-white rounded-[3px] overflow-hidden border-[1px] outline-none border-[rgba(0,0,0,.2)]  max-w-[840px]'>


                <div className='w-full  grid grid-cols-1 gap-1 '>

                  <div className=' w-full flex justify-between '>
                    <h6 className='text-2xl'>Thêm sản phẩm vào danh mục này</h6>
                    <button
                      onClick={closeQuickViewModal}
                      type='button'
                      className='group/close-modal  right-4 z-[10] max-lg:top-0 max-lg:right-[10px]'
                    >
                      <AiOutlineCloseCircle className=' text-[30px] max-lg:text-[40px]  group-hover/close-modal:fill-[#51A55C]'></AiOutlineCloseCircle>
                    </button>
                  </div>

                  <div className='w-[99%]'>
                    {

                      data?.body.products.map((item, index) => {
                        return <div className="flex justify-between  m-4">
                          <label for="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.productName}</label>
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                        </div>
                      })
                    }

                  </div>

                  <div className='w-full flex justify-between '>
                    <button
                     type="button"
                     onClick={closeQuickViewModal}
                     
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Hủy
                    </button>

                    <button type="button"
                     
                    
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Lưu
                    </button>
                  </div>


                </div>

              </div>

            </section>

            <div className='w-[30%]' >
              <BlockForm title='Thông tin danh mục' >


                <Form.Item
                  name={'cateName'}
                >
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Tên danh mục
                  </label>

                  <Input

                    placeholder='Thêm tên danh mục'
                    value={categoryName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
                  ></Input>
                </Form.Item>



                <Form.Item
                  name='image'
                  hasFeedback
                  rules={[{ required: true, message: 'Vui lòng tải ảnh lên !' }]}
                >
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Hình ảnh
                  </label>
                  <UploadButton
                    maxCount={1}
                    multiple
                    listStyle='picture-card'
                    getListFiles={handleGetFiles}

                  />
                </Form.Item>
              </BlockForm>
            </div>


          </div>



        </Form>
        {/* </div> */}
      </Layout>
    </>
  )
}

export default AddCategory