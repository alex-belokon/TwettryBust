import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: {
      postId: null,
      notificationType: null,
    },
    reducers: {
      setData: (state, action) => {
       const{postId, notificationType} = action.payload;
        state.postId = postId;
        state.notificationType = notificationType;
      },
    },
   });
  
  export const { setData } = notificationsSlice.actions;

  export const notificationsReducer = notificationsSlice.reducer;