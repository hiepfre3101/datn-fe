import { Dayjs } from 'dayjs';
import { IProduct } from './product';

export interface IShipmentOfProduct {
   idShipment: string;
   weight: number;
   date: string;
   isDisabled: boolean;
   price: number;
}

export type ProductInShipmentExpand = {
   idProduct: IProduct;
   date: string;
   weight: number;
   price: number;
   originPrice: number;
   origin: string;
   originWeight: number;
};
export interface IShipmentFull {
   _id: string;
   weight: number;
   createdAt: string;
   products: ProductInShipmentExpand[];
   isDisabled: boolean;
   totalMoney: number;
}

export type ProductInput = {
   idProduct: string;
   date: string | Dayjs;
   weight: number | string;
   price: number | string;
   originPrice: number | string;
};

export type InputShipment = {
   products: ProductInput[];
   totalMoney: number;
};
