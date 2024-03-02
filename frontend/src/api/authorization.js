import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:9000/api/auth/sign-up', {
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
      console.log('data', data);
  
      return data;
    } catch (error) {
      console.log(error);
      
      return thunkAPI.rejectWithValue(error.toString());
    }
  });