import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/authorization";

const persistedStateAuthUser = localStorage.getItem("persist:authUser");

const persistedStateAuthUserJSON = persistedStateAuthUser
  ? JSON.parse(persistedStateAuthUser)
  : null;

const tokenAuthUser =
  persistedStateAuthUserJSON && persistedStateAuthUserJSON.token
    ? JSON.parse(persistedStateAuthUserJSON.token)
    : "";

const token = tokenAuthUser;

const isLoggedIn = token && token !== "" ? true : false;

const authSlice = createSlice({
  name: "authUser",
  initialState: {
    user: persistedStateAuthUser ? JSON.parse(persistedStateAuthUserJSON.user) : {
      firstName: " ",
      lastName: " ",
      userName: " ",
      avatar: " ",
      id: " ",
    },
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
      localStorage.removeItem("persist:authUser");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      return{
        token: action.payload.token,
        user: {...action.payload.user},
        isLoggedIn: true,
      }
    });
  },
});

export const { updateToken, logOut, updateUser } = authSlice.actions;
export const authUserReducer = authSlice.reducer;
