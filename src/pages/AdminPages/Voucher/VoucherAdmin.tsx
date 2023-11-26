import { PlusCircleOutlined } from '@ant-design/icons';
import { Layout, Table } from 'antd';
import Column from 'antd/es/table/Column';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const VoucherAdmin = () => {
  return (
    <>
    <Helmet>
       <title>Mã khuyến mãi</title>
    </Helmet>

    <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
       <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%]'>
          <div className='flex justify-between items-center w-[90%]'>
             <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Mã khuyến mãi</h1>

             <Link to='/manage/add-voucher'>
                <button className='bg-greenPrimary duration-100 hover:bg-greenPri600 text-white text-lg p-2 font-semibold rounded-lg flex justify-start items-center gap-2'>
                   <PlusCircleOutlined style={{ color: 'white' }} />
                   Mã khuyến mãi mới
                </button>
             </Link>
          </div>

          <div className='w-[90%] min-h-[100vh] bg-white rounded-lg mt-5'>
            
             <div className='flex gap-7 flex-wrap justify-center' style={{ margin: 30 }}>
             <Table
                     // dataSource={products}
                     pagination={{ pageSize: 5 }}
                     scroll={{ y: 800, x: 2000 }}
                     // loading={isLoading}
                     rowClassName={(record) => {
                        if (!record.stock || record.expDate.includes('NaN')) {
                           return 'bg-red-100';
                        }
                        return '';
                     }}
                  >
                     <Column
                        title='Tiêu đề'
                        fixed='left'
                        dataIndex=' '
                        key=' '
                        width={50}
                        
                     />
                    
                     
                     <Column title='Mã giảm giá' dataIndex=' ' key=' ' width={90} />
                    
                     <Column
                        title='Số lượng'
                        dataIndex=''
                        key=''
                        width={80}
                        render={(stock) => <span className='w-[3rem] h-[3rem]'>{stock || 0}</span>}
                     />
                     <Column
                        title='Ngày bắt đầu'
                        dataIndex=' '
                        key=' '
                        width={80}
                        
                     />
                      <Column
                        title='Ngày hết hạn'
                        dataIndex=' '
                        key=' '
                        width={80}
                        
                     />
                      <Column
                        title='Giảm bớt (%)'
                        dataIndex=' '
                        key=' '
                        width={80}
                        
                     />
                      <Column
                        title='Giảm tối đa (VNĐ)'
                        dataIndex=' '
                        key=' '
                        width={80}
                        
                     />
                     <Column
                        fixed='right'
                        width={80}
                        title='Chức năng '
                        key='_id'
                        dataIndex={'_id'}
                        // render={(id, record: ProductDataType) => (
                        //    <ActionTable
                        //       hasSale={record?.isSale as boolean}
                        //       isSale={checkExpireProduct(id)}
                        //       idProduct={id}
                        //       linkToUpdate={`/manage/products/${id}`}
                        //       getResultConfirm={getConfirmResultToDelete}
                        //    />
                        // )}
                     />
                  </Table>
             </div>
          </div>
       </div>
    </Layout>
 </>
  )
}

export default VoucherAdmin