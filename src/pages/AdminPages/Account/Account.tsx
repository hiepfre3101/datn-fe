import { Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetAllQuery, useUpdateUserMutation } from '../../../services/user.service';


const Account = () => {
    const { data, refetch} = useGetAllQuery({});
    
    const [update] = useUpdateUserMutation();
    const onHandleUpdate = async (item: any) => { 
        
       await update({id: item._id,data:{userName:item.userName,email:item.email,state:!item.state}});
       refetch()
    };

    return (
        <>

            <Layout style={{ minHeight: '100vh', display: 'flex', position: 'relative', width: '100%' }}>
                <div className='flex-1 flex justify-center items-center flex-col mt-10 w-[100%]'>
                    <div className='flex justify-between items-center w-[90%]'>
                        <h1 className='text-3xl font-semibold text-[rgba(0,0,0,0.7)]'>Tài khoản</h1>
                        
                    </div>

                    <div className='w-[90%] min-h-[100vh] bg-white rounded-lg mt-5'>
                        <header className='flex justify-start gap-4 items-center px-5 py-5'>
                            <div className='flex justify-between items-center max-w-[50%] gap-2 rounded-[100px] border-[1px] border-[#80b235] p-2'>
                                <SearchOutlined style={{ fontSize: '1rem', color: '#80b235' }} />
                                <input
                                    type='text'
                                    className='text-sm outline-none border-none w-full flex-1'
                                    placeholder='Tìm kiếm tài khoản'
                                />
                            </div>
                        </header>

                        <div className='flex-wrap' style={{ margin: 30 }}>

                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                    <tr>
                                                     
                                                        <th scope="col" className="px-6 py-4">Tên</th>
                                                        <th scope="col" className="px-6 py-4">Ảnh</th>
                                                        <th scope="col" className="px-6 py-4">email</th>
                                                        <th scope="col" className="px-6 py-4">Vai trò</th>
                                                        <th scope="col" className="px-6 py-4">Số điện thoại</th>
                                                        <th scope="col" className="px-6 py-4">Địa chỉ</th>
                                                        <th scope="col" className="px-6 py-4">Action</th> 

                                                    </tr>
                                                </thead>    
                                                <tbody>
                                                    {data?.body?.data?.docs.map((item: any) => (
                                                        <tr className="border-b dark:border-neutral-500">
                                                     
                                                            <td className="whitespace-nowrap px-6 py-4">{item?.userName}</td>
                                                            <td className="block whitespace-nowrap px-6 py-4 w-[150px]"><img className='w-[200px] h-[100px] items-center text-center' src={item.avatar} alt='' /></td>
                                                            <td className="whitespace-nowrap px-6 py-4">{item?.email}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{item?.role}</td>
                                                            <td className="whitespace-nowrap px-6 py-4">{item?.phoneNumber}</td>
                                                            <td className=" px-6 py-4"><p className='w-[100px] break-all'>{item?.address}</p></td>

                                                            <td className="whitespace-nowrap px-6 py-4">
                                                              {item.role !="admin"? item.state?(
                                                                <button
                                                                        type="button"
                                                                        className="inline-block rounded bg-red-500 px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                                                                        onClick={() => onHandleUpdate(item)}>
                                                                        Vô hiệu hóa
                                                                    </button>
                                                              ):(
                                                                <button
                                                                        type="button"
                                                                        className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                                                                        onClick={() => onHandleUpdate(item)}>
                                                                        Kích hoạt
                                                                    </button>
                                                              ):<></>}
                                                                    
                                                                     
                                                                  
                                                                
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Account