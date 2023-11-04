export interface IImage {
   url: string;
   public_id: string;
}


export interface IImageResponse {
   body:{
      data: IImage[] | undefined;
   } 
}
