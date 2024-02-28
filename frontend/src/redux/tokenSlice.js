// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { login } from "../redux/userAuth";

const persistedStateAuthUser = localStorage.getItem('persist:authUser');
const persistedStateAuthUserSession = sessionStorage.getItem('persist:authUser');
const persistedStateAuthUserJSON = persistedStateAuthUser ? JSON.parse(persistedStateAuthUser) : null;
const persistedStateAuthUserSessionJSON = persistedStateAuthUserSession ? JSON.parse(persistedStateAuthUserSession) : null;
const tokenAuthUser = persistedStateAuthUserJSON && persistedStateAuthUserJSON.token ? JSON.parse(persistedStateAuthUserJSON.token) : '';
const tokenAuthUserSession = persistedStateAuthUserSessionJSON && persistedStateAuthUserSessionJSON.token ? JSON.parse(persistedStateAuthUserSessionJSON.token) : '';

const token = tokenAuthUser || tokenAuthUserSession;
const isLoggedIn = token && token !== '' ? true : false;

const authSlice = createSlice({
    name: "authUser",
    initialState: {
      token: token,
      isLoggedIn: isLoggedIn,
    },
    reducers: {
      updateToken: (state, action) => {
        state.token = action.payload;
      },
      logOut: (state) => {
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('persist:authUser');
        localStorage.removeItem('rememberMe');
      },
    },
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
      });
    },
  });
  
  export const { updateToken, logOut } = authSlice.actions;
  export const authUserReducer = authSlice.reducer;