import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
   status: '',
   day: '',
   invoiceId: ''
};

const orderFiltersSlice = createSlice({
   name: 'orderFilters',
   initialState,
   reducers: {
      updateStatusFilter: (state, action: PayloadAction<string>) => {
         state.status = action.payload;
      },
      updateDayFilter: (state, action: PayloadAction<string>) => {
         state.day = action.payload;
      },
      updateInvoiceIdFilter: (state, action: PayloadAction<string>) => {
         state.invoiceId = action.payload;
      }
   }
});

export const { updateStatusFilter, updateDayFilter, updateInvoiceIdFilter } = orderFiltersSlice.actions;

export default orderFiltersSlice;
