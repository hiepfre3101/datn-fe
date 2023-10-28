import { IProductExpanded } from '../interfaces/product';
import { IResponseHasPaginate } from '../interfaces/base';
import { IUser } from '../interfaces/auth';
type DataType = {
   key: string;
   _id?: string;
};
type ProductDataType = DataType & {
   image: string;
   productName: string;
   category: string;
   price: number;
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

export const productData = (data: IResponseHasPaginate<IProductExpanded>): ProductDataType[] => {
   return data.body.data.map((product, index) => ({
      key: index.toString(),
      _id: product._id,
      productName: product.productName,
      category: product.categoryId.cateName,
      image: product.images[0].url,
      price: product.shipments[0]?.price || 0
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
