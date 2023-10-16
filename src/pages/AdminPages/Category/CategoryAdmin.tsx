
import { Helmet } from "react-helmet"
import { Layout, theme } from 'antd';
import { Link } from "react-router-dom";
import { SearchOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

import { Card } from 'antd';
import FilterIcon from '../../../components/Icons/FilterIcon';
const CategoryAdmin = () => {

    return (
        <>
            <Helmet>
                <title>Danh mục</title>
            </Helmet>

            <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '90%' }}>
                <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%]'>
                    <div className='flex justify-between items-center w-[90%]'>
                        <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Danh mục</h1>


                        <Link to='/manage/add-category'>
                            <button className='bg-greenPrimary duration-100 hover:bg-greenPri600 text-white text-lg p-2 font-semibold rounded-lg flex justify-start items-center gap-2'>
                                <PlusCircleOutlined style={{ color: 'white' }} />
                                Danh mục mới
                            </button>
                        </Link>

                    </div>


                    <div className='w-[90%] min-h-[100vh] bg-white rounded-lg mt-5' >
                        <header className='flex justify-start gap-4 items-center px-5 py-5'>
                            <div className='flex justify-between items-center max-w-[50%] gap-2 rounded-[100px] border-[1px] border-[#80b235] p-2'>
                                <SearchOutlined style={{ fontSize: '1rem', color: '#80b235' }} />
                                <input
                                    type='text'

                                    className='text-sm outline-none border-none w-full flex-1'
                                    placeholder='Tìm kiếm sản phẩm'
                                />

                            </div>
                            <button

                                className='border-[1px] border-[rgba(0,0,0,0.2)] rounded-xl p-2 text-greenPrimary flex items-center gap-1 hover:-translate-y-1 duration-100'
                            >
                                <FilterIcon className='text-greenPrimary' />
                                Lọc
                            </button>
                        </header>



                        <div className="  grid grid-cols-3 gap-3 " style={{ margin: 30 }}>

                            <Link to={'/manage/update-category'}>
                                <Card title="Card title" className="w-[100%] bg-greena0d911 " >

                                </Card>
                            </Link>

                            <Link to={'/manage/update-category'}>
                                <Card title="Card title" className="w-[100%] bg-greena0d911 " >

                                </Card>
                            </Link>
                            <Link to={'/manage/update-category'}>
                                <Card title="Card title" className="w-[100%] bg-greena0d911 " >

                                </Card>
                            </Link>
                            <Link to={'/manage/update-category'}>
                                <Card title="Card title" className="w-[100%] bg-greena0d911 " >

                                </Card>
                            </Link>
                           


                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default CategoryAdmin