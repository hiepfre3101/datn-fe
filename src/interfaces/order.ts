
export interface IOrderDetailProps{
   setState: (state: string) => void;
}
export interface IProductOrder{
   _id: string;
   images: string;
   name: string;
   weight: number;
   price:number;
}
export interface IOrder{
   customerName:string;
   phoneNumber:number;
   shippingAddress:string;
   email:string;
   totalPayment:number;
   products:IProductOrder[];
   note:string|undefined
   userId:string|undefined
}