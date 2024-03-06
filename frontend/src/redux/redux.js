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
import {authUserReducer} from './tokenSlice.js';
import { changePostReducer } from './changePost';
import {changeCommentReducer} from './changeComment';
import { changeFollowReducer } from './changeFollow.js';



export const authPersistConfig = {
  key: "authUser",
  storage: storage,
  whitelist: ["token", "user"],
};

export const store = configureStore({
  reducer: {
   authUser:  persistReducer(authPersistConfig, authUserReducer),
   changePost: changePostReducer, 
   changeComment: changeCommentReducer,
   changeFollow: changeFollowReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);