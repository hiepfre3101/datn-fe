import { Link } from 'react-router-dom';

import { Button, Layout, Space, Table, Tag, message, theme } from 'antd';

import { useEffect, useState } from 'react';
import { getOrder } from '../../../api/order';
import Loading from '../../../components/Loading/Loading';
import { IOder } from '../../../interfaces/order';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import FilterIcon from '../../../components/Icons/FilterIcon';
import { Helmet } from 'react-helmet';
const { Column } = Table;

const OrdersAdmin = () => {
    const [orders, setOrders] = useState<IOder[]>([]);
   
    const [loading, setLoading] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {
                    data: { body }
                } = await getOrder();
                setOrders(body.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                message.error('Loi he thong!');
                console.log(error);
            }
        })();
    }, []);
    const {
        token: { colorBgContainer }
     } = theme.useToken();
    if (loading) return <Loading sreenSize='lg' />;
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
                    <div className='w-[90%] min-h-[100vh] bg-white rounded-lg mt-5'  >
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

                        <Table dataSource={orders} pagination={{ pageSize: 10 }} scroll={{ y: 800, x: 1000 }}>
                            <Column align='center' width={250} title='Ngày mua' dataIndex='createdAt' key='createdAt' />
                            <Column align='center' width={250} title='Số điện thoại' dataIndex='phoneNumber' key='phoneNumber' />
                            <Column align='center' width={250} title='Tổng tiền' dataIndex='totalPayment' key='totalPayment' />
                            <Column
                                align='center'
                                width={250}
                                title='Trạng thái'
                                dataIndex='status'
                                key='status'
                                render={(_: IOder, record: IOder) => {
                                    let color = 'white';
                                    if (record.status == 'chờ xác nhận') {
                                        color = 'yellow';
                                    }
                                    if (record.status == 'đang giao hàng') {
                                        color = 'green';
                                    }
                                    if (record.status == 'giao hàng thành công') {
                                        color = 'red';
                                    }
                                    return <Tag color={color}>{record.status}</Tag>;
                                }}
                            />
                            <Column
                                title='Hành động'
                                key='action'
                                render={(_: IOder, record: IOder) => (
                                    <Space size='middle'>
                                        <Link to={'/my-order/' + record?._id}>
                                            <Button className='bg-greenPrimary'>Chi tiết</Button>
                                        </Link>
                                    </Space>
                                )}
                            />
                        </Table>
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
    )
}


export default OrdersAdmin