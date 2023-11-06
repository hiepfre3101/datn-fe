import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
export type ICartSlice = {
   customerName: string;
   email: string;
   shippingAddress: string;
   phoneNumber: string;
   items: ICartItems[];
   totalPrice: number;
   cartName: string;
};
export interface ICartItems {
   _id: string;
   name: string;
   images: string;
   price: number;
   weight: number;
   totalWeight: number;
}
const initialState: ICartSlice = {
   customerName: '',
   email: '',
   shippingAddress: '',
   phoneNumber: '',
   items: [],
   totalPrice: 0,
   cartName: 'cart'
};
const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      setCartName: (state, action) => {
         state.cartName = action.payload || 'cart';
      },
      setItem: (state) => {
         if (!localStorage.getItem(state.cartName)) {
            localStorage.setItem(state.cartName, '[]');
         }
         const products = localStorage.getItem(state.cartName) ? JSON.parse(localStorage.getItem(state.cartName)!) : [];
         state.items = products;
         state.totalPrice = products.reduce(
            (accumulator: any, product: any) => accumulator + product.price * product.weight,
            0
         );
      },
      updatePrice: (state, action) => {
         const value = action.payload;

         state.items.find((item: any) => {
            if (item?._id === value._id) {
               item.price = value.price;
            }
         });
         localStorage.setItem(state.cartName, JSON.stringify(state.items));
         state.totalPrice = state.items.reduce(
            (accumulator: any, product: any) => accumulator + product.price * product.weight,
            0
         );
      },
      addItem: (state, action) => {
         const value = action.payload;
         let isItemExist = false;
         let error = false;
         if (value.weight > value.totalWeight) {
            message.error('Số lượng đã quá số lượng hiện có');
            error = true;
         }
         const products = state.items.map((item: any) => {
            if (item?._id === value._id) {
               isItemExist = true;
               if (item.weight + value.weight <= value.totalWeight) {
                  item.weight += value.weight;
               } else {
                  message.error('Số lượng đã quá số lượng hiện có');
                  error = true;
               }
            }
            return item;
         });
         if (isItemExist && !error) {
            state.totalPrice = products.reduce(
               (accumulator: any, product: any) => accumulator + product.price * product.weight,
               0
            );

            localStorage.setItem(state.cartName, JSON.stringify([...products]));
            state.items = products;
            message.success('thêm sản phẩm vào giỏ hàng thành công');
         } else if (!isItemExist && !error) {
            state.totalPrice = [...state.items, value].reduce(
               (accumulator: any, product: any) => accumulator + product.price * product.weight,
               0
            );
            localStorage.setItem(state.cartName, JSON.stringify([...state.items, value]));
            state.items = [...state.items, value];
            message.success('thêm sản phẩm vào giỏ hàng thành công');
         }
      },
      removeFromCart: (state, action) => {
         const nextCartproducts = state.items.filter((cartItem: any) => cartItem._id !== action.payload.id);
         state.totalPrice = nextCartproducts.reduce(
            (accumulator, product) => accumulator + product.price * product.weight,
            0
         );
         state.items = nextCartproducts;
         message.success('Xóa sản phẩm khỏi giỏ hàng thành công');
         localStorage.setItem(state.cartName, JSON.stringify(state.items));
      },
      removeAllProductFromCart: (state) => {
         state.items = [];
         state.totalPrice = 0;
         message.success('Xóa toàn bộ sản phẩm khỏi giỏ hàng thành công');
         localStorage.setItem(state.cartName, JSON.stringify(state.items));
      },
      updateItem: (state, action) => {
         console.log(action.payload);

         const nextCartproducts = state.items.map((cartItem: any) => {
            if (cartItem._id === action.payload.id) {
               if (action.payload.weight >= 0) {
                  return {
                     ...cartItem,
                     weight: action.payload.weight
                  };
               }
            }
            return cartItem;
         });
         localStorage.setItem(state.cartName, JSON.stringify(nextCartproducts));
         state.totalPrice = nextCartproducts.reduce(
            (accumulator, product) => accumulator + product.price * product.weight,
            0
         );
         state.items = nextCartproducts;
         message.success('Cập nhật sản phẩm thành công');
      }
   }
});
export const { addItem, updatePrice, removeFromCart, updateItem, removeAllProductFromCart, setItem, setCartName } =
   cartSlice.actions;
export default cartSlice;
