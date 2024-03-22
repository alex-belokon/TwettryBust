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
import storageSession from 'redux-persist/lib/storage/session';
import { notificationsReducer } from './notifications.js';
import { changeFollowReducer } from './changeFollow.js';
import { chatWebSocketReducer, stompClient } from './chatWebSocket.js';
import socketMiddleware from './socketMiddleware.js';

export const authPersistConfig = {
  key: "authUser",
  storage: storage,
  whitelist: ["token", "user"],
};

export const store = configureStore({
  reducer: {
   authUser:  persistReducer(authPersistConfig, authUserReducer),
   changePost: changePostReducer, 
   notifications: notificationsReducer,
   changePost: changePostReducer,
   changeComment: changeCommentReducer,
   changeFollow: changeFollowReducer,
   chatWebSocket: chatWebSocketReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const socket = socketMiddleware(stompClient);
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat((store) => (next) => (action) => {
      const { authUser, chatWebSocket } = store.getState();
      if (authUser.user.id && !chatWebSocket.isSocketInitialized) {
        socket(store)(next)(action);
      } else {
        next(action);
      }
    });
  },
});

export const persistor = persistStore(store);