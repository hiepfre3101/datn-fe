import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
export type ICartSlice = {
   customerName: string;
   email: string;
   items: ICartItems[];
   whishListName: string;
};
export interface ICartItems {
   _id: string;
   name: string;
   images: string;
   price: number;
}
const initialState: ICartSlice = {
   customerName: '',
   email: '',
   items: [],
   whishListName: 'whishList'
};
const whishListSlice = createSlice({
   name: 'whishList',
   initialState,
   reducers: {
      setwhishListName: (state, action) => {
         state.whishListName = action.payload || 'whishList';
      },
      setwhishList: (state) => {
         if (!localStorage.getItem(state.whishListName)) {
            localStorage.setItem(state.whishListName, '[]');
         }
         const products = localStorage.getItem(state.whishListName)
            ? JSON.parse(localStorage.getItem(state.whishListName)!)
            : [];
         state.items = products;
      },
      addToWhishList: (state, action) => {
         const value = action.payload;
         let isAdded = false;
         const products = state.items.map((item: any) => {
            if (item?._id === value._id) {
               isAdded = true;
            }
            return item;
         });
         // Cập nhật biến isAdded
         for (const product of products) {
            if (product?._id === value._id) {
               isAdded = true;
               break;
            }
         }

         if (isAdded) {
            // Sản phẩm đã có trong whishList, xóa sản phẩm khỏi whishList
            const newProducts = products.filter((product: any) => product?._id !== value._id);
            localStorage.setItem(state.whishListName, JSON.stringify(newProducts));
            state.items = newProducts;
            message.success('xóa sản phẩm yêu thích thành công');
         } else {
            // Sản phẩm chưa có trong whishList, thêm sản phẩm vào whishList
            localStorage.setItem(state.whishListName, JSON.stringify([...state.items, value]));
            state.items = [...state.items, value];
            message.success('thêm sản phẩm vào sản phẩm yêu thích thành công');
         }
      }
   }
});
export const { addToWhishList, setwhishList, setwhishListName } = whishListSlice.actions;
export default whishListSlice;
