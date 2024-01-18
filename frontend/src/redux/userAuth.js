import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное действие для входа в систему
export const logIn = createAsyncThunk('authUser/logIn', async (userCredentials, thunkAPI) => {
  // Здесь вы можете выполнить асинхронный запрос к серверу для входа в систему
  // и вернуть данные пользователя и токен
});

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    });
  },
});

export const { updateUser, updateToken, logOut } = authSlice.actions;

export const authUserReducer = authSlice.reducer;