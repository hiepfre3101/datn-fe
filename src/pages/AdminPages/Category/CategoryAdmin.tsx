
import { Helmet } from "react-helmet"
import { Layout, Image, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import FilterIcon from '../../../components/Icons/FilterIcon';
import { useGetAllCateQuery, useRemoveCategoryByIdMutation } from '../../../services/cate.service'

// import { itemsClientMenu } from "./ItemDropdown";
const CategoryAdmin = () => {
    const { data, isLoading } = useGetAllCateQuery()
    const [removeCategory] = useRemoveCategoryByIdMutation()
    const handleDelete = (id:string) => {
        removeCategory(id)
    }
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
                                    placeholder='Tìm kiếm danh mục'
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

                            
                            {
                                isLoading ? 'loading' :
                                    data?.body.map((cate, index) => {

                                        return <div className={`w-[100%]  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 `} key={index}>

                                            <p className="text-lg font-medium text-gray-900 dark:text-white">{cate?.cateName}</p>
                                            <Link to={'/manage/update-category/' + cate._id}>
                                                <div >
                                                    <Image src={cate.image.url}></Image>
                                                </div>
                                            </Link>
                                            <div className="flex justify-end ">
                                                <Link to={'/manage/update-category/' + cate._id}>
                                                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Chỉnh sửa</button>
                                                </Link>

                                                <Popconfirm
                                                    className={`bg-green-700`}
                                                    description="Bạn chắc chắn muốn xóa danh mục chứ?"
                                                    okText="Đồng ý"
                                                    cancelText="Hủy bỏ"
                                                    title="Bạn có muốn xóa?"
                                                    onConfirm={() => handleDelete(cate._id)}>
                                                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Xóa</button>
                                                </Popconfirm>
                                            </div>

                                        </div>


                                    })
                            }


                            
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default CategoryAdmin