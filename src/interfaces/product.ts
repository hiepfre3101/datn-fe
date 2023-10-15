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
   images: string[];
   createAt: string;
   shipments: { idShipment: string; quatity: number; date: string; price: number }[];
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
