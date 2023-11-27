export interface IEvaluation {
   
    productId: string;
    content?: string;
    imgUrl?: string;
    rate: number;
    orderId: string | null;
    phoneNumber?: string;
    userName?: string 
    userId? : string | null
}

export interface IEvaluationFull {
    _id:string;
    userId : {
        userName: string
    } | null;
    productId: string;
    content: string;
    imgUrl: string;
    rate: number;
    orderId: string | null;
    isReviewVisible: boolean;
    phoneNumber: string;
    userName: string;
    createdAt: string 
}