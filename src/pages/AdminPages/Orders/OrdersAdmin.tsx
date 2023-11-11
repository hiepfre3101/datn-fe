import { Layout, Modal, Space, Table, Tag, theme } from 'antd';
import { useState } from 'react';
import Loading from '../../../components/Loading/Loading';
import { IOrderFull } from '../../../interfaces/order';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import FilterIcon from '../../../components/Icons/FilterIcon';
import { Helmet } from 'react-helmet';
import { formatStringToDate, transformStatusOrder } from '../../../helper';
import DetailOrder from '../Order/DetailOrder';
const { Column } = Table;
import '../../../css/admin-order.css';
import { useGetAllOrderQuery } from '../../../services/order.service';

const OrdersAdmin = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [idOrder, setIdOrder] = useState<string>('');
   const [collapsed, setCollapsed] = useState(true);
   const { data, isLoading } = useGetAllOrderQuery({});
   const {
      token: { colorBgContainer }
   } = theme.useToken();
   if (isLoading) return <Loading sreenSize='lg' />;
   return (
      <>
         <Helmet>
            <title>Đơn hàng</title>
         </Helmet>
         <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
            <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%]'>
               <div className='flex justify-between items-center w-[90%]'>
                  <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Đơn hàng</h1>
               </div>
               <div className='w-[90%] min-h-[100vh] bg-white rounded-lg mt-5'>
                  <header className='flex justify-start gap-4 items-center px-5 py-5'>
                     <div className='flex justify-between items-center max-w-[50%] gap-2 rounded-[100px] border-[1px] border-[#80b235] p-2'>
                        <SearchOutlined style={{ fontSize: '1rem', color: '#80b235' }} />
                        <input
                           type='text'
                           className='text-sm outline-none border-none w-full flex-1'
                           placeholder='Tìm kiếm đơn hàng'
                        />
                     </div>
                     <button
                        onClick={() => setCollapsed(false)}
                        className='border-[1px] border-[rgba(0,0,0,0.2)] rounded-xl p-2 text-greenPrimary flex items-center gap-1 hover:-translate-y-1 duration-100'
                     >
                        <FilterIcon className='text-greenPrimary' />
                        Lọc
                     </button>
                  </header>

                  <Table
                     dataSource={data?.body.data.map((order) => ({
                        ...order,
                        createdAt: formatStringToDate(order.createdAt)
                     }))}
                     pagination={{ pageSize: 10 }}
                     scroll={{ y: 800, x: 1000 }}
                     onRow={(record) => {
                        return {
                           onClick: () => {
                              setIsOpen(true);
                              setIdOrder(record._id);
                           }
                        };
                     }}
                  >
                     <Column align='center' width={250} title='Ngày mua' dataIndex='createdAt' key='createdAt' />
                     <Column
                        align='center'
                        width={250}
                        title='Số điện thoại'
                        dataIndex='phoneNumber'
                        key='phoneNumber'
                     />
                     <Column align='center' width={250} title='Tổng tiền' dataIndex='totalPayment' key='totalPayment' />
                     <Column
                        width={250}
                        title='Trạng thái'
                        key='status'
                        render={(_: IOrderFull, record: IOrderFull) => (
                           <Space size='middle'>
                              <Tag
                                 className={` py-2 px-3 text-white border-none`}
                                 style={{ background: transformStatusOrder(record.status).color }}
                              >
                                 {transformStatusOrder(record.status).status}
                              </Tag>
                           </Space>
                        )}
                     />
                  </Table>
                  <Modal width={1000} onCancel={() => setIsOpen(false)} open={isOpen} footer={[]}>
                     <DetailOrder idOrder={idOrder} />
                  </Modal>
               </div>
            </div>

            <Layout.Sider
               width='300'
               style={{
                  background: colorBgContainer,
                  position: 'fixed',
                  bottom: 0,
                  right: 0,
                  minHeight: '100vh',
                  boxShadow: '-10px 0px 10px -2px #d8d6d6',
                  zIndex: '100'
               }}
               collapsible
               collapsed={collapsed}
               onCollapse={(value) => setCollapsed(value)}
               trigger={null}
               collapsedWidth={0}
            >
               <div className='flex justify-between items-center p-3'>
                  <p className='text-lg font-semibold text-[rgba(0,0,0,0.5)]'>Lọc đơn hàng</p>
                  <button onClick={() => setCollapsed(true)}>
                     <CloseOutlined className='text-greenPrimary' />
                  </button>
               </div>
            </Layout.Sider>
         </Layout>
      </>
   );
};

export default OrdersAdmin;
