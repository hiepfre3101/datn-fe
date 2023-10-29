import { IShipmentFull } from '../../../../interfaces/shipment';
import { Collapse, CollapseProps } from 'antd';

type Props = {
   shipment: IShipmentFull;
};

const ShipmentItem = ({ shipment }: Props) => {
   const items: CollapseProps['items'] = shipment?.products.map((product) => ({
      key: product.idProduct._id,
      label: product.idProduct.productName,
      children: (
         <div className='flex flex-col gap-3'>
            <p>
               <strong className='underline mr-3'>Ngày hết hạn: </strong> {product.date}
            </p>
            <p>
               <strong className='underline mr-3'>Số lượng còn lại: </strong>
               {product.weight} kg
            </p>
            <p>
               <strong className='underline mr-3'>Khối lượng nhập: </strong>
               {product.originWeight} kg
            </p>
         </div>
      )
   }));
   return (
      <div className='w-full max-h-[300px] overflow-auto'>
         <Collapse items={items} bordered={false} />
      </div>
   );
};

export default ShipmentItem;
