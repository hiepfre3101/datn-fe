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
   createAt: string;
   shipments: IShipmentOfProduct[];
}

export type InputProduct = Omit<IProduct, '_id' | 'createAt' | 'commentId' | 'shipments'>;

export interface IProductExpanded extends IProduct {
   categoryId: {
      cateName: string;
      _id: string;
   };
   brandId: {
      _id: string;
      brandName: string;
      image: string;
   };
   subCateId: {
      subCateName: string;
   };
}
