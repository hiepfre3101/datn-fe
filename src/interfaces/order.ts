import { IProductInOrder } from './product';

export type IOder = {
   _id: string;
   userId: string | null;
   products: IProductInOrder[];
   totalPayment: number;
   customerName: string;
   phoneNumber: string;
   email: string;
   note: string;
   shippingAddress: string;
   receivedDate: null;
   pay: boolean;
   status: string;
   createdAt: string;
};
