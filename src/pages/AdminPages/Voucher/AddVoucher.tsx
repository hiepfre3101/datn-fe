import { Divider, Form, Input, Layout } from 'antd'
import { DatePicker } from 'antd';

import { Helmet } from 'react-helmet'
import HeadForm from '../../../components/HeadForm/HeadForm'
import BlockForm from '../Product/BlockForm'
import { Link } from 'react-router-dom'

const { RangePicker } = DatePicker;
const AddVoucher = () => {
    return (
        <>
            <Helmet>
                <title>Thêm mã khuyến mãi</title>
            </Helmet>

            <Layout  style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
                {/* <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%] '> */}

                <Form
                    //   form={form}
                    //   onFinish={handleSubmit}
                    className='mt-10 flex justify-center items-center flex-col w-[100%] '
                >
                    <div className='w-[100%]'>
                        <HeadForm
                            placeHolder='Mã khuyến mãi không tên'
                            linkBack='/manage/vouchers'
                        // changeValue={(value) => setCategoryName(value)}
                        // initValue={categoryName}
                        />
                    </div>

                    <div className='w-full   flex justify-center   mt-10'>
                        <BlockForm title='Thông tin danh mục' className='w-full'>
                            <>
                                <Form.Item name={' '}>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                        Tiêu đề mã khuyến mãi
                                    </label>

                                    <Input
                                        placeholder='Thêm tiêu đề mã khuyến mãi'
                                    //  value={categoryName}
                                    //  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)}
                                    ></Input>
                                </Form.Item>
                                <Form.Item name={' '}>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                        Mã khuyến mãi
                                    </label>

                                    <Input
                                        placeholder='Thêm mã khuyến mãi'
                                        type='text'
                                    ></Input>
                                </Form.Item>
                                <Form.Item name={' '}>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                        Số lượng
                                    </label>

                                    <Input
                                        placeholder='Thêm mã khuyến mãi'
                                        type='number'
                                    ></Input>
                                </Form.Item>

                                <Form.Item name={' '}>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                        Thời hạn
                                    </label>

                                    <RangePicker showTime />
                                </Form.Item>

                                <Form.Item name={' '}>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                        Giảm bớt (%)
                                    </label>

                                    <Input
                                        placeholder='Thêm khuyến mãi'
                                        type='number'
                                    ></Input>
                                </Form.Item>
                                <Form.Item name={' '}>
                                    <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                                        Giảm tối đa (VNĐ)
                                    </label>

                                    <Input
                                        placeholder='Thêm khuyến mãi'
                                        type='number'
                                    ></Input>
                                </Form.Item>
                            </>
                        </BlockForm>
                    </div>
                    <Divider />
                    <div className='flex justify-end  gap-5 w-[90%]'>
                        <Link to={'/manage/vouchers'}>
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

export default AddVoucher