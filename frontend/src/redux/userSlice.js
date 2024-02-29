// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/authorization";

const userSlice = createSlice({
    name: "user",
    initialState: {
      user: {
        firstName: " ",
        lastName: " ",
        userName: " ",
        avatar: " ",
        id: "",
      },
    },
    reducers: {
      updateUser: (state, action) => {
        state.user = action.payload;
      },
      logOut: (state) => {
        state.user = { name: null, email: null };
      },
    },
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
    },
  });
  
  export const { updateUser, logOut } = userSlice.actions;
  export const userReducer = userSlice.reducer;