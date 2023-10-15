import { ISubCategories } from './fakeSubCategories';

export interface ICategories {
   id: string;
   cateName: string;
   subCategories: ISubCategories[];
   image: string;
}
