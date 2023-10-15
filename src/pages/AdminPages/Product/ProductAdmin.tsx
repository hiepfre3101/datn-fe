import { SearchOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import Table from 'antd/es/table';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { productData } from '../../../constants/configTableAntd';
import { useGetAllExpandQuery } from '../../../services/product.service';
import Column from 'antd/es/table/Column';
import ActionTable from '../../../components/ActionTable/ActionTable';
import FilterIcon from '../../../components/Icons/FilterIcon';
import { Layout, theme } from 'antd';

const ProductAdmin = () => {
   const [valueSearch, setValueSearch] = useState<string>('');
   const [collapsed, setCollapsed] = useState(true);
   const { data, isLoading } = useGetAllExpandQuery({ expand: true });
   const products = data && productData(data);

   const getConfirmResultToDelete = (result: boolean) => {
      //xét điều kiện gọi hàm xóa sp
      return result;
   };
   const {
      token: { colorBgContainer }
   } = theme.useToken();
   return (
      <>
         <Helmet>
            <title>Sản phẩm</title>
         </Helmet>
         <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '90%' }}>
            <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[90%]'>
               <div className='flex justify-between items-center w-[90%]'>
                  <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Sản phẩm</h1>
                  <Link to='/manage/add-product'>
                     <button className='bg-greenPrimary duration-100 hover:bg-greenPri600 text-white text-lg p-2 font-semibold rounded-lg flex justify-start items-center gap-2'>
                        <PlusCircleOutlined style={{ color: 'white' }} />
                        Sản phẩm mới
                     </button>
                  </Link>
               </div>
               <div className='w-[90%] min-h-[100vh] bg-white rounded-lg mt-5'>
                  <header className='flex justify-start gap-4 items-center px-5 py-5'>
                     <div className='flex justify-between items-center max-w-[50%] gap-2 rounded-[100px] border-[1px] border-[#80b235] p-2'>
                        <SearchOutlined style={{ fontSize: '1rem', color: '#80b235' }} />
                        <input
                           type='text'
                           value={valueSearch}
                           onChange={(e) => setValueSearch(e.target.value)}
                           className='text-sm outline-none border-none w-full flex-1'
                           placeholder='Tìm kiếm sản phẩm'
                        />
                        {valueSearch !== '' && (
                           <button
                              className='flex justify-center items-center rounded-full text-greenPrimary bg-[#80b23552] w-4 h-4  pb-1'
                              onClick={() => setValueSearch('')}
                           >
                              x
                           </button>
                        )}
                     </div>
                     <button
                        onClick={() => setCollapsed(false)}
                        className='border-[1px] border-[rgba(0,0,0,0.2)] rounded-xl p-2 text-greenPrimary flex items-center gap-1 hover:-translate-y-1 duration-100'
                     >
                        <FilterIcon className='text-greenPrimary' />
                        Lọc
                     </button>
                  </header>
                  <Table dataSource={products} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} loading={isLoading}>
                     <Column
                        title='Ảnh sản phẩm'
                        fixed='left'
                        dataIndex='image'
                        key='image'
                        width={150}
                        render={(image) => <img src={image} className='w-[3rem] h-[3rem]' />}
                     />
                     <Column title='Tên' dataIndex='productName' key='productName' width={150} />
                     <Column title='Giá' dataIndex='price' key='price' width={150} />
                     <Column title='Danh mục lớn' dataIndex='category' key='category' width={150} />
                     <Column title='Danh mục nhỏ' dataIndex='subCategory' key='subCategory' width={150} />
                     <Column title='Thương hiệu' dataIndex='brand' key='brand' width={150} />
                     <Column title='Kho hàng' dataIndex='stock' key='stock' width={150} />
                     <Column
                        width={150}
                        title='Chức năng '
                        key='_id'
                        dataIndex={'_id'}
                        render={(id) => (
                           <ActionTable
                              linkToUpdate={`/manage/products/${id}`}
                              getResultConfirm={getConfirmResultToDelete}
                           />
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
                  <p className='text-lg font-semibold text-[rgba(0,0,0,0.5)]'>Lọc sản phẩm</p>
                  <button onClick={() => setCollapsed(true)}>
                     <CloseOutlined className='text-greenPrimary' />
                  </button>
               </div>
            </Layout.Sider>
         </Layout>
      </>
   );
};

export default ProductAdmin;
