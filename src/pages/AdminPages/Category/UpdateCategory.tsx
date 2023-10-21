/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Layout, Card, UploadFile, Divider, Popconfirm, Modal, Radio, Checkbox, Space } from 'antd';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UploadButton from '../../../components/UploadButton/UploadButton';
import React, { useState, useEffect } from 'react';
import { uploadImages } from '../../../api/upload';
import BlockForm from '../Product/BlockForm';

import { useGetOneCateByIdQuery, useUpdateCategoryMutation } from '../../../services/cate.service'
import HeadForm from '../../../components/HeadForm/HeadForm';
import { InputCategories } from '../../../interfaces/category';
import Loading from '../../../components/Loading/Loading';
import { PlusOutlined } from '@ant-design/icons';
import { useGetAllExpandQuery } from '../../../services/product.service';
import { IProduct } from '../../../interfaces/product';
const UpdateCategory = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams()
    const [form] = Form.useForm<InputCategories>();
    const { data } = useGetOneCateByIdQuery(id!)
    const { data: products } = useGetAllExpandQuery({ expand: true })
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [defaultImages, setDefaultImages] = useState<UploadFile[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedProduct, setSeclectedProduct] = useState<any>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    useEffect(() => {
        setSeclectedProduct(data?.body.products);
        
    }, [data])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hanldeSubmitProducts = (productsInput: any[]) => {
        if (!products?.body.products) return;
        setSeclectedProduct([...products.body.products, ...selectedProduct])
    }
    const [handleUpdateCategory] = useUpdateCategoryMutation()
    const handleGetFiles = (files: File[], public_id: string | undefined) => {
        if (!public_id) {
            form.setFieldValue('image', files);
            setFiles(files);
        } else {
            setDefaultImages(() => defaultImages.filter((img) => img.uid !== public_id));
            form.setFieldValue('image', files);
            setFiles(files);
        }
    };


    useEffect(() => {
        if (!data) {
            return
        }
        setCategoryName(data.body.cateName!)
        const formatedFiles: UploadFile[] = [{ uid: data.body.image.public_id, url: data.body.image.url, name: 'image', status: 'done' }] as UploadFile[];
        setDefaultImages(formatedFiles);
        const newbody = {
            ...data?.body,
            _id: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            image: {
                url: data?.body.image.url,
                public_id: data?.body.image.public_id
            }
        }
        // console.log(newbody);
        form.setFieldsValue(
            { ...newbody, image: newbody.image }
        )
    },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [id, data]
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //  const handleOnError = (error:any)=>{
    //     console.log(error);
    //  }
    // onFinishFailed={handleOnError}

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const filesToUpload: File[] = files.filter((file) => file !== undefined);
            console.log(filesToUpload);
            if (filesToUpload.length > 0) {
                const {
                    data: { body }
                } = await uploadImages(filesToUpload);
                form.setFieldValue('image', body[0]);
            }
            const newProducts = selectedProduct.map((item: IProduct) => (item._id))
            form.setFieldValue('products', newProducts);
            const newFormData = form.getFieldsValue(true);
            await handleUpdateCategory({ id: id!, ...newFormData, cateName: categoryName })
            setLoading(false);
            navigate('/manage/categories');
        } catch (error) {
            setLoading(false);
            console.log(error);

        }
    }

    if (loading) return <Loading sreenSize='lg' />;

    return (

        <>
            <Helmet>
                <title>Chỉnh sửa danh mục</title>
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
                                        className=' duration-100 hover:bg-greenPri600  text-lg p-2 font-semibold rounded-lg flex justify-start items-center gap-2'
                                    >

                                        <PlusOutlined />
                                        {openModal ? "Dong" : "Thêm sản phẩm"}
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
                                            defaultFiles={defaultImages}

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

export default UpdateCategory