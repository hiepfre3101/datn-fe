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
   isSale: boolean;

}

export type InputProduct = Omit<IProduct, '_id' | 'createAt' | 'commentId' | 'shipments'>;

export interface IProductExpanded extends IProduct {
   categoryId: {
      cateName: string;
      _id: string;
   };
   originId: {
      _id: string;
      name: string;
   };
}
export interface IDescProp {
   desc: string | undefined;
   originName: string;
}
export interface IProductInfoProp {
   product_info: IProductExpanded | undefined;
}
export interface IObjIdForGetRelatedProducts {
   idCategory: string | undefined;
   idProduct: string | undefined;
}


export interface InputSaleProduct {
   productId: string;
   shipmentId: string;
   productName: string;
   discount: number;
}

