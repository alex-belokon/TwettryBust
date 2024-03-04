import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/authorization";

const persistedStateAuthUser = localStorage.getItem("persist:authUser");
console.log("persistedStateAuthUser:", persistedStateAuthUser);

const persistedStateAuthUserSession =
  sessionStorage.getItem("persist:authUser");
console.log("persistedStateAuthUserSession:", persistedStateAuthUserSession);

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
console.log("tokenAuthUser:", tokenAuthUser);

const userAuthUser =
  persistedStateAuthUserJSON && persistedStateAuthUserJSON.user
    ? JSON.parse(persistedStateAuthUserJSON.user)
    : "";
console.log("userAuthUser:", userAuthUser);

const tokenAuthUserSession =
  persistedStateAuthUserSessionJSON && persistedStateAuthUserSessionJSON.token
    ? JSON.parse(persistedStateAuthUserSessionJSON.token)
    : "";
console.log("tokenAuthUserSession:", tokenAuthUserSession);

const userAuthUserSession =
  persistedStateAuthUserSessionJSON && persistedStateAuthUserSessionJSON.user
    ? JSON.parse(persistedStateAuthUserSessionJSON.user)
    : "";
console.log("userAuthUserSession:", userAuthUserSession);

const token = tokenAuthUser || tokenAuthUserSession;
console.log("token:", token);

const user = userAuthUser || userAuthUserSession;
console.log("user:", user);

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
      console.log("updateToken action:", action);
      console.log("updateToken state:", state);
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
      localStorage.removeItem("persist:authUser");
      localStorage.removeItem("persist:user");
      localStorage.removeItem("rememberMe");
      console.log("logOut state:", state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      console.log("login.fulfilled action:", action);
      console.log("login.fulfilled state:", state);
    });
  },
});

export const { updateToken, logOut, updateUser } = authSlice.actions;
export const authUserReducer = authSlice.reducer;
