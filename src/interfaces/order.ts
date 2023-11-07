export interface IOrderDetailProps {
   setState: (state: string) => void;
}
export interface IProductOrder {
   _id: string;
   images: string;
   name: string;
   weight: number;
   price: number;
}
export interface IOrder {
   customerName: string;
   phoneNumber: number;
   shippingAddress: string;
   email: string;
   totalPayment: number;
   products: IProductOrder[];
   note: string | undefined;
   userId: string | undefined;
}

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
   invoiceId: string;
};
