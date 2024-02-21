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
import {authUserReducer} from './userAuth.js';
import { changePostReducer } from './changePost';
import storageSession from 'redux-persist/lib/storage/session';

const rememberMe = localStorage.getItem('rememberMe') === 'true'

const authPersistConfig = {
  key: "authUser",
  storage: rememberMe ? storage : storageSession,
  whitelist: ["token", "user"],
};

const userPersistConfig = {
  key: "user",
  storage: storage, // всегда используем localStorage для user
  whitelist: ["user"],
};

export const store = configureStore({
  reducer: {
   authUser:  persistReducer(authPersistConfig, authUserReducer),
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