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
   items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [],
   totalQuantity: 0,
   totalPrice: localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')!).reduce(
           (accumulator: any, product: any) => accumulator + product.price * product.quantity,
           0
        )
      : 0
};
const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action) => {
         state.items = [...action.payload];
         state.totalPrice = action.payload.reduce(
            (accumulator: any, product: any) => accumulator + product.price * product.quantity,
            0
         );
         localStorage.setItem('cart', JSON.stringify([...action.payload]));
      },
      removeFromCart: (state, action) => {
         const nextCartItems = state.items.filter((cartItem: any) => cartItem._id !== action.payload.id);
         state.totalPrice = nextCartItems.reduce(
            (accumulator, product) => accumulator + product.price * product.quantity,
            0
         );
         state.items = nextCartItems;
         localStorage.setItem('cart', JSON.stringify(state.items));
      },
      removeAllProductFromCart: (state) => {
         state.items = [];
         state.totalPrice = 0;
         localStorage.setItem('cart', JSON.stringify(state.items));
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
         localStorage.setItem('cart', JSON.stringify(nextCartItems));
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
