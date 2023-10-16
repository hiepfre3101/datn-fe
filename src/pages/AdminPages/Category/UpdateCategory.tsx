import { Form, Input, Radio, Space, Button, Layout, Card } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import UploadButton from '../../../components/UploadButton/UploadButton';
import React, { useState } from 'react';
import { uploadImages } from '../../../api/upload';
import BlockForm from '../Product/BlockForm';
import { PlusCircleOutlined } from '@ant-design/icons';

const UpdateCategory = () => {
    return (
        <>
            <Helmet>
                <title>Thêm danh mục</title>
            </Helmet>

            <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '90%' }}>
                {/* <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%] '> */}

                <Form className='mt-10 flex justify-center items-center flex-col w-[100%] ' >
                    <div className=' flex justify-between  w-[90%] '>
                        <input

                            type='text'
                            placeholder='Danh mục không tên'
                            className='underline-offset-[11px] font-semibold text-[rgba(0,0,0,0.5)] text-[3rem] outline-none border-none bg-transparent decoration-greenPri600 hover:underline hover:decoration-dashed decoration-1 focus:underline focus:decoration-solid max-w-[50%]'
                        />
                        <div className='flex justify-end items-center gap-5'>
                            <Link to={'/manage/categories'}>
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



                    <div className='w-[90%]   flex justify-between   mt-10'  >


                        <div className="col-span-2 w-[60%]">

                            <BlockForm  title='Sản phẩm trong danh mục' >
                                
                                    <div className="  grid grid-cols-3 gap-3 " >
                                    <Card title="Card title" className="w-[100%] bg-greena0d911 ">
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>

                            <Card title="Card title" className="w-[100%] bg-greena0d911 ">
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>

                            <Card title="Card title" className="w-[100%] bg-greena0d911 ">
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                            <Card title="Card title" className="w-[100%] bg-greena0d911 ">
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>

                            <Card title="Card title" className="w-[100%] bg-greena0d911 ">
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>

                            
                                    </div>
                                
                            </BlockForm>
                        </div>



                        <div className='w-[30%]' >
                            <BlockForm title='Thông tin danh mục' >


                                <Form.Item>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Tên danh mục
                                    </label>
                                    <Input></Input>
                                </Form.Item>


                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Hình ảnh
                                </label>
                                <Form.Item

                                    name='images'
                                    hasFeedback
                                    rules={[{ required: true, message: 'Vui lòng tải ảnh lên !' }]}
                                >
                                    <UploadButton
                                        maxCount={3}
                                        multiple
                                        listStyle='picture-card'

                                        name='images'
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

export default UpdateCategory