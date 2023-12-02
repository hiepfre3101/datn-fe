import { Layout, Table } from 'antd';

// import { IunsoldProduct } from '../../../interfaces/unsoldproduct';
import Column from 'antd/es/table/Column';
import { Helmet } from 'react-helmet';
import Loading from '../../../components/Loading/Loading';
import { useGetAllunsoldproductQuery } from '../../../services/unsoldproduct.service';
import { formatStringToDate } from '../../../helper';

const UnSoldProduct = () => {
    const { data, isLoading } = useGetAllunsoldproductQuery()
    console.log(data?.body?.data);
    
    // const [updateEvaluationMutation] = useUpdateEvaluationMutation()
    if (isLoading) return <Loading sreenSize='lg' />;
    return (
        <>
            <Helmet>
                <title>Sản phẩm thất thoát</title>
            </Helmet>

            <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
                <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%]'>
                    <div className='flex justify-between items-center w-[90%]'>
                        <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Sản phẩm thất thoát </h1>


                    </div>

                    <div className='w-[90%] min-h-[100vh] bg-white rounded-lg mt-5'>

                        <div className='flex gap-7 flex-wrap justify-center' style={{ margin: 30 }}>
                            <Table
                                dataSource={data?.body?.data?.map((unsoldproduct) => ({
                                    ...unsoldproduct,
                                    createdAt: formatStringToDate(unsoldproduct.createdAt)
                                }))}
                                pagination={{ pageSize: 5 }}
                                scroll={{ y: 800, x: 2000 }}
                            // loading={isLoading}

                            >

                                <Column
                                    fixed='left'
                                    title='Sản phẩm'
                                    dataIndex='productName'
                                    key='productName'
                                    width={20}
                                // render={(_: IunsoldProduct, record: IunsoldProduct) => {


                                //     return <p></p>
                                // }}


                                />
                                <Column
                                    title='Lô hàng ngày'
                                    // dataIndex='shipments'
                                    width={40}
                                // render={(_: IunsoldProduct, record: IunsoldProduct) => {
                                //     return <p>{record.shipments != null ? 
                                //         record.shipments : record.shipments?.date}</p>
                                // }}
                                />

                                <Column
                                    title='Số lượng'
                                    dataIndex='content'
                                    key='content'

                                    // render={(_: IunsoldProduct, record: IunsoldProduct) => (
                                    //     <p style={{
                                    //         WebkitLineClamp: '4', wordBreak: 'break-word',
                                    //         overflowWrap: 'break-word', textOverflow: 'ellipsis',
                                    //         overflow: 'hidden', display: '-webkit-box',
                                    //         WebkitBoxOrient: 'vertical'
                                    //     }} dangerouslySetInnerHTML={{ __html: record.content }}></p>
                                    // )
                                    // }
                                    width={80}
                                />

                                <Column
                                    title='Giá'
                                    dataIndex='userName'
                                    key='userName'
                                    width={40}
                                    // render={(_: IunsoldProduct, record: IunsoldProduct) => {


                                    //     return <p >{record.userName != null ?
                                    //         record.userName : record.userId?.userName}</p>
                                    // }}

                                />
                               
                               

                                <Column
                                    fixed='right'
                                    width={30}
                                    title='Tổng thất thoát của sản phẩm'
                                    key='_id'
                                    dataIndex={'_id'}
                                // render={(_: IunsoldProduct, record: IunsoldProduct) => {
                                //     return <Popconfirm
                                //         description='Bạn chắc chắn muốn ẩn đánh giá này chứ?'
                                //         okText='Đồng ý'
                                //         cancelText='Hủy bỏ'
                                //         title='Bạn có muốn ẩn?'
                                //         onConfirm={() => handleUPdateEvaluationMutation(record._id)}
                                //     >
                                //         <button type='button'
                                //             className='bg-red-400 focus:outline-none text-black  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Ẩn bài đánh giá </button>
                                //     </Popconfirm>
                                // }}
                                />
                            </Table>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default UnSoldProduct