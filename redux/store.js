import { createStore } from 'redux';
import userReducer from './slices/userSlice';

export const userStore = createStore(userReducer);
