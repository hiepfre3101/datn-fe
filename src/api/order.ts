import { AxiosResponse } from 'axios';
import instance from './instance';
import { IResponse } from '../interfaces/base';
import { IOder } from '../interfaces/order';

export const getDetailOrder = (id: string): Promise<AxiosResponse<IResponse<IOder>>> => {
   return instance.get('orders/' + id);
};
