import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-redux';

export const store = configureStore({
  reducer: {auth: authSlice},
});

export type RootState = ReturnType<typeof store.getState>;
