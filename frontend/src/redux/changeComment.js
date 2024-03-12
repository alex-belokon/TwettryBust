import { createSlice } from "@reduxjs/toolkit";

const changeComment = createSlice({
  name: 'changeComment',
  initialState: false,
  reducers: {
    addDelComment: (state) => {
      return !state;
    }
  },
});

export const { addDelComment } = changeComment.actions;
export const changeCommentReducer = changeComment.reducer;
