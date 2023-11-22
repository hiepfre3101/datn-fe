/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import Table from 'antd/es/table';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ProductDataType, productData } from '../../../constants/configTableAntd';
import { useGetAllExpandQuery, useRemoveProductMutation } from '../../../services/product.service';
import Column from 'antd/es/table/Column';
import ActionTable from '../../../components/ActionTable/ActionTable';
import FilterIcon from '../../../components/Icons/FilterIcon';
import { Layout, Tag, Tooltip, theme } from 'antd';
import { adminSocket } from '../../../config/socket';
import { IProduct } from '../../../interfaces/product';
import { WILL_EXPIRE } from '../../../constants/statusExpireProduct';
const ProductAdmin = () => {
   const [valueSearch, setValueSearch] = useState<string>('');
   const [collapsed, setCollapsed] = useState(true);
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [expiredProducts, setExpiredProducts] = useState<any>([]);
   const { data, isLoading } = useGetAllExpandQuery({ expand: true });
   const [handleRemoveProduct] = useRemoveProductMutation();
   const products = data && productData(data);
   const lastEventId = useRef<null | string>(null);
   const getConfirmResultToDelete = async (result: boolean, id: string) => {
      if (!result) {
         return;
      }
      try {
         await handleRemoveProduct(id);
      } catch (error) {
         console.log(error);
      }
   };
   const {
      token: { colorBgContainer }
   } = theme.useToken();
   useEffect(() => {
      if (!data) return;
      const expireProductInDB = data.body.data.map((product) => {
         if (product.shipments[0].willExpire === WILL_EXPIRE) return product;
      });
      const newExpireProducts: any[] = [];
      expireProductInDB.forEach((product) => {
         if (!expiredProducts.includes(product!)) {
            newExpireProducts.push({ ...product, productId: product?._id }!);
         }
      });
      setExpiredProducts((prev: any) => [...prev, ...newExpireProducts]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);

   useEffect(() => {
      adminSocket.open();
      adminSocket.on('expireProduct', (data) => {
         if (data.eventId !== lastEventId.current) {
            setExpiredProducts((prev: IProduct[]) => [...prev, data.response]);
            lastEventId.current = data.eventId;
         } else {
            console.log('not run');
         }
      });
      return () => {
         adminSocket.disconnect();
      };
   }, [data]);

   const checkExpireProduct = useMemo(
      () => (idProduct: string) => {
         // return true;
         //đợi sắp đến ngày hết hạn hoặc là cái socket lâu quá nên comment lại lúc khác mở
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         return !!expiredProducts.find((product: any) => product.productId === idProduct);
      },
      [expiredProducts]
   );
   return (
      <>
         <Helmet>
            <title>Sản phẩm</title>
         </Helmet>
         <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
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
                  <Table
                     dataSource={products}
                     pagination={{ pageSize: 5 }}
                     scroll={{ y: 800, x: 2000 }}
                     loading={isLoading}
                     rowClassName={(record) => {
                        if (!record.stock || record.expDate.includes('NaN')) {
                           return 'bg-red-100';
                        }
                        return '';
                     }}
                  >
                     <Column
                        title='Ảnh sản phẩm'
                        fixed='left'
                        dataIndex='image'
                        key='image'
                        width={50}
                        render={(image) => <img src={image} className='w-[3rem] h-[3rem]' />}
                     />
                     <Column
                        title='Trạng thái bán hàng'
                        dataIndex='isSale'
                        key='isSale'
                        width={80}
                        render={(isSale) => {
                           if (isSale) return <Tag color='purple'>Thanh lý</Tag>;
                           return <Tag color='green'>Bình thường</Tag>;
                        }}
                     />
                     <Column
                        title='Tên'
                        dataIndex='productName'
                        key='productName'
                        width={150}
                        render={(name, product: IProduct) => (
                           <div className='flex justify-start items-center gap-2'>
                              <span>{name}</span>
                              {!product.isSale && checkExpireProduct(product?._id) && (
                                 <Tooltip title='Lô hàng sản phẩm hiện tại sắp hết hạn, bạn nên thanh lý sớm lô hàng này ->'>
                                    <Tag color='orange'>Sắp hết hạn</Tag>
                                 </Tooltip>
                              )}
                           </div>
                        )}
                     />
                     <Column title='Giá (VND)' dataIndex='price' key='price' width={90} />
                     <Column title='Danh mục ' dataIndex='category' key='category' width={80} />
                     <Column
                        title='Số lượng kho hàng (kg)'
                        dataIndex='stock'
                        key='stock'
                        width={80}
                        render={(stock) => <span className='w-[3rem] h-[3rem]'>{stock || 0}</span>}
                     />
                     <Column
                        title='Hạn sử dụng'
                        dataIndex='expDate'
                        key='expDate'
                        width={80}
                        render={(date) => {
                           return <span className='w-[3rem] h-[3rem]'>{date.includes('NaN') ? 'Hết hàng' : date}</span>;
                        }}
                     />
                     <Column
                        fixed='right'
                        width={80}
                        title='Chức năng '
                        key='_id'
                        dataIndex={'_id'}
                        render={(id, record: ProductDataType) => (
                           <ActionTable
                              hasSale={record?.isSale as boolean}
                              isSale={checkExpireProduct(id)}
                              idProduct={id}
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
