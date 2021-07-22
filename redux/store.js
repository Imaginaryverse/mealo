import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import userReducer from './slices/userSlice';

// create store
export const userStore = createStore(userReducer);

/* export const userStore = createStore({
  reducer: {
    user: userReducer,
  },
}); */
