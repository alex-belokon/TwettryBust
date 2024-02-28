// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { login } from "../redux/userAuth";

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
    },
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
    },
  });
  
  export const { updateUser } = userSlice.actions;
  export const userReducer = userSlice.reducer;