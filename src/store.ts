import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/auth.service';
import categoryReducer from './services/cate.service';
import productReducer from './services/product.service';
import orderReducer from './services/order.service';
import shipmentReducer from './services/shipment.service';
import userSlice from './services/user.service';
import cartReducer from './slices/cartSlice';
import orderFiltersReducer from './slices/orderFiltersSlice';
import whishListReducer from './slices/whishListSlice';
import userReducer from './slices/authSlice';
import productSlice from './slices/productSlice';
export const store = configureStore({
   reducer: {
      [authReducer.reducerPath]: authReducer.reducer,
      [categoryReducer.reducerPath]: categoryReducer.reducer,
      [productReducer.reducerPath]: productReducer.reducer,
      [orderReducer.reducerPath]: orderReducer.reducer,
      [userSlice.reducerPath]: userSlice.reducer,
      cart: cartReducer.reducer,
      orderFilters: orderFiltersReducer.reducer,
      whishList: whishListReducer.reducer,
      userReducer: userReducer,
      [shipmentReducer.reducerPath]: shipmentReducer.reducer,
      productSlice: productSlice
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
         authReducer.middleware,
         categoryReducer.middleware,
         productReducer.middleware,
         orderReducer.middleware,
         userSlice.middleware,
         shipmentReducer.middleware
      ])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
