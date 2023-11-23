import { Link } from 'react-router-dom';
import { Button, Divider, Popconfirm, Select, Space, Table, Tag, message, notification } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { IOrderFull } from '../../../interfaces/order';
import Loading from '../../../components/Loading/Loading';
import { getOrderForGuest, getOrderForMember } from '../../../api/order';
import { useSelector } from 'react-redux';
import { IAuth } from '../../../slices/authSlice';
import FormQuery from './Component/FormQuery';
import { formatStringToDate } from '../../../helper';
import { FAIL_ORDER, ORDER_STATUS_FULL, PENDING_ORDER, SHIPPING_ORDER, SUCCESS_ORDER } from '../../../constants/orderStatus';
import { CanceledOrder } from '../../../api/order'

const { Column } = Table;

const OrderPage = () => {
   const [orders, setOrders] = useState<IOrderFull[]>([]);
   const { Option } = Select;
   const [loading, setLoading] = useState<boolean>(false);
   const [day, setDay] = useState<string | undefined>(undefined);
   const [status, setStatus] = useState<string | undefined>(undefined);
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const canceledOrder = (id: any) => {
      CanceledOrder(id)
   }
   // const orderDatas = orders && orderData(orders)
   useEffect(() => {
      if (!auth.accessToken) return;
      (async () => {
         try {
            setLoading(true);
            const {
               data: { body }
            } = await getOrderForMember(status, day);
            setOrders([...body.data.map((order) => ({ ...order, createdAt: formatStringToDate(order.createdAt) }))]);
            setLoading(false);
         } catch (error) {
            setLoading(false);
            message.error('Lỗi hệ thống !');
            console.log(error);
         }
      })();
   }, [auth.accessToken, day, status]);
   const handleSubmit = async (invoiceId: string) => {
      try {
         setLoading(true);
         const { data } = await getOrderForGuest(invoiceId);
         setOrders([...data.body.data.map((order) => ({ ...order, createdAt: formatStringToDate(order.createdAt) }))]);
         setLoading(false);
      } catch (error) {
         setLoading(false);
         notification.error({
            message: 'Lỗi hệ thống'
         });
      }
   };
   const handleFindOrder = useCallback((invoiceId: string) => handleSubmit(invoiceId), []);
   if (loading) return <Loading sreenSize='lg' />;
   return (
      <div className='main'>
         <section className='section-breadcrumb py-[15px] border-b-[1px] border-[#e2e2e2]'>
            <div className='cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start relative'>
               <span>
                  <a href=''>Trang chủ </a> / Đơn hàng
               </span>
            </div>
         </section>

         <div className=' cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px] flex max-lg:flex-wrap items-start pb-[50px]'>
            <div className='mt-10 w-full font-bold'>
               <FormQuery handleSubmit={handleFindOrder} />
               {auth.accessToken && (
                  <div className='flex justify-start items-center gap-3 mt-2'>
                     <Select style={{ width: 200 }} defaultValue={''} onChange={(value) => setDay(value)} value={day}>
                        <Option value=''>Chọn khoảng thời gian</Option>
                        <Option value='7'>7 ngày gần đây</Option>
                        <Option value='30'>1 tháng gần đây</Option>
                     </Select>
                     <Select
                        style={{ width: 200 }}
                        defaultValue={''}
                        onChange={(value) => setStatus(value)}
                        value={status}
                     >
                        <Option value=''>Trạng thái đơn hàng</Option>
                        {ORDER_STATUS_FULL.map((statusOrder) => (
                           <Option value={statusOrder.status.toLowerCase()}>{statusOrder.status}</Option>
                        ))}
                     </Select>
                  </div>
               )}
               <Divider></Divider>
               <div className='bg-slate-50'>
                  <Table dataSource={orders} pagination={{ pageSize: 10 }} scroll={{ y: 800 }}>
                     <Column title='Ngày mua' dataIndex='createdAt' key='createdAt' />
                     <Column title='Tên' dataIndex='customerName' key='customerName' />
                     <Column title='Số điện thoại' dataIndex='phoneNumber' key='phoneNumber' />
                     <Column
                        title='Trạng thái'
                        dataIndex='status'
                        key='status'
                        render={(_: IOrderFull, record: IOrderFull) => {
                           let color = 'white';
                           if (record.status == PENDING_ORDER.toLowerCase()) {
                              color = 'yellow';
                           }
                           if (record.status == SHIPPING_ORDER.toLowerCase()) {
                              color = 'orange';
                           }
                           if (record.status == SUCCESS_ORDER.toLowerCase()) {
                              color = 'green';
                           }
                           if (record.status == FAIL_ORDER.toLowerCase())  {
                              color = 'red';
                           }
                           return <Tag color={color}>{record.status}</Tag>;
                        }}
                     />
                     <Column
                        title='Hành động'
                        key='action'
                        render={(_: IOrderFull, record: IOrderFull) => (
                           <Space size='middle'>

                              {
                                 record.status == 'chờ xác nhận' &&
                                 <Popconfirm
                                    className={``}
                                    description='Bạn chắc chắn muốn huỷ đơn hàng chứ?'
                                    okText='Đồng ý'
                                    cancelText='Hủy bỏ'
                                    title='Bạn có muốn xóa?'
                                    onConfirm={() => canceledOrder(record?._id)}
                                 >
                                    <Button className='bg-red-500'>Huỷ đơn hàng</Button>
                                 </Popconfirm>
                              }

                              <Link to={'/my-order/' + record?._id}>
                                 <Button className='bg-greenPrimary'>Chi tiết</Button>
                              </Link>

                           </Space>
                        )}
                     />
                  </Table>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrderPage;
