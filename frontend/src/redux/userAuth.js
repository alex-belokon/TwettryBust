import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("authUser/login", async (userData) => {
  console.log(userData);
  try {
    const response = await fetch("http://localhost:9000/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "jondoe@gmail.com",
        password: "my_1secret1_password",
      }),
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

const initialState = {
  user: {
    firstName: " ",
    lastName: " ",
    userName: " ",
    avatar: " ",
    id: " ",
  },
  token: " ",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    logInAfterRegistration: (state) => {
      state.isLoggedIn = true;
      console.log("isLoggedIn after", state.isLoggedIn);
    },
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
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login fulfilled", action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      console.log("isLoggedIn after login", state.isLoggedIn);
    });
  },
});

export const { updateUser, updateToken, logOut, logInAfterRegistration } = authSlice.actions;

export const authUserReducer = authSlice.reducer;
