import { IProduct } from './product';

export interface IShipmentOfProduct {
   idShipment: string;
   weight: number;
   date: string;
   isDisabled: boolean;
}

export type ProductInShipmentExpand = {
   idProduct: IProduct;
   date: string;
   weight: number;
   price: number;
   originPrice: number;
   origin: string;
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
   date: string;
   weight: number;
   price: number;
   originPrice: number;
   origin: string;
};

export type InputShipment = {
   products: ProductInput[];
   totalMoney: number;
};
