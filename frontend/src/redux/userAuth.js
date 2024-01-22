import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное действие для входа в систему
export const logIn = createAsyncThunk('authUser/logIn', async (userCredentials, thunkAPI) => {

  return {
    user: {
      name: 'Name',
      lastName: 'User',
      email: 'test@ukr.net',
      photo: 'https://cdn.abo.media/upload/article/res/770-430/o_1fnaarlfm3sv1c3kdk1dpn46j2p.jpg',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwia',
  };
});

const initialState = {
  user: { name: null, lastName: null, email: null, photo: null },
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