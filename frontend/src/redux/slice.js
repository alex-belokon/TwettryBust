import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk('user/register', async (userData) => {
  try {
    const response = await fetch('http://localhost:9000/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Ошибка регистрации');
    }

    const data = await response.json();
    console.log('data', data);

    return data;
  } catch (error) {
    console.log(error);
  }
});

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
        state.token = action.payload.token;
        })
      .addCase(register.rejected, (state) => {
        state.error = 'Ошибка регистрации';
      });
  },

});

export const { saveUserData, clearUserData } = userRegistration.actions;

export const userRegistrationReducer = userRegistration.reducer;