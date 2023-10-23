import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
   name: 'cart',
   initialState: {
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      items: [],
      totalQuantity: 0,
      totalPrice: 0
   },
   reducers: {
      addItem: (state, action) => {
         state.items = action.payload;
      }
   }
});
export default cartSlice;
