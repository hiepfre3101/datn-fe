/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Table } from 'antd';

// import { IunsoldProduct } from '../../../interfaces/unsoldproduct';
import Column from 'antd/es/table/Column';
import { Helmet } from 'react-helmet';
import Loading from '../../../components/Loading/Loading';
import { useGetAllunsoldproductQuery } from '../../../services/unsoldproduct.service';
import { formatStringToDate } from '../../../helper';

const UnSoldProduct = () => {
   const { data, isLoading } = useGetAllunsoldproductQuery(undefined, { refetchOnMountOrArgChange: true });

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
                        scroll={{ y: 1000, x: 800 }}
                     >
                        <Column fixed='left' title='Sản phẩm' dataIndex='productName' key='productName' width={20} />
                        <Column
                           title='Ngày hết hạn'
                           width={40}
                           render={(_, record: any) => <p>{formatStringToDate(record.shipments[0].date)}</p>}
                        />

                        <Column
                           title='Lô hàng ngày'
                           key='conte'
                           width={30}
                           render={(_, record: any) => (
                              <p>{formatStringToDate(record.shipments[0].shipmentId.createdAt)}</p>
                           )}
                        />
                        <Column
                           title='Số lượng'
                           key='content'
                           width={30}
                           render={(_, record: any) => <p>{record.shipments[0].weight} (kg)</p>}
                        />

                        <Column
                           title='Giá'
                           key='userName'
                           width={30}
                           render={(_, record: any) => (
                              <p>
                                 {record.shipments[0].purchasePrice.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                 })}{' '}
                                 (VND)
                              </p>
                           )}
                        />

                        <Column
                           fixed='right'
                           width={30}
                           title='Tổng thất thoát của sản phẩm'
                           key='_id'
                           // eslint-disable-next-line @typescript-eslint/no-explicit-any
                           render={(_, record: any) => {
                              return (
                                 <p>
                                    {(
                                       Number(record.shipments[0].purchasePrice) * Number(record.shipments[0].weight)
                                    ).toLocaleString('vi-VN', {
                                       style: 'currency',
                                       currency: 'VND'
                                    })}{' '}
                                    (VND)
                                 </p>
                              );
                           }}
                        />
                     </Table>
                  </div>
               </div>
            </div>
         </Layout>
      </>
   );
};

export default UnSoldProduct;
