export interface IProduct {
   _id: string;
   productName: string;
   price: number;
   categoryId:
      | string
      | {
           cateName: string;
           _id: string;
        };
   brandId:
      | string
      | {
           _id: string;
           brandName: string;
           image: string;
        };
   subCateId: string | { subCateName: string };
   commentId: string;
   desc: string;
   unit: string;
   discount: number;
   amount: number;
   images: string[];
   createAt: string;
}

export type InputProduct = Omit<IProduct, '_id' | 'createAt'|'commentId'>;

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


