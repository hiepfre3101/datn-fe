export interface IEvaluation {
    _id:string;
    userId : string;
    productId: string;
    content: string;
    imgUrl: string;
    star: number;
    orderId: string | null;
    isReviewVisible: boolean
}