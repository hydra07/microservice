import {
  createAsyncThunk, // simplify asynchronous
  createSlice, // create a slice of state
  PayloadAction, // type for action.payload
} from "@reduxjs/toolkit";

import authService from "@/services/auth.service";
import tokenService from "@/services/token.service";
import { AuthState, User } from "CustomTypes";
import { RootState } from "../../store"; //The type for the overall state of the Redux store.

const user: User | null = tokenService.getUser();
const initialState: AuthState = user?.accessToken
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

export const fetchUserData = createAsyncThunk(
  "authh/fetchUserData",
  async () => {
    const response = await authService.getUserData();
    return response.data as User;
  }
);

export const loginDiscordAsync = createAsyncThunk<
  AuthState,
  void,
  { rejectValue: string }
>("auth/signin", async (_, thunkApi) => {
  console.log("loginDiscordAsync");
  try {
    const response = await authService.loginWithDiscord();
    const { authUrl } = response;
    console.log("authUrl", authUrl);
    const authWindow = window.open(authUrl, "_blank", "width=500,height=600");

    return new Promise<AuthState>((resolve, reject) => {
      const handleAuthCallback = () => {
        const user = tokenService.getUser();
        if (user?.accessToken && user?.refreshToken) {
          authWindow!.close();
          window.removeEventListener("message", handleAuthCallback);
          resolve({ isLoggedIn: true, user, error: "" });
        } else {
          authWindow!.close();
          window.removeEventListener("message", handleAuthCallback);
          console.log("xong nha fail");
          reject(new Error("Missing tokens in tokenService"));
        }
      };

      window.addEventListener("message", handleAuthCallback, false);
      setTimeout(() => {
        window.removeEventListener("message", handleAuthCallback);
        if (authWindow) authWindow.close();
        reject(new Error("Authentication timeout"));
      }, 60000); // Set a timeout of 60 seconds (adjust as needed)
    });
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An unexpected error occurred";
    thunkApi.dispatch(setError(errorMessage));
    return thunkApi.rejectWithValue(errorMessage);
  }
});
// export const loginDiscordAsync = createAsyncThunk<
//   AuthState,
//   void,
//   { rejectValue: string }
// >("auth/signin", async (_, thunkApi) => {
//   console.log("loginDiscordAsync");
//   try {
//     const response = await authService.loginWithDiscord();

//     if (response.accessToken && response.refreshToken) {
//       return response;
//     } else {
//       throw new Error("Missing tokens in response");
//     }
//   } catch (_error) {
//     const error = _error as Error | AxiosError;

//     if (axios.isAxiosError(error)) {
//       const errorMessage = error.response?.data.message || "An error occurred";
//       thunkApi.dispatch(setError(errorMessage));
//       return thunkApi.rejectWithValue(errorMessage);
//     } else {
//       const errorMessage = error.message || "An unexpected error occurred";
//       thunkApi.dispatch(setError(errorMessage));
//       return thunkApi.rejectWithValue(errorMessage);
//     }
//   }
// });

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
