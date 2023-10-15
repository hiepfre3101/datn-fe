import { useState } from 'react';
import { Popconfirm, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import PencilIcon from '../Icons/PencilIcon';
import EraserIcon from '../Icons/EraserIcon';
type Props = {
   linkToUpdate: string;
   getResultConfirm: (result: boolean) => boolean;
};

const ActionTable = ({ linkToUpdate, getResultConfirm }: Props) => {
   const [open, setOpen] = useState(false);
   return (
      <div className='flex justify-start items-center gap-3'>
         <Tooltip title='Sửa sản phẩm' placement='bottom'>
            <Link to={linkToUpdate}>
               <button className='p-2 rounded-full bg-white w-10 h-10 shadow-md hover:w-11 hover:h-11 duration-100 '>
                  <PencilIcon className='text-greenPrimary w-4' />
               </button>
            </Link>
         </Tooltip>{' '}
         <Tooltip title='Xóa sản phẩm' placement='bottom'>
            <Popconfirm
               open={open}
               title='Bạn có chắc chắn xóa không ?'
               onCancel={() => setOpen(false)}
               onConfirm={() => {
                  getResultConfirm(true);
                  setOpen(false);
               }}
            >
               <button
                  className='p-2 rounded-full bg-white w-10 h-10 shadow-md hover:w-11 hover:h-11 duration-100 '
                  onClick={() => setOpen(true)}
               >
                  <EraserIcon className='text-greenPrimary w-4' />
               </button>
            </Popconfirm>
         </Tooltip>
      </div>
   );
};

export default ActionTable;
