import { Form, Input, Radio, Space, Button, Layout, Card } from 'antd';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import UploadButton from '../../../components/UploadButton/UploadButton';
import React, { useState } from 'react';
import { uploadImages } from '../../../api/upload';
import BlockForm from '../Product/BlockForm';


import { useGetOneCateByIdQuery } from '../../../services/cate.service'
import HeadForm from '../../../components/HeadForm/HeadForm';
const UpdateCategory = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetOneCateByIdQuery(id)
    const [categoryName, setCategoryName] = useState<string>('');
    // console.log(data.body);

    return (

        <>
            <Helmet>
                <title>Chỉnh sửa danh mục</title>
            </Helmet>

            <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '90%' }}>
                {/* <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%] '> */}

                <Form className='mt-10 flex justify-center items-center flex-col w-[100%] ' >
                    <div className=' flex justify-between  w-[90%] '>
                        <HeadForm
                            placeHolder='Danh mục không tên'
                            linkBack='/manage/categories'
                            changeValue={(value) => setCategoryName(value)}
                            initValue={categoryName}
                        />
                    </div>



                    <div className='w-[90%]   flex justify-between   mt-5'  >


                        <div className="col-span-2 w-[60%]">

                            <BlockForm title='Sản phẩm trong danh mục' >

                                <div className="  grid grid-cols-3 gap-3 " >


                                    {

                                        data?.body.products.map((item, index) => {
                                            return <Card title={item.productName} className="w-[100%] bg-greena0d911 " key={index}>

                                                <img src={item.images} alt="" />
                                            </Card>
                                        })
                                    }


                                </div>

                            </BlockForm>
                        </div>



                        <div className='w-[40%]' >
                            <BlockForm title='Thông tin danh mục' >
                                <>
                                    <Form.Item>
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                            Tên danh mục
                                        </label>
                                        <Input
                                            placeholder='Thêm tên danh mục'
                                            value={categoryName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}></Input>
                                    </Form.Item>



                                    <Form.Item

                                        name='images'
                                        hasFeedback
                                        rules={[{ required: true, message: 'Vui lòng tải ảnh lên !' }]}
                                    >
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                            Hình ảnh
                                        </label>

                                        <UploadButton
                                            maxCount={3}
                                            multiple
                                            listStyle='picture-card'


                                        />
                                    </Form.Item>
                                </>
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