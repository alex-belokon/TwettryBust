import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("authUser/login", async (userData) => {
  console.log(userData);
  try {
    const response = await fetch("http://localhost:9000/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Ошибка входа в систему");
    }

    const data = await response.json();

    console.log("data", data);

    return data;
  } catch (error) {
    console.log(error);
  }
});

const persistedStateAuthUser = localStorage.getItem('persist:authUser');
const persistedStateAuthUserSession = sessionStorage.getItem('persist:authUser');
const persistedStateAuthUserJSON = persistedStateAuthUser ? JSON.parse(persistedStateAuthUser) : null;
const persistedStateAuthUserSessionJSON = persistedStateAuthUserSession ? JSON.parse(persistedStateAuthUserSession) : null;
const tokenAuthUser = persistedStateAuthUserJSON && persistedStateAuthUserJSON.token ? JSON.parse(persistedStateAuthUserJSON.token) : '';
const tokenAuthUserSession = persistedStateAuthUserSessionJSON && persistedStateAuthUserSessionJSON.token ? JSON.parse(persistedStateAuthUserSessionJSON.token) : '';

const token = tokenAuthUser || tokenAuthUserSession;
const isLoggedIn = token && token !== '' ? true : false;
// const isLoggedIn = true;
const initialState = {
  user: {
    firstName: " ",
    lastName: " ",
    userName: " ",
    avatar: " ",
    id: "",

  },
  token: token,
  isLoggedIn: isLoggedIn,
};

const authSlice = createSlice({
  name: "authUser",
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
      localStorage.removeItem('persist:authUser');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login fulfilled", action.payload);
      state.user = action.payload.user;
      console.log("state.user", state.user);
      state.token = action.payload.token;
      state.isLoggedIn = true;
      console.log("isLoggedIn after login", state.isLoggedIn);
    });
  },
});

export const { updateUser, updateToken, logOut, logInAfterRegistration } = authSlice.actions;

export const authUserReducer = authSlice.reducer;

export const userReducer = authSlice.reducer;