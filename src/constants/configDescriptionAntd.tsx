import { Badge, DescriptionsProps } from 'antd';
import { IShipmentOfProduct } from '../interfaces/shipment';

export const getShipmentData = (data: IShipmentOfProduct, index: number): DescriptionsProps['items'] => {
   return [
      {
         key: '1',
         label: 'Mã lô hàng',
         children: data.idShipment,
         span: 5
      },
      {
         key: '2',
         label: 'Số lượng',
         children: data.weight + 'kg',
         span: 5
      },
      {
         key: '3',
         label: 'Hạn sử dụng',
         children: data.date,
         span: 5
      },
      {
         key: '4',
         label: 'Trạng thái',
         children: (
            <Badge
               status={index != 0 ? 'error' : 'success'}
               text={index != 0 ? 'Trong kho ' : 'Sử dụng'}
            />
         ),
         span: 5
      }
   ];
};
