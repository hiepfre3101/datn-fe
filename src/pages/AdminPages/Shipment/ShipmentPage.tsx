import { Card, Dropdown } from 'antd';
import { useGetAllShipmentExpandQuery } from '../../../services/shipment.service';
import { formatStringToDate } from '../../../helper';
import ShipmentItem from './components/ShipmentItem';
import ThreeDotsIcon from '../../../components/Icons/ThreeDots';
import { Link } from 'react-router-dom';
import PencilIcon from '../../../components/Icons/PencilIcon';
import EraserIcon from '../../../components/Icons/EraserIcon';

const ShipmentPage = () => {
   const { data } = useGetAllShipmentExpandQuery({});
   return (
      <div className='w-full px-10'>
         <div className='grid md:grid-cols-4 lg:grid-cols-3 gap-4 grid-cols-3'>
            {data?.body.data.map((shipment) => (
               <Card
                  title={
                     <div className='flex justify-between items-center'>
                        <span>Lô hàng ngày {formatStringToDate(shipment.createdAt)} </span>
                        <Dropdown
                           trigger={['click']}
                           placement='topRight'
                           dropdownRender={() => (
                              <div className='flex flex-col items-start bg-white rounded-sm p-3 border-[1px] border-[rgba(0,0,0,0.1)]'>
                                 <Link
                                    to={`/manage/shipments/${shipment._id}`}
                                    className='text-slate-500 flex justify-between gap-2'
                                 >
                                    <PencilIcon />
                                    <span>Chi tiết</span>
                                 </Link>
                                 <div className='text-slate-500 flex justify-between gap-2 cursor-pointer hover:text-red-400 duration-300'>
                                    <EraserIcon className='w-[15px]' />
                                    <span>Tạm dừng lô hàng</span>
                                 </div>
                              </div>
                           )}
                        >
                           <button className='w-[30px] h-[30px] duration-300 rounded-full hover:bg-greenbbf7d0 flex justify-center items-center '>
                              <ThreeDotsIcon className='fill-slate-300 hover:text-white' />
                           </button>
                        </Dropdown>
                     </div>
                  }
                  key={shipment._id}
               >
                  <ShipmentItem shipment={shipment} />
               </Card>
            ))}
         </div>
      </div>
   );
};

export default ShipmentPage;