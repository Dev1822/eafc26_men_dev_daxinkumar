import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dataReducer from './slices/dataSlice';
// import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    // ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
