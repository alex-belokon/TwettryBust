import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import userSlice from './slice';
import {authUserReducer} from './userAuth.js';
import {userRegistrationReducer} from './slice.js';
import { changePostReducer } from './changePost';

const authPersistConfig = {
  key: "authUser",
  storage,
  whitelist: ["token", "user"],
};

const regPersistConfig = {
  key: "userRegistration",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
   authUser:  persistReducer(authPersistConfig, authUserReducer),
   userRegistration: persistReducer(regPersistConfig, userRegistrationReducer),
   changePost: changePostReducer, 
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);