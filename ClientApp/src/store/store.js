import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Auth/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,

  },
});
