import { IProductExpanded } from '../interfaces/product';
import { IResponseHasPaginate } from '../interfaces/base';
import { IUser } from '../interfaces/auth';
import { IOrderFull, IProductOrder } from '../interfaces/order';
import { formatStringToDate } from '../helper';
type DataType = {
   key: string;
   _id?: string;
};
type ProductDataType = DataType & {
   image: string;
   productName: string;
   category: string;
   price: number;
   stock:number,
   expDate:string
};

type UserDataType = DataType & {
   avatar?: string;
   userName?: string;
   email?: string;
   phoneNumber?: string;
   address?: string;
   role?: 'admin' | 'member';
   order?: string[];
   notifications?: string[];
   vouchers?: string[];
   state?: boolean;
};

type OrderDataType = DataType & {
   userId?: string | null;
   products?: IProductOrder[];
   totalPayment?: number;
   customerName?: string;
   phoneNumber?: string;
   email?: string;
   note?: string;
   shippingAddress?: string;
   receivedDate?: null;
   pay?: boolean;
   status?: string;
   createdAt?: string;
};

export const productData = (data: IResponseHasPaginate<IProductExpanded>): ProductDataType[] => {
   return data.body.data.map((product, index) => ({
      key: index.toString(),
      _id: product._id,
      productName: product.productName,
      category: product.categoryId.cateName,
      image: product.images[0].url,
      price: product.price || 0,
      stock: product.shipments[0]?.weight,
      expDate: formatStringToDate(product.shipments[0]?.date)
   }));
};

export const userData = (data: IResponseHasPaginate<IUser>): UserDataType[] => {
   return data.body.data.map((user, index) => ({
      key: index.toString(),
      _id: user._id,
      userName: user.userName,
      avatar: user.avatar,
      address: user.address,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      state: user.state,
      order: user.orders,
      notifications: user.notifications,
      vouchers: user.voucher
   }));
};

export const orderData = (data: IResponseHasPaginate<IOrderFull>): OrderDataType[] => {
   return data.body.data.map((order, index) => ({
      key: index.toString(),
      _id: order._id,
      userId: order.userId,
      products: order.products,
      totalPayment: order.totalPayment,
      customerName: order.customerName,
      phoneNumber: order.phoneNumber,
      email: order.email,
      note: order.note,
      shippingAddress: order.shippingAddress,
      receivedDate: order.receivedDate,
      pay: order.pay,
      status: order.status,
      createdAt: order.createdAt
   }));
};
