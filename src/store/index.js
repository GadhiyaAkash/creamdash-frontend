import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import userSlice from './userSlice';
import notificationSlice from './notificationSlice';

const store = configureStore({
  reducer: { 
    cart: cartSlice,
    user: userSlice,
    notification: notificationSlice,
  },
});

export default store;
