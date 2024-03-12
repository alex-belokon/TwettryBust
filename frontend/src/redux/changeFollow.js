import { createSlice } from "@reduxjs/toolkit";

const changeFollow = createSlice({
  name: 'changeFollow',
  initialState: false,
  reducers: {
    addDelFollow: (state) => {
      return !state;
    }
  },
});

export const { addDelFollow } = changeFollow.actions;
export const changeFollowReducer = changeFollow.reducer;
