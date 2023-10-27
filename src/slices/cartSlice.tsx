import { createSlice } from '@reduxjs/toolkit';
export type ICartSlice = {
   name: string;
   email: string;
   address: string;
   phoneNumber: string;
   items: any[];
   totalQuantity: number;
   totalPrice: number;
};
const initialState: ICartSlice = {
   name: '',
   email: '',
   address: '',
   phoneNumber: '',
   items: [],
   totalQuantity: 0,
   totalPrice: 0
};
const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action) => {
         const value = action.payload.data;
         let isItemExist = false;
         const items = state.items.map((item: any) => {
            if (item?._id === value._id) {
               isItemExist = true;
               item.quantity += value.quantity;
            }
            return item;
         });
         if (isItemExist) {
            state.items = items;
            state.totalPrice += items.reduce(
               (accumulator: any, product: any) => accumulator + product.price * product.quantity,
               0
            );
            localStorage.setItem(action.payload?.email || 'cart', JSON.stringify([...items]));
         } else {
            state.items = [...state.items, value];
            state.totalPrice = [...state.items, value].reduce(
               (accumulator: any, product: any) => accumulator + product.price * product.quantity,
               0
            );
            localStorage.setItem(action.payload?.email || 'cart', JSON.stringify([...state.items, value]));
         }
      },
      removeFromCart: (state, action) => {
         const nextCartItems = state.items.filter((cartItem: any) => cartItem._id !== action.payload.id);
         state.totalPrice = nextCartItems.reduce(
            (accumulator, product) => accumulator + product.price * product.quantity,
            0
         );
         state.items = nextCartItems;
         localStorage.setItem(action.payload?.email || 'cart', JSON.stringify(state.items));
      },
      removeAllProductFromCart: (state, action) => {
         state.items = [];
         state.totalPrice = 0;
         localStorage.setItem(action.payload?.email || 'cart', JSON.stringify(state.items));
      },
      updateItem: (state, action) => {
         const nextCartItems = state.items.map((cartItem: any) => {
            if (cartItem._id === action.payload.id) {
               if (action.payload.quantity !== 0) {
                  return {
                     ...cartItem,
                     quantity: action.payload.quantity
                  };
               }
            }
            return cartItem;
         });
         localStorage.setItem(action.payload?.email || 'cart', JSON.stringify(nextCartItems));
         state.totalPrice = nextCartItems.reduce(
            (accumulator, product) => accumulator + product.price * product.quantity,
            0
         );
         state.items = nextCartItems;
      }
   }
});
export const { addItem, removeFromCart, updateItem, removeAllProductFromCart } = cartSlice.actions;
export default cartSlice;
