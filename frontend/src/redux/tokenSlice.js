import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/authorization";

const persistedStateAuthUser = localStorage.getItem("persist:authUser");

const persistedStateAuthUserSession =
  sessionStorage.getItem("persist:authUser");

const persistedStateAuthUserJSON = persistedStateAuthUser
  ? JSON.parse(persistedStateAuthUser)
  : null;
const persistedStateAuthUserSessionJSON = persistedStateAuthUserSession
  ? JSON.parse(persistedStateAuthUserSession)
  : null;

const tokenAuthUser =
  persistedStateAuthUserJSON && persistedStateAuthUserJSON.token
    ? JSON.parse(persistedStateAuthUserJSON.token)
    : "";

const userAuthUser =
  persistedStateAuthUserJSON && persistedStateAuthUserJSON.user
    ? JSON.parse(persistedStateAuthUserJSON.user)
    : "";

const tokenAuthUserSession =
  persistedStateAuthUserSessionJSON && persistedStateAuthUserSessionJSON.token
    ? JSON.parse(persistedStateAuthUserSessionJSON.token)
    : "";

const userAuthUserSession =
  persistedStateAuthUserSessionJSON && persistedStateAuthUserSessionJSON.user
    ? JSON.parse(persistedStateAuthUserSessionJSON.user)
    : "";

const token = tokenAuthUser || tokenAuthUserSession;

const user = userAuthUser || userAuthUserSession;

const isLoggedIn = token && token !== "" ? true : false;

const authSlice = createSlice({
  name: "authUser",
  initialState: {
    user: user,
    token: token,
    isLoggedIn: isLoggedIn,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.user = {
        firstName: " ",
        lastName: " ",
        userName: " ",
        avatar: " ",
        id: "",
      };
      state.token = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem("persist:authUser");
      localStorage.removeItem("persist:authUser");
      localStorage.removeItem("rememberMe");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    });
  },
});

export const { updateToken, logOut, updateUser } = authSlice.actions;
export const authUserReducer = authSlice.reducer;
