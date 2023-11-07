import { AxiosResponse } from 'axios';
import instance from './instance';
import { IResponse } from '../interfaces/base';
import { IOder } from '../interfaces/order';

export const getDetailOrder = (id: string): Promise<AxiosResponse<IResponse<IOder>>> => {
   return instance.get('orders/' + id);
};
export const getOrder = (): Promise<AxiosResponse<IResponse<IOder[]>>> => {
   return instance.get('orders');
};

export const getOrderForMember = (): Promise<AxiosResponse<IResponse<IOder[]>>> => {
   return instance.get('/orders-member', {
      withCredentials: true
   });
};

export const getOrderForGuest = (invoiceId: string): Promise<AxiosResponse<IResponse<IOder[]>>> => {
   return instance.post('/orders-guest', { invoiceId });
};
