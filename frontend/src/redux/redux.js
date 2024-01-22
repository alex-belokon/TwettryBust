import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice';
import {authUserReducer} from './userAuth.js';

const store = configureStore({
  reducer: {
    user: userSlice,
    authUser: authUserReducer,
  },
});

export default store;