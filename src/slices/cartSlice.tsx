import { createSlice } from '@reduxjs/toolkit';
export type ICartSlice = {
   name: string;
   email: string;
   address: string;
   phoneNumber: string;
   items: any[];
   totalPrice: number;
   cartName: string;
};
const initialState: ICartSlice = {
   name: '',
   email: '',
   address: '',
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
         const items = localStorage.getItem(state.cartName) ? JSON.parse(localStorage.getItem(state.cartName)!) : [];
         state.items = items;
         state.totalPrice = items.reduce(
            (accumulator: any, product: any) => accumulator + product.price * product.size,
            0
         );
      },
      addItem: (state, action) => {
         const value = action.payload;
         let isItemExist = false;
         const items = state.items.map((item: any) => {
            if (item?._id === value._id) {
               isItemExist = true;

               item.size += value.size;
            }
            return item;
         });
         if (isItemExist) {
            state.totalPrice += items.reduce(
               (accumulator: any, product: any) => accumulator + product.price * product.size,
               0
            );

            localStorage.setItem(state.cartName, JSON.stringify([...items]));
            state.items = items;
         } else {
            state.totalPrice = [...state.items, value].reduce(
               (accumulator: any, product: any) => accumulator + product.price * product.size,
               0
            );
            localStorage.setItem(state.cartName, JSON.stringify([...state.items, value]));
            state.items = [...state.items, value];
         }
      },
      removeFromCart: (state, action) => {
         const nextCartItems = state.items.filter((cartItem: any) => cartItem._id !== action.payload.id);
         state.totalPrice = nextCartItems.reduce(
            (accumulator, product) => accumulator + product.price * product.size,
            0
         );
         state.items = nextCartItems;
         localStorage.setItem(state.cartName, JSON.stringify(state.items));
      },
      removeAllProductFromCart: (state) => {
         state.items = [];
         state.totalPrice = 0;
         localStorage.setItem(state.cartName, JSON.stringify(state.items));
      },
      updateItem: (state, action) => {
         console.log(action.payload);

         const nextCartItems = state.items.map((cartItem: any) => {
            if (cartItem._id === action.payload.id) {
               if (action.payload.size !== 0) {
                  return {
                     ...cartItem,
                     size: action.payload.size
                  };
               }
            }
            return cartItem;
         });
         localStorage.setItem(state.cartName, JSON.stringify(nextCartItems));
         state.totalPrice = nextCartItems.reduce(
            (accumulator, product) => accumulator + product.price * product.size,
            0
         );
         state.items = nextCartItems;
      }
   }
});
export const { addItem, removeFromCart, updateItem, removeAllProductFromCart, setItem, setCartName } =
   cartSlice.actions;
export default cartSlice;
