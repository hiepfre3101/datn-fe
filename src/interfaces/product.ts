import { IShipmentOfProduct } from './shipment';

export interface IProduct {
   _id: string;
   productName: string;
   categoryId:
      | string
      | {
           cateName: string;
           _id: string;
        };
   commentId: string;
   desc: string;
   discount: number;
   images: { url: string; public_id: string }[];
   createdAt: string;
   shipments: IShipmentOfProduct[];
   price: number;
   originId:
      | string
      | {
           name: string;
           _id: string;
        };
}

export type InputProduct = Omit<IProduct, '_id' | 'createAt' | 'commentId' | 'shipments'>;

export interface IProductExpanded extends IProduct {
   categoryId: {
      cateName: string;
      _id: string;
   };
   originId: {
      name: string;
      _id: string;
   };
}
export interface IDescProp {
   desc: string | undefined;
}
export interface IProductInfoProp {
   product_info: IProductExpanded | undefined;
}
export interface IObjIdForGetRelatedProducts {
   idCategory: string | undefined;
   idProduct: string | undefined;
}
