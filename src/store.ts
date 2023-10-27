import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/auth.service';
import categoryReducer from './services/cate.service';
import productReducer from './services/product.service';
import shipmentReducer from './services/shipment.service';
import userSlice from './services/user.service';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/authSlice';
export const store = configureStore({
   reducer: {
      [authReducer.reducerPath]: authReducer.reducer,
      [categoryReducer.reducerPath]: categoryReducer.reducer,
      [productReducer.reducerPath]: productReducer.reducer,
      [userSlice.reducerPath]: userSlice.reducer,
      cart: cartReducer.reducer,
      userReducer: userReducer,
      [shipmentReducer.reducerPath]: shipmentReducer.reducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
         authReducer.middleware,
         categoryReducer.middleware,
         productReducer.middleware,
         userSlice.middleware,
         shipmentReducer.middleware
      ])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
