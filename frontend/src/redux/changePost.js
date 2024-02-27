import { createSlice } from "@reduxjs/toolkit";

const changePost = createSlice({
  name: 'changePost',
  initialState: false,
  reducers: {
    addDelPost: (state) => {
      return !state;
    }
  },
});

export const { addDelPost } = changePost.actions;
export const changePostReducer = changePost.reducer;
