import { createAsyncThunk, // simplify asynchronous
         createSlice, // create a slice of state
         PayloadAction // type for action.payload
        } from "@reduxjs/toolkit";

import { RootState } from "@/store/store"; //The type for the overall state of the Redux store.
import authService from "@/services/auth.service"; 
import tokenService from "@/services/token.service";
import axios, { AxiosError } from "axios";
import { AuthState, User } from "CustomTypes";

const user: User = tokenService.getUser();
const initialState: AuthState = user.accessToken
  ? {
      isLoggedIn: true,
      user: user,
      error: "",
    }
  : {
      isLoggedIn: false,
      user: {
        accessToken: "",
        refreshToken: "",
      },
      error: "",
    };

export const loginDiscordAsync = createAsyncThunk<
  AuthState,
  void,
  { rejectValue: string }
>("auth/signin", async (_, thunkApi) => {
  try {
    const response = await authService.loginWithDiscord();

    if (response.accessToken && response.refreshToken) {
      return response;
    } else {
      throw new Error("Missing tokens in response");
    }
  } catch (_error) {
    const error = _error as Error | AxiosError;

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message || "An error occurred";
      thunkApi.dispatch(setError(errorMessage));
      return thunkApi.rejectWithValue(errorMessage);
    } else {
      const errorMessage = error.message || "An unexpected error occurred";
      thunkApi.dispatch(setError(errorMessage));
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
});

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    refreshToken: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginDiscordAsync.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.user = payload.user;
        state.error = "";
      })
      .addCase(loginDiscordAsync.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = { accessToken: "", refreshToken: "" };
        state.error = "";
      });
  },
});
export const { setError, refreshToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;