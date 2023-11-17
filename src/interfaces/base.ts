/**
 * @type T : type of documents array in body response
 */
export interface IResponseHasPaginate<T> {
   body: {
      data: T[];
      pagination: {
         currentPage: number;
         totalPages: number;
         totalItems: number;
      };
      maxPrice?: number;
      minPrice?: number;
   };
   message: string;
   status: number;
}

export interface IResponse<T> {
   body: {
      data: T;
   };
   message: string;
   status: number;
}

export interface IQueryParam {
   sort: string;
   order: 'asc' | 'desc';
   limit: number;
   page: number;
   minPrice: number;
   maxPrice: number;
   expand: boolean;
   q: string;
   categoryId: string|null;
   originId:string;
   brand: string;
   subCate: string;
}
