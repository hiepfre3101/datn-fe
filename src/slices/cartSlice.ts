import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
export type ICartSlice = {
   customerName: string;
   email: string;
   shippingAddress: string;
   phoneNumber: string;
   products: any[];
   totalPayment: number;
   cartName: string;
};
const initialState: ICartSlice = {
   customerName: '',
   email: '',
   shippingAddress: '',
   phoneNumber: '',
   products: [],
   totalPayment: 0,
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
         state.products = products;
         state.totalPayment = products.reduce(
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
         const products = state.products.map((item: any) => {
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
            state.totalPayment += products.reduce(
               (accumulator: any, product: any) => accumulator + product.price * product.weight,
               0
            );

            localStorage.setItem(state.cartName, JSON.stringify([...products]));
            state.products = products;
            message.success('thêm sản phẩm vào giỏ hàng thành công');
         } else if (!isItemExist && !error) {
            state.totalPayment = [...state.products, value].reduce(
               (accumulator: any, product: any) => accumulator + product.price * product.weight,
               0
            );
            localStorage.setItem(state.cartName, JSON.stringify([...state.products, value]));
            state.products = [...state.products, value];
            message.success('thêm sản phẩm vào giỏ hàng thành công');
         }
      },
      removeFromCart: (state, action) => {
         const nextCartproducts = state.products.filter((cartItem: any) => cartItem._id !== action.payload.id);
         state.totalPayment = nextCartproducts.reduce(
            (accumulator, product) => accumulator + product.price * product.weight,
            0
         );
         state.products = nextCartproducts;
         message.success('Xóa sản phẩm khỏi giỏ hàng thành công');
         localStorage.setItem(state.cartName, JSON.stringify(state.products));
      },
      removeAllProductFromCart: (state) => {
         state.products = [];
         state.totalPayment = 0;
         message.success('Xóa toàn bộ sản phẩm khỏi giỏ hàng thành công');
         localStorage.setItem(state.cartName, JSON.stringify(state.products));
      },
      updateItem: (state, action) => {
         console.log(action.payload);

         const nextCartproducts = state.products.map((cartItem: any) => {
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
         state.totalPayment = nextCartproducts.reduce(
            (accumulator, product) => accumulator + product.price * product.weight,
            0
         );
         state.products = nextCartproducts;
         message.success('Cập nhật sản phẩm thành công');
      }
   }
});
export const { addItem, removeFromCart, updateItem, removeAllProductFromCart, setItem, setCartName } =
   cartSlice.actions;
export default cartSlice;
