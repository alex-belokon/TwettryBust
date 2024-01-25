import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
    clearUserData: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.confirmPassword = '';
    },
  },
});

export const { saveUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;