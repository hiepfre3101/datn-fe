import React from 'react';
import { IShipmentFull } from '../../../../interfaces/shipment';
import { Collapse, CollapsePanelProps, CollapseProps } from 'antd';

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
               <span>Ngày hết hạn: </span> {product.date}
            </p>
            <p>
               <span>Số lượng còn lại: </span>
               {product.weight} kg
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
