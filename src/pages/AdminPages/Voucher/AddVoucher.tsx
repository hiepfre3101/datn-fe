/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Form, Input, InputNumber, Layout } from 'antd';
import { DatePicker } from 'antd';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import HeadForm from '../../../components/HeadForm/HeadForm';
import BlockForm from '../Product/BlockForm';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { useAddVoucherMutation } from '../../../services/voucher.service';
const AddVoucher = () => {
   const [voucherTitle, setVoucherTitle] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [form] = Form.useForm<any>();
   const navigate = useNavigate();
   const [handleAddVoucher, { error }] = useAddVoucherMutation();
   const { RangePicker } = DatePicker;
   const handleSubmit = async (values: any) => {
      const dataSubmit = {
         ...values,
         dateStart: values.timeVoucher[0].$d.toString(),
         dateEnd: values.timeVoucher[1].$d.toString(),
         timeVoucher: undefined
      };
      try {
         setLoading(true);
         await handleAddVoucher(dataSubmit);
         if (error) {
            console.log(error);
            return;
         }
         setLoading(false);
         navigate('/manage/vouchers');
      } catch (error) {
         setLoading(false);
         console.log(error);
      }
   };
   if (loading) return <Loading sreenSize='lg' />;
   return (
      <>
         <Helmet>
            <title>Thêm mã khuyến mãi</title>
         </Helmet>

         <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
            <Form
               layout='vertical'
               form={form}
               onFinish={handleSubmit}
               className='mt-10 flex justify-center items-center flex-col w-[100%] '
            >
               <div className='w-[100%]'>
                  <HeadForm
                     placeHolder='Mã khuyến mãi không tên'
                     linkBack='/manage/vouchers'
                     changeValue={(value) => setVoucherTitle(value)}
                     initValue={voucherTitle}
                     disabled={true}
                  />
               </div>
               <div className='w-full flex justify-center mt-10'>
                  <BlockForm title='Thông tin mã khuyến mãi' className='w-full'>
                     <>
                        <Form.Item
                           name={'title'}
                           label={' Tiêu đề mã khuyến mãi'}
                           rules={[{ required: true, message: 'Vui lòng điền tiêu đề mã khuyến mãi !' }]}
                        >
                           <Input
                              placeholder='Thêm tiêu đề mã khuyến mãi'
                              value={voucherTitle}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVoucherTitle(e.target.value)}
                           />
                        </Form.Item>
                        <Form.Item
                           name={'code'}
                           label={'Mã khuyến mãi'}
                           rules={[{ required: true, message: 'Vui lòng điền mã khuyến mãi !' }]}
                        >
                           <Input placeholder='Thêm mã khuyến mãi' type='text' />
                        </Form.Item>
                        <Form.Item
                           name={'quantity'}
                           label={'Số lượng'}
                           rules={[
                              { required: true, message: 'Vui lòng điền số lượng mã khuyến mãi !' },
                              { type: 'number', min: 1, message: 'Vui lòng nhập số lớn hơn hoặc bằng 0' }
                           ]}
                        >
                           <InputNumber min={1} className='w-full' placeholder='Thêm số lượng mã khuyến mãi' />
                        </Form.Item>
                        <Form.Item
                           name={'timeVoucher'}
                           label={'Ngày bắt đầu'}
                           rules={[
                              { required: true, message: 'Vui lòng điền ngày bắt đầu và kết thúc mã khuyến mãi !' }
                           ]}
                        >
                           <RangePicker format={'DD/MM/YYYY'} />
                        </Form.Item>
                        <Form.Item
                           name={'percent'}
                           label={'Giảm bớt (%)'}
                           rules={[
                              { required: true, message: 'Vui lòng điền % giảm bớt !' },
                              { type: 'number', min: 1, message: 'Vui lòng nhập số lớn hơn 0' }
                           ]}
                        >
                           <InputNumber max={100} min={0} className='w-full' placeholder='Thêm % giảm bớt' />
                        </Form.Item>
                        <Form.Item
                           name={'miniMumOrder'}
                           label={'Số tiền tối thiểu để sử dụng mã (VNĐ)'}
                           rules={[
                              { type: 'number', min: 0, message: 'Vui lòng nhập số lớn hơn hoặc bằng 0' }
                           ]}
                        >
                           <InputNumber className='w-full' placeholder='Thêm số tiền tối thiểu' />
                        </Form.Item>
                        <Form.Item
                           name={'maxReduce'}
                           label={' Giảm tối đa (VNĐ)'}
                           rules={[
                              // { required: true, message: 'Vui lòng điền số tiền giảm tối đa !' },
                              { type: 'number', min: 0, message: 'Vui lòng nhập số lớn hơn hoặc bằng 0' }
                           ]}
                        >
                           <InputNumber className='w-full' defaultValue={0} placeholder='Thêm số tiền giảm tối đa' />
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
         </Layout>
      </>
   );
};

export default AddVoucher;
