import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./baseUrl";

export const login = createAsyncThunk("authUser/login", async (userData) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/sign-in`, {
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

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
       
        return thunkAPI.rejectWithValue(errorText);
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
      
      return thunkAPI.rejectWithValue(error.toString());
    }
  });