import { Badge, DescriptionsProps } from 'antd';
import { IShipmentOfProduct } from '../interfaces/shipment';

export const getShipmentData = (data: IShipmentOfProduct): DescriptionsProps['items'] => {
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
               status={data.isDisable ? 'error' : 'success'}
               text={data.isDisable ? 'Vô hiệu hóa (Sản phẩm sẽ không được hiển thị tại trang bán hàng !)' : 'Sử dụng'}
            />
         ),
         span: 5
      }
   ];
};
