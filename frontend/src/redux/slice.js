import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const userRegistration = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
    clearUserData: (state) => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.confirmPassword = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
       
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
        }
        })
      .addCase(register.rejected, (state) => {
        state.error = 'Ошибка регистрации';
      });
  },

});

export const { saveUserData, clearUserData } = userRegistration.actions;

export const userRegistrationReducer = userRegistration.reducer;