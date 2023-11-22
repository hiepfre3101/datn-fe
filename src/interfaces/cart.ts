import { IProductExpanded } from "./product";

export interface ICartDataBase{
    productId:IProductExpanded,
    weight:number,
    _id:string
}