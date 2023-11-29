import { Divider, Form, Input, Layout } from 'antd';
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
   const [form] = Form.useForm<any>();
   const navigate = useNavigate();
   const [handleAddVoucher, { error }] = useAddVoucherMutation();
   const validateDateStartRange = (_: any, values: any) => {
      const { dateEnd } = form.getFieldsValue(true);

      if (values.isAfter(dateEnd)) {
         return Promise.reject('Ngày bắt đầu không được lớn hơn ngày kết thúc!');
      } else {
         return Promise.resolve();
      }
   };
   const validateDateEndRange = (_: any, values: any) => {
      const { dateStart } = form.getFieldsValue(true);

      if (values.isBefore(dateStart)) {
         return Promise.reject('Ngày kết thúc phải lớn hơn ngày bắt đầu!');
      } else {
         return Promise.resolve();
      }
   };
   const handleSubmit = async (values: any) => {
      try {
         setLoading(true);
         await handleAddVoucher(values);
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
                           rules={[{ required: true, message: 'Vui lòng điền số lượng mã khuyến mãi !' }]}
                        >
                           <Input placeholder='Thêm mã khuyến mãi' type='number' />
                        </Form.Item>
                        <Form.Item
                           name={'dateStart'}
                           label={'Ngày bắt đầu'}
                           rules={[
                              { required: true, message: 'Vui lòng điền ngày bắt đầu mã khuyến mãi !' },
                              { validator: validateDateStartRange }
                           ]}
                        >
                           <DatePicker />
                        </Form.Item>
                        <Form.Item
                           name={'dateEnd'}
                           label={'Ngày kết thúc'}
                           rules={[
                              { required: true, message: 'Vui lòng điền ngày kết thúc mã khuyến mãi !' },
                              { validator: validateDateEndRange }
                           ]}
                        >
                           <DatePicker />
                        </Form.Item>
                        <Form.Item
                           name={'percent'}
                           label={'Giảm bớt (%)'}
                           rules={[{ required: true, message: 'Vui lòng điền % giảm bớt !' }]}
                        >
                           <Input placeholder='Thêm khuyến mãi' type='number' />
                        </Form.Item>
                        <Form.Item
                           name={'miniMumOrder'}
                           label={' Giảm tối đa (VNĐ)'}
                           rules={[{ required: true, message: 'Vui lòng điền số tiền giảm tối đa !' }]}
                        >
                           <Input placeholder='Thêm khuyến mãi' type='number' />
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
